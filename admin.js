// Painel de Administracao separado em outra aba.
// Funciona com os scripts Firebase compat carregados no admin.html.

const firebaseConfig = window.firebaseConfig;
const USER_PROFILES_COLLECTION = "userProfiles";
const USER_DATA_COLLECTION = "users";
const REMOVED_USERNAMES_COLLECTION = "removedUsernames";
const USERNAME_EMAIL_DOMAIN = "usuarios.financas.app";
const ADMIN_USER_SLUGS = ["tata"];

let app;
let auth;
let db;
let currentUser = null;
let userProfiles = [];
let secondaryApp = null;
let toastTimer;

const elements = {
  adminUserName: document.querySelector("#adminUserName"),
  adminStatus: document.querySelector("#adminStatus"),
  adminBackButton: document.querySelector("#adminBackButton"),
  adminLogoutButton: document.querySelector("#adminLogoutButton"),
  adminAccessWarning: document.querySelector("#adminAccessWarning"),
  adminAccessMessage: document.querySelector("#adminAccessMessage"),
  adminPanel: document.querySelector("#administracao"),
  refreshUsersButton: document.querySelector("#refreshUsersButton"),
  adminCreateUserForm: document.querySelector("#adminCreateUserForm"),
  adminNewUserName: document.querySelector("#adminNewUserName"),
  adminNewUserPassword: document.querySelector("#adminNewUserPassword"),
  adminCreateUserButton: document.querySelector("#adminCreateUserButton"),
  adminSummary: document.querySelector("#adminSummary"),
  adminUsersList: document.querySelector("#adminUsersList"),
  toast: document.querySelector("#toast"),
};

bootAdmin();

function bootAdmin() {
  if (!isFirebaseConfigured()) {
    showAccessWarning("Configure o arquivo firebase-config.js antes de usar a Administração.");
    return;
  }

  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();

  bindAdminEvents();

  auth.onAuthStateChanged(async (user) => {
    currentUser = user;

    if (!user) {
      showAccessWarning("Você não está logado. Abra o app principal, entre como tata e depois volte para esta aba.");
      return;
    }

    if (!isCurrentUserAdmin(user)) {
      const name = user.displayName || getNameFromInternalEmail(user.email) || user.email || "usuário";
      showAccessWarning(`A conta ${name} não tem permissão de master. Entre como tata.`);
      return;
    }

    showAdminPanel(user);
    await ensureMasterProfile(user);
    await loadUserProfiles();
  });
}

function isFirebaseConfigured() {
  return Boolean(
    firebaseConfig?.apiKey &&
      firebaseConfig.apiKey !== "SUA_API_KEY" &&
      !firebaseConfig.apiKey.includes("COLE") &&
      firebaseConfig?.projectId &&
      !firebaseConfig.projectId.includes("SEU_")
  );
}

function bindAdminEvents() {
  elements.adminBackButton?.addEventListener("click", (event) => {
    event.preventDefault();
    returnToMainApp();
  });

  elements.adminLogoutButton?.addEventListener("click", async () => {
    await auth.signOut();
    window.location.href = "index.html";
  });

  elements.refreshUsersButton?.addEventListener("click", loadUserProfiles);
  elements.adminCreateUserForm?.addEventListener("submit", createUserFromAdmin);
}

function returnToMainApp() {
  try {
    if (window.opener && !window.opener.closed) {
      window.opener.focus();
      window.close();
      setTimeout(() => {
        showToast("A aba principal já está aberta. Pode fechar esta aba se ela não fechou automaticamente.");
      }, 250);
      return;
    }
  } catch (error) {
    console.warn("Não foi possível focar a aba principal:", error);
  }

  window.location.replace("index.html#dashboard");
}

function showAccessWarning(message) {
  if (elements.adminPanel) elements.adminPanel.hidden = true;
  if (elements.adminAccessWarning) elements.adminAccessWarning.hidden = false;
  if (elements.adminAccessMessage) elements.adminAccessMessage.textContent = message;
  if (elements.adminStatus) elements.adminStatus.textContent = "Acesso negado";
}

