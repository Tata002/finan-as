// Versao para abrir direto pelo navegador (duplo clique no index.html).
// Nao usa ES Modules. O Firebase vem dos scripts compat carregados no index.html.

const firebaseConfig = window.firebaseConfig;

const initializeApp = (config) => firebase.initializeApp(config);
const getAuth = () => firebase.auth();
const getFirestore = () => firebase.firestore();

const onAuthStateChanged = (authInstance, callback) => authInstance.onAuthStateChanged(callback);
const signInWithEmailAndPassword = (authInstance, email, password) => authInstance.signInWithEmailAndPassword(email, password);
const createUserWithEmailAndPassword = (authInstance, email, password) => authInstance.createUserWithEmailAndPassword(email, password);
const signOut = (authInstance) => authInstance.signOut();

const doc = (dbInstance, ...pathSegments) => dbInstance.doc(pathSegments.join("/"));
const getDoc = async (docRef) => {
  const snapshot = await docRef.get();
  return {
    exists: () => snapshot.exists,
    data: () => snapshot.data(),
  };
};
const setDoc = (docRef, data, options) => docRef.set(data, options);
const deleteDoc = (docRef) => docRef.delete();
const serverTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();
const enableIndexedDbPersistence = (dbInstance) => dbInstance.enablePersistence();

const USER_DATA_COLLECTION = "users";
const USER_PROFILES_COLLECTION = "userProfiles";
const REMOVED_USERNAMES_COLLECTION = "removedUsernames";
const USERNAME_EMAIL_DOMAIN = "usuarios.financas.app";

// Ajuste aqui os nomes que podem acessar o menu Administração.
// Ex.: "ricardo" vira ricardo@usuarios.financas.app
const ADMIN_USER_SLUGS = ["tata"];

const expenseCategories = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Lazer",
  "Assinaturas",
  "Educação",
  "Aleatório",
  "Outros",
];

const incomeCategories = ["Salário", "Freelance", "Investimentos", "Reembolso", "Outros"];

const palette = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2", "#db2777", "#475569"];

const elements = {
  authScreen: document.querySelector("#authScreen"),
  appShell: document.querySelector("#appShell"),
  authForm: document.querySelector("#authForm"),
  authName: document.querySelector("#authName"),
  authPassword: document.querySelector("#authPassword"),
  loginButton: document.querySelector("#loginButton"),
  registerButton: document.querySelector("#registerButton"),
  logoutButton: document.querySelector("#logoutButton"),
  userEmail: document.querySelector("#userEmail"),
  firebaseWarning: document.querySelector("#firebaseWarning"),
  appPageTitle: document.querySelector("#appPageTitle"),
  monthFilter: document.querySelector("#monthFilter"),
  transactionForm: document.querySelector("#transactionForm"),
  budgetForm: document.querySelector("#budgetForm"),
  editingId: document.querySelector("#editingId"),
  formTitle: document.querySelector("#formTitle"),
  submitButton: document.querySelector("#submitButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  typeInput: document.querySelector("#typeInput"),
  titleInput: document.querySelector("#titleInput"),
  categoryInput: document.querySelector("#categoryInput"),
  amountInput: document.querySelector("#amountInput"),
  dateInput: document.querySelector("#dateInput"),
  noteInput: document.querySelector("#noteInput"),
  budgetInput: document.querySelector("#budgetInput"),
  balanceValue: document.querySelector("#balanceValue"),
  balanceHint: document.querySelector("#balanceHint"),
  incomeValue: document.querySelector("#incomeValue"),
  expenseValue: document.querySelector("#expenseValue"),
  dailyValue: document.querySelector("#dailyValue"),
  dailyHint: document.querySelector("#dailyHint"),
  todayPlanMonthLabel: document.querySelector("#todayPlanMonthLabel"),
  todayPlanMainAction: document.querySelector("#todayPlanMainAction"),
  todayPlanMainDetail: document.querySelector("#todayPlanMainDetail"),
  todayPlanScore: document.querySelector("#todayPlanScore"),
  todayPlanScoreLabel: document.querySelector("#todayPlanScoreLabel"),
  todayPlanScoreBar: document.querySelector("#todayPlanScoreBar"),
  todayPlanList: document.querySelector("#todayPlanList"),
  forecastMonthLabel: document.querySelector("#forecastMonthLabel"),
  forecastStatus: document.querySelector("#forecastStatus"),
  forecastProjectedBalance: document.querySelector("#forecastProjectedBalance"),
  forecastCurrentPace: document.querySelector("#forecastCurrentPace"),
  forecastRecommendedDaily: document.querySelector("#forecastRecommendedDaily"),
  forecastAlert: document.querySelector("#forecastAlert"),
  forecastScenarioList: document.querySelector("#forecastScenarioList"),
  villainsMonthLabel: document.querySelector("#villainsMonthLabel"),
  villainsList: document.querySelector("#villainsList"),
  sidebarBudget: document.querySelector("#sidebarBudget"),
  budgetPercent: document.querySelector("#budgetPercent"),
  budgetBar: document.querySelector("#budgetBar"),
  budgetMessage: document.querySelector("#budgetMessage"),
  donutChart: document.querySelector("#donutChart"),
  donutCenter: document.querySelector("#donutCenter"),
  categoryList: document.querySelector("#categoryList"),
  insightsList: document.querySelector("#insightsList"),
  transactionsBody: document.querySelector("#transactionsBody"),
  emptyState: document.querySelector("#emptyState"),
  searchInput: document.querySelector("#searchInput"),
  typeFilter: document.querySelector("#typeFilter"),
  paymentFilter: document.querySelector("#paymentFilter"),
  selectAllTransactions: document.querySelector("#selectAllTransactions"),
  bulkDeleteButton: document.querySelector("#bulkDeleteButton"),
  toast: document.querySelector("#toast"),
  installmentToggle: document.querySelector("#installmentToggle"),
  installmentFields: document.querySelector("#installmentFields"),
  installmentsInput: document.querySelector("#installmentsInput"),
  installmentAmountMode: document.querySelector("#installmentAmountMode"),
  fixedExpenseForm: document.querySelector("#fixedExpenseForm"),
  fixedEditingId: document.querySelector("#fixedEditingId"),
  fixedTitleInput: document.querySelector("#fixedTitleInput"),
  fixedCategoryInput: document.querySelector("#fixedCategoryInput"),
  fixedAmountInput: document.querySelector("#fixedAmountInput"),
  fixedDayInput: document.querySelector("#fixedDayInput"),
  fixedSubmitButton: document.querySelector("#fixedSubmitButton"),
  fixedExpenseList: document.querySelector("#fixedExpenseList"),
  goalForm: document.querySelector("#goalForm"),
  goalCategoryInput: document.querySelector("#goalCategoryInput"),
  goalAmountInput: document.querySelector("#goalAmountInput"),
  goalList: document.querySelector("#goalList"),
  paymentCenterList: document.querySelector("#paymentCenterList"),
  paymentCenterMonthLabel: document.querySelector("#paymentCenterMonthLabel"),
  adminMenuLink: document.querySelector("#adminMenuLink"),
  adminPanel: document.querySelector("#administracao"),
  adminCreateUserForm: document.querySelector("#adminCreateUserForm"),
  adminNewUserName: document.querySelector("#adminNewUserName"),
  adminNewUserPassword: document.querySelector("#adminNewUserPassword"),
  adminCreateUserButton: document.querySelector("#adminCreateUserButton"),
  refreshUsersButton: document.querySelector("#refreshUsersButton"),
  adminSummary: document.querySelector("#adminSummary"),
  adminUsersList: document.querySelector("#adminUsersList"),
};

const appViews = {
  inicio: {
    title: "Resumo do mês",
    defaultTarget: "dashboard",
  },
  diagnostico: {
    title: "Diagnóstico financeiro",
    defaultTarget: "viloes-mes",
  },
  lancamentos: {
    title: "Lançamentos",
    defaultTarget: "lancamentos",
  },
  planejamento: {
    title: "Planejamento",
    defaultTarget: "planejamento",
  },
  pendencias: {
    title: "Pendências",
    defaultTarget: "central-pendencias",
  },
  relatorios: {
    title: "Relatórios",
    defaultTarget: "relatorios",
  },
};

let currentView = "inicio";

let app;
let auth;
let db;
let currentUser = null;
let appStarted = false;
let isLoadingRemoteData = false;
let saveTimer;
let transactions = [];
let budgets = {};
let fixedExpenses = [];
let categoryGoals = {};
let selectedTransactionIds = new Set();
let toastTimer;
let currentUserProfile = null;
let userProfiles = [];
let secondaryApp = null;
let currentProfileUnsubscribe = null;

bootFirebase();

function bootFirebase() {
  if (!isFirebaseConfigured()) {
    elements.firebaseWarning.hidden = false;
    elements.authForm.querySelectorAll("input, button").forEach((item) => (item.disabled = true));
    return;
  }

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  enableIndexedDbPersistence(db).catch(() => {});
  bindAuthEvents();

  onAuthStateChanged(auth, async (user) => {
    clearTimeout(saveTimer);
    currentUser = user;
    if (!user) {
      transactions = [];
      budgets = {};
      fixedExpenses = [];
      categoryGoals = {};
      currentUserProfile = null;
      selectedTransactionIds.clear();
      stopCurrentUserProfileWatcher();
      showAuthScreen();
      return;
    }

    const accessStatus = await prepareSignedInUser(user);
    if (!accessStatus.allowed) {
      showToast(accessStatus.message);
      await signOut(auth);
      return;
    }

    await loadUserData(user);
    showAppScreen(user);
    if (accessStatus.warning) showToast(accessStatus.warning);
    if (!appStarted) {
      startApp();
      appStarted = true;
    } else {
      selectedTransactionIds.clear();
      syncBudgetInput();
      resetForm();
      render();
    }
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

function bindAuthEvents() {
  elements.authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await loginUser();
  });
  if (elements.registerButton) elements.registerButton.addEventListener("click", registerUser);
  elements.logoutButton.addEventListener("click", logoutUser);
}

async function loginUser() {
  const name = elements.authName.value.trim();
  const email = getAuthEmailFromName(name);
  const password = elements.authPassword.value;

  if (!email || password.length < 6) {
    showToast("Informe nome e senha com pelo menos 6 caracteres.");
    return;
  }

  setAuthLoading(true, "Entrando...");
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    showToast(getFirebaseErrorMessage(error));
  } finally {
    setAuthLoading(false);
  }
}

async function registerUser() {
  const name = elements.authName.value.trim();
  const email = getAuthEmailFromName(name);
  const password = elements.authPassword.value;

  if (!email || password.length < 6) {
    showToast("Informe nome e senha com pelo menos 6 caracteres.");
    return;
  }

  setAuthLoading(true, "Solicitando...");
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (credential?.user?.updateProfile) {
      await credential.user.updateProfile({ displayName: name });
    }

    await saveUserProfile(credential.user, name, {
      status: "pending",
      role: "user",
      createdBy: "self-request",
      requestedAt: serverTimestamp(),
    });

    showToast("Cadastro solicitado. Aguarde a aprovação do administrador.");
    await signOut(auth);
  } catch (error) {
    showToast(getFirebaseErrorMessage(error));
  } finally {
    setAuthLoading(false);
  }
}

async function logoutUser() {
  await signOut(auth);
}

function setAuthLoading(isLoading, label = "Entrar") {
  elements.loginButton.disabled = isLoading;
  if (elements.registerButton) elements.registerButton.disabled = isLoading;
  elements.loginButton.textContent = isLoading ? label : "Entrar";
}

function showAuthScreen() {
  elements.authScreen.hidden = false;
  elements.appShell.hidden = true;
  elements.userEmail.textContent = "Conta conectada";
  updateAdminVisibility(false);
}

function showAppScreen(user) {
  elements.authScreen.hidden = true;
  elements.appShell.hidden = false;
  elements.userEmail.textContent = currentUserProfile?.name || user.displayName || getNameFromInternalEmail(user.email) || "Conta conectada";
  updateAdminVisibility(isCurrentUserAdmin());
}

async function loadUserData(user) {
  isLoadingRemoteData = true;
  try {
    const snapshot = await getDoc(getUserDataRef(user.uid));
    const data = snapshot.exists() ? snapshot.data() : {};
    transactions = Array.isArray(data.transactions) ? data.transactions : [];
    budgets = data.budgets && typeof data.budgets === "object" ? data.budgets : {};
    fixedExpenses = Array.isArray(data.fixedExpenses) ? data.fixedExpenses : [];
    categoryGoals = data.categoryGoals && typeof data.categoryGoals === "object" ? data.categoryGoals : {};

    if (!snapshot.exists()) await saveDataToFirebase();
  } catch (error) {
    console.error("Erro ao carregar dados do Firebase:", error);
    showToast("Não foi possível carregar seus dados do Firebase.");
  } finally {
    isLoadingRemoteData = false;
  }
}

function getUserDataRef(uid = currentUser?.uid) {
  return doc(db, USER_DATA_COLLECTION, uid, "finance", "data");
}

function queueSaveData() {
  if (!currentUser || isLoadingRemoteData) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveDataToFirebase, 350);
}

async function saveDataToFirebase() {
  if (!currentUser) return;
  try {
    await setDoc(
      getUserDataRef(),
      {
        transactions,
        budgets,
        fixedExpenses,
        categoryGoals,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Erro ao salvar no Firebase:", error);
    showToast("Não foi possível salvar no Firebase. Verifique a conexão e as regras do Firestore.");
  }
}

function getAuthEmailFromName(name) {
  const value = String(name || "").trim();

  // Compatibilidade: se voce digitar um e-mail antigo, ele ainda entra.
  if (value.includes("@")) return value.toLowerCase();

  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");

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
  return `Não foi possível concluir o acesso. Erro: ${code || "desconhecido"}`;
}


function getUserProfileRef(uid = currentUser?.uid) {
  return doc(db, USER_PROFILES_COLLECTION, uid);
}

function getRemovedUsernameRef(slug) {
  return doc(db, REMOVED_USERNAMES_COLLECTION, slug);
}

function getUsernameSlug(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
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

async function prepareSignedInUser(user) {
  const name = user.displayName || getNameFromInternalEmail(user.email);
  const isMaster = isCurrentUserAdmin(user);
  const slug = getUsernameSlug(name);

  try {
    if (!isMaster) {
      const removedSnapshot = await getDoc(getRemovedUsernameRef(slug));
      if (removedSnapshot.exists()) {
        return { allowed: false, message: "Esta conta foi excluída definitivamente pelo administrador." };
      }
    }

    const profile = await saveUserProfile(user, name, { lastLoginAt: serverTimestamp() });
    currentUserProfile = profile;
    watchCurrentUserProfile(user);

    if (!isMaster && ["pending", "blocked", "removed"].includes(profile.status)) {
      const messages = {
        pending: "Sua conta ainda está aguardando aprovação do administrador.",
        blocked: "Esta conta foi bloqueada pelo administrador.",
        removed: "Esta conta foi removida pelo administrador.",
      };
      return { allowed: false, message: messages[profile.status] || "Conta sem liberação." };
    }

    return { allowed: true };
  } catch (error) {
    console.error("Erro ao validar perfil do usuário:", error);

    // O master tata deve conseguir abrir o app e enxergar o menu Administração
    // mesmo quando as regras do Firestore ainda nao foram publicadas corretamente.
    // O painel avisara se nao conseguir listar/aprovar as contas.
    if (isMaster) {
      currentUserProfile = {
        uid: user.uid,
        name,
        slug: getUsernameSlug(name),
        authEmail: user.email,
        status: "active",
        role: "admin",
      };
      return { allowed: true, warning: "Entre no menu Administração e publique as regras do Firestore para liberar a lista de contas." };
    }

    return { allowed: false, message: "Não foi possível validar sua conta. Verifique as regras do Firestore." };
  }
}

async function saveUserProfile(user, name, extra = {}) {
  const ref = getUserProfileRef(user.uid);
  const snapshot = await getDoc(ref);
  const previous = snapshot.exists() ? snapshot.data() : {};
  const admin = isAdminEmail(user.email);
  const profile = {
    uid: user.uid,
    name: name || previous.name || getNameFromInternalEmail(user.email),
    slug: getUsernameSlug(name || previous.name || getNameFromInternalEmail(user.email)),
    authEmail: user.email,
    status: admin ? "active" : previous.status || "pending",
    role: admin ? "admin" : previous.role || "user",
    createdAt: previous.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...extra,
  };

  await setDoc(ref, profile, { merge: true });
  return { ...previous, ...profile };
}

function watchCurrentUserProfile(user) {
  stopCurrentUserProfileWatcher();
  const ref = getUserProfileRef(user.uid);
  currentProfileUnsubscribe = ref.onSnapshot((snapshot) => {
    if (!snapshot.exists) return;
    const profile = snapshot.data();
    currentUserProfile = profile;

    if (!isCurrentUserAdmin(user) && ["pending", "blocked", "removed"].includes(profile.status)) {
      const messages = {
        pending: "Sua conta ainda está aguardando aprovação do administrador.",
        blocked: "Sua conta foi bloqueada pelo administrador.",
        removed: "Sua conta foi removida pelo administrador.",
      };
      showToast(messages[profile.status] || "Conta sem liberação.");
      signOut(auth);
    }
  });
}

function stopCurrentUserProfileWatcher() {
  if (typeof currentProfileUnsubscribe === "function") {
    currentProfileUnsubscribe();
  }
  currentProfileUnsubscribe = null;
}

function updateAdminVisibility(canSeeAdmin = false) {
  if (elements.adminMenuLink) elements.adminMenuLink.hidden = !canSeeAdmin;
  if (elements.adminPanel) elements.adminPanel.hidden = !canSeeAdmin;
  if (canSeeAdmin) loadUserProfiles();
}

function openAdminTab() {
  if (!isCurrentUserAdmin()) {
    showToast("Apenas o master tata pode abrir a Administração.");
    return;
  }

  let adminWindow = null;
  try {
    adminWindow = window.open("admin.html", "financasAdministracao");
  } catch (error) {
    console.warn("Não foi possível abrir a aba de administração:", error);
  }

  if (adminWindow) {
    adminWindow.focus();
  } else {
    showToast("O navegador bloqueou a nova aba. Libere pop-ups ou abra admin.html manualmente.");
  }
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
    showToast("Apenas administrador pode criar contas.");
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

    await setDoc(
      getUserProfileRef(credential.user.uid),
      {
        uid: credential.user.uid,
        name,
        slug: getUsernameSlug(name),
        authEmail: email,
        status: "active",
        role: "user",
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
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

  elements.adminUsersList.querySelectorAll("[data-user-restore]").forEach((button) => {
    button.addEventListener("click", () => setUserAccountStatus(button.dataset.userRestore, "active"));
  });
}

function renderAdminUserCard(profile) {
  const isSelf = profile.uid === currentUser?.uid;
  const status = profile.status || "active";
  const role = profile.role || "user";
  const statusLabel = status === "pending" ? "Pendente" : status === "blocked" ? "Bloqueada" : status === "removed" ? "Removida" : "Liberada";
  const roleLabel = role === "admin" ? `<span class="status-pill status-admin">Admin</span>` : "";
  const safeUid = escapeHtml(profile.uid);
  const safeName = escapeHtml(profile.name || "Usuário sem nome");
  const safeEmail = escapeHtml(profile.authEmail || "");
  const safeStatusClass = escapeHtml(status);

  let actions = "";

  if (isSelf) {
    actions = `<span class="muted">Sua conta</span>`;
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
    showToast("Apenas administrador pode alterar contas.");
    return;
  }

  if (uid === currentUser?.uid) {
    showToast("Você não pode bloquear ou remover sua própria conta.");
    return;
  }

  const labels = {
    active: "aprovar/liberar",
    blocked: "bloquear",
    removed: "remover",
  };

  const confirmed = status === "active" ? true : confirm(`Deseja ${labels[status]} esta conta?`);
  if (!confirmed) return;

  try {
    await setDoc(
      getUserProfileRef(uid),
      {
        status,
        updatedAt: serverTimestamp(),
        updatedBy: currentUser.uid,
      },
      { merge: true }
    );

    await loadUserProfiles();
    showToast(status === "active" ? "Conta aprovada e liberada." : status === "blocked" ? "Conta bloqueada." : "Conta removida.");
  } catch (error) {
    console.error("Erro ao atualizar conta:", error);
    showToast("Não foi possível atualizar a conta. Confira as regras do Firestore.");
  }
}



async function deleteUserAccountData(uid) {
  if (!isCurrentUserAdmin()) {
    showToast("Apenas administrador pode excluir contas.");
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
      await setDoc(
        getRemovedUsernameRef(slug),
        {
          uid,
          name: profile?.name || "",
          slug,
          authEmail: profile?.authEmail || "",
          removedAt: serverTimestamp(),
          removedBy: currentUser.uid,
        },
        { merge: true }
      );
    }

    await deleteDoc(getUserDataRef(uid)).catch((error) => {
      console.warn("Dados financeiros já estavam ausentes ou não puderam ser apagados:", error);
    });

    await deleteDoc(getUserProfileRef(uid));

    await loadUserProfiles();
    showToast("Conta excluída do banco de dados. Para apagar também do Authentication, use o Console do Firebase ou Cloud Function.");
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    showToast("Não foi possível excluir. Confira as regras do Firestore.");
  }
}

function startApp() {
  const now = new Date();
  elements.monthFilter.value = formatMonth(now);
  elements.dateInput.value = formatDate(now);
  updateCategories();
  updateFixedAndGoalCategories();
  syncBudgetInput();
  bindEvents();
  render();
}

function bindEvents() {
  elements.monthFilter.addEventListener("change", () => {
    selectedTransactionIds.clear();
    syncBudgetInput();
    resetForm();
    render();
  });

  elements.typeInput.addEventListener("change", updateCategories);
  elements.installmentToggle.addEventListener("change", () => {
    elements.installmentFields.hidden = !elements.installmentToggle.checked;
  });

  elements.searchInput.addEventListener("input", () => {
    selectedTransactionIds.clear();
    renderTransactions();
  });

  elements.typeFilter.addEventListener("change", () => {
    selectedTransactionIds.clear();
    renderTransactions();
  });

  if (elements.paymentFilter) {
    elements.paymentFilter.addEventListener("change", () => {
      selectedTransactionIds.clear();
      renderTransactions();
    });
  }

  elements.cancelEditButton.addEventListener("click", resetForm);
  elements.selectAllTransactions.addEventListener("change", toggleSelectAllTransactions);
  elements.bulkDeleteButton.addEventListener("click", deleteSelectedTransactions);

  elements.transactionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveTransaction();
  });

  elements.budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveBudget();
  });

  elements.fixedExpenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveFixedExpense();
  });

  elements.goalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCategoryGoal();
  });

  if (elements.adminCreateUserForm) {
    elements.adminCreateUserForm.addEventListener("submit", createUserFromAdmin);
  }

  if (elements.refreshUsersButton) {
    elements.refreshUsersButton.addEventListener("click", loadUserProfiles);
  }

  if (elements.adminMenuLink) {
    elements.adminMenuLink.addEventListener("click", (event) => {
      event.preventDefault();
      openAdminTab();
    });
  }

  bindViewNavigation();
}