function showAdminPanel(user) {
  const name = user.displayName || getNameFromInternalEmail(user.email) || "tata";
  if (elements.adminAccessWarning) elements.adminAccessWarning.hidden = true;
  if (elements.adminPanel) elements.adminPanel.hidden = false;
  if (elements.adminStatus) elements.adminStatus.textContent = `Logado como ${name}`;
  if (elements.adminUserName) elements.adminUserName.textContent = name;
}

async function ensureMasterProfile(user) {
  try {
    await db.collection(USER_PROFILES_COLLECTION).doc(user.uid).set(
      {
        uid: user.uid,
        name: user.displayName || getNameFromInternalEmail(user.email) || "tata",
        slug: getUsernameSlug(user.displayName || getNameFromInternalEmail(user.email) || "tata"),
        authEmail: user.email,
        status: "active",
        role: "admin",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn("Não foi possível garantir perfil master. Confira as rules.", error);
    showToast("Se a lista não carregar, publique as rules corretas do Firestore.");
  }
}

function isAdminEmail(email) {
  const value = String(email || "").toLowerCase();
  if (!value.endsWith(`@${USERNAME_EMAIL_DOMAIN}`)) return false;
  const slug = value.replace(`@${USERNAME_EMAIL_DOMAIN}`, "");
  return ADMIN_USER_SLUGS.includes(slug);
}

function isCurrentUserAdmin(user = currentUser) {
  return Boolean(user && isAdminEmail(user.email));
}

function getSecondaryAuth() {
  if (!secondaryApp) {
    try {
      secondaryApp = firebase.app("AdminUserCreationApp");
    } catch (error) {
      secondaryApp = firebase.initializeApp(firebaseConfig, "AdminUserCreationApp");
    }
  }

  const secondaryAuth = firebase.auth(secondaryApp);
  if (firebase.auth.Auth?.Persistence?.NONE) {
    secondaryAuth.setPersistence(firebase.auth.Auth.Persistence.NONE).catch(() => {});
  }
  return secondaryAuth;
}

async function createUserFromAdmin(event) {
  event.preventDefault();

  if (!isCurrentUserAdmin()) {
    showToast("Apenas o master tata pode criar contas.");
    return;
  }

  const name = elements.adminNewUserName.value.trim();
  const password = elements.adminNewUserPassword.value;
  const email = getAuthEmailFromName(name);

  if (!email || password.length < 6) {
    showToast("Informe nome e senha com pelo menos 6 caracteres.");
    return;
  }

  elements.adminCreateUserButton.disabled = true;
  elements.adminCreateUserButton.textContent = "Criando...";

  try {
    const secondaryAuth = getSecondaryAuth();
    const credential = await secondaryAuth.createUserWithEmailAndPassword(email, password);

    if (credential?.user?.updateProfile) {
      await credential.user.updateProfile({ displayName: name });
    }

    await db.collection(USER_PROFILES_COLLECTION).doc(credential.user.uid).set(
      {
        uid: credential.user.uid,
        name,
        slug: getUsernameSlug(name),
        authEmail: email,
        status: "active",
        role: "user",
        createdBy: currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await secondaryAuth.signOut().catch(() => {});
    elements.adminCreateUserForm.reset();
    await loadUserProfiles();
    showToast("Conta criada e liberada com sucesso.");
  } catch (error) {
    showToast(getFirebaseErrorMessage(error));
  } finally {
    elements.adminCreateUserButton.disabled = false;
    elements.adminCreateUserButton.textContent = "Criar conta já liberada";
  }
}

async function loadUserProfiles() {
  if (!isCurrentUserAdmin() || !elements.adminUsersList) return;

  elements.adminUsersList.innerHTML = `<p class="muted">Carregando contas...</p>`;

  try {
    const snapshot = await db.collection(USER_PROFILES_COLLECTION).get();
    userProfiles = snapshot.docs
      .map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }))
      .sort((a, b) => {
        const aTime = getTimestampMillis(a.createdAt) || 0;
        const bTime = getTimestampMillis(b.createdAt) || 0;
        return bTime - aTime;
      });

    renderAdminUsers();
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    elements.adminUsersList.innerHTML = `<p class="muted">Não foi possível carregar as contas. Confira as regras do Firestore.</p>`;
    showToast("Erro de permissão ao carregar contas. Publique as rules atualizadas.");
  }
}

function getTimestampMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.seconds === "number") return value.seconds * 1000;
  return 0;
}