function bindViewNavigation() {
  document.querySelectorAll(".menu [data-view]").forEach((link) => {
    if (link.dataset.navigationBound === "true") return;
    link.dataset.navigationBound = "true";
    link.addEventListener("click", (event) => {
      const view = link.dataset.view;
      if (!appViews[view]) return;
      event.preventDefault();
      const targetId = link.dataset.scrollTarget || appViews[view].defaultTarget;
      setActiveView(view, targetId, true);
    });
  });

  window.addEventListener("hashchange", () => {
    const { view, targetId } = getViewFromHash();
    setActiveView(view, targetId, false);
  });

  const { view, targetId } = getViewFromHash();
  setActiveView(view, targetId, false);
}

function getViewFromHash() {
  const hash = window.location.hash.replace("#", "");
  const target = hash ? document.getElementById(hash) : null;
  const view = target?.dataset?.view || target?.closest("[data-view]")?.dataset?.view || "inicio";
  return {
    view: appViews[view] ? view : "inicio",
    targetId: target ? hash : appViews[appViews[view] ? view : "inicio"].defaultTarget,
  };
}

function setActiveView(view = "inicio", targetId = "", updateHash = false) {
  if (!appViews[view]) view = "inicio";
  currentView = view;
  document.body.dataset.currentView = view;

  document.querySelectorAll(".app-section[data-view]").forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });

  document.querySelectorAll(".mixed-tab-section").forEach((section) => {
    const views = String(section.dataset.views || "").split(/\s+/).filter(Boolean);
    const shouldShowSection = views.includes(view);
    section.hidden = !shouldShowSection;

    if (!shouldShowSection) return;

    const visibleItems = [];
    section.querySelectorAll("[data-tab-item]").forEach((item) => {
      const shouldShowItem = item.dataset.view === view;
      item.hidden = !shouldShowItem;
      if (shouldShowItem) visibleItems.push(item);
    });

    section.classList.toggle("single-tab-item", visibleItems.length <= 1);
  });

  document.querySelectorAll(".menu-link[data-main-nav], .menu-sublink[data-main-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === view);
  });

  if (elements.appPageTitle) elements.appPageTitle.textContent = appViews[view].title;

  const nextTargetId = targetId || appViews[view].defaultTarget;
  if (updateHash && nextTargetId) {
    history.replaceState(null, "", `#${nextTargetId}`);
  }

  if (nextTargetId) {
    requestAnimationFrame(() => {
      const target = document.getElementById(nextTargetId);
      if (target && !target.hidden) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}

function persistTransactions() {
  queueSaveData();
}

function persistBudgets() {
  queueSaveData();
}

function persistFixedExpenses() {
  queueSaveData();
}

function persistCategoryGoals() {
  queueSaveData();
}

function saveTransaction() {
  const amount = Number(elements.amountInput.value);
  const title = elements.titleInput.value.trim();
  const category = elements.categoryInput.value;
  const date = elements.dateInput.value;
  const type = elements.typeInput.value;
  const note = elements.noteInput.value.trim();
  const editingId = elements.editingId.value;

  if (!title || !category || !date || !amount || amount <= 0) {
    showToast("Preencha descrição, categoria, valor e data corretamente.");
    return;
  }

  if (!editingId && type === "expense" && elements.installmentToggle.checked) {
    const totalInstallments = Math.max(2, Math.min(60, Number(elements.installmentsInput.value) || 2));
    const installmentValue = elements.installmentAmountMode.value === "total" ? amount / totalInstallments : amount;
    const groupId = createId();
    const items = [];

    for (let index = 0; index < totalInstallments; index += 1) {
      const installmentDate = addMonthsToDate(date, index);
      items.push({
        id: createId(),
        type: "expense",
        title: `${title} (${index + 1}/${totalInstallments})`,
        category,
        amount: Number(installmentValue.toFixed(2)),
        date: installmentDate,
        note: note || `Compra parcelada no cartão · grupo ${groupId.slice(0, 8)}`,
        paid: false,
        paidAt: null,
        installmentGroupId: groupId,
        installmentNumber: index + 1,
        totalInstallments,
      });
    }

    transactions = [...items, ...transactions];
    persistTransactions();
    resetForm();
    render();
    showToast(`${totalInstallments} parcelas criadas com sucesso.`);
    return;
  }

  const previousItem = editingId ? transactions.find((item) => item.id === editingId) || {} : {};
  const payload = {
    id: editingId || createId(),
    type,
    title,
    category,
    amount,
    date,
    note,
    paid: type === "expense" ? previousItem.paid === true : true,
    paidAt: type === "expense" ? previousItem.paidAt || null : null,
  };

  if (editingId) {
    const previous = transactions.find((item) => item.id === editingId) || {};
    transactions = transactions.map((item) => (item.id === editingId ? { ...previous, ...payload } : item));
    showToast("Lançamento atualizado com sucesso.");
  } else {
    transactions = [payload, ...transactions];
    showToast("Lançamento salvo com sucesso.");
  }

  selectedTransactionIds.delete(payload.id);
  persistTransactions();
  resetForm();
  render();
}

function saveBudget() {
  const month = elements.monthFilter.value;
  const budget = Number(elements.budgetInput.value) || 0;
  budgets[month] = Math.max(0, budget);
  persistBudgets();
  render();
  showToast("Limite mensal atualizado.");
}

function editTransaction(id) {
  const item = transactions.find((transaction) => transaction.id === id);
  if (!item) return;

  elements.editingId.value = item.id;
  elements.typeInput.value = item.type;
  updateCategories();
  elements.titleInput.value = item.title;
  elements.categoryInput.value = item.category;
  elements.amountInput.value = item.amount;
  elements.dateInput.value = item.date;
  elements.noteInput.value = item.note || "";
  elements.formTitle.textContent = "Editar lançamento";
  elements.submitButton.textContent = "Atualizar lançamento";
  elements.cancelEditButton.hidden = false;
  document.querySelector("#lancamentos").scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteTransaction(id) {
  const item = transactions.find((transaction) => transaction.id === id);
  if (!item) return;

  const shouldDelete = confirm(`Excluir "${item.title}"?`);
  if (!shouldDelete) return;

  if (elements.editingId.value === id) resetForm();

  transactions = transactions.filter((transaction) => transaction.id !== id);
  selectedTransactionIds.delete(id);
  persistTransactions();
  render();
  showToast("Lançamento excluído.");
}

function deleteSelectedTransactions() {
  const selectedIds = Array.from(selectedTransactionIds).filter((id) => transactions.some((item) => item.id === id));

  if (!selectedIds.length) {
    showToast("Selecione pelo menos um lançamento para excluir.");
    return;
  }

  const label = selectedIds.length === 1 ? "1 lançamento selecionado" : `${selectedIds.length} lançamentos selecionados`;
  const shouldDelete = confirm(`Excluir ${label}?`);
  if (!shouldDelete) return;

  if (selectedIds.includes(elements.editingId.value)) resetForm();

  const selectedIdSet = new Set(selectedIds);
  transactions = transactions.filter((transaction) => !selectedIdSet.has(transaction.id));
  selectedTransactionIds.clear();
  persistTransactions();
  render();
  showToast(selectedIds.length === 1 ? "Lançamento selecionado excluído." : "Lançamentos selecionados excluídos.");
}

function saveFixedExpense() {
  const title = elements.fixedTitleInput.value.trim();
  const category = elements.fixedCategoryInput.value;
  const amount = Number(elements.fixedAmountInput.value);
  const day = Math.max(1, Math.min(31, Number(elements.fixedDayInput.value) || 1));
  const editingId = elements.fixedEditingId.value;

  if (!title || !category || !amount || amount <= 0) {
    showToast("Preencha a despesa fixa corretamente.");
    return;
  }

  const payload = { id: editingId || createId(), title, category, amount, day };
  fixedExpenses = editingId ? fixedExpenses.map((item) => (item.id === editingId ? payload : item)) : [payload, ...fixedExpenses];
  persistFixedExpenses();
  resetFixedExpenseForm();
  generateFixedExpensesForMonth(elements.monthFilter.value);
  render();
  showToast(editingId ? "Despesa fixa atualizada." : "Despesa fixa salva e lançada no mês.");
}

function editFixedExpense(id) {
  const item = fixedExpenses.find((expense) => expense.id === id);
  if (!item) return;
  elements.fixedEditingId.value = item.id;
  elements.fixedTitleInput.value = item.title;
  elements.fixedCategoryInput.value = item.category;
  elements.fixedAmountInput.value = item.amount;
  elements.fixedDayInput.value = item.day;
  elements.fixedSubmitButton.textContent = "Atualizar despesa fixa";
}

function deleteFixedExpense(id) {
  const item = fixedExpenses.find((expense) => expense.id === id);
  if (!item) return;
  if (!confirm(`Remover a despesa fixa "${item.title}"? Os lançamentos já criados não serão apagados.`)) return;
  fixedExpenses = fixedExpenses.filter((expense) => expense.id !== id);
  persistFixedExpenses();
  renderFixedExpenses();
  showToast("Despesa fixa removida.");
}

function resetFixedExpenseForm() {
  elements.fixedExpenseForm.reset();
  elements.fixedEditingId.value = "";
  elements.fixedSubmitButton.textContent = "Salvar despesa fixa";
}

function saveCategoryGoal() {
  const month = elements.monthFilter.value;
  const category = elements.goalCategoryInput.value;
  const amount = Number(elements.goalAmountInput.value) || 0;
  categoryGoals[month] = categoryGoals[month] || {};

  if (amount <= 0) {
    delete categoryGoals[month][category];
    showToast("Meta da categoria removida.");
  } else {
    categoryGoals[month][category] = amount;
    showToast("Meta da categoria salva.");
  }

  persistCategoryGoals();
  elements.goalAmountInput.value = "";
  render();
}

function deleteCategoryGoal(category) {
  const month = elements.monthFilter.value;
  if (categoryGoals[month]) delete categoryGoals[month][category];
  persistCategoryGoals();
  render();
  showToast("Meta removida.");
}

function generateFixedExpensesForMonth(month) {
  if (!month) return;
  let created = 0;
  fixedExpenses.forEach((fixed) => {
    const exists = transactions.some((item) => item.fixedExpenseId === fixed.id && item.date?.startsWith(month));
    if (exists) return;
    const date = buildMonthDate(month, fixed.day);
    transactions.unshift({
      id: createId(),
      type: "expense",
      title: fixed.title,
      category: fixed.category,
      amount: fixed.amount,
      date,
      note: "Despesa fixa automática",
      paid: false,
      paidAt: null,
      fixedExpenseId: fixed.id,
    });
    created += 1;
  });
  if (created) persistTransactions();
}

function resetForm() {
  elements.editingId.value = "";
  elements.transactionForm.reset();
  elements.typeInput.value = "income";
  updateCategories();
  elements.dateInput.value = formatDate(new Date());
  elements.formTitle.textContent = "Adicionar lançamento";
  elements.submitButton.textContent = "Salvar lançamento";
  elements.cancelEditButton.hidden = true;
  elements.installmentToggle.checked = false;
  elements.installmentFields.hidden = true;
  elements.installmentsInput.value = "2";
  elements.installmentAmountMode.value = "installment";
}

function updateCategories() {
  const categories = elements.typeInput.value === "income" ? incomeCategories : expenseCategories;
  elements.categoryInput.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
}

function updateFixedAndGoalCategories() {
  const options = expenseCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
  elements.fixedCategoryInput.innerHTML = options;
  elements.goalCategoryInput.innerHTML = options;
}

function syncBudgetInput() {
  const currentBudget = budgets[elements.monthFilter.value] || 0;
  elements.budgetInput.value = currentBudget ? String(currentBudget) : "";
}

function render() {
  generateFixedExpensesForMonth(elements.monthFilter.value);
  const monthlyTransactions = getMonthlyTransactions();
  const totals = getTotals(monthlyTransactions);
  const currentBudget = budgets[elements.monthFilter.value] || 0;

  renderSummary(totals, currentBudget);
  renderTodayPlan(monthlyTransactions, totals, currentBudget);
  renderMonthForecast(monthlyTransactions, totals, currentBudget);
  renderMonthVillains(monthlyTransactions, totals, currentBudget);
  renderBudget(totals, currentBudget);
  renderCategoryReport(monthlyTransactions, totals.expense);
  renderPaymentCenter(monthlyTransactions);
  renderInsights(monthlyTransactions, totals, currentBudget);
  renderFixedExpenses();
  renderCategoryGoals(monthlyTransactions);
  renderTransactions();
}

function renderSummary(totals, budget) {
  const balance = totals.income - totals.expense;
  const remainingBudget = budget > 0 ? budget - totals.expense : balance;
  const daysLeft = getDaysLeftInSelectedMonth();
  const daily = daysLeft > 0 ? remainingBudget / daysLeft : remainingBudget;

  elements.incomeValue.textContent = formatCurrency(totals.income);
  elements.expenseValue.textContent = formatCurrency(totals.expense);
  elements.balanceValue.textContent = formatCurrency(balance);
  elements.dailyValue.textContent = formatCurrency(Math.max(0, daily));
  elements.sidebarBudget.textContent = formatCurrency(budget);

  elements.balanceHint.textContent = balance >= 0 ? "Você fechou positivo até agora" : "Atenção: despesas acima das receitas";
  elements.dailyHint.textContent = budget > 0 ? `${daysLeft} dia(s) restantes no mês` : "Defina limite para calcular melhor";
}


function renderTodayPlan(monthlyTransactions, totals, budget) {
  if (!elements.todayPlanList) return;

  const expenses = monthlyTransactions.filter((item) => item.type === "expense");
  const pending = expenses.filter((item) => !isTransactionPaid(item));
  const overdue = pending.filter((item) => isTransactionOverdue(item)).sort(sortByDateAsc);
  const dueSoon = pending
    .filter((item) => !isTransactionOverdue(item) && getDaysUntil(item.date) >= 0 && getDaysUntil(item.date) <= 5)
    .sort(sortByDateAsc);
  const balance = totals.income - totals.expense;
  const remainingBudget = budget > 0 ? budget - totals.expense : balance;
  const daysLeft = getDaysLeftInSelectedMonth();
  const dailyLimit = daysLeft > 0 ? Math.max(0, remainingBudget / daysLeft) : Math.max(0, remainingBudget);
  const topCategory = getTopExpenseCategory(expenses);
  const goalAlerts = getCategoryGoalAlerts(monthlyTransactions);
  const score = calculateFinancialHealthScore({ totals, budget, balance, expenses, pending, overdue, dueSoon, goalAlerts });
  const action = getBestTodayAction({ totals, budget, remainingBudget, dailyLimit, topCategory, goalAlerts, overdue, dueSoon, pending });
  const planItems = buildTodayPlanItems({ totals, budget, remainingBudget, dailyLimit, topCategory, goalAlerts, overdue, dueSoon, pending, daysLeft });

  if (elements.todayPlanMonthLabel) elements.todayPlanMonthLabel.textContent = formatMonthLabel(elements.monthFilter.value);
  if (elements.todayPlanMainAction) elements.todayPlanMainAction.textContent = action.title;
  if (elements.todayPlanMainDetail) elements.todayPlanMainDetail.textContent = action.detail;
  if (elements.todayPlanScore) elements.todayPlanScore.textContent = String(score);
  if (elements.todayPlanScoreLabel) elements.todayPlanScoreLabel.textContent = getFinancialHealthLabel(score);
  if (elements.todayPlanScoreBar) {
    elements.todayPlanScoreBar.style.width = `${score}%`;
    elements.todayPlanScoreBar.className = `score-bar ${getFinancialHealthClass(score)}`;
  }

  elements.todayPlanList.innerHTML = planItems
    .map(
      (item) => `
        <article class="today-plan-item ${escapeHtml(item.type)}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <small>${escapeHtml(item.detail)}</small>
        </article>
      `
    )
    .join("");
}

function getBestTodayAction({ totals, budget, remainingBudget, dailyLimit, topCategory, goalAlerts, overdue, dueSoon, pending }) {
  if (totals.income === 0 && totals.expense === 0 && budget <= 0) {
    return {
      title: "Defina seu limite mensal e registre a primeira movimentacao.",
      detail: "Com esses dois dados, o app passa a calcular seu plano diario automaticamente.",
    };
  }

  if (overdue.length) {
    const total = overdue.reduce((sum, item) => sum + item.amount, 0);
    return {
      title: `Resolva ${overdue.length} conta(s) atrasada(s) hoje.`,
      detail: `Prioridade maxima: ${formatCurrency(total)} em pendencias vencidas. Pague, renegocie ou marque como pago se ja quitou.`,
    };
  }

  if (goalAlerts.length) {
    const first = goalAlerts[0];
    return {
      title: `Controle a categoria ${first.category} agora.`,
      detail: `Ela passou ${formatCurrency(first.over)} da meta. Evite novos gastos nessa categoria ate revisar o mes.`,
    };
  }

  if (budget > 0 && remainingBudget < 0) {
    return {
      title: "Congele gastos variaveis ate reorganizar o mes.",
      detail: `Seu limite foi ultrapassado em ${formatCurrency(Math.abs(remainingBudget))}. Foque apenas no essencial ate ajustar o plano.`,
    };
  }

  if (dueSoon.length) {
    const total = dueSoon.reduce((sum, item) => sum + item.amount, 0);
    return {
      title: `Separe ${formatCurrency(total)} para contas a vencer.`,
      detail: `${dueSoon.length} conta(s) vencem nos proximos 5 dias. Organize o pagamento antes que virem atraso.`,
    };
  }

  if (budget > 0) {
    return {
      title: `Mantenha o teto diario de ${formatCurrency(dailyLimit)}.`,
      detail: topCategory ? `A categoria que mais pesa agora e ${topCategory.category}. Use esse dado para decidir onde cortar primeiro.` : "Seu mes esta sob controle. Continue registrando tudo para manter a previsao correta.",
    };
  }

  if (pending.length) {
    return {
      title: "Revise suas contas pendentes antes de gastar mais.",
      detail: `${pending.length} despesa(s) ainda nao foram marcadas como pagas neste mes.`,
    };
  }

  return {
    title: "Continue registrando tudo e acompanhe o saldo diariamente.",
    detail: "Seu controle melhora quando receitas, despesas fixas e parcelas ficam sempre atualizadas.",
  };
}

function buildTodayPlanItems({ totals, budget, remainingBudget, dailyLimit, topCategory, goalAlerts, overdue, dueSoon, pending, daysLeft }) {
  const items = [];

  items.push({
    type: budget > 0 && remainingBudget < 0 ? "danger" : "success",
    label: "Disponivel por dia",
    value: formatCurrency(dailyLimit),
    detail: budget > 0 ? `${daysLeft} dia(s) restantes no mes.` : "Defina um limite mensal para melhorar esta previsao.",
  });

  items.push({
    type: overdue.length ? "danger" : dueSoon.length ? "warning" : "success",
    label: "Pagamentos",
    value: overdue.length ? `${overdue.length} atrasada(s)` : dueSoon.length ? `${dueSoon.length} a vencer` : "Sem alerta grave",
    detail: pending.length ? `${pending.length} despesa(s) pendente(s) no mes.` : "Todas as despesas do mes estao marcadas como pagas.",
  });

  items.push({
    type: goalAlerts.length ? "danger" : topCategory ? "neutral" : "success",
    label: "Categoria critica",
    value: goalAlerts.length ? goalAlerts[0].category : topCategory ? topCategory.category : "Sem gastos",
    detail: goalAlerts.length
      ? `Acima da meta em ${formatCurrency(goalAlerts[0].over)}.`
      : topCategory
        ? `${formatCurrency(topCategory.value)} concentrados nesta categoria.`
        : "Ainda nao ha despesas no mes selecionado.",
  });

  items.push({
    type: totals.income - totals.expense < 0 ? "danger" : "success",
    label: "Resultado do mes",
    value: formatCurrency(totals.income - totals.expense),
    detail: budget > 0 ? `${formatCurrency(Math.max(0, remainingBudget))} ainda dentro do limite.` : "Receitas menos despesas registradas.",
  });

  return items;
}

function calculateFinancialHealthScore({ totals, budget, balance, expenses, pending, overdue, dueSoon, goalAlerts }) {
  if (totals.income === 0 && totals.expense === 0 && budget <= 0) return 0;

  let score = 100;

  if (budget > 0) {
    const usage = totals.expense / budget;
    if (usage >= 1) score -= Math.min(40, 20 + (usage - 1) * 40);
    else if (usage >= 0.85) score -= 12;
    else if (usage >= 0.7) score -= 6;
  } else if (expenses.length) {
    score -= 8;
  }

  if (balance < 0) score -= 20;
  score -= Math.min(24, overdue.length * 8);
  score -= Math.min(12, dueSoon.length * 3);
  score -= Math.min(24, goalAlerts.length * 8);
  if (pending.length === 0 && expenses.length) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function getCategoryGoalAlerts(monthlyTransactions) {
  const month = elements.monthFilter.value;
  const goals = categoryGoals[month] || {};
  const spentByCategory = monthlyTransactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

  return Object.entries(goals)
    .map(([category, goal]) => {
      const spent = spentByCategory[category] || 0;
      return { category, goal, spent, over: spent - goal };
    })
    .filter((item) => item.goal > 0 && item.over > 0)
    .sort((a, b) => b.over - a.over);
}

function getFinancialHealthLabel(score) {
  if (score >= 85) return "Mes saudavel";
  if (score >= 70) return "Atencao leve";
  if (score >= 45) return "Risco moderado";
  if (score > 0) return "Alerta vermelho";
  return "Sem dados suficientes";
}

function getFinancialHealthClass(score) {
  if (score >= 85) return "good";
  if (score >= 70) return "attention";
  if (score >= 45) return "risk";
  return "danger";
}

function renderMonthForecast(monthlyTransactions, totals, budget) {
  if (!elements.forecastScenarioList) return;

  const expenses = monthlyTransactions.filter((item) => item.type === "expense");
  const monthInfo = getSelectedMonthProgress();
  const currentMonth = elements.monthFilter.value;
  const expenseSoFar = totals.expense;
  const incomeSoFar = totals.income;
  const elapsedDays = Math.max(1, monthInfo.elapsedDays);
  const remainingDays = Math.max(0, monthInfo.remainingDays);
  const currentPace = expenseSoFar > 0 ? expenseSoFar / elapsedDays : 0;
  const projectedExpense = monthInfo.isFutureMonth
    ? expenseSoFar
    : monthInfo.isPastMonth
      ? expenseSoFar
      : Math.max(expenseSoFar, currentPace * monthInfo.daysInMonth);
  const projectedBalance = incomeSoFar - projectedExpense;
  const budgetProjection = budget > 0 ? budget - projectedExpense : null;
  const recommendedDaily = remainingDays > 0
    ? Math.max(0, (budget > 0 ? budget - expenseSoFar : incomeSoFar - expenseSoFar) / remainingDays)
    : 0;
  const projectedDailyLimit = remainingDays > 0 ? Math.max(0, (incomeSoFar - expenseSoFar) / remainingDays) : 0;
  const status = getForecastStatus({ budget, budgetProjection, projectedBalance, monthInfo });
  const scenarios = buildForecastScenarios({
    budget,
    budgetProjection,
    projectedBalance,
    projectedExpense,
    currentPace,
    recommendedDaily,
    projectedDailyLimit,
    remainingDays,
    monthInfo,
    currentMonth,
  });

  if (elements.forecastMonthLabel) elements.forecastMonthLabel.textContent = formatMonthLabel(currentMonth);
  if (elements.forecastStatus) elements.forecastStatus.textContent = status.label;
  if (elements.forecastProjectedBalance) elements.forecastProjectedBalance.textContent = formatCurrency(projectedBalance);
  if (elements.forecastCurrentPace) elements.forecastCurrentPace.textContent = `${formatCurrency(currentPace)}/dia`;
  if (elements.forecastRecommendedDaily) elements.forecastRecommendedDaily.textContent = `${formatCurrency(recommendedDaily)}/dia`;
  if (elements.forecastAlert) elements.forecastAlert.textContent = status.detail;
  if (elements.forecastProjectedBalance) {
    elements.forecastProjectedBalance.className = projectedBalance < 0 ? "forecast-negative" : "forecast-positive";
  }

  elements.forecastScenarioList.innerHTML = scenarios
    .map(
      (item) => `
        <article class="forecast-scenario ${escapeHtml(item.type)}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <small>${escapeHtml(item.detail)}</small>
        </article>
      `
    )
    .join("");
}

function buildForecastScenarios({ budget, budgetProjection, projectedBalance, projectedExpense, currentPace, recommendedDaily, projectedDailyLimit, remainingDays, monthInfo }) {
  if (monthInfo.isFutureMonth && projectedExpense === 0) {
    return [
      {
        type: "neutral",
        label: "Mês futuro",
        value: "Sem ritmo ainda",
        detail: "Quando o mês começar, o app passa a calcular a previsão pelo ritmo real de gastos.",
      },
      {
        type: budget > 0 ? "success" : "warning",
        label: "Limite planejado",
        value: budget > 0 ? formatCurrency(budget) : "Não definido",
        detail: budget > 0 ? "Esse será o teto de gastos usado na previsão." : "Defina um limite para ter uma recomendação diária.",
      },
      {
        type: "neutral",
        label: "Recomendação",
        value: "Planejar fixas",
        detail: "Cadastre despesas fixas antes do mês virar para melhorar a previsão desde o primeiro dia.",
      },
    ];
  }

  const scenarios = [
    {
      type: projectedBalance < 0 ? "danger" : "success",
      label: "Cenário atual",
      value: projectedBalance < 0 ? `${formatCurrency(Math.abs(projectedBalance))} negativo` : `${formatCurrency(projectedBalance)} positivo`,
      detail: `Mantendo o ritmo de ${formatCurrency(currentPace)}/dia, esta é a tendência de fechamento.`,
    },
  ];

  if (budget > 0) {
    scenarios.push({
      type: budgetProjection < 0 ? "danger" : budgetProjection < budget * 0.15 ? "warning" : "success",
      label: "Limite do mês",
      value: budgetProjection < 0 ? `${formatCurrency(Math.abs(budgetProjection))} acima` : `${formatCurrency(budgetProjection)} de folga`,
      detail: budgetProjection < 0 ? "O ritmo atual indica estouro do limite mensal." : "Previsão de quanto deve sobrar dentro do limite.",
    });
  } else {
    scenarios.push({
      type: "warning",
      label: "Limite do mês",
      value: "Não definido",
      detail: "Defina um limite mensal para o app prever estouro ou sobra do orçamento.",
    });
  }

  scenarios.push({
    type: recommendedDaily <= 0 ? "danger" : recommendedDaily < currentPace ? "warning" : "success",
    label: "Cenário recomendado",
    value: remainingDays > 0 ? `${formatCurrency(recommendedDaily)}/dia` : "Mês encerrado",
    detail: remainingDays > 0
      ? budget > 0
        ? "Teto diário sugerido para terminar dentro do limite."
        : `Sem limite definido, use ${formatCurrency(projectedDailyLimit)}/dia como referência para não fechar negativo.`
      : "Não há dias restantes no mês selecionado.",
  });

  return scenarios;
}

function getForecastStatus({ budget, budgetProjection, projectedBalance, monthInfo }) {
  if (monthInfo.isFutureMonth) {
    return {
      label: "Previsão aguardando início do mês",
      detail: "O mês selecionado ainda não começou. Cadastre despesas fixas e limite para preparar a previsão.",
    };
  }

  if (budget > 0 && budgetProjection < 0) {
    return {
      label: "Alerta de estouro do limite",
      detail: `Se continuar nesse ritmo, você deve ultrapassar o limite em ${formatCurrency(Math.abs(budgetProjection))}.`,
    };
  }

  if (projectedBalance < 0) {
    return {
      label: "Alerta de fechamento negativo",
      detail: `A tendência atual indica fechar o mês ${formatCurrency(Math.abs(projectedBalance))} negativo.`,
    };
  }

  if (budget > 0) {
    return {
      label: "Tendência sob controle",
      detail: `Mantendo esse ritmo, a previsão é fechar dentro do limite com ${formatCurrency(Math.max(0, budgetProjection))} de folga.`,
    };
  }

  return {
    label: "Tendência positiva",
    detail: "Há saldo projetado positivo, mas definir um limite mensal deixará a previsão mais precisa.",
  };
}

function getSelectedMonthProgress() {
  const [year, monthNumber] = String(elements.monthFilter.value || formatMonth(new Date())).split("-").map(Number);
  const today = new Date();
  const monthIndex = monthNumber - 1;
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  const selectedStart = new Date(year, monthIndex, 1);
  const selectedEnd = new Date(year, monthIndex, daysInMonth);
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === monthIndex;
  const isPastMonth = selectedEnd < todayStart;
  const isFutureMonth = selectedStart > todayStart;

  let elapsedDays = daysInMonth;
  let remainingDays = 0;

  if (isCurrentMonth) {
    elapsedDays = Math.max(1, today.getDate());
    remainingDays = Math.max(1, daysInMonth - today.getDate() + 1);
  } else if (isFutureMonth) {
    elapsedDays = 0;
    remainingDays = daysInMonth;
  }

  return { year, monthNumber, daysInMonth, elapsedDays, remainingDays, isCurrentMonth, isPastMonth, isFutureMonth };
}


function renderMonthVillains(monthlyTransactions, totals, budget) {
  if (!elements.villainsList) return;

  const expenses = monthlyTransactions.filter((item) => item.type === "expense");
  const pending = expenses.filter((item) => !isTransactionPaid(item));
  const overdue = pending.filter((item) => isTransactionOverdue(item)).sort(sortByDateAsc);
  const dueSoon = pending
    .filter((item) => !isTransactionOverdue(item) && getDaysUntil(item.date) >= 0 && getDaysUntil(item.date) <= 5)
    .sort(sortByDateAsc);
  const biggestExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0] || null;
  const topCategory = getTopExpenseCategory(expenses);
  const goalAlerts = getCategoryGoalAlerts(monthlyTransactions);
  const heaviestFixed = getHeaviestFixedExpense(monthlyTransactions);
  const urgentBill = overdue[0] || dueSoon[0] || pending.sort(sortByDateAsc)[0] || null;
  const installmentImpact = getMostRelevantInstallmentImpact(elements.monthFilter.value);
  const villains = buildMonthVillainCards({
    biggestExpense,
    topCategory,
    goalAlerts,
    heaviestFixed,
    urgentBill,
    installmentImpact,
    totals,
    budget,
  });

  if (elements.villainsMonthLabel) elements.villainsMonthLabel.textContent = formatMonthLabel(elements.monthFilter.value);

  elements.villainsList.innerHTML = villains
    .map(
      (item) => `
        <article class="villain-card ${escapeHtml(item.type)}">
          <div class="villain-icon" aria-hidden="true">${escapeHtml(item.icon)}</div>
          <div class="villain-content">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <small>${escapeHtml(item.detail)}</small>
          </div>
        </article>
      `
    )
    .join("");
}

function buildMonthVillainCards({ biggestExpense, topCategory, goalAlerts, heaviestFixed, urgentBill, installmentImpact, totals, budget }) {
  const totalExpense = totals.expense || 0;
  const topCategoryPercent = topCategory && totalExpense > 0 ? Math.round((topCategory.value / totalExpense) * 100) : 0;
  const categoryAlert = topCategory ? goalAlerts.find((item) => item.category === topCategory.category) : null;

  return [
    biggestExpense
      ? {
          type: getBigExpenseImpactClass(biggestExpense.amount, totals, budget),
          icon: "!",
          label: "Maior gasto individual",
          value: `${biggestExpense.title} · ${formatCurrency(biggestExpense.amount)}`,
          detail: `${escapeDateLabel(biggestExpense.date)} em ${biggestExpense.category}. Revise se foi essencial ou recorrente.`,
        }
      : {
          type: "neutral",
          icon: "-",
          label: "Maior gasto individual",
          value: "Sem gastos no mês",
          detail: "Assim que houver despesas, o app destaca o maior impacto individual.",
        },
    topCategory
      ? {
          type: categoryAlert ? "danger" : topCategoryPercent >= 45 ? "warning" : "neutral",
          icon: "%",
          label: "Categoria que mais pesou",
          value: `${topCategory.category} · ${formatCurrency(topCategory.value)}`,
          detail: categoryAlert
            ? `${topCategoryPercent}% dos gastos e ${formatCurrency(categoryAlert.over)} acima da meta.`
            : `${topCategoryPercent}% de todas as despesas do mês. É o primeiro lugar para procurar economia.`,
        }
      : {
          type: "neutral",
          icon: "%",
          label: "Categoria que mais pesou",
          value: "Sem categoria crítica",
          detail: "Registre despesas para identificar onde o dinheiro está concentrado.",
        },
    heaviestFixed
      ? {
          type: budget > 0 && heaviestFixed.amount > budget * 0.3 ? "warning" : "neutral",
          icon: "F",
          label: "Despesa fixa mais pesada",
          value: `${heaviestFixed.title} · ${formatCurrency(heaviestFixed.amount)}`,
          detail: heaviestFixed.detail,
        }
      : {
          type: "neutral",
          icon: "F",
          label: "Despesa fixa mais pesada",
          value: "Nenhuma fixa cadastrada",
          detail: "Cadastre aluguel, internet, escola e outras fixas para melhorar a previsão.",
        },
    urgentBill
      ? {
          type: isTransactionOverdue(urgentBill) ? "danger" : getDaysUntil(urgentBill.date) <= 5 ? "warning" : "neutral",
          icon: "R$",
          label: "Conta mais urgente",
          value: `${urgentBill.title} · ${formatCurrency(urgentBill.amount)}`,
          detail: `${getPaymentTimingLabel(urgentBill)}. Marque como paga, pague ou renegocie para limpar a pendência.`,
        }
      : {
          type: "success",
          icon: "✓",
          label: "Conta mais urgente",
          value: "Sem pendência urgente",
          detail: "Não há despesas pendentes relevantes no mês selecionado.",
        },
    installmentImpact
      ? {
          type: installmentImpact.remainingAmount > Math.max(1, totalExpense) * 0.35 ? "warning" : "neutral",
          icon: "P",
          label: "Parcela que mais compromete",
          value: `${installmentImpact.title} · ${formatCurrency(installmentImpact.remainingAmount)}`,
          detail: `Faltam ${installmentImpact.remainingCount} parcela(s). Próxima: ${installmentImpact.nextDateLabel}.`,
        }
      : {
          type: "neutral",
          icon: "P",
          label: "Parcela que mais compromete",
          value: "Sem parcelas futuras",
          detail: "Compras parceladas aparecerão aqui quando houver valores pendentes.",
        },
  ];
}

function getBigExpenseImpactClass(amount, totals, budget) {
  if (budget > 0 && amount >= budget * 0.25) return "danger";
  if (totals.expense > 0 && amount >= totals.expense * 0.35) return "warning";
  return "neutral";
}

function getHeaviestFixedExpense(monthlyTransactions) {
  const fixedFromCatalog = [...fixedExpenses].sort((a, b) => b.amount - a.amount)[0];
  if (fixedFromCatalog) {
    return {
      title: fixedFromCatalog.title,
      amount: fixedFromCatalog.amount,
      detail: `${fixedFromCatalog.category} · todo dia ${fixedFromCatalog.day}. Compare se ainda cabe no padrão de vida atual.`,
    };
  }

  const fixedFromTransactions = monthlyTransactions
    .filter((item) => item.type === "expense" && item.fixedExpenseId)
    .sort((a, b) => b.amount - a.amount)[0];

  if (!fixedFromTransactions) return null;

  return {
    title: fixedFromTransactions.title,
    amount: fixedFromTransactions.amount,
    detail: `${fixedFromTransactions.category} · lançamento fixo automático em ${escapeDateLabel(fixedFromTransactions.date)}.`,
  };
}

function getMostRelevantInstallmentImpact(month) {
  const monthStart = `${month}-01`;
  const grouped = transactions
    .filter((item) => item.type === "expense" && item.installmentGroupId)
    .reduce((acc, item) => {
      const key = item.installmentGroupId;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

  const groups = Object.values(grouped)
    .map((items) => {
      const pendingItems = items
        .filter((item) => String(item.date || "") >= monthStart && !isTransactionPaid(item))
        .sort(sortByDateAsc);
      if (!pendingItems.length) return null;
      const remainingAmount = pendingItems.reduce((sum, item) => sum + item.amount, 0);
      const first = pendingItems[0];
      return {
        title: getInstallmentBaseTitle(first.title),
        remainingAmount,
        remainingCount: pendingItems.length,
        nextDateLabel: escapeDateLabel(first.date),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.remainingAmount - a.remainingAmount);

  return groups[0] || null;
}

function getInstallmentBaseTitle(title) {
  return String(title || "Compra parcelada")
    .replace(/\s*\(\d+\/\d+\)\s*$/g, "")
    .trim() || "Compra parcelada";
}

function escapeDateLabel(dateValue) {
  return dateValue ? formatDisplayDate(dateValue) : "sem data";
}

function renderBudget(totals, budget) {
  const percent = budget > 0 ? Math.round((totals.expense / budget) * 100) : 0;
  const cappedPercent = Math.min(percent, 100);
  const remaining = budget - totals.expense;

  elements.budgetPercent.textContent = budget > 0 ? `${percent}%` : "0%";
  elements.budgetBar.style.width = `${cappedPercent}%`;
  elements.budgetBar.classList.toggle("warning", percent >= 75 && percent < 100);
  elements.budgetBar.classList.toggle("danger", percent >= 100);

  if (budget <= 0) {
    elements.budgetMessage.textContent = "Defina um limite para visualizar seu progresso.";
    return;
  }

  if (remaining >= 0) {
    elements.budgetMessage.textContent = `Ainda restam ${formatCurrency(remaining)} dentro do limite definido.`;
  } else {
    elements.budgetMessage.textContent = `Você ultrapassou o limite em ${formatCurrency(Math.abs(remaining))}.`;
  }
}

function renderFixedExpenses() {
  if (!fixedExpenses.length) {
    elements.fixedExpenseList.innerHTML = `<p class="muted">Nenhuma despesa fixa cadastrada.</p>`;
    return;
  }
  elements.fixedExpenseList.innerHTML = fixedExpenses.map((item) => `
    <div class="mini-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.category)} · dia ${item.day} · ${formatCurrency(item.amount)}</span>
      </div>
      <div class="row-actions">
        <button class="icon-button" type="button" data-fixed-edit="${escapeHtml(item.id)}">Editar</button>
        <button class="icon-button danger" type="button" data-fixed-delete="${escapeHtml(item.id)}">Excluir</button>
      </div>
    </div>
  `).join("");

  elements.fixedExpenseList.querySelectorAll("[data-fixed-edit]").forEach((button) => {
    button.addEventListener("click", () => editFixedExpense(button.dataset.fixedEdit));
  });
  elements.fixedExpenseList.querySelectorAll("[data-fixed-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteFixedExpense(button.dataset.fixedDelete));
  });
}

function renderCategoryGoals(monthlyTransactions) {
  const month = elements.monthFilter.value;
  const goals = categoryGoals[month] || {};
  const spentByCategory = monthlyTransactions.filter((item) => item.type === "expense").reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});
  const categories = Array.from(new Set([...Object.keys(goals), ...Object.keys(spentByCategory)])).sort();

  if (!categories.length) {
    elements.goalList.innerHTML = `<p class="muted">Defina metas para acompanhar limites por categoria.</p>`;
    return;
  }

  elements.goalList.innerHTML = categories.map((category) => {
    const goal = goals[category] || 0;
    const spent = spentByCategory[category] || 0;
    const percent = goal > 0 ? Math.round((spent / goal) * 100) : 0;
    const width = Math.min(percent, 100);
    const status = goal > 0 ? `${formatCurrency(spent)} de ${formatCurrency(goal)} · ${percent}%` : `${formatCurrency(spent)} gasto · sem meta`;
    return `
      <div class="goal-item">
        <div class="category-row">
          <span>${escapeHtml(category)}</span>
          <strong>${status}</strong>
        </div>
        <div class="category-bar-track"><div class="category-bar ${percent >= 100 ? "danger" : percent >= 75 ? "warning" : ""}" style="width: ${width}%;"></div></div>
        ${goal > 0 ? `<button class="button text small" type="button" data-goal-delete="${escapeHtml(category)}">Remover meta</button>` : ""}
      </div>
    `;
  }).join("");

  elements.goalList.querySelectorAll("[data-goal-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteCategoryGoal(button.dataset.goalDelete));
  });
}

function renderCategoryReport(monthlyTransactions, totalExpense) {
  const expenses = monthlyTransactions.filter((item) => item.type === "expense");
  const grouped = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const entries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  if (!entries.length) {
    elements.categoryList.innerHTML = `<p class="muted">Sem despesas cadastradas neste mês.</p>`;
    elements.donutChart.style.background = "conic-gradient(#e2e8f0 0deg 360deg)";
    elements.donutCenter.textContent = "0%";
    return;
  }

  let currentDegree = 0;
  const segments = entries.map(([category, value], index) => {
    const degrees = (value / totalExpense) * 360;
    const color = palette[index % palette.length];
    const segment = `${color} ${currentDegree}deg ${currentDegree + degrees}deg`;
    currentDegree += degrees;
    return segment;
  });

  elements.donutChart.style.background = `conic-gradient(${segments.join(", ")})`;
  elements.donutCenter.textContent = `${Math.round((entries[0][1] / totalExpense) * 100)}%`;

  elements.categoryList.innerHTML = entries
    .map(([category, value], index) => {
      const percent = totalExpense > 0 ? Math.round((value / totalExpense) * 100) : 0;
      const color = palette[index % palette.length];
      return `
        <div class="category-item">
          <div class="category-row">
            <span>${escapeHtml(category)}</span>
            <strong>${formatCurrency(value)} · ${percent}%</strong>
          </div>
          <div class="category-bar-track">
            <div class="category-bar" style="width: ${percent}%; background: ${color};"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderInsights(monthlyTransactions, totals, budget) {
  const expenses = monthlyTransactions.filter((item) => item.type === "expense");
  const biggestExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0];
  const topCategory = getTopExpenseCategory(expenses);
  const averageExpense = expenses.length ? totals.expense / expenses.length : 0;
  const balance = totals.income - totals.expense;
  const budgetStatus = budget > 0 ? budget - totals.expense : null;

  const insights = [
    {
      label: "Maior gasto",
      value: biggestExpense ? `${biggestExpense.title} · ${formatCurrency(biggestExpense.amount)}` : "Sem despesas",
    },
    {
      label: "Categoria que mais pesa",
      value: topCategory ? `${topCategory.category} · ${formatCurrency(topCategory.value)}` : "Sem dados",
    },
    {
      label: "Média por despesa",
      value: formatCurrency(averageExpense),
    },
    {
      label: budget > 0 ? "Status do limite" : "Resultado do mês",
      value: budget > 0 ? (budgetStatus >= 0 ? `${formatCurrency(budgetStatus)} sobrando` : `${formatCurrency(Math.abs(budgetStatus))} acima`) : formatCurrency(balance),
    },
    {
      label: "Despesas fixas ativas",
      value: `${fixedExpenses.length} cadastrada(s)`,
    },
  ];

  elements.insightsList.innerHTML = insights
    .map(
      (item) => `
        <div class="insight-item">
          <span>${item.label}</span>
          <strong>${escapeHtml(item.value)}</strong>
        </div>
      `
    )
    .join("");
}


function renderPaymentCenter(monthlyTransactions) {
  if (!elements.paymentCenterList) return;

  const month = elements.monthFilter.value;
  if (elements.paymentCenterMonthLabel) elements.paymentCenterMonthLabel.textContent = formatMonthLabel(month);

  const expenses = monthlyTransactions.filter((item) => item.type === "expense");
  const overdue = expenses.filter((item) => isTransactionOverdue(item)).sort(sortByDateAsc);
  const dueSoon = expenses
    .filter((item) => !isTransactionPaid(item) && !isTransactionOverdue(item) && getDaysUntil(item.date) >= 0 && getDaysUntil(item.date) <= 5)
    .sort(sortByDateAsc);
  const lastInstallments = expenses.filter((item) => isLastInstallment(item)).sort(sortByDateAsc);
  const paid = expenses.filter((item) => isTransactionPaid(item));
  const pending = expenses.filter((item) => !isTransactionPaid(item));

  const cards = [];
  if (overdue.length) {
    cards.push(renderPaymentAlertCard("danger", "Contas atrasadas", `${overdue.length} conta(s) vencida(s) e ainda não marcada(s) como paga(s).`, overdue.slice(0, 4)));
  }
  if (dueSoon.length) {
    cards.push(renderPaymentAlertCard("warning", "Contas a vencer", `${dueSoon.length} conta(s) vencendo nos próximos 5 dias.`, dueSoon.slice(0, 4)));
  }
  if (lastInstallments.length) {
    cards.push(renderPaymentAlertCard("success", "Última parcela do cartão", `${lastInstallments.length} compra(s) terminam neste mês.`, lastInstallments.slice(0, 4)));
  }

  cards.push(`
    <article class="payment-alert-card neutral">
      <div>
        <span class="payment-alert-icon">✓</span>
      </div>
      <div class="payment-alert-content">
        <strong>Resumo de pagamento</strong>
        <p>${paid.length} paga(s) · ${pending.length} pendente(s) neste mês.</p>
      </div>
    </article>
  `);

  elements.paymentCenterList.innerHTML = cards.join("");
}

function renderPaymentAlertCard(type, title, description, items) {
  return `
    <article class="payment-alert-card ${type}">
      <div>
        <span class="payment-alert-icon">${type === "danger" ? "!" : type === "warning" ? "•" : "✓"}</span>
      </div>
      <div class="payment-alert-content">
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(description)}</p>
        <div class="payment-alert-items">
          ${items.map(renderPaymentAlertItem).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderPaymentAlertItem(item) {
  const detail = isLastInstallment(item)
    ? `parcela ${item.installmentNumber}/${item.totalInstallments}`
    : getPaymentTimingLabel(item);
  return `
    <div class="payment-alert-item">
      <span>${escapeHtml(item.title)}</span>
      <strong>${formatCurrency(item.amount)} · ${escapeHtml(detail)}</strong>
    </div>
  `;
}

function matchesPaymentFilter(item, paymentFilter) {
  if (paymentFilter === "all") return true;
  if (paymentFilter === "pending") return item.type === "expense" && !isTransactionPaid(item);
  if (paymentFilter === "paid") return item.type === "expense" && isTransactionPaid(item);
  if (paymentFilter === "overdue") return isTransactionOverdue(item);
  if (paymentFilter === "installments") return Boolean(item.installmentGroupId);
  if (paymentFilter === "lastInstallment") return isLastInstallment(item);
  return true;
}

function renderPaymentTags(item) {
  if (item.type !== "expense") return "";

  const tags = [];
  if (isTransactionPaid(item)) {
    tags.push(`<span class="tag tag-paid">Pago</span>`);
  } else if (isTransactionOverdue(item)) {
    tags.push(`<span class="tag tag-overdue">Atrasado</span>`);
  } else if (getDaysUntil(item.date) === 0) {
    tags.push(`<span class="tag tag-warning">Vence hoje</span>`);
  } else {
    tags.push(`<span class="tag tag-pending">Pendente</span>`);
  }

  if (isLastInstallment(item)) {
    tags.push(`<span class="tag tag-final">Última parcela</span>`);
  }

  return tags.join("");
}

function toggleTransactionPaid(id) {
  const item = transactions.find((transaction) => transaction.id === id);
  if (!item || item.type !== "expense") return;

  const nextPaid = !isTransactionPaid(item);
  transactions = transactions.map((transaction) => {
    if (transaction.id !== id) return transaction;
    return {
      ...transaction,
      paid: nextPaid,
      paidAt: nextPaid ? formatDate(new Date()) : null,
    };
  });

  persistTransactions();
  render();
  showToast(nextPaid ? "Conta marcada como paga." : "Pagamento desmarcado.");
}

function isTransactionPaid(item) {
  return item?.paid === true;
}

function isTransactionOverdue(item) {
  return item?.type === "expense" && !isTransactionPaid(item) && compareDateStrings(item.date, formatDate(new Date())) < 0;
}

function isLastInstallment(item) {
  return Boolean(item?.installmentGroupId && Number(item.installmentNumber) === Number(item.totalInstallments));
}

function getPaymentTimingLabel(item) {
  if (isTransactionPaid(item)) return "pago";
  const days = getDaysUntil(item.date);
  if (days < 0) return `atrasou ${Math.abs(days)} dia(s)`;
  if (days === 0) return "vence hoje";
  if (days === 1) return "vence amanhã";
  return `vence em ${days} dia(s)`;
}

function getDaysUntil(dateValue) {
  const today = parseLocalDate(formatDate(new Date()));
  const target = parseLocalDate(dateValue);
  if (!today || !target) return 9999;
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function compareDateStrings(a, b) {
  return String(a || "").localeCompare(String(b || ""));
}

function parseLocalDate(value) {
  const [year, month, day] = String(value || "").split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function sortByDateAsc(a, b) {
  return String(a.date || "").localeCompare(String(b.date || ""));
}

function formatMonthLabel(month) {
  const [year, monthNumber] = String(month || "").split("-").map(Number);
  if (!year || !monthNumber) return "Mês selecionado";
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(year, monthNumber - 1, 1));
}

function getFilteredMonthlyTransactions() {
  const search = normalize(elements.searchInput.value);
  const typeFilter = elements.typeFilter.value;
  const paymentFilter = elements.paymentFilter?.value || "all";

  return getMonthlyTransactions()
    .filter((item) => (typeFilter === "all" ? true : item.type === typeFilter))
    .filter((item) => matchesPaymentFilter(item, paymentFilter))
    .filter((item) => {
      const haystack = normalize(`${item.title} ${item.category} ${item.note || ""}`);
      return haystack.includes(search);
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderTransactions() {
  const filtered = getFilteredMonthlyTransactions();
  pruneSelection();

  elements.emptyState.hidden = filtered.length > 0;
  elements.transactionsBody.innerHTML = filtered.map(renderTransactionRow).join("");

  elements.transactionsBody.querySelectorAll("[data-select]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedTransactionIds.add(checkbox.dataset.select);
      } else {
        selectedTransactionIds.delete(checkbox.dataset.select);
      }
      checkbox.closest("tr")?.classList.toggle("selected-row", checkbox.checked);
      syncSelectionControls(filtered);
    });
  });

  elements.transactionsBody.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => editTransaction(button.dataset.edit));
  });

  elements.transactionsBody.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteTransaction(button.dataset.delete));
  });

  elements.transactionsBody.querySelectorAll("[data-paid-toggle]").forEach((button) => {
    button.addEventListener("click", () => toggleTransactionPaid(button.dataset.paidToggle));
  });

  syncSelectionControls(filtered);
}

function renderTransactionRow(item) {
  const typeLabel = item.type === "income" ? "Receita" : "Despesa";
  const signedAmount = item.type === "income" ? item.amount : -item.amount;
  const amountClass = item.type === "income" ? "income-text" : "expense-text";
  const isSelected = selectedTransactionIds.has(item.id);
  const safeId = escapeHtml(item.id);
  const safeTitle = escapeHtml(item.title);
  const displayDate = formatDisplayDate(item.date);
  const paymentTags = renderPaymentTags(item);
  const paymentAction = item.type === "expense"
    ? `<button class="icon-button ${isTransactionPaid(item) ? "" : "success"}" type="button" data-paid-toggle="${safeId}">${isTransactionPaid(item) ? "Desfazer pago" : "Marcar pago"}</button>`
    : "";

  return `
    <tr class="${isSelected ? "selected-row" : ""}">
      <td data-label="Data">
        <label class="date-select">
          <input class="transaction-checkbox" type="checkbox" data-select="${safeId}" ${isSelected ? "checked" : ""} aria-label="Selecionar lançamento ${safeTitle} de ${displayDate}" />
          <span>${displayDate}</span>
        </label>
      </td>
      <td data-label="Descrição">
        <div class="transaction-title">
          <strong>${safeTitle}</strong>
          ${item.note ? `<span>${escapeHtml(item.note)}</span>` : ""}
          ${item.fixedExpenseId ? `<span class="tag">Fixa automática</span>` : ""}
          ${item.installmentGroupId ? `<span class="tag">Parcela ${item.installmentNumber}/${item.totalInstallments}</span>` : ""}
          ${paymentTags}
        </div>
      </td>
      <td data-label="Categoria">${escapeHtml(item.category)}</td>
      <td data-label="Tipo"><span class="badge ${item.type}">${typeLabel}</span></td>
      <td data-label="Valor" class="amount-col ${amountClass}"><strong>${formatCurrency(signedAmount)}</strong></td>
      <td data-label="Ações" class="actions-col">
        <div class="row-actions">
          ${paymentAction}
          <button class="icon-button" type="button" data-edit="${safeId}">Editar</button>
          <button class="icon-button danger" type="button" data-delete="${safeId}">Excluir</button>
        </div>
      </td>
    </tr>
  `;
}