function renderAdminUsers() {
  const pendingCount = userProfiles.filter((profile) => profile.status === "pending").length;
  const activeCount = userProfiles.filter((profile) => profile.status === "active").length;
  const blockedCount = userProfiles.filter((profile) => profile.status === "blocked").length;
  const removedCount = userProfiles.filter((profile) => profile.status === "removed").length;

  elements.adminSummary.innerHTML = `
    <div class="admin-stat"><span>Pendentes</span><strong>${pendingCount}</strong></div>
    <div class="admin-stat"><span>Liberadas</span><strong>${activeCount}</strong></div>
    <div class="admin-stat"><span>Bloqueadas</span><strong>${blockedCount}</strong></div>
    <div class="admin-stat"><span>Removidas</span><strong>${removedCount}</strong></div>
  `;

  if (!userProfiles.length) {
    elements.adminUsersList.innerHTML = `<p class="muted">Nenhuma conta cadastrada ainda.</p>`;
    return;
  }

  elements.adminUsersList.innerHTML = userProfiles.map(renderAdminUserCard).join("");

  elements.adminUsersList.querySelectorAll("[data-user-block]").forEach((button) => {
    button.addEventListener("click", () => setUserAccountStatus(button.dataset.userBlock, "blocked"));
  });

  elements.adminUsersList.querySelectorAll("[data-user-approve]").forEach((button) => {
    button.addEventListener("click", () => setUserAccountStatus(button.dataset.userApprove, "active"));
  });

  elements.adminUsersList.querySelectorAll("[data-user-unblock]").forEach((button) => {
    button.addEventListener("click", () => setUserAccountStatus(button.dataset.userUnblock, "active"));
  });

  elements.adminUsersList.querySelectorAll("[data-user-remove]").forEach((button) => {
    button.addEventListener("click", () => deleteUserAccountData(button.dataset.userRemove));
  });
}

function renderAdminUserCard(profile) {
  const isSelf = profile.uid === currentUser?.uid || profile.id === currentUser?.uid;
  const status = profile.status || "active";
  const role = profile.role || "user";
  const statusLabel = status === "pending" ? "Pendente" : status === "blocked" ? "Bloqueada" : status === "removed" ? "Removida" : "Liberada";
  const roleLabel = role === "admin" ? `<span class="status-pill status-admin">Admin</span>` : "";
  const safeUid = escapeHtml(profile.uid || profile.id);
  const safeName = escapeHtml(profile.name || "Usuário sem nome");
  const safeEmail = escapeHtml(profile.authEmail || "");
  const safeStatusClass = escapeHtml(status);

  let actions = "";

  if (isSelf) {
    actions = `<span class="muted">Sua conta master</span>`;
  } else if (status === "pending") {
    actions = `
      <button class="icon-button" type="button" data-user-approve="${safeUid}">Aprovar</button>
      <button class="icon-button danger" type="button" data-user-remove="${safeUid}">Remover</button>
    `;
  } else if (status === "active") {
    actions = `
      <button class="icon-button" type="button" data-user-block="${safeUid}">Bloquear</button>
      <button class="icon-button danger" type="button" data-user-remove="${safeUid}">Remover</button>
    `;
  } else if (status === "blocked") {
    actions = `
      <button class="icon-button" type="button" data-user-unblock="${safeUid}">Desbloquear</button>
      <button class="icon-button danger" type="button" data-user-remove="${safeUid}">Remover</button>
    `;
  } else {
    actions = `<button class="icon-button danger" type="button" data-user-remove="${safeUid}">Excluir definitivo</button>`;
  }

  return `
    <div class="admin-user-card">
      <div class="admin-user-main">
        <strong>${safeName}</strong>
        <small>${safeEmail}</small>
        <div class="admin-user-meta">
          <span class="status-pill status-${safeStatusClass}">${statusLabel}</span>
          ${roleLabel}
        </div>
      </div>
      <div class="admin-actions">${actions}</div>
    </div>
  `;
}

async function setUserAccountStatus(uid, status) {
  if (!isCurrentUserAdmin()) {
    showToast("Apenas o master tata pode alterar contas.");
    return;
  }

  if (uid === currentUser?.uid) {
    showToast("Você não pode alterar sua própria conta master.");
    return;
  }

  const labels = {
    active: "aprovar/liberar",
    blocked: "bloquear",
  };

  const confirmed = status === "active" ? true : confirm(`Deseja ${labels[status]} esta conta?`);
  if (!confirmed) return;

  try {
    await db.collection(USER_PROFILES_COLLECTION).doc(uid).set(
      {
        status,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: currentUser.uid,
      },
      { merge: true }
    );

    await loadUserProfiles();
    showToast(status === "active" ? "Conta aprovada e liberada." : "Conta bloqueada.");
  } catch (error) {
    console.error("Erro ao atualizar conta:", error);
    showToast("Não foi possível atualizar a conta. Confira as regras do Firestore.");
  }
}

async function deleteUserAccountData(uid) {
  if (!isCurrentUserAdmin()) {
    showToast("Apenas o master tata pode excluir contas.");
    return;
  }

  if (uid === currentUser?.uid) {
    showToast("Você não pode excluir sua própria conta master.");
    return;
  }

  const profile = userProfiles.find((item) => item.uid === uid || item.id === uid);
  const name = profile?.name || "esta conta";
  const slug = profile?.slug || getUsernameSlug(name);

  const confirmed = confirm(`Excluir DEFINITIVAMENTE ${name}? Isso vai apagar o perfil e os dados financeiros salvos no Firestore. A autenticação do Firebase só pode ser apagada pelo Console ou por Cloud Function.`);
  if (!confirmed) return;

  try {
    if (slug) {
      await db.collection(REMOVED_USERNAMES_COLLECTION).doc(slug).set(
        {
          uid,
          name: profile?.name || "",
          slug,
          authEmail: profile?.authEmail || "",
          removedAt: firebase.firestore.FieldValue.serverTimestamp(),
          removedBy: currentUser.uid,
        },
        { merge: true }
      );
    }

    await db.doc(`${USER_DATA_COLLECTION}/${uid}/finance/data`).delete().catch((error) => {
      console.warn("Dados financeiros já estavam ausentes ou não puderam ser apagados:", error);
    });

    await db.collection(USER_PROFILES_COLLECTION).doc(uid).delete();

    await loadUserProfiles();
    showToast("Conta excluída do banco de dados. Para apagar também do Authentication, use o Console do Firebase ou Cloud Function.");
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    showToast("Não foi possível excluir. Confira as regras do Firestore.");
  }
}

function getAuthEmailFromName(name) {
  const value = String(name || "").trim();
  if (value.includes("@")) return value.toLowerCase();
  const slug = getUsernameSlug(value);
  if (slug.length < 3) return "";
  return `${slug}@${USERNAME_EMAIL_DOMAIN}`;
}

function getNameFromInternalEmail(email) {
  const value = String(email || "");
  if (!value.endsWith(`@${USERNAME_EMAIL_DOMAIN}`)) return value;
  return value
    .replace(`@${USERNAME_EMAIL_DOMAIN}`, "")
    .split(".")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getUsernameSlug(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
}

function getFirebaseErrorMessage(error) {
  const code = error?.code || "";
  console.error("Erro Firebase Auth:", code, error);

  if (code.includes("auth/api-key-not-valid")) return "A chave API do Firebase está inválida. Confira o firebase-config.js.";
  if (code.includes("auth/operation-not-allowed")) return "Ative Email/Password em Firebase > Authentication > Sign-in method.";
  if (code.includes("auth/unauthorized-domain")) return "Domínio não autorizado no Firebase Authentication. Adicione o domínio em Authorized domains.";
  if (code.includes("auth/invalid-credential") || code.includes("auth/wrong-password") || code.includes("auth/user-not-found")) return "Nome ou senha inválidos.";
  if (code.includes("auth/email-already-in-use")) return "Este nome de usuário já está em uso. Escolha outro nome.";
  if (code.includes("auth/weak-password")) return "Use uma senha com pelo menos 6 caracteres.";
  if (code.includes("auth/invalid-email")) return "Nome de usuário inválido. Use letras, números e espaços.";
  return `Não foi possível concluir. Erro: ${code || "desconhecido"}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 3000);
}