function toggleSelectAllTransactions() {
  const filtered = getFilteredMonthlyTransactions();
  const shouldSelect = elements.selectAllTransactions.checked;

  filtered.forEach((item) => {
    if (shouldSelect) {
      selectedTransactionIds.add(item.id);
    } else {
      selectedTransactionIds.delete(item.id);
    }
  });

  renderTransactions();
}

function pruneSelection() {
  const existingIds = new Set(transactions.map((item) => item.id));
  selectedTransactionIds = new Set(Array.from(selectedTransactionIds).filter((id) => existingIds.has(id)));
}

function syncSelectionControls(visibleTransactions = getFilteredMonthlyTransactions()) {
  const visibleIds = visibleTransactions.map((item) => item.id);
  const selectedVisibleCount = visibleIds.filter((id) => selectedTransactionIds.has(id)).length;
  const selectedTotal = selectedTransactionIds.size;

  elements.selectAllTransactions.checked = visibleIds.length > 0 && selectedVisibleCount === visibleIds.length;
  elements.selectAllTransactions.indeterminate = selectedVisibleCount > 0 && selectedVisibleCount < visibleIds.length;
  elements.selectAllTransactions.disabled = visibleIds.length === 0;
  elements.bulkDeleteButton.disabled = selectedTotal === 0;
  elements.bulkDeleteButton.textContent = selectedTotal > 0 ? `Excluir selecionados (${selectedTotal})` : "Excluir selecionados";
}

function getMonthlyTransactions() {
  const month = elements.monthFilter.value;
  return transactions.filter((item) => item.date && item.date.startsWith(month));
}

function getTotals(items) {
  return items.reduce(
    (acc, item) => {
      if (item.type === "income") acc.income += item.amount;
      if (item.type === "expense") acc.expense += item.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );
}

function getTopExpenseCategory(expenses) {
  const grouped = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const [category, value] = Object.entries(grouped).sort((a, b) => b[1] - a[1])[0] || [];
  return category ? { category, value } : null;
}

function getDaysLeftInSelectedMonth() {
  const [year, month] = elements.monthFilter.value.split("-").map(Number);
  const today = new Date();
  const selectedMonth = month - 1;
  const lastDay = new Date(year, selectedMonth + 1, 0).getDate();

  if (today.getFullYear() === year && today.getMonth() === selectedMonth) {
    return Math.max(1, lastDay - today.getDate() + 1);
  }

  return lastDay;
}


function buildMonthDate(month, day) {
  const [year, monthNumber] = month.split("-").map(Number);
  const lastDay = new Date(year, monthNumber, 0).getDate();
  return `${month}-${String(Math.min(day, lastDay)).padStart(2, "0")}`;
}

function addMonthsToDate(dateValue, monthsToAdd) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const target = new Date(year, month - 1 + monthsToAdd, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(day, lastDay));
  return formatDate(target);
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0);
}

function formatDisplayDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR").format(new Date(year, month - 1, day));
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonth(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function escapeHtml(value) {
  return String(value)
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

