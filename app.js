import {
  deleteJournalEntry as deleteCloudJournalEntry,
  getUserAccess,
  initializeSupabase,
  isSupabaseConfigured,
  migrateAndMergeState,
  resetPasswordForEmail,
  saveCompletedDay,
  saveJournalEntry,
  saveProfile,
  sendMagicLink,
  signInWithGoogle,
  signInWithPassword,
  signOutUser,
  signUpWithPassword,
  startFreeTrial,
  updateCurrentUserPassword,
  verifyDatabaseSchema
} from "./supabase-client.js?v=88";
import { bibleBooks } from "./bible-books.js?v=88";
import { bibleOverviewBooks } from "./bible-overview-data.js?v=88";

const STORAGE_KEY = "yeshua.web.v1";
const APP_VERSION = "0.9.88";

const copy = {
  es: {
    navHome: "Inicio", navJourney: "Momentos", navBible: "Biblia", navJournal: "Diario", navProfile: "Ajustes",
    back: "Regresar", themeNight: "Activar modo nocturno", themeDay: "Activar modo diurno",
    greetingMorning: "Buenos días", greetingAfternoon: "Buenas tardes", greetingEvening: "Buenas noches",
    heroTitle: "Un momento con Cristo y Su Palabra.", heroText: "Lee, comprende, ora y lleva la verdad bíblica a tu día.",
    begin: "Comenzar el día", continue: "Continuar camino", todayWord: "Palabra de hoy", explore: "Explorar",
    nextUp: "Para continuar", spiritualLibrary: "Hoy en Yeshua", libraryIntro: "Elige por dónde empezar: una lectura, una oración, descanso con la Palabra o algo para vivir en familia.",
    forToday: "Para hoy", featuredCollections: "Colecciones destacadas", pathsWithJesus: "Caminos con Jesús", guidedPrayers: "Momentos de oración", sleepWithWord: "Paz nocturna", startBible: "Comienza aquí", familyKids: "Familia y niños", resources: "Recursos descargables", comingSoon: "Próximamente",
    jesusStories: "Historias de Jesús", jesusStoriesIntro: "Relatos breves para leer, escuchar y conversar en familia.", familyQuestion: "Pregunta para conversar", familyPrayer: "Oración en familia",
    prayerTitle: "Oración eficaz", prayerIntro: "Evalúa y fortalece tu vida de oración con 12 claves bíblicas centradas en Jesús.", sleepTitle: "Paz nocturna", sleepIntro: "Un camino de 30 noches para cerrar el día con la Palabra, soltar el peso y descansar en Dios.", resourcesTitle: "Recursos para descargar", resourcesIntro: "Guías en PDF para estudiar, imprimir, compartir en familia o usar con niños.", download: "Descargar PDF",
    devotional: "Devocional", devotionalSub: "Pasaje, contexto y oración", journey: "Camino de 7 días", journeySub: "Caminos bíblicos para crecer",
    bible: "Biblia", bibleSub: "Lectura bíblica", journal: "Diario de oración", journalSub: "Privado en este dispositivo",
    streak: "Racha", completed: "Completados", journalEntries: "Oraciones", day: "Día", of: "de",
    read: "Lectura", scene: "Mira el pasaje", teaching: "Enseñanza", practice: "Practica hoy", context: "Contexto", reflect: "Reflexiona", pray: "Ora", markComplete: "Marcar como completado", completedToday: "Completado hoy",
    listen: "Escuchar ahora", readStory: "Leer", favorite: "Favorito", share: "Compartir", copied: "Enlace copiado", pauseAudio: "Pausar", resumeAudio: "Continuar", stopAudio: "Detener", audioTitle: "Lectura en voz alta", audioIntro: "Deja que Yeshua te acompañe leyendo esta reflexión mientras sigues el texto.", audioPlaying: "Reproduciendo lectura...", audioUnsupported: "Este navegador no permite lectura en voz alta.",
    journeyTitle: "Caminos bíblicos", journeyIntro: "Elige un recorrido breve, cristocéntrico y guiado por la Palabra.",
    chooseJourney: "Elige un camino", activeJourney: "Camino activo", startJourney: "Comenzar camino", continueJourney: "Continuar camino", resetJourney: "Reiniciar este camino", journeyProgress: "Progreso del camino",
    bibleTitle: "Leer la Biblia", bibleIntro: "Lee la Palabra con calma, guarda tu avance y vuelve al pasaje cuando lo necesites.", bibleOverviewTitle: "Explora la Biblia", bibleOverviewIntro: "Recorre los 66 libros con mapas visuales, líneas de tiempo y claves cristocéntricas.", bibleOverviewCta: "Abrir experiencia interactiva", wisdomTitle: "Crecer en sabiduría", wisdomIntro: "Un recorrido de 31 días por Proverbios para formar criterio, ordenar el corazón y tomar decisiones con la sabiduría de Dios en la vida real.", wisdomCta: "Abrir Coach de Proverbios", wisdomGuideTitle: "Elige un día a la vez", wisdomGuideText: "Cada día corresponde al capítulo del mismo número en Proverbios. Avanza con calma: lee el capítulo, escucha la reflexión y practica una decisión concreta.", book: "Libro", chapter: "Capítulo", load: "Leer capítulo", loadingBible: "Cargando capítulo...", previousChapter: "Capítulo anterior", nextChapter: "Capítulo siguiente",
    journalTitle: "Diario de oración", journalIntro: "Escribe con honestidad. Tus entradas quedan guardadas en tu espacio personal para volver a ellas cuando lo necesites.",
    category: "Categoría", gratitude: "Gratitud", request: "Petición", intercession: "Intercesión", confession: "Confesión", praise: "Alabanza", other: "Otro", entry: "Oración", entryPlaceholder: "Escribe tu oración...", save: "Guardar oración", noEntries: "Aún no hay entradas guardadas.", delete: "Eliminar",
    profileTitle: "Ajustes", profileIntro: "Administra tu cuenta, preferencias, soporte y datos importantes de Yeshua.", account: "Cuenta", guestMode: "Crea tu cuenta gratis", guestDescription: "Regístrate para guardar tu diario, favoritos y progreso en tu espacio personal.", signIn: "Iniciar sesión", signOut: "Cerrar sesión", changePhoto: "Cambiar foto", removePhoto: "Quitar foto", preferences: "Preferencias", language: "Idioma", appearance: "Apariencia", light: "Día", dark: "Noche", system: "Automático",
    authTitle: "Qué bueno verte de nuevo", authIntro: "Recibe un enlace seguro en tu correo. No necesitas crear ni recordar una contraseña.", email: "Correo electrónico", sendLink: "Enviarme un enlace seguro", authUnavailable: "Autenticación pendiente de conexión segura", security: "El acceso usa un enlace de un solo uso y conexión cifrada. Yeshua nunca guarda una contraseña en el navegador.", linkSent: "Revisa tu correo para continuar el acceso.", authError: "No fue posible enviar el enlace. Inténtalo nuevamente.", authRateLimit: "Se alcanzó el límite temporal de correos. Espera una hora antes de solicitar otro enlace.",
    saved: "Guardado", removed: "Eliminado", done: "Día completado", completionTomorrow: "Día completado. Nos vemos mañana.", install: "Instalar aplicación", privacy: "Privacidad", doctrine: "Principios editoriales",
    continueReading: "Continuar lectura", lastRead: "Última lectura", openBible: "Abrir Biblia", todaysFocus: "Enfoque sugerido", focusBible: "Comienza con la Palabra y luego escribe una oración breve.", focusPrayer: "Lee el pasaje y convierte la reflexión en oración.", focusPeace: "Haz una pausa lenta con el pasaje antes de responder al día.", focusRest: "Guarda una lectura para la noche y descansa con la Palabra.", focusJesus: "Observa primero qué revela el texto sobre Jesús.", focusDefault: "Un paso pequeño y fiel es suficiente para comenzar hoy.",
    privacyText: "Esta versión no usa rastreadores ni vende datos. Tu diario permanece en tu espacio personal y puedes gestionarlo desde la app.",
    doctrineText: "Yeshua busca dirigir la atención a Jesucristo y a las Escrituras. No genera profecías personales ni sustituye la iglesia local, el cuidado pastoral o la atención profesional.",
    signedIn: "Sesión iniciada", syncedDescription: "Tu diario, progreso y preferencias se sincronizan entre dispositivos.", syncError: "No fue posible sincronizar. Tus cambios siguen guardados en este dispositivo.", signedOut: "Sesión cerrada",
    notAvailable: "Este capítulo se añadirá en una próxima importación.",
    onboardingEyebrow: "Comienza aquí", onboardingTitle: "Prepara tu camino diario con Dios.", onboardingIntro: "En menos de un minuto elegimos un ritmo sencillo para leer la Palabra, orar y volver a Cristo durante la semana.",
    onboardingStep1: "¿Qué estás buscando?", onboardingStep2: "¿Qué ritmo quieres comenzar?", onboardingStep3: "Tu primer paso",
    onboardingGoalBible: "Leer la Biblia con constancia", onboardingGoalPrayer: "Crecer en oración", onboardingGoalPeace: "Recibir paz en la ansiedad", onboardingGoalRest: "Descansar con la Palabra", onboardingGoalJesus: "Conocer más a Jesús", onboardingGoalFamily: "Orar por mi familia",
    rhythmFive: "5 minutos al día", rhythmTen: "10 minutos al día", rhythmNight: "Antes de dormir", rhythmFlexible: "Cuando pueda",
    onboardingStart: "Entrar a Yeshua", onboardingLogin: "Guardar con mi correo", onboardingSaved: "Tu camino está listo",
    yourPath: "Tu camino", yourPathIntro: "Hoy comenzamos con un encuentro breve y bíblico. Puedes cambiar tus preferencias cuando quieras.",
    restartOnboarding: "Repetir introducción", myFavorites: "Tus favoritos", noFavorites: "Aún no has marcado favoritos. Toca el corazón en cualquier tarjeta para guardarla aquí.", addFavorite: "Guardar favorito", removeFavorite: "Quitar favorito", themeAutoHint: "Automático usa el modo claro u oscuro de tu dispositivo.", photoSaved: "Foto actualizada",
    settingsGeneral: "General", settingsSupport: "Contacto y soporte técnico", settingsSubscribe: "Suscríbete a Yeshua", settingsLegal: "Legal", appVersion: "Versión de la app", notifications: "Notificaciones", offline: "Descargas/offline", supportHelp: "¿Necesitas ayuda? Escríbenos y te responderemos lo antes posible.", contactSupport: "Contactar soporte", terms: "Términos de uso", importantNotices: "Avisos importantes", assistantTitle: "Asistente Yeshua", assistantPowered: "Impulsado por IA", assistantIntro: "Pregunta, explora un pasaje o inicia una reflexión breve con orientación inspirada en principios bíblicos.", assistantWarning: "Las respuestas son generadas por inteligencia artificial inspirada en principios bíblicos. No reemplazan el acompañamiento pastoral, médico, psicológico o profesional.", assistantPlaceholder: "Escribe tu pregunta...", assistantSend: "Enviar",
    createAccount: "Crear cuenta", fullName: "Nombre", password: "Contraseña", confirmPassword: "Confirmar contraseña", passwordLogin: "Iniciar sesión", magicAlternative: "Entrar con enlace mágico", continueGoogle: "Continuar con Google", forgotPassword: "Olvidé mi contraseña", alreadyAccount: "Ya tengo cuenta", needAccount: "Crear una cuenta", accountCreatedEmail: "Te enviamos un correo para confirmar tu cuenta.", resetSent: "Te enviamos un correo para recuperar tu contraseña.", authHumanError: "No pudimos completar el acceso. Revisa los datos e inténtalo nuevamente.", passwordChanged: "Contraseña actualizada", changePassword: "Cambiar contraseña", accessChecking: "Verificando tu acceso...", subscribeTitle: "Activa tu acceso a Yeshua", subscribeIntro: "Comienza con 7 días gratis. Luego USD 39.99 al año.", startTrial: "Comenzar prueba gratis", subscribeNow: "Ya tengo acceso", accessNeeded: "Activa una prueba o suscripción para continuar."
  },
  en: {
    navHome: "Home", navJourney: "Moments", navBible: "Bible", navJournal: "Journal", navProfile: "Settings",
    back: "Back", themeNight: "Enable dark mode", themeDay: "Enable light mode",
    greetingMorning: "Good morning", greetingAfternoon: "Good afternoon", greetingEvening: "Good evening",
    heroTitle: "A moment with Christ and His Word.", heroText: "Read, understand, pray, and carry biblical truth into your day.",
    begin: "Begin today", continue: "Continue journey", todayWord: "Today's Word", explore: "Explore",
    nextUp: "Continue with", spiritualLibrary: "Today in Yeshua", libraryIntro: "Choose where to begin: a reading, a prayer, rest with the Word, or something to share as a family.",
    forToday: "For today", featuredCollections: "Featured collections", pathsWithJesus: "Journeys with Jesus", guidedPrayers: "Prayer moments", sleepWithWord: "Night peace", startBible: "Start here", familyKids: "Family and kids", resources: "Downloads", comingSoon: "Coming soon",
    jesusStories: "Stories of Jesus", jesusStoriesIntro: "Brief stories to read, listen to, and discuss as a family.", familyQuestion: "Family question", familyPrayer: "Family prayer",
    prayerTitle: "Effective prayer", prayerIntro: "Evaluate and strengthen your prayer life with 12 biblical keys centered on Jesus.", sleepTitle: "Night peace", sleepIntro: "A 30-night path to close the day with Scripture, release the weight, and rest in God.", resourcesTitle: "Downloadable resources", resourcesIntro: "PDF guides to study, print, share with family, or use with kids.", download: "Download PDF",
    devotional: "Devotional", devotionalSub: "Passage, context, and prayer", journey: "7-day journey", journeySub: "Biblical paths for growth",
    bible: "Bible", bibleSub: "Scripture reading", journal: "Prayer journal", journalSub: "Private on this device",
    streak: "Streak", completed: "Completed", journalEntries: "Prayers", day: "Day", of: "of",
    read: "Read", scene: "Observe the passage", teaching: "Teaching", practice: "Practice today", context: "Context", reflect: "Reflect", pray: "Pray", markComplete: "Mark as complete", completedToday: "Completed today",
    listen: "Listen now", readStory: "Read", favorite: "Favorite", share: "Share", copied: "Link copied", pauseAudio: "Pause", resumeAudio: "Resume", stopAudio: "Stop", audioTitle: "Read aloud", audioIntro: "Let Yeshua accompany you by reading this reflection while you follow the text.", audioPlaying: "Reading aloud...", audioUnsupported: "This browser does not allow read-aloud.",
    journeyTitle: "Biblical journeys", journeyIntro: "Choose a brief, Christ-centered path guided by Scripture.",
    chooseJourney: "Choose a journey", activeJourney: "Active journey", startJourney: "Start journey", continueJourney: "Continue journey", resetJourney: "Reset this journey", journeyProgress: "Journey progress",
    bibleTitle: "Read the Bible", bibleIntro: "Read Scripture slowly, keep your place, and return to the passage when you need it.", bibleOverviewTitle: "Explore the Bible", bibleOverviewIntro: "Walk through the 66 books with visual maps, timelines, and Christ-centered keys.", bibleOverviewCta: "Open interactive experience", wisdomTitle: "Grow in wisdom", wisdomIntro: "A 31-day journey through Proverbs to shape discernment, order the heart, and make real-life decisions with God's wisdom.", wisdomCta: "Open Proverbs Coach", wisdomGuideTitle: "Choose one day at a time", wisdomGuideText: "Each day matches the chapter with the same number in Proverbs. Move slowly: read the chapter, listen to the reflection, and practice one concrete decision.", book: "Book", chapter: "Chapter", load: "Read chapter", loadingBible: "Loading chapter...", previousChapter: "Previous chapter", nextChapter: "Next chapter",
    journalTitle: "Prayer journal", journalIntro: "Write honestly. Your entries are saved in your personal space so you can return to them when you need.",
    category: "Category", gratitude: "Gratitude", request: "Request", intercession: "Intercession", confession: "Confession", praise: "Praise", other: "Other", entry: "Prayer", entryPlaceholder: "Write your prayer...", save: "Save prayer", noEntries: "No entries saved yet.", delete: "Delete",
    profileTitle: "Settings", profileIntro: "Manage your account, preferences, support, and important Yeshua information.", account: "Account", guestMode: "Create your free account", guestDescription: "Register to save your journal, favorites, and progress in your personal space.", signIn: "Sign in", signOut: "Sign out", changePhoto: "Change photo", removePhoto: "Remove photo", preferences: "Preferences", language: "Language", appearance: "Appearance", light: "Light", dark: "Dark", system: "Auto",
    authTitle: "Welcome back", authIntro: "Receive a secure sign-in link by email. There is no password to create or remember.", email: "Email", sendLink: "Send me a secure link", authUnavailable: "Authentication awaits secure connection", security: "Sign-in uses a one-time link over an encrypted connection. Yeshua never stores a password in the browser.", linkSent: "Check your email to continue signing in.", authError: "The link could not be sent. Please try again.", authRateLimit: "The temporary email limit has been reached. Wait one hour before requesting another link.",
    saved: "Saved", removed: "Removed", done: "Day completed", completionTomorrow: "Day completed. See you tomorrow.", install: "Install app", privacy: "Privacy", doctrine: "Editorial principles",
    continueReading: "Continue reading", lastRead: "Last read", openBible: "Open Bible", todaysFocus: "Suggested focus", focusBible: "Begin with the Word and then write a brief prayer.", focusPrayer: "Read the passage and turn the reflection into prayer.", focusPeace: "Take a slow pause with the passage before responding to the day.", focusRest: "Save a reading for tonight and rest with the Word.", focusJesus: "First observe what the text reveals about Jesus.", focusDefault: "A small faithful step is enough to begin today.",
    privacyText: "This version uses no trackers and sells no data. Your journal remains in your personal space and can be managed from the app.",
    doctrineText: "Yeshua directs attention to Jesus Christ and Scripture. It does not generate personal prophecy or replace the local church, pastoral care, or professional help.",
    signedIn: "Signed in", syncedDescription: "Your journal, progress, and preferences sync across devices.", syncError: "Sync was unavailable. Your changes remain saved on this device.", signedOut: "Signed out",
    notAvailable: "This chapter will be included in the next Bible text import.",
    onboardingEyebrow: "Welcome", onboardingTitle: "Prepare your daily path with God.", onboardingIntro: "In less than a minute, choose a simple rhythm for reading Scripture, praying, and returning to Christ during the week.",
    onboardingStep1: "What are you seeking?", onboardingStep2: "What rhythm do you want to begin?", onboardingStep3: "Your first step",
    onboardingGoalBible: "Read the Bible consistently", onboardingGoalPrayer: "Grow in prayer", onboardingGoalPeace: "Receive peace in anxiety", onboardingGoalRest: "Rest with the Word", onboardingGoalJesus: "Know Jesus more", onboardingGoalFamily: "Pray for my family",
    rhythmFive: "5 minutes a day", rhythmTen: "10 minutes a day", rhythmNight: "Before sleep", rhythmFlexible: "When I can",
    onboardingStart: "Enter Yeshua", onboardingLogin: "Save with my email", onboardingSaved: "Path prepared",
    yourPath: "Your path", yourPathIntro: "Today begins with a brief, biblical encounter. You can change your preferences anytime.",
    restartOnboarding: "Repeat welcome", myFavorites: "Your favorites", noFavorites: "You have not marked favorites yet. Tap the heart on any card to save it here.", addFavorite: "Save favorite", removeFavorite: "Remove favorite", themeAutoHint: "Auto follows your device light or dark setting.", photoSaved: "Photo updated",
    settingsGeneral: "General", settingsSupport: "Contact and support", settingsSubscribe: "Subscribe to Yeshua", settingsLegal: "Legal", appVersion: "App version", notifications: "Notifications", offline: "Downloads/offline", supportHelp: "Need help? Write to us and we will reply as soon as possible.", contactSupport: "Contact support", terms: "Terms of use", importantNotices: "Important notices", assistantTitle: "Yeshua Assistant", assistantPowered: "Powered by AI", assistantIntro: "Ask a question, explore a passage, or begin a short reflection with guidance inspired by biblical principles.", assistantWarning: "Responses are generated by artificial intelligence inspired by biblical principles. They do not replace pastoral, medical, psychological, or professional care.", assistantPlaceholder: "Write your question...", assistantSend: "Send",
    createAccount: "Create account", fullName: "Name", password: "Password", confirmPassword: "Confirm password", passwordLogin: "Sign in", magicAlternative: "Sign in with magic link", continueGoogle: "Continue with Google", forgotPassword: "I forgot my password", alreadyAccount: "I already have an account", needAccount: "Create an account", accountCreatedEmail: "We sent you an email to confirm your account.", resetSent: "We sent you a password recovery email.", authHumanError: "We could not complete sign-in. Check your details and try again.", passwordChanged: "Password updated", changePassword: "Change password", accessChecking: "Checking your access...", subscribeTitle: "Activate your Yeshua access", subscribeIntro: "Start with 7 days free. Then USD 39.99 per year.", startTrial: "Start free trial", subscribeNow: "I already have access", accessNeeded: "Activate a trial or subscription to continue."
  }
};

const onboardingGoals = [
  ["bible", "onboardingGoalBible", "▦"],
  ["prayer", "onboardingGoalPrayer", "✎"],
  ["peace", "onboardingGoalPeace", "☼"],
  ["rest", "onboardingGoalRest", "☾"],
  ["jesus", "onboardingGoalJesus", "✝"],
  ["family", "onboardingGoalFamily", "♡"]
];

const onboardingRhythms = [
  ["five", "rhythmFive"],
  ["ten", "rhythmTen"],
  ["night", "rhythmNight"],
  ["flexible", "rhythmFlexible"]
];

const interestOptions = [
  { id: "bible", label: { es: "Biblia", en: "Bible" }, icon: "▦" },
  { id: "oracion", label: { es: "Oración", en: "Prayer" }, icon: "✎" },
  { id: "paz", label: { es: "Paz", en: "Peace" }, icon: "☼" },
  { id: "ansiedad", label: { es: "Ansiedad", en: "Anxiety" }, icon: "◇" },
  { id: "familia", label: { es: "Familia", en: "Family" }, icon: "♡" },
  { id: "matrimonio", label: { es: "Matrimonio", en: "Marriage" }, icon: "∞" },
  { id: "ninos", label: { es: "Niños", en: "Kids" }, icon: "○" },
  { id: "gratitud", label: { es: "Gratitud", en: "Gratitude" }, icon: "✦" },
  { id: "perdon", label: { es: "Perdón", en: "Forgiveness" }, icon: "◌" },
  { id: "devocionales", label: { es: "Devocionales", en: "Devotionals" }, icon: "◆" },
  { id: "historias", label: { es: "Historias de Jesús", en: "Stories of Jesus" }, icon: "✝" }
];

const days = [
  { ref: "Juan 1:1-5", title: { es: "La Palabra eterna", en: "The eternal Word" }, verse: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.", context: { es: "Juan no comienza con lo que debemos hacer, sino con quién es Jesús: eterno, divino y fuente de vida.", en: "John begins not with what we must do, but with who Jesus is: eternal, divine, and the source of life." }, reflect: { es: "¿Qué cambia hoy cuando reconoces que Jesús no es solo un maestro, sino el Señor?", en: "What changes today when you recognize Jesus as more than a teacher, as Lord?" }, prayer: { es: "Señor Jesús, dirige hoy mi atención hacia ti. Que tu luz ordene mis pensamientos y mis pasos. Amén.", en: "Lord Jesus, turn my attention toward You today. Let Your light order my thoughts and steps. Amen." } },
  { ref: "Juan 1:29", title: { es: "El Cordero de Dios", en: "The Lamb of God" }, verse: "He aquí el Cordero de Dios, que quita el pecado del mundo.", context: { es: "Juan el Bautista señala a Jesús como aquel que carga con el pecado. Nuestra esperanza descansa en su obra, no en nuestro mérito.", en: "John the Baptist points to Jesus as the One who bears sin. Our hope rests in His work, not our merit." }, reflect: { es: "¿Qué culpa necesitas dejar de usar como identidad?", en: "What guilt do you need to stop using as your identity?" }, prayer: { es: "Jesús, gracias por tu obra suficiente. Enséñame a vivir desde tu gracia y en obediencia a ti. Amén.", en: "Jesus, thank You for Your sufficient work. Teach me to live from Your grace and in obedience to You. Amen." } },
  { ref: "Juan 3:16-17", title: { es: "El amor que salva", en: "The love that saves" }, verse: "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito...", context: { es: "El amor de Dios se hace visible al dar a su Hijo. El evangelio no es autosuperación, sino rescate recibido por fe.", en: "God's love becomes visible in giving His Son. The gospel is not self-improvement, but rescue received by faith." }, reflect: { es: "¿Estás intentando ganarte lo que Dios ofrece por gracia?", en: "Are you trying to earn what God offers by grace?" }, prayer: { es: "Padre, gracias por dar a tu Hijo. Afirma mi fe en Cristo y forma en mí un amor que se entrega. Amén.", en: "Father, thank You for giving Your Son. Strengthen my faith in Christ and form self-giving love in me. Amen." } },
  { ref: "Juan 4:13-14", title: { es: "Agua viva", en: "Living water" }, verse: "Mas el que bebiere del agua que yo le daré, para siempre no tendrá sed.", context: { es: "Jesús encuentra a una mujer sedienta de aceptación y le ofrece vida que ninguna circunstancia puede producir.", en: "Jesus meets a woman thirsty for acceptance and offers life no circumstance can produce." }, reflect: { es: "¿Dónde estás buscando que algo creado satisfaga una necesidad del alma?", en: "Where are you asking something created to satisfy a need of the soul?" }, prayer: { es: "Jesús, tú conoces mi sed más profunda. Hazme descansar en ti y buscarte con un corazón sincero. Amén.", en: "Jesus, You know my deepest thirst. Teach me to rest in You and seek You sincerely. Amen." } },
  { ref: "Juan 6:35", title: { es: "El pan de vida", en: "The bread of life" }, verse: "Yo soy el pan de vida: el que á mí viene, nunca tendrá hambre.", context: { es: "Después de alimentar a la multitud, Jesús muestra que el mayor regalo no es lo que da, sino Él mismo.", en: "After feeding the crowd, Jesus shows that the greatest gift is not what He gives, but Himself." }, reflect: { es: "¿Buscas a Cristo o solamente lo que esperas recibir de Él?", en: "Are you seeking Christ, or only what you hope to receive from Him?" }, prayer: { es: "Señor, corrige mis deseos y enséñame a recibirte como mi verdadero sustento. Amén.", en: "Lord, reorder my desires and teach me to receive You as my true sustenance. Amen." } },
  { ref: "Juan 10:11", title: { es: "El buen Pastor", en: "The good Shepherd" }, verse: "Yo soy el buen pastor: el buen pastor su vida da por las ovejas.", context: { es: "Jesús contrasta su cuidado sacrificial con líderes que usan al rebaño. Él conoce, guía y entrega su vida.", en: "Jesus contrasts His sacrificial care with leaders who use the flock. He knows, leads, and lays down His life." }, reflect: { es: "¿En qué decisión necesitas seguir la voz de Cristo expresada en su Palabra?", en: "In what decision do you need to follow Christ's voice as expressed in His Word?" }, prayer: { es: "Buen Pastor, dame discernimiento para seguirte y humildad para recibir tu dirección. Amén.", en: "Good Shepherd, give me discernment to follow You and humility to receive Your direction. Amen." } },
  { ref: "Juan 14:6", title: { es: "El camino", en: "The way" }, verse: "Yo soy el camino, y la verdad, y la vida: nadie viene al Padre, sino por mí.", context: { es: "Jesús consuela a sus discípulos presentándose como el camino hacia el Padre. La fe cristiana está anclada en una persona.", en: "Jesus comforts His disciples by presenting Himself as the way to the Father. Christian faith is anchored in a person." }, reflect: { es: "¿Qué parte de tu vida necesita someterse nuevamente a la verdad de Cristo?", en: "What part of your life needs to submit again to Christ's truth?" }, prayer: { es: "Jesús, tú eres el camino, la verdad y la vida. Guíame a vivir hoy para la gloria del Padre. Amén.", en: "Jesus, You are the way, the truth, and the life. Lead me to live today for the Father's glory. Amen." } }
];

const bible = {
  JHN: { es: "Juan", en: "John", chapters: { 1: ["En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.", "Este era en el principio con Dios.", "Todas las cosas por él fueron hechas; y sin él nada de lo que es hecho, fué hecho.", "En él estaba la vida, y la vida era la luz de los hombres.", "Y la luz en las tinieblas resplandece; mas las tinieblas no la comprendieron."], 3: ["Y había un hombre de los Fariseos que se llamaba Nicodemo, príncipe de los Judíos.", "Este vino á Jesús de noche, y díjole: Rabbí, sabemos que has venido de Dios por maestro; porque nadie puede hacer estas señales que tú haces, si no fuere Dios con él.", "Respondió Jesús, y díjole: De cierto, de cierto te digo, que el que no naciere otra vez, no puede ver el reino de Dios.", "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."] } },
  PSA: { es: "Salmos", en: "Psalms", chapters: { 23: ["JEHOVÁ es mi pastor; nada me faltará.", "En lugares de delicados pastos me hará yacer: Junto á aguas de reposo me pastoreará.", "Confortará mi alma; Guiárame por sendas de justicia por amor de su nombre.", "Aunque ande en valle de sombra de muerte, no temeré mal alguno; porque tú estarás conmigo: Tu vara y tu cayado me infundirán aliento.", "Aderezarás mesa delante de mí, en presencia de mis angustiadores: Ungiste mi cabeza con aceite: mi copa está rebosando.", "Ciertamente el bien y la misericordia me seguirán todos los días de mi vida: Y en la casa de Jehová moraré por largos días."] } },
  PHP: { es: "Filipenses", en: "Philippians", chapters: { 4: ["Así que, hermanos míos amados y deseados, gozo y corona mía, estad así firmes en el Señor, amados.", "Regocijaos en el Señor siempre: otra vez digo: Que os regocijéis.", "Por nada estéis afanosos; sino sean notorias vuestras peticiones delante de Dios en toda oración y ruego, con hacimiento de gracias.", "Y la paz de Dios, que sobrepuja todo entendimiento, guardará vuestros corazones y vuestros entendimientos en Cristo Jesús."] } }
};

// KJV is used for the English experience; RV1909 remains the Spanish source.
// Both translations are in the public domain.
const englishDayScripture = [
  { ref: "John 1:1-5", verse: "In the beginning was the Word, and the Word was with God, and the Word was God." },
  { ref: "John 1:29", verse: "Behold the Lamb of God, which taketh away the sin of the world." },
  { ref: "John 3:16-17", verse: "For God so loved the world, that he gave his only begotten Son..." },
  { ref: "John 4:13-14", verse: "Whosoever drinketh of the water that I shall give him shall never thirst." },
  { ref: "John 6:35", verse: "I am the bread of life: he that cometh to me shall never hunger." },
  { ref: "John 10:11", verse: "I am the good shepherd: the good shepherd giveth his life for the sheep." },
  { ref: "John 14:6", verse: "I am the way, the truth, and the life: no man cometh unto the Father, but by me." }
];

const peaceAnxietyDays = [
  { ref: { es: "Filipenses 4:6-7", en: "Philippians 4:6-7" }, title: { es: "Orar antes de afanarse", en: "Pray before anxiety rules" }, verse: { es: "Por nada estéis afanosos; sino sean notorias vuestras peticiones delante de Dios en toda oración y ruego, con hacimiento de gracias.", en: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." }, context: { es: "Pablo no niega la carga real de la ansiedad; nos enseña a llevarla delante de Dios con gratitud y dependencia.", en: "Paul does not deny the real weight of anxiety; he teaches us to bring it before God with thanksgiving and dependence." }, reflect: { es: "¿Qué preocupación puedes transformar hoy en una petición concreta delante del Padre?", en: "What worry can you turn into a specific request before the Father today?" }, prayer: { es: "Padre, recibo tu invitación a orar. Guarda mi corazón en Cristo mientras te entrego mis cargas. Amén.", en: "Father, I receive Your invitation to pray. Guard my heart in Christ as I bring You my burdens. Amen." } },
  { ref: { es: "Mateo 6:33", en: "Matthew 6:33" }, title: { es: "Buscar primero el Reino", en: "Seek the kingdom first" }, verse: { es: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", en: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." }, context: { es: "Jesús nos llama a ordenar las prioridades: el Padre conoce nuestras necesidades y nos enseña a vivir bajo su cuidado.", en: "Jesus calls us to order our priorities: the Father knows our needs and teaches us to live under His care." }, reflect: { es: "¿Qué decisión práctica mostraría hoy que el Reino de Dios va primero?", en: "What practical decision today would show that God's kingdom comes first?" }, prayer: { es: "Señor Jesús, enséñame a buscar primero tu Reino y a confiar mis necesidades al Padre. Amén.", en: "Lord Jesus, teach me to seek Your kingdom first and entrust my needs to the Father. Amen." } },
  { ref: { es: "Salmo 23:1-4", en: "Psalm 23:1-4" }, title: { es: "El Pastor en el valle", en: "The Shepherd in the valley" }, verse: { es: "Aunque ande en valle de sombra de muerte, no temeré mal alguno; porque tú estarás conmigo.", en: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me." }, context: { es: "La paz bíblica no depende de evitar todo valle, sino de caminar con el Pastor que guía, restaura y acompaña.", en: "Biblical peace does not depend on avoiding every valley, but on walking with the Shepherd who guides, restores, and stays near." }, reflect: { es: "¿En qué valle necesitas recordar que Cristo, tu buen Pastor, no te abandona?", en: "In what valley do you need to remember that Christ, your good Shepherd, does not abandon you?" }, prayer: { es: "Buen Pastor, acompáñame en este valle. Restaura mi alma y guíame por sendas de justicia. Amén.", en: "Good Shepherd, stay with me in this valley. Restore my soul and lead me in paths of righteousness. Amen." } },
  { ref: { es: "Juan 14:27", en: "John 14:27" }, title: { es: "La paz de Cristo", en: "The peace of Christ" }, verse: { es: "La paz os dejo, mi paz os doy: no como el mundo la da, yo os la doy.", en: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you." }, context: { es: "Jesús habla de paz antes de la cruz. Su paz no es escapismo; nace de su presencia, su victoria y su promesa.", en: "Jesus speaks of peace before the cross. His peace is not escape; it comes from His presence, victory, and promise." }, reflect: { es: "¿Qué diferencia hay entre anestesiar tu ansiedad y recibir la paz de Cristo?", en: "What is the difference between numbing anxiety and receiving Christ's peace?" }, prayer: { es: "Jesús, no quiero una paz superficial. Dame tu paz y un corazón que confía en tu palabra. Amén.", en: "Jesus, I do not want shallow peace. Give me Your peace and a heart that trusts Your word. Amen." } },
  { ref: { es: "1 Pedro 5:6-7", en: "1 Peter 5:6-7" }, title: { es: "Echar la ansiedad sobre Él", en: "Cast anxiety on Him" }, verse: { es: "Echando toda vuestra solicitud en él, porque él tiene cuidado de vosotros.", en: "Casting all your care upon him; for he careth for you." }, context: { es: "La humildad cristiana reconoce que no somos suficientes para cargarlo todo. Dios cuida a sus hijos.", en: "Christian humility admits we are not enough to carry everything. God cares for His children." }, reflect: { es: "¿Qué carga sigues sosteniendo como si dependiera solamente de ti?", en: "What burden are you still carrying as if it depended only on you?" }, prayer: { es: "Padre, me humillo bajo tu mano. Te entrego mis cuidados porque tú cuidas de mí. Amén.", en: "Father, I humble myself under Your hand. I cast my cares on You because You care for me. Amen." } },
  { ref: { es: "Isaías 26:3-4", en: "Isaiah 26:3-4" }, title: { es: "Mente afirmada en Dios", en: "A mind stayed on God" }, verse: { es: "Tú le guardarás en completa paz, cuyo pensamiento en ti persevera; porque en ti se ha confiado.", en: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee." }, context: { es: "La mente necesita ancla. La Escritura nos vuelve una y otra vez al Dios eterno, no al ruido de la preocupación.", en: "The mind needs an anchor. Scripture turns us again and again to the everlasting God, not the noise of worry." }, reflect: { es: "¿Qué verdad bíblica necesitas repetir cuando tu mente corre sin descanso?", en: "What biblical truth do you need to repeat when your mind races without rest?" }, prayer: { es: "Dios eterno, afirma mi pensamiento en ti. Enséñame a confiar cuando mi mente se dispersa. Amén.", en: "Everlasting God, keep my mind stayed on You. Teach me to trust when my thoughts scatter. Amen." } },
  { ref: { es: "Romanos 8:38-39", en: "Romans 8:38-39" }, title: { es: "Nada nos separa", en: "Nothing can separate us" }, verse: { es: "Ni lo alto, ni lo bajo, ni ninguna criatura nos podrá apartar del amor de Dios, que es en Cristo Jesús Señor nuestro.", en: "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord." }, context: { es: "La seguridad final del creyente no descansa en sentir control, sino en el amor de Dios revelado en Cristo.", en: "The believer's final security does not rest in feeling control, but in God's love revealed in Christ." }, reflect: { es: "¿Cómo cambiaría tu día recordar que tu ansiedad no tiene la última palabra?", en: "How would your day change if you remembered anxiety does not have the final word?" }, prayer: { es: "Señor, afirma mi esperanza en tu amor inquebrantable en Cristo Jesús. Amén.", en: "Lord, anchor my hope in Your unbreakable love in Christ Jesus. Amen." } }
];

const prayerDays = [
  { ref: { es: "Mateo 6:9-13", en: "Matthew 6:9-13" }, title: { es: "Padre nuestro", en: "Our Father" }, verse: { es: "Padre nuestro que estás en los cielos, santificado sea tu nombre.", en: "Our Father which art in heaven, Hallowed be thy name." }, context: { es: "Jesús empieza la oración con relación y adoración. Antes de pedir, recordamos quién es Dios.", en: "Jesus begins prayer with relationship and worship. Before asking, we remember who God is." }, reflect: { es: "¿Tu oración empieza más con tus urgencias o con la grandeza del Padre?", en: "Does your prayer begin more with your urgency or with the Father's greatness?" }, prayer: { es: "Padre nuestro, santifica tu nombre en mi vida. Enséñame a acercarme a ti con confianza y reverencia. Amén.", en: "Our Father, hallow Your name in my life. Teach me to come to You with confidence and reverence. Amen." } },
  { ref: { es: "Lucas 11:1-4", en: "Luke 11:1-4" }, title: { es: "Enséñanos a orar", en: "Teach us to pray" }, verse: { es: "Señor, enséñanos a orar, como también Juan enseñó a sus discípulos.", en: "Lord, teach us to pray, as John also taught his disciples." }, context: { es: "Los discípulos no fingen saberlo todo. La oración se aprende caminando con Jesús.", en: "The disciples do not pretend to know everything. Prayer is learned by walking with Jesus." }, reflect: { es: "¿Dónde necesitas dejar de evaluarte y simplemente pedir: Señor, enséñame?", en: "Where do you need to stop grading yourself and simply ask: Lord, teach me?" }, prayer: { es: "Señor Jesús, enséñame a orar. Forma en mí una vida sencilla, sincera y dependiente. Amén.", en: "Lord Jesus, teach me to pray. Form in me a simple, sincere, dependent life. Amen." } },
  { ref: { es: "Marcos 1:35", en: "Mark 1:35" }, title: { es: "Buscar al Padre en secreto", en: "Seek the Father in secret" }, verse: { es: "Levantándose muy de mañana, aun muy de noche, salió y se fue a un lugar desierto, y allí oraba.", en: "And in the morning, rising up a great while before day, he went out... and there prayed." }, context: { es: "Jesús ora en medio de un ministerio lleno de demandas. La comunión con el Padre sostiene la misión.", en: "Jesus prays amid a ministry full of demands. Communion with the Father sustains the mission." }, reflect: { es: "¿Qué pequeño espacio puedes apartar para estar con Dios sin ruido?", en: "What small space can you set apart to be with God without noise?" }, prayer: { es: "Padre, ayúdame a buscarte en lo secreto. Ordena mi agenda alrededor de tu presencia. Amén.", en: "Father, help me seek You in secret. Order my schedule around Your presence. Amen." } },
  { ref: { es: "Lucas 22:41-42", en: "Luke 22:41-42" }, title: { es: "No mi voluntad", en: "Not my will" }, verse: { es: "Padre, si quieres, pasa este vaso de mí; empero no se haga mi voluntad, sino la tuya.", en: "Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done." }, context: { es: "En Getsemaní, Jesús ora con honestidad y obediencia. La fe no es negar el dolor, sino rendirse al Padre.", en: "In Gethsemane, Jesus prays with honesty and obedience. Faith is not denying pain, but yielding to the Father." }, reflect: { es: "¿Qué deseo necesitas presentar con honestidad y rendir con confianza?", en: "What desire do you need to present honestly and surrender trustingly?" }, prayer: { es: "Padre, aquí está mi deseo. Haz tu voluntad en mí, y sostenme en Cristo para obedecerte. Amén.", en: "Father, here is my desire. Do Your will in me, and sustain me in Christ to obey You. Amen." } },
  { ref: { es: "Juan 17:20-23", en: "John 17:20-23" }, title: { es: "Jesús intercede", en: "Jesus intercedes" }, verse: { es: "Mas no ruego solamente por éstos, sino también por los que han de creer en mí por la palabra de ellos.", en: "Neither pray I for these alone, but for them also which shall believe on me through their word." }, context: { es: "Antes de la cruz, Jesús ora por quienes creerían. Nuestra oración nace de un Salvador que ya intercede.", en: "Before the cross, Jesus prays for those who would believe. Our prayer rises from a Savior who already intercedes." }, reflect: { es: "¿Cómo cambia tu confianza saber que Jesús ora por los suyos?", en: "How does your confidence change knowing Jesus prays for His own?" }, prayer: { es: "Jesús, gracias porque intercedes por tu pueblo. Hazme amar, perdonar y caminar en unidad verdadera. Amén.", en: "Jesus, thank You for interceding for Your people. Teach me to love, forgive, and walk in true unity. Amen." } },
  { ref: { es: "Hebreos 4:14-16", en: "Hebrews 4:14-16" }, title: { es: "Acercarnos con confianza", en: "Draw near with confidence" }, verse: { es: "Lleguémonos pues confiadamente al trono de la gracia, para alcanzar misericordia.", en: "Let us therefore come boldly unto the throne of grace, that we may obtain mercy." }, context: { es: "Cristo es nuestro gran Sumo Sacerdote. Nos acercamos no por mérito propio, sino por su obra suficiente.", en: "Christ is our great High Priest. We draw near not by our merit, but by His sufficient work." }, reflect: { es: "¿Qué te impide acercarte hoy al trono de la gracia?", en: "What is keeping you from drawing near to the throne of grace today?" }, prayer: { es: "Cristo, por tu gracia me acerco. Dame misericordia y socorro oportuno para este día. Amén.", en: "Christ, by Your grace I draw near. Give me mercy and timely help for this day. Amen." } },
  { ref: { es: "1 Juan 5:14-15", en: "1 John 5:14-15" }, title: { es: "Pedir conforme a su voluntad", en: "Ask according to His will" }, verse: { es: "Si demandáremos alguna cosa conforme a su voluntad, él nos oye.", en: "If we ask any thing according to his will, he heareth us." }, context: { es: "La oración bíblica no intenta controlar a Dios; busca alinearse con su voluntad revelada.", en: "Biblical prayer does not try to control God; it seeks alignment with His revealed will." }, reflect: { es: "¿Qué petición necesitas reformar a la luz de la Palabra?", en: "What request do you need to reshape in light of Scripture?" }, prayer: { es: "Señor, ordena mis peticiones conforme a tu voluntad. Hazme confiar en tu sabiduría y bondad. Amén.", en: "Lord, order my requests according to Your will. Teach me to trust Your wisdom and goodness. Amen." } }
];

const devotionalJourneys = {
  "meet-jesus": {
    icon: "✝",
    title: { es: "Conocer a Jesús", en: "Meeting Jesus" },
    intro: { es: "Siete encuentros en el Evangelio de Juan para mirar a Cristo antes de mirarnos a nosotros mismos.", en: "Seven encounters in John's Gospel that invite us to look at Christ before looking at ourselves." },
    days
  },
  "peace-anxiety": {
    icon: "☼",
    title: { es: "Ansiedad y paz bíblica", en: "Anxiety and biblical peace" },
    intro: { es: "Un camino para llevar las cargas a Dios y recibir la paz de Cristo sin promesas vacías.", en: "A path for bringing burdens to God and receiving Christ's peace without empty promises." },
    days: peaceAnxietyDays
  },
  "learn-prayer": {
    icon: "✎",
    title: { es: "Aprender a orar con Jesús", en: "Learning to pray with Jesus" },
    intro: { es: "Siete pasos para formar una oración sencilla, bíblica, honesta y rendida al Padre.", en: "Seven steps toward prayer that is simple, biblical, honest, and yielded to the Father." },
    days: prayerDays
  }
};

const devotionalDepth = {
  "meet-jesus": [
    {
      visual: "light",
      caption: { es: "Una luz antes de todo comienzo", en: "A light before every beginning" },
      scene: { es: "Antes de Belén, antes de los caminos de Galilea, antes de cualquier milagro visible, Juan nos lleva al principio. No empieza con una cuna, sino con eternidad. El Verbo estaba con Dios y era Dios. La escena es silenciosa y majestuosa: toda vida, toda luz y toda verdad encuentran su origen en Cristo.", en: "Before Bethlehem, before the roads of Galilee, before any visible miracle, John takes us to the beginning. He does not start with a manger, but with eternity. The Word was with God and was God. The scene is quiet and majestic: all life, light, and truth find their origin in Christ." },
      teaching: { es: "Jesús no es una ayuda espiritual añadida a tu día; Él es el Señor que sostiene la realidad. Cuando comienzas con Cristo, no estás huyendo de la vida diaria: estás mirando la vida desde su centro correcto.", en: "Jesus is not a spiritual add-on to your day; He is the Lord who sustains reality. When you begin with Christ, you are not escaping daily life; you are seeing life from its rightful center." },
      practice: { es: "Antes de revisar mensajes o tareas, detente treinta segundos y repite: Jesús, tú eres la luz verdadera. Luego entrega una preocupación concreta a su señorío.", en: "Before checking messages or tasks, pause for thirty seconds and repeat: Jesus, You are the true light. Then entrust one concrete concern to His lordship." }
    },
    {
      visual: "lamb",
      caption: { es: "El Cordero señalado en medio del camino", en: "The Lamb pointed out along the road" },
      scene: { es: "Juan el Bautista ve venir a Jesús y no se señala a sí mismo. Toda su misión se resume en dirigir la mirada de otros hacia Cristo. En una frase, cambia el centro: no mi esfuerzo, no mi fama, no mi limpieza personal, sino el Cordero de Dios que quita el pecado.", en: "John the Baptist sees Jesus coming and does not point to himself. His whole mission is summarized in directing others toward Christ. In one sentence, he shifts the center: not my effort, fame, or self-cleansing, but the Lamb of God who takes away sin." },
      teaching: { es: "El evangelio no empieza con esconder la culpa, sino con mirar a quien la cargó. La gracia no minimiza el pecado; lo lleva a la cruz y nos llama a vivir una vida nueva.", en: "The gospel does not begin by hiding guilt, but by looking to the One who carried it. Grace does not minimize sin; it brings it to the cross and calls us into new life." },
      practice: { es: "Nombra delante de Dios una culpa o vergüenza que has convertido en identidad. Ora: Cristo, esto no define mi nombre; tu obra me llama a caminar en luz.", en: "Name before God one guilt or shame you have turned into identity. Pray: Christ, this does not define my name; Your work calls me to walk in the light." }
    },
    {
      visual: "love",
      caption: { es: "El amor de Dios entregado en el Hijo", en: "The love of God given in the Son" },
      scene: { es: "Nicodemo llega de noche, con preguntas grandes y reputación que cuidar. Jesús no lo entretiene con religión complicada; le muestra el corazón del Padre. Dios amó, Dios dio, Dios salva. En la noche de un hombre religioso aparece una claridad que ninguna credencial podía producir.", en: "Nicodemus comes by night, carrying great questions and a reputation to protect. Jesus does not entertain him with complicated religion; He shows him the Father's heart. God loved, God gave, God saves. In the night of a religious man, a light appears that no credential could produce." },
      teaching: { es: "La vida cristiana no se sostiene en ganarse el amor de Dios, sino en recibir por fe al Hijo que el Padre dio. La obediencia nace mejor cuando primero descansamos en la gracia.", en: "The Christian life is not sustained by earning God's love, but by receiving by faith the Son the Father gave. Obedience grows best when we first rest in grace." },
      practice: { es: "Escribe una frase sencilla: Dios no esperó mi perfección para amarme en Cristo. Léela lentamente y deja que corrija tu manera de verte hoy.", en: "Write one simple sentence: God did not wait for my perfection to love me in Christ. Read it slowly and let it correct the way you see yourself today." }
    },
    {
      visual: "water",
      caption: { es: "Agua viva para una sed profunda", en: "Living water for a deep thirst" },
      scene: { es: "Junto al pozo, Jesús se sienta con una mujer que llega a una hora incómoda, quizá evitando miradas. Él no la reduce a su historia rota. Le habla con verdad y misericordia, y le ofrece una vida que no depende de aprobación humana.", en: "Beside the well, Jesus sits with a woman who arrives at an uncomfortable hour, perhaps avoiding eyes. He does not reduce her to her broken story. He speaks with truth and mercy, offering life that does not depend on human approval." },
      teaching: { es: "Cristo conoce la sed que intentamos tapar con control, relaciones, logros o distracciones. Su gracia no solo perdona: también reordena nuestros deseos para que el alma vuelva a su fuente.", en: "Christ knows the thirst we try to cover with control, relationships, achievements, or distraction. His grace not only forgives; it reorders our desires so the soul returns to its source." },
      practice: { es: "Pregúntate: ¿qué estoy usando para calmar mi sed interior? Entrégalo en oración y lee el versículo otra vez, como invitación personal de Jesús.", en: "Ask yourself: what am I using to quiet my inner thirst? Bring it to prayer and read the verse again as Jesus' personal invitation." }
    },
    {
      visual: "bread",
      caption: { es: "Pan verdadero para el alma", en: "True bread for the soul" },
      scene: { es: "La multitud ha comido pan en abundancia, pero Jesús mira más hondo que el hambre física. Ellos buscan otro milagro; Él les ofrece algo mayor: a sí mismo. El regalo no termina en la mano llena, sino en el corazón satisfecho en Cristo.", en: "The crowd has eaten abundant bread, but Jesus looks deeper than physical hunger. They seek another miracle; He offers something greater: Himself. The gift does not end with a full hand, but with the heart satisfied in Christ." },
      teaching: { es: "Podemos buscar a Dios solo por alivio, respuesta o provisión. Jesús nos invita a recibirlo como el sustento principal, no como un medio para llegar a otra cosa.", en: "We can seek God only for relief, answers, or provision. Jesus invites us to receive Him as our main sustenance, not as a means to something else." },
      practice: { es: "Antes de pedir algo hoy, adora a Cristo por quien es. Di tres atributos de Jesús y deja que tus peticiones nazcan desde esa adoración.", en: "Before asking for something today, worship Christ for who He is. Name three attributes of Jesus and let your requests rise from that worship." }
    },
    {
      visual: "shepherd",
      caption: { es: "El Pastor que conoce y guía", en: "The Shepherd who knows and leads" },
      scene: { es: "Jesús habla a personas cansadas de líderes que toman sin cuidar. Frente a esa realidad, se presenta como el buen Pastor: no manipula, no abandona, no usa a las ovejas. Él da su vida por ellas.", en: "Jesus speaks to people tired of leaders who take without caring. Against that reality, He presents Himself as the good Shepherd: He does not manipulate, abandon, or use the sheep. He lays down His life for them." },
      teaching: { es: "Seguir a Cristo no es perder libertad; es aprender a escuchar la voz de quien nos ama con verdad. La Palabra nos entrena para reconocer su dirección por encima de voces extrañas.", en: "Following Christ is not losing freedom; it is learning to hear the voice of the One who loves us truthfully. Scripture trains us to recognize His direction above strange voices." },
      practice: { es: "Piensa en una decisión actual. Escribe: ¿qué voz estoy siguiendo? Luego contrasta esa voz con el carácter de Jesús revelado en la Escritura.", en: "Think of one current decision. Write: whose voice am I following? Then compare that voice with the character of Jesus revealed in Scripture." }
    },
    {
      visual: "road",
      caption: { es: "El camino que conduce al Padre", en: "The way that leads to the Father" },
      scene: { es: "Los discípulos sienten incertidumbre. Jesús habla de partida, morada y camino. Tomás expresa lo que muchos callan: no sabemos a dónde vas. La respuesta de Jesús no es un mapa complicado, sino una persona: Yo soy el camino.", en: "The disciples feel uncertainty. Jesus speaks of departure, dwelling, and the way. Thomas voices what many hide: we do not know where You are going. Jesus' answer is not a complicated map, but a person: I am the way." },
      teaching: { es: "La fe cristiana descansa en Cristo mismo. Él no solo enseña verdad; Él es la verdad. No solo muestra vida; Él es la vida. Volver a Él es volver al centro.", en: "Christian faith rests in Christ Himself. He does not merely teach truth; He is the truth. He does not merely point to life; He is the life. Returning to Him is returning to the center." },
      practice: { es: "Haz una oración de rendición con una área concreta: Jesús, sé el camino en mis decisiones, la verdad en mis pensamientos y la vida en mis deseos.", en: "Pray a prayer of surrender over one concrete area: Jesus, be the way in my decisions, the truth in my thoughts, and the life in my desires." }
    }
  ],
  "peace-anxiety": [
    {
      visual: "hands",
      caption: { es: "Manos abiertas delante de Dios", en: "Open hands before God" },
      scene: { es: "Imagina a una comunidad pequeña escuchando esta carta en medio de presiones reales. Pablo no escribe desde una vida cómoda; escribe desde cadenas. Aun así, les enseña a convertir la ansiedad en oración específica delante de Dios.", en: "Imagine a small community hearing this letter amid real pressures. Paul is not writing from a comfortable life; he writes from chains. Even so, he teaches them to turn anxiety into specific prayer before God." },
      teaching: { es: "La paz bíblica no es negar lo que duele. Es llevarlo, con nombre y apellido, al Dios que gobierna sobre nosotros en Cristo.", en: "Biblical peace is not denying what hurts. It is bringing it, by name, to the God who reigns over us in Christ." },
      practice: { es: "Haz una lista de tres preocupaciones. Al lado de cada una, escribe una petición breve y una gratitud concreta.", en: "List three worries. Beside each one, write a brief request and one concrete thanksgiving." }
    },
    {
      visual: "kingdom",
      caption: { es: "Un Reino más firme que la preocupación", en: "A kingdom steadier than worry" },
      scene: { es: "Jesús habla a personas que saben lo que es necesitar pan, ropa y seguridad. No les dice que esas cosas no importan. Les muestra que el Padre las conoce, y que el corazón necesita una prioridad más alta que el miedo.", en: "Jesus speaks to people who know what it is to need bread, clothing, and safety. He does not say those things do not matter. He shows that the Father knows them, and that the heart needs a higher priority than fear." },
      teaching: { es: "Buscar primero el Reino no elimina todas las responsabilidades; las pone bajo el gobierno amoroso de Dios.", en: "Seeking the kingdom first does not remove every responsibility; it places them under God's loving rule." },
      practice: { es: "Escoge una responsabilidad que te pesa. Pregunta: ¿cómo se vería obedecer a Cristo aquí, sin dejar que el miedo mande?", en: "Choose one responsibility that feels heavy. Ask: what would obeying Christ here look like without letting fear rule?" }
    },
    {
      visual: "valley",
      caption: { es: "El Pastor en el valle oscuro", en: "The Shepherd in the dark valley" },
      scene: { es: "El Salmo 23 no promete una vida sin valle. La imagen es más honesta: hay sombra, hay camino, hay vulnerabilidad. Pero en el centro de la escena aparece una presencia: tú estarás conmigo.", en: "Psalm 23 does not promise a life without valleys. The image is more honest: there is shadow, path, and vulnerability. But at the center of the scene there is a presence: Thou art with me." },
      teaching: { es: "La compañía de Dios no siempre cambia el paisaje de inmediato, pero cambia al caminante. Cristo, el buen Pastor, guía sin abandonar.", en: "God's companionship does not always change the landscape immediately, but it changes the traveler. Christ, the good Shepherd, guides without abandoning." },
      practice: { es: "Respira lentamente y repite tres veces: Tú estás conmigo. Luego nombra el valle específico donde necesitas recordar esa verdad.", en: "Breathe slowly and repeat three times: Thou art with me. Then name the specific valley where you need to remember that truth." }
    },
    {
      visual: "peace",
      caption: { es: "Una paz distinta a la del mundo", en: "A peace unlike the world's" },
      scene: { es: "Jesús habla de paz en una noche cargada de traición, despedida y temor. No ofrece una técnica para controlar todo. Entrega su propia paz: una paz que puede sostener el corazón aun cuando el entorno tiembla.", en: "Jesus speaks of peace on a night heavy with betrayal, farewell, and fear. He does not offer a technique for controlling everything. He gives His own peace: a peace that can sustain the heart even when surroundings shake." },
      teaching: { es: "La paz de Cristo no depende de que todo sea predecible. Depende de que Él es fiel, presente y vencedor.", en: "The peace of Christ does not depend on everything being predictable. It depends on Him being faithful, present, and victorious." },
      practice: { es: "Identifica una forma en que buscas paz rápida. Sustitúyela hoy por cinco minutos de lectura lenta y oración sincera.", en: "Identify one way you seek quick peace. Replace it today with five minutes of slow reading and honest prayer." }
    },
    {
      visual: "burden",
      caption: { es: "La carga puesta en las manos del Padre", en: "The burden placed in the Father's hands" },
      scene: { es: "Pedro escribe a creyentes bajo presión. Su llamado es humilde: no cargar como si fuéramos Dios. Echar la ansiedad sobre Él es reconocer que somos personas amadas, no quienes sostienen su propia vida.", en: "Peter writes to believers under pressure. His call is humble: do not carry things as if we were God. Casting anxiety on Him means admitting we are beloved people, not the ones who sustain our own lives." },
      teaching: { es: "La autosuficiencia alimenta la ansiedad. La humildad aprende a descargar el alma delante del Padre.", en: "Self-sufficiency feeds anxiety. Humility learns to unload the soul before the Father." },
      practice: { es: "Abre tus manos físicamente por unos segundos. Ora una frase por cada carga que estás soltando.", en: "Open your hands physically for a few seconds. Pray one sentence for each burden you are releasing." }
    },
    {
      visual: "mind",
      caption: { es: "La mente anclada en Dios", en: "The mind anchored in God" },
      scene: { es: "Isaías canta confianza en medio de un mundo inestable. La mente puede correr de amenaza en amenaza, pero la fe aprende a perseverar en Dios, como un ancla que no niega la tormenta, pero se afirma más profundo.", en: "Isaiah sings trust in an unstable world. The mind can run from threat to threat, but faith learns to stay on God, like an anchor that does not deny the storm but holds deeper." },
      teaching: { es: "No todo pensamiento merece gobernarte. La Palabra de Dios entrena la mente para volver a lo verdadero.", en: "Not every thought deserves to govern you. God's Word trains the mind to return to what is true." },
      practice: { es: "Escribe un pensamiento ansioso y debajo una verdad bíblica que lo confronte. Léela en voz baja.", en: "Write one anxious thought and beneath it a biblical truth that confronts it. Read it quietly aloud." }
    },
    {
      visual: "secure",
      caption: { es: "Seguros en el amor de Cristo", en: "Secure in the love of Christ" },
      scene: { es: "Romanos 8 sube como una declaración de victoria. Pablo mira amenazas grandes: muerte, vida, poderes, presente, porvenir. Ninguna tiene autoridad para separar al creyente del amor de Dios en Cristo.", en: "Romans 8 rises like a declaration of victory. Paul looks at great threats: death, life, powers, present, future. None has authority to separate the believer from God's love in Christ." },
      teaching: { es: "La ansiedad habla como si tuviera la última palabra. El evangelio responde: la última palabra pertenece al amor de Dios en Cristo Jesús.", en: "Anxiety speaks as if it has the final word. The gospel replies: the final word belongs to God's love in Christ Jesus." },
      practice: { es: "Termina el camino escribiendo una confesión breve: En Cristo, no estoy separado del amor de Dios, aun cuando siento temor.", en: "End the journey by writing a brief confession: In Christ, I am not separated from God's love, even when I feel fear." }
    }
  ],
  "learn-prayer": [
    {
      visual: "father",
      caption: { es: "La oración empieza en el Padre", en: "Prayer begins with the Father" },
      scene: { es: "Jesús no entrega una fórmula fría. Abre una puerta: Padre nuestro. La oración cristiana comienza con pertenencia y reverencia. Antes de explicar necesidades, el alma recuerda que se acerca al Dios santo que recibe a sus hijos.", en: "Jesus does not hand us a cold formula. He opens a door: Our Father. Christian prayer begins with belonging and reverence. Before explaining needs, the soul remembers it comes to the holy God who receives His children." },
      teaching: { es: "Orar es acercarse al Padre por medio del Hijo. La confianza no elimina la reverencia; la hace más hermosa.", en: "To pray is to draw near to the Father through the Son. Confidence does not remove reverence; it makes it more beautiful." },
      practice: { es: "Hoy ora despacio el Padre Nuestro. Haz una pausa después de cada frase y conviértela en una oración propia.", en: "Pray the Lord's Prayer slowly today. Pause after each phrase and turn it into your own prayer." }
    },
    {
      visual: "disciple",
      caption: { es: "Discípulos aprendiendo a orar", en: "Disciples learning to pray" },
      scene: { es: "Los discípulos ven a Jesús orar y sienten una carencia santa: Señor, enséñanos. No piden una técnica para impresionar; piden aprender el lenguaje de la dependencia.", en: "The disciples see Jesus pray and feel a holy lack: Lord, teach us. They do not ask for a technique to impress; they ask to learn the language of dependence." },
      teaching: { es: "La oración madura empieza con humildad. No hay vergüenza en aprender; hay gracia en ser enseñados por Cristo.", en: "Mature prayer begins with humility. There is no shame in learning; there is grace in being taught by Christ." },
      practice: { es: "Haz una oración de una sola línea varias veces durante el día: Señor, enséñame a orar en esto.", en: "Pray a one-line prayer several times today: Lord, teach me to pray in this." }
    },
    {
      visual: "quiet",
      caption: { es: "Un lugar quieto antes del día", en: "A quiet place before the day" },
      scene: { es: "Mientras otros duermen, Jesús se aparta. El ministerio lo busca, las necesidades lo rodean, pero Él se retira para estar con el Padre. La escena no es escape; es comunión que sostiene la obediencia.", en: "While others sleep, Jesus withdraws. Ministry seeks Him, needs surround Him, yet He goes away to be with the Father. The scene is not escape; it is communion sustaining obedience." },
      teaching: { es: "La oración no compite con la vida activa; la sostiene. El lugar secreto ordena el corazón antes de entrar al ruido.", en: "Prayer does not compete with active life; it sustains it. The secret place orders the heart before entering the noise." },
      practice: { es: "Elige un momento pequeño y realista para mañana. No busques perfección: busca presencia fiel.", en: "Choose one small, realistic moment for tomorrow. Do not seek perfection: seek faithful presence." }
    },
    {
      visual: "surrender",
      caption: { es: "La voluntad rendida en Getsemaní", en: "The surrendered will in Gethsemane" },
      scene: { es: "Getsemaní no es una escena pulida. Hay angustia, soledad y una petición honesta. Jesús no oculta el peso del vaso, pero entrega su voluntad al Padre. La obediencia nace en oración.", en: "Gethsemane is not a polished scene. There is anguish, loneliness, and an honest request. Jesus does not hide the weight of the cup, yet He yields His will to the Father. Obedience is born in prayer." },
      teaching: { es: "La oración bíblica permite honestidad sin rebeldía. Podemos decir lo que sentimos y aun así rendirnos al Padre bueno.", en: "Biblical prayer allows honesty without rebellion. We can say what we feel and still surrender to the good Father." },
      practice: { es: "Completa esta frase por escrito: Padre, deseo ____, pero confío en ti con ____.", en: "Complete this sentence in writing: Father, I desire ____, but I trust You with ____." }
    },
    {
      visual: "intercede",
      caption: { es: "Jesús ora por los suyos", en: "Jesus prays for His own" },
      scene: { es: "Antes de la cruz, Jesús ora mirando más allá de la habitación. Piensa en quienes creerían por la palabra de sus discípulos. Esa oración alcanza generaciones. El creyente ora desde una realidad previa: Cristo intercede.", en: "Before the cross, Jesus prays beyond the room. He thinks of those who would believe through His disciples' word. That prayer reaches generations. The believer prays from a prior reality: Christ intercedes." },
      teaching: { es: "No oras solo. La vida de oración descansa en el Salvador que ora por su pueblo y lo guarda en el amor del Padre.", en: "You do not pray alone. The life of prayer rests on the Savior who prays for His people and keeps them in the Father's love." },
      practice: { es: "Ora por una persona específica, no de forma vaga. Pide que conozca más a Cristo y camine en la verdad.", en: "Pray for one specific person, not vaguely. Ask that they know Christ more and walk in the truth." }
    },
    {
      visual: "throne",
      caption: { es: "Trono de gracia, no de condena", en: "A throne of grace, not condemnation" },
      scene: { es: "Hebreos nos muestra a Cristo como Sumo Sacerdote. El trono de Dios no es presentado al creyente como una puerta cerrada, sino como el lugar donde se recibe misericordia y socorro oportuno.", en: "Hebrews shows Christ as High Priest. God's throne is not presented to the believer as a closed door, but as the place where mercy and timely help are received." },
      teaching: { es: "La seguridad para orar no viene de sentirnos fuertes, sino de tener a Cristo como mediador perfecto.", en: "Confidence to pray does not come from feeling strong, but from having Christ as the perfect mediator." },
      practice: { es: "Acércate con una necesidad concreta. Pide misericordia primero, ayuda después, y termina agradeciendo por Cristo.", en: "Draw near with one concrete need. Ask first for mercy, then for help, and end by giving thanks for Christ." }
    },
    {
      visual: "will",
      caption: { es: "La voluntad de Dios formando nuestras peticiones", en: "God's will shaping our requests" },
      scene: { es: "Juan escribe con ternura pastoral. La oración no es una forma de torcer el brazo de Dios; es confianza filial que aprende a pedir conforme a su voluntad. La Palabra forma el deseo.", en: "John writes with pastoral tenderness. Prayer is not a way to twist God's arm; it is childlike confidence learning to ask according to His will. The Word forms desire." },
      teaching: { es: "Crecer en oración es desear cada vez más lo que Dios ama. No oramos menos; oramos mejor, con el corazón educado por la Escritura.", en: "Growing in prayer means increasingly desiring what God loves. We do not pray less; we pray better, with hearts educated by Scripture." },
      practice: { es: "Revisa una petición importante y pregúntate: ¿cómo puedo alinearla con el carácter y la voluntad revelada de Dios?", en: "Review an important request and ask: how can I align this with God's revealed character and will?" }
    }
  ]
};

const homeShelves = [
  {
    titleKey: "forToday",
    items: [
      { title: { es: "Tu devocional de hoy", en: "Today's devotional" }, subtitle: { es: "Lectura, enseñanza y oración", en: "Reading, teaching, and prayer" }, visual: "light", icon: "✝", image: "assets/covers/cover-path-sunrise.png", route: "devotional" },
      { title: { es: "Continuar la Biblia", en: "Continue the Bible" }, subtitle: { es: "Retoma tu última lectura", en: "Pick up your last reading" }, visual: "book", icon: "▦", image: "assets/covers/cover-start-bible.png", route: "bible" },
      { title: { es: "Escribir una oración", en: "Write a prayer" }, subtitle: { es: "Diario privado", en: "Private journal" }, visual: "prayer", icon: "✎", image: "assets/covers/cover-prayer-window.png", route: "journal" }
    ]
  },
  {
    titleKey: "pathsWithJesus",
    items: [
      { title: { es: "Conocer a Jesús", en: "Meeting Jesus" }, subtitle: { es: "7 días en Juan", en: "7 days in John" }, visual: "road", icon: "✝", image: "assets/covers/cover-family-walk.png", route: "journey", journey: "meet-jesus" },
      { title: { es: "Ansiedad y paz bíblica", en: "Anxiety and biblical peace" }, subtitle: { es: "Lleva tus cargas a Dios", en: "Bring your burdens to God" }, visual: "peace", icon: "☼", image: "assets/covers/cover-path-sunrise.png", route: "journey", journey: "peace-anxiety" },
      { title: { es: "Aprender a orar con Jesús", en: "Learning to pray with Jesus" }, subtitle: { es: "Oración bíblica y sencilla", en: "Simple biblical prayer" }, visual: "quiet", icon: "✎", image: "assets/covers/cover-prayer-window.png", route: "journey", journey: "learn-prayer" }
    ]
  },
  {
    titleKey: "guidedPrayers",
    items: [
      { title: { es: "Momentos de oración", en: "Prayer moments" }, subtitle: { es: "Oraciones guiadas según lo que estás viviendo", en: "Guided prayers for what you are carrying" }, visual: "prayer", icon: "✦", image: "assets/covers/cover-prayer-window.png", route: "moment" },
      { title: { es: "Oración eficaz", en: "Effective prayer" }, subtitle: { es: "12 claves para crecer", en: "12 keys for growth" }, visual: "hands", icon: "✎", image: "assets/covers/cover-prayer-window.png", route: "prayer" },
      { title: { es: "Paz nocturna", en: "Night peace" }, subtitle: { es: "30 noches para descansar", en: "30 nights for rest" }, visual: "night", icon: "☾", image: "assets/covers/cover-sleep-window.png", route: "sleep" }
    ]
  },
  {
    titleKey: "startBible",
    items: [
      { title: { es: "Crecer en sabiduría", en: "Grow in wisdom" }, subtitle: { es: "31 días en Proverbios", en: "31 days in Proverbs" }, visual: "tree", icon: "✦", image: "assets/covers/cover-start-bible.png", route: "wisdom" },
      { title: { es: "Explora la Biblia", en: "Explore the Bible" }, subtitle: { es: "66 libros en recorrido visual", en: "66 books in a visual journey" }, visual: "gold", icon: "◈", image: "assets/covers/cover-start-bible.png", route: "overview" },
      { title: { es: "Salmos", en: "Psalms" }, subtitle: { es: "Orar con la Biblia", en: "Pray with Scripture" }, visual: "tree", icon: "♧", image: "assets/covers/cover-path-sunrise.png", route: "bible", book: "PSA", chapter: 1 },
      { title: { es: "Filipenses 4", en: "Philippians 4" }, subtitle: { es: "Gozo, oración y paz", en: "Joy, prayer, and peace" }, visual: "peace", icon: "☼", image: "assets/covers/cover-prayer-window.png", route: "bible", book: "PHP", chapter: 4 }
    ]
  },
  {
    titleKey: "familyKids",
    items: [
      { title: { es: "Historias de Jesús", en: "Stories of Jesus" }, subtitle: { es: "Para leer en familia", en: "Read as a family" }, visual: "family", icon: "♡", image: "assets/covers/cover-family-walk.png", route: "stories" },
      { title: { es: "Orar por mi familia", en: "Pray for my family" }, subtitle: { es: "Intercesión sencilla", en: "Simple intercession" }, visual: "home", icon: "✎", image: "assets/covers/cover-family-jesus-child.png", route: "moment" },
      { title: { es: "La Biblia en familia", en: "The Bible as a family" }, subtitle: { es: "Guía rápida para conversar", en: "A quick guide for conversation" }, visual: "kids", icon: "▦", image: "assets/covers/cover-jesus-children.png", route: "overview" }
    ]
  },
  {
    titleKey: "resources",
    items: [
      { title: { es: "Recursos en español", en: "Spanish resources" }, subtitle: { es: "Guías y materiales ES", en: "Guides and materials in Spanish" }, visual: "book", icon: "⇩", image: "assets/covers/cover-start-bible.png", route: "resources" },
      { title: { es: "Recursos en inglés", en: "English resources" }, subtitle: { es: "Guías y materiales EN", en: "Guides and materials in English" }, visual: "prayer", icon: "⇩", image: "assets/covers/cover-prayer-window.png", route: "resources" }
    ]
  }
];

const featuredCollections = [
  {
    title: { es: "Historias de Jesús", en: "Stories of Jesus" },
    subtitle: { es: "Relatos narrativos para leer o escuchar en familia.", en: "Narrative stories to read or listen to as a family." },
    tag: { es: "Familia", en: "Family" },
    meta: { es: "Nuevo · Audio", en: "New · Audio" },
    visual: "family",
    image: "assets/covers/cover-family-walk.png",
    route: "stories"
  },
  {
    title: { es: "Momentos de oración", en: "Prayer moments" },
    subtitle: { es: "Oraciones guiadas para lo que estás viviendo hoy.", en: "Guided prayers for what you are carrying today." },
    tag: { es: "Oración", en: "Prayer" },
    meta: { es: "Por momentos", en: "By moment" },
    visual: "prayer",
    image: "assets/covers/cover-prayer-window.png",
    route: "moment"
  },
  {
    title: { es: "Oración eficaz", en: "Effective prayer" },
    subtitle: { es: "12 claves para evaluar y fortalecer tu vida de oración.", en: "12 keys to evaluate and strengthen your prayer life." },
    tag: { es: "Oración", en: "Prayer" },
    meta: { es: "12 claves", en: "12 keys" },
    visual: "prayer",
    image: "assets/covers/cover-prayer-window.png",
    route: "prayer"
  },
  {
    title: { es: "Familia y niños", en: "Family and kids" },
    subtitle: { es: "Historias, conversación y fe para vivir en casa.", en: "Stories, conversation, and faith at home." },
    tag: { es: "Familia", en: "Family" },
    meta: { es: "En casa", en: "At home" },
    visual: "family",
    image: "assets/covers/cover-family-jesus-child.png",
    route: "stories"
  },
  {
    title: { es: "Recursos descargables", en: "Downloads" },
    subtitle: { es: "Materiales en PDF para estudiar, imprimir y compartir.", en: "PDF materials to study, print, and share." },
    tag: { es: "Recursos", en: "Downloads" },
    meta: { es: "PDF", en: "PDF" },
    visual: "book",
    image: "assets/covers/cover-start-bible.png",
    route: "resources"
  },
  {
    title: { es: "Paz nocturna", en: "Night peace" },
    subtitle: { es: "30 noches para cerrar el día con Dios y descansar en su cuidado.", en: "30 nights to close the day with God and rest in His care." },
    tag: { es: "Noche", en: "Night" },
    meta: { es: "30 noches", en: "30 nights" },
    visual: "sleep",
    image: "assets/covers/cover-sleep-window.png",
    route: "sleep"
  }
];

const homeMoments = [
  {
    id: "ansiedad",
    label: { es: "Necesito paz", en: "I need peace" },
    icon: "☁", visual: "peace", image: "assets/covers/cover-path-sunrise.png"
  },
  {
    id: "miedo",
    label: { es: "Tengo miedo", en: "I feel afraid" },
    icon: "⚡", visual: "gold", image: "assets/covers/cover-start-bible.png"
  },
  {
    id: "herida",
    label: { es: "Me hirieron", en: "I was hurt" },
    icon: "♡", visual: "rose", image: "assets/covers/cover-prayer-window.png"
  },
  {
    id: "insomnio",
    label: { es: "No puedo dormir", en: "Can't sleep" },
    icon: "☾", visual: "teal", image: "assets/covers/cover-sleep-window.png"
  },
  {
    id: "rendirse",
    label: { es: "No puedo más", en: "I can't go on" },
    icon: "○", visual: "amber", image: "assets/covers/cover-prayer-window.png"
  },
  {
    id: "decision",
    label: { es: "Necesito dirección", en: "I need direction" },
    icon: "◇", visual: "green", image: "assets/covers/cover-family-jesus-child.png"
  }
];

const experienceCategories = [
  {
    id: "walk",
    title: { es: "Caminar con Jesús", en: "Walk with Jesus" },
    subtitle: { es: "Recorridos breves para mirar a Cristo y seguirlo paso a paso.", en: "Short guided paths to behold Christ and follow Him step by step." },
    image: "assets/covers/cover-family-walk.png",
    visual: "peace",
    items: [
      { title: { es: "Conocer a Jesús", en: "Meeting Jesus" }, subtitle: { es: "7 días", en: "7 days" }, image: "assets/covers/cover-jesus-stories.png", route: "journey", journey: "meet-jesus" },
      { title: { es: "Ansiedad y paz bíblica", en: "Anxiety and biblical peace" }, subtitle: { es: "7 días", en: "7 days" }, image: "assets/covers/cover-path-sunrise.png", route: "journey", journey: "peace-anxiety" },
      { title: { es: "Aprender a orar con Jesús", en: "Learning to pray with Jesus" }, subtitle: { es: "7 pasos", en: "7 steps" }, image: "assets/covers/cover-prayer-window.png", route: "journey", journey: "learn-prayer" }
    ]
  },
  {
    id: "bible",
    title: { es: "Descubrir la Biblia", en: "Discover the Bible" },
    subtitle: { es: "Leer la Palabra y entender el gran recorrido de las Escrituras.", en: "Read Scripture and understand the great story of the Bible." },
    image: "assets/covers/cover-start-bible.png",
    visual: "gold",
    items: [
      { title: { es: "Leer la Biblia", en: "Read the Bible" }, subtitle: { es: "Lectura bíblica", en: "Scripture reading" }, image: "assets/covers/cover-night-bible.png", route: "bible" },
      { title: { es: "Explora la Biblia", en: "Explore the Bible" }, subtitle: { es: "Guía visual de 66 libros", en: "Visual guide to 66 books" }, image: "assets/covers/cover-path-sunrise.png", route: "overview" }
    ]
  },
  {
    id: "prayer",
    title: { es: "Orar", en: "Pray" },
    subtitle: { es: "Cuando no sabes cómo orar, empieza aquí.", en: "When you do not know how to pray, begin here." },
    image: "assets/covers/cover-prayer-window.png",
    visual: "prayer",
    items: [
      { title: { es: "Momentos", en: "Moments" }, subtitle: { es: "Oraciones por situación", en: "Prayers by situation" }, image: "assets/covers/cover-sleep-lake.png", route: "moment" },
      { title: { es: "Oración eficaz", en: "Effective prayer" }, subtitle: { es: "12 claves bíblicas", en: "12 biblical keys" }, image: "assets/covers/cover-prayer-window.png", route: "prayer" },
      { title: { es: "Diario de oración", en: "Prayer journal" }, subtitle: { es: "Escribe tu corazón", en: "Write your heart" }, image: "assets/covers/cover-night-bible.png", route: "journal" }
    ]
  },
  {
    id: "rest",
    title: { es: "Descansar", en: "Rest" },
    subtitle: { es: "Cierra el día con la Palabra y entrega el peso a Dios.", en: "Close the day with the Word and entrust your burdens to God." },
    image: "assets/covers/cover-sleep-window.png",
    visual: "sleep",
    items: [
      { title: { es: "Paz nocturna", en: "Night peace" }, subtitle: { es: "30 noches", en: "30 nights" }, image: "assets/covers/cover-sleep-lake.png", route: "sleep" }
    ]
  },
  {
    id: "family",
    title: { es: "Vivir en familia", en: "Family life" },
    subtitle: { es: "Historias, conversación y fe para vivir en casa.", en: "Stories, conversation, and faith for the home." },
    image: "assets/covers/cover-jesus-children.png",
    visual: "family",
    items: [
      { title: { es: "Historias de Jesús", en: "Stories of Jesus" }, subtitle: { es: "Catálogo familiar", en: "Family catalog" }, image: "assets/covers/cover-family-walk.png", route: "stories" },
      { title: { es: "Familia y niños", en: "Family and kids" }, subtitle: { es: "Fe para vivir en casa", en: "Faith at home" }, image: "assets/covers/cover-family-jesus-child.png", route: "stories" },
      { title: { es: "Recursos descargables", en: "Downloads" }, subtitle: { es: "Materiales para casa", en: "Resources for home" }, image: "assets/covers/cover-jesus-children.png", route: "resources" }
    ]
  },
  {
    id: "wisdom",
    title: { es: "Crecer en sabiduría", en: "Grow in wisdom" },
    subtitle: { es: "Proverbios para formar criterio, carácter y decisiones.", en: "Proverbs to shape discernment, character, and decisions." },
    image: "assets/covers/cover-path-sunrise.png",
    visual: "gold",
    items: [
      { title: { es: "Proverbios 31 días", en: "Proverbs 31 days" }, subtitle: { es: "Sabiduría diaria", en: "Daily wisdom" }, image: "assets/covers/cover-start-bible.png", route: "wisdom" }
    ]
  },
  {
    id: "space",
    title: { es: "Mi espacio", en: "My space" },
    subtitle: { es: "Tu diario, favoritos, marcadores y progreso.", en: "Your journal, favorites, markers, and progress." },
    image: "assets/covers/cover-night-bible.png",
    visual: "quiet",
    items: [
      { title: { es: "Favoritos", en: "Favorites" }, subtitle: { es: "Contenido guardado", en: "Saved content" }, image: "assets/covers/cover-prayer-window.png", route: "journal" },
      { title: { es: "Marcadores", en: "Markers" }, subtitle: { es: "Lecturas guardadas", en: "Saved readings" }, image: "assets/covers/cover-night-bible.png", route: "bible" },
      { title: { es: "Progreso", en: "Progress" }, subtitle: { es: "Tu avance", en: "Your progress" }, image: "assets/covers/cover-path-sunrise.png", route: "journal" },
      { title: { es: "Racha", en: "Streak" }, subtitle: { es: "Constancia diaria", en: "Daily rhythm" }, image: "assets/covers/cover-start-bible.png", route: "journal" },
      { title: { es: "Descargas", en: "Downloads" }, subtitle: { es: "Recursos guardados", en: "Saved resources" }, image: "assets/covers/cover-family-walk.png", route: "resources" }
    ]
  }
];

const homeFavorites = [
  { title: { es: "Biblia", en: "Bible" }, subtitle: { es: "Leer la Palabra", en: "Read the Word" }, icon: "♧", image: "assets/covers/cover-night-bible.png", route: "bible" },
  { title: { es: "Diario", en: "Journal" }, subtitle: { es: "Escribe tu corazón", en: "Write your heart" }, icon: "▰", image: "assets/covers/cover-prayer-window.png", route: "journal" },
  { title: { es: "Paz nocturna", en: "Night peace" }, subtitle: { es: "Descansa con Dios", en: "Rest with God" }, icon: "☾", image: "assets/covers/cover-sleep-lake.png", route: "sleep" },
  { title: { es: "Para la familia", en: "For families" }, subtitle: { es: "Historias, oración y fe en casa", en: "Stories, prayer, and faith at home" }, icon: "♡", image: "assets/covers/cover-family-walk.png", route: "stories" },
  { title: { es: "Camino de paz", en: "Peace journey" }, subtitle: { es: "Ansiedad y descanso", en: "Anxiety and rest" }, icon: "☼", image: "assets/covers/cover-path-sunrise.png", route: "journey", journey: "peace-anxiety" },
  { title: { es: "Oración eficaz", en: "Effective prayer" }, subtitle: { es: "12 claves bíblicas", en: "12 biblical keys" }, icon: "✎", image: "assets/covers/cover-prayer-window.png", route: "prayer" },
  { title: { es: "Sabiduría", en: "Wisdom" }, subtitle: { es: "31 días en Proverbios", en: "31 days in Proverbs" }, icon: "✦", image: "assets/covers/cover-start-bible.png", route: "wisdom" },
  { title: { es: "Explora la Biblia", en: "Explore the Bible" }, subtitle: { es: "66 libros con claves visuales", en: "66 books with visual keys" }, icon: "◈", image: "assets/covers/cover-start-bible.png", route: "overview" },
  { title: { es: "Asistente Yeshua", en: "Yeshua Assistant" }, subtitle: { es: "Impulsado por IA", en: "Powered by AI" }, icon: "◇", image: "assets/covers/cover-prayer-window.png", route: "assistant" },
  { title: { es: "Recursos", en: "Downloads" }, subtitle: { es: "PDF para casa", en: "PDFs for home" }, icon: "⇩", image: "assets/covers/cover-family-walk.png", route: "resources" }
];

const homePlan = [
  { time: "08:00", title: { es: "Devocional", en: "Devotional" }, subtitle: { es: "Paz que sobrepasa", en: "Surpassing peace" }, icon: "▦", visual: "green", route: "devotional" },
  { time: "12:00", title: { es: "Momento de oración", en: "Prayer moment" }, subtitle: { es: "Pausa con la Palabra", en: "Pause with the Word" }, icon: "◌", visual: "gold", route: "moment" },
  { time: "20:00", title: { es: "Diario de oración", en: "Prayer journal" }, subtitle: { es: "Escribe y agradece", en: "Write and give thanks" }, icon: "✎", visual: "teal", route: "journal" },
  { time: "22:00", title: { es: "Paz nocturna", en: "Night peace" }, subtitle: { es: "Cierra el día con Dios", en: "Close the day with God" }, icon: "☾", visual: "purple", route: "sleep" }
];

const prayerGuides = [
  {
    title: { es: "Oración de la mañana", en: "Morning prayer" },
    subtitle: { es: "Entrega el día al Padre", en: "Entrust the day to the Father" },
    image: "assets/covers/cover-start-bible.png",
    scripture: { es: "Encomienda a Jehová tu camino, y espera en él.", en: "Commit thy way unto the Lord; trust also in him." },
    reference: { es: "Salmo 37:5", en: "Psalm 37:5" },
    prayer: { es: "Padre, este día te pertenece. Ordena mis pensamientos, mis palabras y mis decisiones. Que mi primera respuesta sea confiar en ti.", en: "Father, this day belongs to You. Order my thoughts, words, and decisions. Let my first response be trust in You." },
    action: { es: "Escribir lo que entrego hoy", en: "Write what I surrender today" },
    route: "journal"
  },
  {
    title: { es: "Cuando sientes ansiedad", en: "When anxiety rises" },
    subtitle: { es: "Una pausa con Filipenses 4", en: "A pause with Philippians 4" },
    image: "assets/covers/cover-path-sunrise.png",
    scripture: { es: "Sean notorias vuestras peticiones delante de Dios.", en: "Let your requests be made known unto God." },
    reference: { es: "Filipenses 4:6", en: "Philippians 4:6" },
    prayer: { es: "Señor, no quiero cargar esto solo. Te presento mi preocupación y recibo tu invitación a orar antes de afanarme.", en: "Lord, I do not want to carry this alone. I bring You my concern and receive Your invitation to pray before anxiety rules." },
    action: { es: "Abrir camino de paz", en: "Open peace journey" },
    route: "journey",
    journey: "peace-anxiety"
  },
  {
    title: { es: "Orar por mi familia", en: "Pray for my family" },
    subtitle: { es: "Intercesión sencilla y bíblica", en: "Simple biblical intercession" },
    image: "assets/covers/cover-family-jesus-child.png",
    scripture: { es: "Yo y mi casa serviremos a Jehová.", en: "As for me and my house, we will serve the Lord." },
    reference: { es: "Josué 24:15", en: "Joshua 24:15" },
    prayer: { es: "Dios, bendice mi casa con tu verdad. Enséñanos a perdonar, servir y volver a Cristo en lo cotidiano.", en: "God, bless my home with Your truth. Teach us to forgive, serve, and return to Christ in ordinary moments." },
    action: { es: "Escribir nombres para orar", en: "Write names to pray for" },
    route: "journal"
  }
];

const sleepGuides = [
  {
    title: { es: "Salmo 23 para descansar", en: "Psalm 23 for rest" },
    subtitle: { es: "El Pastor en la noche", en: "The Shepherd in the night" },
    image: "assets/covers/cover-sleep-window.png",
    scripture: { es: "Jehová es mi pastor; nada me faltará.", en: "The Lord is my shepherd; I shall not want." },
    reference: { es: "Salmo 23:1", en: "Psalm 23:1" },
    action: { es: "Leer Salmo 23", en: "Read Psalm 23" },
    route: "bible",
    book: "PSA",
    chapter: 23
  },
  {
    title: { es: "Paz antes de dormir", en: "Peace before sleep" },
    subtitle: { es: "Cierra el día con Juan 14:27", en: "Close the day with John 14:27" },
    image: "assets/covers/cover-sleep-path.png",
    scripture: { es: "La paz os dejo, mi paz os doy.", en: "Peace I leave with you, my peace I give unto you." },
    reference: { es: "Juan 14:27", en: "John 14:27" },
    action: { es: "Abrir camino de paz", en: "Open peace journey" },
    route: "journey",
    journey: "peace-anxiety"
  },
  {
    title: { es: "Oración nocturna", en: "Night prayer" },
    subtitle: { es: "Entrega el día a Dios", en: "Entrust the day to God" },
    image: "assets/covers/cover-night-bible.png",
    scripture: { es: "En paz me acostaré, y asimismo dormiré.", en: "I will both lay me down in peace, and sleep." },
    reference: { es: "Salmo 4:8", en: "Psalm 4:8" },
    action: { es: "Escribir oración nocturna", en: "Write night prayer" },
    route: "journal"
  }
];

const downloadableResources = [
  {
    title: { es: "Recursos en español", en: "Spanish resources" },
    audience: { es: "Biblioteca ES", en: "Spanish library" },
    description: { es: "Guías, devocionales y materiales descargables preparados para usuarios en español.", en: "Guides, devotionals, and downloadable materials prepared for Spanish users." },
    image: "assets/covers/cover-start-bible.png",
    language: "es",
    available: false
  },
  {
    title: { es: "Recursos en inglés", en: "English resources" },
    audience: { es: "Biblioteca EN", en: "English library" },
    description: { es: "Materiales descargables en inglés para estudio, oración, familia y acompañamiento espiritual.", en: "Downloadable English materials for study, prayer, family, and spiritual care." },
    image: "assets/covers/cover-prayer-window.png",
    language: "en",
    available: false
  }
];

const jesusStories = [
  {
    "number": 1,
    "visual": "family",
    "ref": "Marcos 10:13–16",
    "title": "El niño que corrió hacia Jesús",
    "scene": "Había un niño llamado Tobías que tenía ocho años y vivía en una aldea cerca del lago.",
    "image": "assets/stories/story-01.png",
    "story": [
      "Había un niño llamado Tobías que tenía ocho años y vivía en una aldea cerca del lago.",
      "Un día su mamá entró corriendo a la casa con los ojos brillantes: \"¡Jesús está pasando por el camino grande! Vamos, que quiero que lo veas.\" Tobías no sabía muy bien quién era Jesús, pero la emoción de su mamá era suficiente para él. Se puso las sandalias y salió corriendo.",
      "El camino estaba lleno de gente. Había ancianos, madres con bebés, hombres con preguntas difíciles, enfermos que esperaban ser sanados. Tobías era pequeño y no podía ver nada. Se metió entre las piernas de los adultos, esquivó una canasta de higos, casi chocó con un burro.",
      "Entonces los vio: los discípulos de Jesús. Eran hombres grandes con caras serias. Uno de ellos levantó la mano para detenerlo. \"Los niños después. Hay adultos esperando. Jesús está ocupado.\"",
      "Tobías se detuvo. Sintió vergüenza. Miró a su mamá.",
      "Pero entonces escuchó una voz desde adentro del grupo. Una voz que no gritó, pero que todos oyeron. \"Dejen que los niños vengan a mí. No los detengan.\" Hubo un silencio. Los discípulos se apartaron. Y Jesús estaba ahí, mirando directamente a Tobías.",
      "Le hizo señas de que se acercara.",
      "Tobías caminó despacio. Jesús se arrodilló para quedar a su altura, le puso las manos en la cabeza y lo bendijo. Tobías no entendió todas las palabras, pero sintió algo que nunca había sentido antes: que era importante. Que no estorbaba. Que había llegado exactamente al lugar correcto.",
      "Ese día Jesús les dijo a todos los que estaban alrededor: \"El Reino de Dios es de los que son como estos niños.\"",
      "No lo dijo como un ejemplo bonito. Lo dijo como una verdad."
    ],
    "question": "¿Alguna vez sentiste que eras demasiado pequeño o que no importabas? ¿Cómo crees que se sintió Tobías cuando Jesús lo llamó?",
    "prayer": "Jesús, gracias porque nunca nos mandas a esperar afuera. Enséñanos a acercarnos a ti con confianza, como niños que saben que son bienvenidos. Amén."
  },
  {
    "number": 2,
    "visual": "water",
    "ref": "Marcos 4:35–41",
    "title": "La tormenta de medianoche",
    "scene": "Era tarde. El sol había desaparecido detrás de las montañas hacía horas y el lago de Galilea estaba quieto como un espejo negro.",
    "image": "assets/stories/story-02.png",
    "story": [
      "Era tarde. El sol había desaparecido detrás de las montañas hacía horas y el lago de Galilea estaba quieto como un espejo negro.",
      "Jesús estaba agotado. Había pasado todo el día hablando con multitudes, respondiendo preguntas, sanando personas. Cuando subieron a la barca, se recostó en la popa con una almohada y en minutos se quedó dormido.",
      "Los discípulos remaban en silencio. Algunos eran pescadores y conocían ese lago como la palma de su mano. Pero ninguno de ellos había visto llegar la tormenta tan rápido.",
      "Primero fue el viento. Luego las olas. En pocos minutos las olas eran tan grandes que el agua entraba a la barca. Santiago sujetaba un remo con las dos manos. Juan intentaba sacar agua con un cubo. Pedro gritaba instrucciones que nadie podía escuchar por el ruido del viento.",
      "Y Jesús dormía.",
      "\"¡Maestro!\" Lo sacudieron. \"¡Maestro, nos vamos a hundir! ¿No te importa?\"",
      "Jesús abrió los ojos. Miró las olas. Miró a sus discípulos con sus caras empapadas y sus ojos llenos de miedo. Luego se puso de pie en la barca que se movía como una hoja, extendió la mano hacia el agua y dijo simplemente: \"¡Silencio! ¡Cálmate!\"",
      "El viento paró.",
      "Las olas bajaron.",
      "El lago quedó quieto.",
      "Los discípulos se miraron entre ellos sin decir nada. Pedro tenía todavía el cubo de agua en la mano. Nadie sabía qué hacer con ese silencio repentino.",
      "Entonces Jesús los miró y preguntó algo que los dejó pensando durante años: \"¿Por qué tienen tanto miedo? ¿Todavía no tienen fe?\"",
      "No era un regaño. Era una pregunta real. Como si Jesús quisiera que entendieran algo importante: que él estaba en la barca con ellos. Que siempre había estado ahí. Que eso era suficiente."
    ],
    "question": "¿Cuándo sientes miedo en tu vida? ¿Cómo cambia saber que Jesús está contigo en esa situación?",
    "prayer": "Señor, cuando vengan las tormentas y sintamos miedo, recuérdanos que tú estás en la barca con nosotros. Que tu presencia es más grande que cualquier tormenta. Amén."
  },
  {
    "number": 3,
    "visual": "bread",
    "ref": "Juan 6:1–13",
    "title": "El almuerzo de Mateo",
    "scene": "Mateo tenía diez años y esa mañana su mamá le había preparado el almuerzo con lo que había en casa: cinco panes pequeños y dos pescados envueltos en un trapo de lino.",
    "image": "assets/stories/story-03.png",
    "story": [
      "Mateo tenía diez años y esa mañana su mamá le había preparado el almuerzo con lo que había en casa: cinco panes pequeños y dos pescados envueltos en un trapo de lino.",
      "\"No te lo comas todo de una vez\", le dijo. Mateo asintió, aunque los dos sabían que él siempre se lo comía todo de una vez.",
      "Siguió a la multitud que subía por la ladera de la montaña porque quería ver a Jesús. Había escuchado historias. Quería ver si eran ciertas.",
      "Cuando llegó arriba, ya había miles de personas sentadas en la hierba. Jesús estaba hablando. Mateo se sentó al fondo y escuchó, y las horas pasaron sin que él se diera cuenta.",
      "Al caer la tarde, escuchó a los discípulos hablar entre ellos en voz baja. \"Hay miles de personas y no hay comida. Hay que mandarlos a los pueblos cercanos.\" Uno de ellos — se llamaba Andrés — miraba a la multitud con cara de problema sin solución.",
      "Entonces Andrés vio a Mateo con su trapo de lino. \"¿Qué tienes ahí, muchacho?\"",
      "Mateo lo miró. Luego miró sus cinco panes y sus dos pescados. Luego miró a las miles de personas sentadas en la hierba. Las matemáticas no funcionaban. Pero algo le dijo que los entregara.",
      "\"Toma\", dijo.",
      "Andrés lo llevó a Jesús. Jesús miró el almuerzo de Mateo, levantó los ojos al cielo, dio gracias, y empezó a repartir.",
      "Y siguió repartiendo.",
      "Y siguió.",
      "Cuando todo terminó, habían comido cinco mil personas. Los discípulos recogieron doce canastas llenas de lo que sobró.",
      "Mateo se quedó sentado en la hierba con el estómago lleno, mirando las canastas, sin entender muy bien qué había pasado. Solo sabía que había entregado lo poco que tenía. Y que en las manos de Jesús, lo poco se había vuelto más que suficiente."
    ],
    "question": "¿Alguna vez sentiste que lo que tienes es demasiado pequeño para ayudar? ¿Qué aprendemos de Mateo sobre lo que Jesús puede hacer con lo que le damos?",
    "prayer": "Jesús, lo que tenemos parece poco. Pero hoy te lo ponemos en las manos. Multiplica lo que somos y lo que tenemos para que otros también sean bendecidos. Amén."
  },
  {
    "number": 4,
    "visual": "shepherd",
    "ref": "Lucas 15:3–7",
    "title": "La oveja que se llamaba Pequeña",
    "scene": "El pastor Elí tenía cien ovejas y las conocía a todas por nombre.",
    "image": "assets/stories/story-04.png",
    "story": [
      "El pastor Elí tenía cien ovejas y las conocía a todas por nombre.",
      "Había una que se llamaba Pequeña porque había nacido más chica que las demás. Le costaba seguir el ritmo del rebaño. Se distraía con los arbustos, se quedaba olfateando piedras, y más de una vez Elí tuvo que esperarla al final del camino.",
      "Una tarde, al llegar al redil, Elí las contó como siempre. Noventa y siete. Noventa y ocho. Noventa y nueve.",
      "Se detuvo.",
      "Volvió a contar. Noventa y nueve.",
      "Faltaba una. Sabía sin pensarlo dos veces cuál era.",
      "Los otros pastores le dijeron que era tarde, que había lobos, que noventa y nueve ovejas eran suficientes para un hombre razonable. Elí los escuchó. Luego agarró su lámpara y se fue.",
      "Caminó por barrancos oscuros. Llamó su nombre una y otra vez. \"¡Pequeña! ¡Pequeña!\" El viento respondía. Las estrellas lo miraban.",
      "Entonces la escuchó. Un balido débil desde detrás de unas rocas.",
      "La encontró enredada en un arbusto de espinas, temblando, con la lana llena de tierra. Elí la desató con cuidado, la cargó sobre sus hombros y emprendió el camino de regreso.",
      "Cuando llegó al pueblo era casi de madrugada. Pero despertó a sus vecinos de todas formas. \"¡La encontré! ¡Encontré a la que se había perdido!\" Los vecinos se asomaron por las ventanas con cara de sueño. Algunos sonrieron aunque no entendían muy bien por qué tanto alboroto por una oveja.",
      "Jesús contó esta historia y luego dijo: \"Así también habrá más alegría en el cielo por un pecador que regresa que por noventa y nueve que no necesitan regresar.\"",
      "Dios es como Elí. Sale a buscarnos cuando nos perdemos. Y cuando nos encuentra, no regaña. Celebra."
    ],
    "question": "¿Cómo te hace sentir saber que Dios te busca cuando te alejas de Él? ¿Conoces a alguien que necesite saber que Dios lo está buscando?",
    "prayer": "Padre, gracias porque nunca nos abandonas cuando nos perdemos. Gracias porque saliste a buscarnos y nos encontraste. Ayúdanos a nunca alejarnos de tu lado. Amén."
  },
  {
    "number": 5,
    "visual": "family",
    "ref": "Marcos 2:1–12",
    "title": "El hombre que bajó por el techo",
    "scene": "Cuatro amigos tenían un problema enorme.",
    "image": "assets/stories/story-05.png",
    "story": [
      "Cuatro amigos tenían un problema enorme.",
      "Su amigo Simón llevaba años sin poder caminar. Vivía en una estera en el suelo de su casa y cada mañana dependía de otros para todo. Era un hombre alegre a pesar de todo, pero sus amigos sabían que por dentro cargaba algo más pesado que la parálisis.",
      "Cuando escucharon que Jesús estaba en Capernaúm, no lo pensaron dos veces. \"Lo llevamos.\" Simón protestó. \"Son demasiadas personas. No van a poder entrar.\" \"Ya veremos\", dijo uno de ellos.",
      "La casa estaba llena hasta afuera. Gente en la puerta, gente en las ventanas, gente sentada en el suelo. No había forma de entrar.",
      "Entonces uno de los cuatro miró el techo.",
      "Los techos en esa época eran planos, hechos de ramas y barro. Se podían deshacer con las manos. Los cuatro se miraron. \"¿Estás pensando lo que yo estoy pensando?\" \"Sí.\" \"¿Lo hacemos?\" \"Sí.\"",
      "Subieron a Simón al techo entre los cuatro, con mucho esfuerzo y algunas risas nerviosas. Luego empezaron a abrir un hueco justo encima de donde estaba Jesús. Los que estaban abajo levantaron la vista con cara de sorpresa cuando empezó a caer tierra y paja sobre sus cabezas.",
      "Bajaron a Simón con cuerdas, despacio, hasta que quedó justo frente a Jesús.",
      "Jesús miró a Simón. Luego miró hacia arriba, donde cuatro caras curiosas se asomaban por el hueco del techo. Y sonrió.",
      "\"Hijo\", le dijo a Simón, \"tus pecados te son perdonados.\"",
      "Y luego: \"Levántate, toma tu estera y vete a tu casa.\"",
      "Simón se levantó.",
      "Afuera, los cuatro amigos se abrazaron sin decir nada."
    ],
    "question": "¿Qué harías tú por llevar a un amigo hasta Jesús? ¿Hay alguien en tu vida que necesita que lo lleves a Él?",
    "prayer": "Jesús, danos amigos como esos cuatro. Y ayúdanos a ser nosotros ese tipo de amigos para otros. Que nunca nos rindamos cuando se trata de llevar personas a ti. Amén."
  },
  {
    "number": 6,
    "visual": "water",
    "ref": "Lucas 15:8–10",
    "title": "La mujer que perdió su moneda",
    "scene": "Miriam tenía diez monedas de plata.",
    "image": "assets/stories/story-06.png",
    "story": [
      "Miriam tenía diez monedas de plata.",
      "No eran una fortuna, pero para ella lo eran todo. Las guardaba en una bolsa de cuero que colgaba de una viga de madera en su casa. Las había contado tantas veces que podía hacerlo en la oscuridad.",
      "Una mañana las contó y había nueve.",
      "Contó de nuevo. Nueve.",
      "Se le cayó el corazón al suelo.",
      "Buscó en la bolsa. Buscó en el suelo. Movió los muebles, sacudió las mantas, revisó cada rincón de la pequeña casa. Afuera el sol ya estaba alto pero ella encendió su lámpara de todas formas para ver mejor los rincones oscuros.",
      "Barrió toda la casa. Pedazo por pedazo.",
      "Y entonces, debajo de una jarra de barro cerca de la pared, brilló algo pequeño.",
      "La moneda.",
      "Miriam la tomó entre los dedos. La apretó. Cerró los ojos un momento.",
      "Luego salió a la calle y llamó a sus vecinas: \"¡Vengan a celebrar conmigo! ¡Encontré la moneda que había perdido!\"",
      "Las vecinas vinieron. Hubo pan, hubo risas, hubo historia que contar.",
      "Jesús usó esta historia para explicar algo sobre Dios: \"Así también hay alegría delante de los ángeles de Dios por un pecador que se arrepiente.\"",
      "Cada persona que regresa a Dios es como esa moneda encontrada. No importa en qué rincón oscuro estuviera. Cuando aparece, el cielo celebra."
    ],
    "question": "¿Cómo te hace sentir saber que cuando tú te acercas a Dios, los ángeles en el cielo se alegran?",
    "prayer": "Padre, gracias porque para ti no somos uno más. Somos la moneda que buscas hasta encontrar. Gracias por no darte por vencido con nosotros. Amén."
  },
  {
    "number": 7,
    "visual": "bread",
    "ref": "Lucas 19:1–10",
    "title": "El árbol de Zaqueo",
    "scene": "Zaqueo era rico y era bajo de estatura. De las dos cosas, la segunda le molestaba más.",
    "image": "assets/stories/story-07.png",
    "story": [
      "Zaqueo era rico y era bajo de estatura. De las dos cosas, la segunda le molestaba más.",
      "Cuando se enteró de que Jesús iba a pasar por Jericó, quiso verlo. Pero la calle estaba llena de gente y él no podía ver nada más allá de las espaldas de los demás. Alguien lo empujó sin querer. Otro ni siquiera lo miró.",
      "Entonces vio un sicómoro. Un árbol viejo con ramas gruesas que cruzaban sobre el camino. Sin pensarlo mucho, Zaqueo — con su ropa de hombre rico y todo — empezó a trepar.",
      "La gente lo miró. Algunos se rieron. Un cobrador de impuestos trepando un árbol como un niño era, en efecto, un espectáculo.",
      "Zaqueo no les hizo caso. Encontró una rama cómoda y esperó.",
      "Entonces llegó Jesús. Venía rodeado de gente, como siempre. Pero cuando pasó bajo el sicómoro, se detuvo. Levantó la vista. Y miró directo a Zaqueo.",
      "\"Zaqueo, baja rápido. Hoy tengo que quedarme en tu casa.\"",
      "Zaqueo casi se cae de la rama.",
      "La gente murmuró. Todos sabían quién era Zaqueo. Era el tipo que cobraba más de lo que debía. El que se había hecho rico a costa de sus vecinos. \"¿Por qué entra Jesús a la casa de ese hombre?\"",
      "Pero algo pasó ese día adentro de esa casa. Solo se sabe lo que Zaqueo dijo cuando salieron: \"Señor, voy a dar la mitad de mis bienes a los pobres. Y a quien le haya cobrado de más, le voy a devolver cuatro veces más.\"",
      "Jesús lo miró. \"Hoy ha llegado la salvación a esta casa.\"",
      "No hizo falta un sermón. Solo fue necesario que alguien lo mirara de verdad y quisiera conocerlo."
    ],
    "question": "Jesús eligió entrar a la casa del que todos rechazaban. ¿Qué nos enseña eso sobre cómo debemos tratar a las personas que otros ignoran?",
    "prayer": "Jesús, gracias porque nos ves aunque estemos escondidos. Gracias porque entras a nuestra casa aunque no lo merezcamos. Cámbianos por dentro como cambiaste a Zaqueo. Amén."
  },
  {
    "number": 8,
    "visual": "shepherd",
    "ref": "Marcos 5:21–24, 35–43",
    "title": "La niña que todos creían dormida",
    "scene": "Jairo era el jefe de la sinagoga y no era un hombre que se arrodillara fácilmente ante nadie.",
    "image": "assets/stories/story-08.png",
    "story": [
      "Jairo era el jefe de la sinagoga y no era un hombre que se arrodillara fácilmente ante nadie.",
      "Pero esa tarde lo hizo.",
      "Su hija tenía doce años y estaba muriendo. Jairo había llamado a los mejores médicos. Había orado toda la noche. Había agotado todo lo que el dinero y el poder podían hacer. Y entonces fue a buscar a Jesús.",
      "Lo encontró en la orilla del lago, rodeado de gente. Se abrió paso, cayó de rodillas ante él y le suplicó: \"Mi hija está muy grave. Por favor, ven y ponle las manos encima para que sane y viva.\"",
      "Jesús fue con él.",
      "Pero el camino era lento. La gente los rodeaba por todos lados. En algún punto Jesús se detuvo porque sintió que alguien había tocado su manto. Hubo una conversación. Pasaron minutos que para Jairo eran eternos.",
      "Y entonces llegaron los mensajeros de su casa. Jairo los vio venir y supo por sus caras lo que iban a decir antes de que abrieran la boca.",
      "\"Tu hija ha muerto. Ya no molestes al Maestro.\"",
      "Jairo sintió que el suelo se movía bajo sus pies.",
      "Jesús se volvió hacia él. \"No temas. Solo cree.\"",
      "Llegaron a la casa. Había gente llorando afuera. Jesús los mandó a todos afuera. \"La niña no está muerta. Está dormida.\" Se rieron de él.",
      "Entró al cuarto con los padres y tres de sus discípulos. Tomó la mano de la niña. Y dijo en arameo, suave, como si la despertara de una siesta: \"Talita cumi.\" Niña, levántate.",
      "La niña abrió los ojos. Se sentó. Jesús dijo que le dieran de comer.",
      "Los padres no podían hablar. Solo lloraban, pero ya de otra cosa."
    ],
    "question": "Jairo fue a Jesús cuando ya no le quedaba ninguna otra opción. ¿Esperamos a que no quede otra opción, o aprendemos a ir a Jesús primero?",
    "prayer": "Señor, cuando la situación parece sin salida, ayúdanos a escuchar tu voz que dice \"no temas, solo cree.\" Tú eres más grande que cualquier final que podamos imaginar. Amén."
  },
  {
    "number": 9,
    "visual": "family",
    "ref": "Lucas 15:11–32",
    "title": "El hijo que se fue y volvió",
    "scene": "Había un padre que tenía dos hijos. Y un día el menor fue y le dijo: \"Dame la parte de la herencia que me corresponde.\"",
    "image": "assets/stories/story-09.png",
    "story": [
      "Había un padre que tenía dos hijos. Y un día el menor fue y le dijo: \"Dame la parte de la herencia que me corresponde.\"",
      "El padre se la dio.",
      "El hijo menor tomó todo y se fue lejos. Gastó cada moneda en una vida que parecía brillante pero que se apagó pronto. Cuando llegó el hambre a esa tierra, él no tenía nada. Terminó trabajando en una granja de cerdos, con tanta hambre que miraba la comida de los animales.",
      "Fue ahí, en ese lugar donde nadie querría estar, cuando pensó en su padre.",
      "\"Los trabajadores de mi padre tienen pan de sobra, y yo aquí me muero de hambre.\" Decidió volver. No como hijo — eso ya lo había perdido — sino como empleado.",
      "Practicó el discurso en el camino. Pero nunca llegó a decir todo el discurso.",
      "Porque cuando todavía estaba lejos, su padre lo vio. Y corrió. Un hombre mayor, corriendo por el camino de tierra, sin preocuparse de su dignidad. Lo abrazó antes de que Rubén pudiera hablar. Lo besó en el cuello.",
      "El padre ya estaba llamando a los sirvientes. \"Traigan la mejor ropa. Traigan sandalias. Maten el ternero engordado. Mi hijo estaba muerto y ha vuelto a vivir. Estaba perdido y ha sido encontrado.\"",
      "Esa noche hubo fiesta en esa casa.",
      "Afuera, el hijo mayor escuchó la música y se negó a entrar. Estaba enojado. \"Yo he trabajado todos estos años y nunca me hiciste una fiesta.\" El padre salió a buscarlo también. \"Hijo, tú siempre has estado conmigo. Todo lo mío es tuyo. Pero teníamos que celebrar.\"",
      "Y Jesús nos dejó con esa pregunta abierta: ¿entró el hijo mayor? Porque a veces el que se quedó cerca necesita tanto al Padre como el que se fue lejos."
    ],
    "question": "¿Con cuál de los dos hijos te identificas más hoy? ¿Con el que se fue y volvió, o con el que se quedó pero estaba enojado por dentro?",
    "prayer": "Padre, gracias porque corres hacia nosotros cuando regresamos. Y gracias porque también sales a buscarnos cuando nos quedamos afuera de la fiesta con el corazón cerrado. Enséñanos a celebrar lo que tú celebras. Amén."
  },
  {
    "number": 10,
    "visual": "water",
    "ref": "Mateo 13:1–9, 18–23",
    "title": "El sembrador y la semilla",
    "scene": "El abuelo Natán era agricultor y tenía un campo que conocía de memoria.",
    "image": "assets/stories/story-10.png",
    "story": [
      "El abuelo Natán era agricultor y tenía un campo que conocía de memoria.",
      "Un día su nieta Lea lo acompañó a sembrar. Natán cargaba la bolsa de semillas y las lanzaba con un movimiento amplio y experto. Lea lo observaba desde el borde del campo.",
      "Algunas semillas cayeron en el camino duro donde la gente caminaba. Antes de que pasara un minuto, los pájaros bajaron y se las comieron. Lea lo señaló. \"Abba, ahí se las están comiendo.\" \"Ya lo sé\", dijo Natán, sin detenerse.",
      "Otras cayeron en un lugar donde había piedras debajo de poca tierra. \"Ahí van a crecer rápido\", dijo Lea. \"¿Y eso es bueno?\" \"No\", respondió el abuelo. \"Cuando llegue el sol fuerte, no tendrán raíces suficientes. Se secarán.\"",
      "Otras semillas cayeron entre espinos. \"¿Y esas?\" \"Los espinos crecen más rápido. Van a ahogar la planta antes de que dé fruto.\"",
      "Pero muchas semillas cayeron en tierra buena. Tierra oscura, suave, bien trabajada. \"Esas\", dijo Natán, \"son las que importan. Una sola puede dar treinta, o sesenta, o hasta cien veces lo que se sembró.\"",
      "Esa tarde, Lea le preguntó si era una historia sobre semillas.",
      "El abuelo sonrió. \"Es una historia sobre lo que pasa cuando la Palabra de Dios entra en el corazón. Depende de la tierra que le ofrezcamos.\"",
      "Jesús contó esta misma historia. Y la tierra buena, dijo él, es el corazón que escucha, entiende y da fruto."
    ],
    "question": "¿Qué tipo de tierra crees que es tu corazón ahora mismo? ¿Qué cosas no dejan que la Palabra de Dios crezca en ti?",
    "prayer": "Señor, trabaja nuestra tierra. Quita las piedras, arranca los espinos y danos un corazón que reciba tu Palabra y dé mucho fruto. Amén."
  },
  {
    "number": 11,
    "visual": "bread",
    "ref": "Marcos 10:46–52",
    "title": "El ciego que gritó más fuerte",
    "scene": "Bartimeo estaba sentado al borde del camino de Jericó, como todos los días.",
    "image": "assets/stories/story-11.png",
    "story": [
      "Bartimeo estaba sentado al borde del camino de Jericó, como todos los días.",
      "No podía ver, así que escuchaba. Y lo que escuchó ese día fue diferente: un ruido de sandalias, voces, el movimiento de una multitud. Preguntó a alguien que pasó a su lado. \"¿Qué está pasando?\" \"Es Jesús de Nazaret. Viene por el camino.\"",
      "Bartimeo no esperó ni un segundo.",
      "\"¡Jesús, Hijo de David, ten misericordia de mí!\"",
      "La gente que estaba alrededor lo mandó a callar. \"Silencio. No molestes.\" Pero Bartimeo gritó más fuerte. \"¡Hijo de David, ten misericordia de mí!\"",
      "Jesús se detuvo. \"Llámenlo.\"",
      "La misma gente que lo había callado ahora le decía: \"Ánimo, levántate, te llama.\" Bartimeo se quitó el manto de un tirón — su única posesión — lo dejó caer al suelo y fue hacia Jesús.",
      "\"¿Qué quieres que haga por ti?\"",
      "Bartimeo no dudó. \"Maestro, que yo pueda ver.\"",
      "\"Ve. Tu fe te ha sanado.\"",
      "Y Bartimeo vio. Por primera vez en su vida vio el camino, el cielo, las caras de la gente, y la cara de Jesús. Lo primero que hizo fue seguirlo.",
      "Lo que más llama la atención no es el milagro. Es que Bartimeo no se rindió cuando lo callaron. Gritó más fuerte. Y Jesús lo escuchó."
    ],
    "question": "¿Qué hacemos cuando sentimos que Dios no nos escucha? ¿Qué nos enseña Bartimeo sobre cómo orar?",
    "prayer": "Señor, enséñanos a ser como Bartimeo. Que no nos callemos cuando más necesitamos buscarte. Que la dificultad nos haga gritar más fuerte, no más callados. Amén."
  },
  {
    "number": 12,
    "visual": "shepherd",
    "ref": "Marcos 3:1–6",
    "title": "El hombre con la mano seca",
    "scene": "Había en la sinagoga un hombre que tenía la mano derecha seca. Paralizada. La había tenido así desde que tenía memoria.",
    "image": "assets/stories/story-12.png",
    "story": [
      "Había en la sinagoga un hombre que tenía la mano derecha seca. Paralizada. La había tenido así desde que tenía memoria.",
      "Era sábado, el día de reposo, y Jesús estaba enseñando. Algunos fariseos miraban con ojos de trampa. Si Jesús sanaba en sábado, lo podían acusar de romper la ley.",
      "Jesús vio al hombre. Luego vio a los fariseos. Supo exactamente lo que pensaban.",
      "\"Levántate y ven al centro\", le dijo al hombre.",
      "El hombre obedeció. Todos los ojos en la sinagoga estaban sobre él.",
      "Jesús se volvió hacia los fariseos. \"¿Es permitido en sábado hacer bien o hacer mal? ¿Salvar una vida o destruirla?\" Nadie respondió.",
      "Jesús los miró. El texto dice que lo hizo con tristeza. No con enojo frío, sino con dolor. Que la gente eligiera una regla antes que una persona lo entristecía de verdad.",
      "Luego se volvió al hombre. \"Extiende la mano.\"",
      "El hombre la extendió. Y la mano quedó sana.",
      "Los fariseos salieron a hacer planes para destruir a Jesús. El hombre salió con dos manos sanas.",
      "Jesús eligió a la persona. Siempre elige a la persona."
    ],
    "question": "¿Alguna vez hemos elegido seguir una regla antes que ayudar a alguien? ¿Qué nos enseña Jesús sobre lo que más importa?",
    "prayer": "Jesús, enséñanos a ver a las personas antes que las reglas. Que nunca usemos la fe como excusa para ignorar a alguien que necesita ayuda. Amén."
  },
  {
    "number": 13,
    "visual": "family",
    "ref": "Lucas 8:43–48",
    "title": "La mujer que tocó su manto",
    "scene": "Llevaba doce años enferma.",
    "image": "assets/stories/story-13.png",
    "story": [
      "Llevaba doce años enferma.",
      "Había gastado todo lo que tenía en médicos. Ninguno la había sanado. Y encima de la enfermedad cargaba el peso de sentirse impura, invisible, excluida. La ley decía que no debía estar entre la gente. Pero ese día salió de todas formas.",
      "Jesús venía rodeado de multitudes. Ella no podía hablarle, no podía llamar su atención, no tenía forma de pedirle nada en público. Pero pensó: si toco aunque sea el borde de su manto, sanaré.",
      "Se metió entre la gente. Avanzó agachada. Extendió la mano. Tocó el borde de la tela.",
      "Y en ese segundo sintió en su cuerpo que algo había cambiado.",
      "Pero Jesús también sintió algo. Se detuvo. \"¿Quién me tocó?\"",
      "Pedro le dijo, lógicamente: \"Maestro, hay gente empujando por todos lados. ¿Cómo preguntas quién te tocó?\"",
      "\"Alguien me tocó. Sentí que salió poder de mí.\"",
      "La mujer temblaba. Se acercó, cayó a los pies de Jesús y contó todo. Toda la historia. Doce años en una sola confesión.",
      "Jesús la escuchó. Luego la miró y dijo algo que ella necesitaba escuchar más que la sanidad: \"Hija, tu fe te ha sanado. Ve en paz.\"",
      "La llamó hija.",
      "No la regañó por haberse metido entre la gente. No habló de las reglas. La llamó hija y la mandó en paz."
    ],
    "question": "Esta mujer llegó a Jesús cuando ya no le quedaban fuerzas ni recursos. ¿Qué nos impide a veces acercarnos a Jesús cuando más lo necesitamos?",
    "prayer": "Jesús, que aprendamos a tocar tu manto con fe. Que no nos detengamos por vergüenza ni por miedo. Gracias porque nos llamas hijos y nos mandas en paz. Amén."
  },
  {
    "number": 14,
    "visual": "water",
    "ref": "Lucas 10:25–37",
    "title": "El buen samaritano",
    "scene": "El camino de Jerusalén a Jericó era peligroso y todos lo sabían.",
    "image": "assets/stories/story-14.png",
    "story": [
      "El camino de Jerusalén a Jericó era peligroso y todos lo sabían.",
      "Ese día un hombre lo caminó solo y le fue mal. Lo atacaron. Le quitaron todo. Lo dejaron en el suelo, medio muerto, al costado del camino.",
      "Pasó un sacerdote. Lo vio. Se cambió al otro lado del camino y siguió.",
      "Pasó un levita, un hombre de la tribu de Dios, alguien que debería haber sabido qué hacer. Lo vio. Cruzó y siguió.",
      "Entonces vino un samaritano. Los judíos y los samaritanos no se llevaban bien. Eran de mundos distintos, con historia de conflicto entre ellos. El hombre tirado en el suelo, si hubiera podido verlo llegar, probablemente habría pensado que este era el menos indicado para ayudarlo.",
      "Pero el samaritano se bajó del burro.",
      "Le limpió las heridas con aceite y vino. Lo vendó. Lo subió a su propio animal. Lo llevó a una posada. Pagó de su bolsillo y dijo al posadero: \"Cuídalo. Lo que gastes de más, yo te lo pago cuando vuelva.\"",
      "Jesús terminó la historia y preguntó: \"¿Cuál de los tres fue el prójimo del hombre herido?\"",
      "La respuesta era obvia. Pero difícil de aceptar: el prójimo no era el que tenía el título correcto. Era el que se detuvo."
    ],
    "question": "¿Alguna vez pasamos al otro lado del camino cuando vemos a alguien que necesita ayuda? ¿Qué nos detiene?",
    "prayer": "Señor, danos ojos para ver y corazón para detenernos. Que nunca crucemos al otro lado cuando alguien necesita que nos bajemos del burro. Amén."
  },
  {
    "number": 15,
    "visual": "bread",
    "ref": "Mateo 14:22–33",
    "title": "Pedro camina sobre el agua",
    "scene": "Era de madrugada y los discípulos llevaban horas luchando contra el viento en el centro del lago.",
    "image": "assets/stories/story-15.png",
    "story": [
      "Era de madrugada y los discípulos llevaban horas luchando contra el viento en el centro del lago.",
      "Entonces vieron algo en el agua. Una figura caminando sobre las olas. Gritaron de miedo. \"¡Es un fantasma!\"",
      "\"Soy yo\", dijo la voz. \"No tengan miedo.\"",
      "Pedro, que era Pedro, hizo lo que solo Pedro haría: \"Señor, si eres tú, mándame ir a ti sobre el agua.\"",
      "\"Ven.\"",
      "Pedro saltó de la barca. Y caminó. El agua bajo sus pies era real, las olas eran reales, el viento era real. Y él caminaba.",
      "Por un momento.",
      "Porque entonces miró a su alrededor. Vio las olas. Sintió el viento. Y empezó a hundirse.",
      "\"¡Señor, sálvame!\"",
      "Jesús extendió la mano de inmediato. Lo agarró. \"Hombre de poca fe, ¿por qué dudaste?\"",
      "Lo importante no es que Pedro se hundió. Es que fue el único que saltó. Once personas se quedaron en la barca. Pedro caminó sobre el agua, aunque fuera por unos metros, aunque terminara necesitando que lo agarraran.",
      "A veces hundirse con Jesús cerca es mejor que flotar sin Él."
    ],
    "question": "¿En qué área de tu vida sientes que estás mirando las olas en vez de mirar a Jesús? ¿Qué pasaría si saltaras de la barca?",
    "prayer": "Señor, danos el valor de Pedro para saltar. Y cuando empecemos a hundirnos, ayúdanos a gritar tu nombre. Gracias porque tu mano llega antes de que nos vayamos bajo el agua. Amén."
  },
  {
    "number": 16,
    "visual": "shepherd",
    "ref": "Mateo 7:24–27",
    "title": "La casa sobre la roca",
    "scene": "Dos constructores decidieron edificar su casa al mismo tiempo.",
    "image": "assets/stories/story-16.png",
    "story": [
      "Dos constructores decidieron edificar su casa al mismo tiempo.",
      "El primero era impaciente. Encontró un lugar de arena suave donde era fácil excavar y construyó rápido. Paredes firmes, techo bonito, ventanas bien puestas. En pocas semanas tenía lista la casa más linda de la región.",
      "El segundo era lento. Encontró un lugar con roca viva debajo de la tierra y empezó a cavar. Tardó semanas solo en llegar a la roca. Los vecinos lo veían sudar y se preguntaban cuándo terminaría. Cuando por fin empezó a construir, la casa del primero ya era famosa en el pueblo.",
      "Llegó el invierno.",
      "Las lluvias fueron largas ese año. El río creció. El viento sopló de una manera que la gente del pueblo no recordaba haber visto antes.",
      "Una mañana, donde había estado la casa de la arena, solo quedaba un montón de escombros y barro.",
      "La otra casa estaba perfecta.",
      "Jesús contó esta historia y dijo: \"El que escucha mis palabras y las pone en práctica es como el hombre que construyó sobre la roca.\" No basta con escuchar. La diferencia está en lo que hacemos después."
    ],
    "question": "¿Qué cosas en nuestra vida estamos construyendo sobre arena? ¿Cómo se ve en la práctica construir sobre la roca?",
    "prayer": "Señor, que todo lo que construimos en esta familia sea sobre ti. Ayúdanos a cavar hasta llegar a la roca. Amén."
  },
  {
    "number": 17,
    "visual": "family",
    "ref": "Lucas 17:11–19",
    "title": "Los diez leprosos",
    "scene": "Diez hombres vivían fuera del pueblo porque tenían lepra.",
    "image": "assets/stories/story-17.png",
    "story": [
      "Diez hombres vivían fuera del pueblo porque tenían lepra.",
      "No podían entrar. No podían abrazar a sus familias. Cuando alguien se acercaba, tenían que gritar \"¡Impuro!\" para advertirle. Era una vida de distancia y silencio.",
      "Un día Jesús pasó cerca. Los diez lo vieron desde lejos. \"¡Jesús, Maestro, ten misericordia de nosotros!\"",
      "Jesús los miró y dijo algo extraño: \"Vayan y muéstrense a los sacerdotes.\" Eso era lo que hacías después de quedar sano — ibas al sacerdote para que lo verificara. Pero ellos todavía no estaban sanos.",
      "Fueron de todas formas. Y mientras caminaban, la lepra desapareció.",
      "Los diez quedaron sanos. Pero solo uno regresó.",
      "Volvió corriendo, cayó a los pies de Jesús y le dio gracias. Era samaritano, lo que lo hacía el menos esperado.",
      "Jesús miró hacia el camino por donde se habían ido los otros nueve. \"¿No quedaron sanos diez? ¿Dónde están los otros nueve?\"",
      "No era un reclamo. Era una pregunta real. Una que todavía resuena: cuántas veces recibimos algo de Dios y seguimos caminando sin voltear a dar gracias.",
      "El que volvió recibió algo más que sanidad. Jesús le dijo: \"Tu fe te ha salvado.\"",
      "Los diez fueron sanados. Pero solo uno fue salvo."
    ],
    "question": "¿Qué cosas le agradecemos a Dios regularmente? ¿Hay algo que hemos recibido y no hemos vuelto a agradecer?",
    "prayer": "Padre, que seamos como el que volvió. Que en medio de las bendiciones nunca olvidemos quién nos las dio. Gracias, Señor. Gracias. Amén."
  },
  {
    "number": 18,
    "visual": "water",
    "ref": "Mateo 13:44",
    "title": "El tesoro escondido",
    "scene": "Un hombre llamado Ezra trabajaba en el campo de otro.",
    "image": "assets/stories/story-18.png",
    "story": [
      "Un hombre llamado Ezra trabajaba en el campo de otro.",
      "Un día, mientras araba la tierra, el arado chocó con algo duro. Se agachó a ver. Era una caja de madera vieja, casi negra de tierra. La abrió.",
      "Monedas de oro. Joyas. Más de lo que había visto en toda su vida.",
      "Ezra miró a su alrededor. No había nadie. Con manos temblorosas enterró la caja de nuevo, marcó el lugar con una piedra y caminó de regreso al pueblo como si nada.",
      "Esa noche no durmió.",
      "A la mañana siguiente empezó a vender todo lo que tenía. Sus herramientas. Sus muebles. Su burro. La gente del pueblo pensó que se había vuelto loco. \"¿Qué haces, Ezra? ¿Por qué vendes todo?\"",
      "Ezra sonreía y no decía nada.",
      "Con lo que juntó, compró el campo. Y luego fue a buscar su tesoro.",
      "Jesús usó esta historia para describir el Reino de Dios. No lo explicó con palabras complicadas. Solo dijo: es como ese hombre que encontró el tesoro. Que cuando lo encontró, en su alegría, fue y vendió todo lo que tenía para conseguirlo.",
      "El Reino no es una obligación. Es un descubrimiento que cambia todo lo demás."
    ],
    "question": "¿Qué cosas tratamos a veces como más valiosas que el Reino de Dios? ¿Qué tendríamos que \"vender\" para obtener lo más valioso?",
    "prayer": "Señor, que entendamos el valor de lo que encontramos en ti. Que ninguna otra cosa se vea más brillante que tu Reino. Ayúdanos a darlo todo con alegría. Amén."
  },
  {
    "number": 19,
    "visual": "bread",
    "ref": "Lucas 5:1–11",
    "title": "La pesca milagrosa",
    "scene": "Pedro llevaba toda la noche pescando. Él y sus compañeros habían trabajado hasta el amanecer y las redes volvían vacías cada vez. Era el peor tipo de noche para un pescador: larga, fría y sin nada que mostrar.",
    "image": "assets/stories/story-19.png",
    "story": [
      "Pedro llevaba toda la noche pescando. Él y sus compañeros habían trabajado hasta el amanecer y las redes volvían vacías cada vez. Era el peor tipo de noche para un pescador: larga, fría y sin nada que mostrar.",
      "Estaban lavando las redes en la orilla cuando Jesús subió a la barca de Pedro y le pidió que se alejara un poco de la orilla. Desde ahí empezó a enseñar a la gente que estaba en la playa.",
      "Cuando terminó de hablar, se volvió a Pedro. \"Lleva la barca a la parte profunda y echen las redes.\"",
      "Pedro era pescador. Jesús era carpintero. Pedro sabía que no se pescaba de día en esas aguas. Pero algo en la mirada de Jesús lo hizo responder diferente a lo que pensaba: \"Maestro, hemos trabajado toda la noche y no hemos pescado nada. Pero si tú lo dices, echaré las redes.\"",
      "Las redes se llenaron tanto que empezaron a romperse. Tuvieron que llamar a la otra barca para ayudar, y las dos barcas quedaron tan llenas que casi se hundían.",
      "Pedro cayó de rodillas ante Jesús en medio de los peces. \"¡Aléjate de mí, Señor, que soy un hombre pecador!\"",
      "Jesús lo miró. \"No temas. De ahora en adelante pescarás personas.\"",
      "Pedro dejó todo y lo siguió."
    ],
    "question": "Pedro obedeció aunque no tenía sentido para él. ¿Hay algo que Dios nos ha pedido hacer que no entendemos todavía, pero que podríamos obedecer de todas formas?",
    "prayer": "Señor, que aprendamos a decir como Pedro: \"Pero si tú lo dices, lo haré.\" Que tu palabra pese más que nuestra experiencia o nuestro cansancio. Amén."
  },
  {
    "number": 20,
    "visual": "shepherd",
    "ref": "Lucas 21:1–4",
    "title": "El farol de la viuda",
    "scene": "Era día de ofrenda en el templo.",
    "image": "assets/stories/story-20.png",
    "story": [
      "Era día de ofrenda en el templo.",
      "Jesús estaba sentado cerca del lugar donde la gente depositaba sus ofrendas y miraba. Pasaron hombres ricos que echaban grandes cantidades con movimientos amplios. Había ruido de monedas. Había gente mirando.",
      "Entonces se acercó una mujer mayor. Viuda, lo que quería decir que estaba sola en el mundo. Echó dos monedas pequeñas. Las más pequeñas que existían. Casi no hicieron ruido.",
      "Y Jesús llamó a sus discípulos.",
      "\"Esta mujer pobre echó más que todos los demás.\"",
      "Los discípulos miraron las monedas. Miraron a los ricos. No cuadraba.",
      "\"Todos los demás echaron de lo que les sobraba. Ella echó de lo que le faltaba. Echó todo lo que tenía para vivir.\"",
      "No era una lección sobre cantidades. Era una lección sobre el corazón. Sobre la diferencia entre dar lo que sobra y dar lo que duele.",
      "Nadie más en el templo ese día estaba mirando a esa mujer. Jesús sí."
    ],
    "question": "¿Damos de lo que nos sobra o de lo que nos cuesta? ¿Qué diferencia hace eso en nuestra familia?",
    "prayer": "Señor, que aprendamos a dar como la viuda. Que no midamos la generosidad en cantidades sino en corazón. Y que sepamos que tus ojos ven lo que nadie más nota. Amén."
  },
  {
    "number": 21,
    "visual": "family",
    "ref": "Juan 5:1–15",
    "title": "El paralítico de Betesda",
    "scene": "Había un hombre que llevaba treinta y ocho años enfermo.",
    "image": "assets/stories/story-21.png",
    "story": [
      "Había un hombre que llevaba treinta y ocho años enfermo.",
      "Estaba acostado junto al estanque de Betesda, en Jerusalén, donde se reunían ciegos, cojos y paralíticos. La tradición decía que de vez en cuando un ángel movía las aguas del estanque, y el primero en entrar quedaba sano.",
      "Treinta y ocho años esperando ser el primero.",
      "Jesús pasó y lo vio. Supo cuánto tiempo llevaba así. Se acercó y le preguntó algo que parece obvia pero no lo es: \"¿Quieres quedar sano?\"",
      "El hombre respondió con una excusa: \"No tengo a nadie que me meta en el agua cuando se agita. Siempre llega otro antes que yo.\"",
      "Jesús no discutió. No le preguntó por sus excusas. Solo dijo: \"Levántate, toma tu camilla y anda.\"",
      "Y el hombre se levantó.",
      "Treinta y ocho años. Y un día fue suficiente.",
      "La pregunta que Jesús le hizo es una que vale la pena hacerse: ¿quiero realmente sanar? ¿O me he acostumbrado tanto a esperar que ya no imagino otra vida?"
    ],
    "question": "¿Hay algo en nuestra vida en lo que llevamos mucho tiempo \"esperando junto al estanque\"? ¿Qué pasaría si le dijéramos a Jesús que sí queremos sanar?",
    "prayer": "Señor, te decimos que sí. Que queremos sanar, crecer, cambiar. Que no queremos acostumbrarnos al suelo cuando tú nos estás diciendo que nos levantemos. Amén."
  },
  {
    "number": 22,
    "visual": "water",
    "ref": "Juan 4:1–30",
    "title": "Jesús y la mujer samaritana",
    "scene": "Era mediodía y el sol caía sin misericordia sobre el pozo de Jacob.",
    "image": "assets/stories/story-22.png",
    "story": [
      "Era mediodía y el sol caía sin misericordia sobre el pozo de Jacob.",
      "Ninguna mujer sensata iba al pozo a esa hora. Las mujeres iban por la mañana, cuando el aire todavía era fresco, cuando se podía conversar y reír. Pero ella iba sola, a mediodía, cuando no había nadie. Así evitaba las miradas. Los comentarios. Las voces que la hacían sentir menos.",
      "Cuando llegó, había un hombre sentado junto al pozo. Era judío — se notaba por la ropa, por el acento. Y los judíos no hablaban con samaritanos. Especialmente no con mujeres samaritanas.",
      "Pero el hombre le habló.",
      "\"Dame de beber.\"",
      "Ella lo miró sorprendida. \"¿Cómo tú, siendo judío, me pides de beber a mí, que soy samaritana?\"",
      "El hombre sonrió. \"Si supieras quién soy, tú me pedirías a mí, y yo te daría agua viva.\"",
      "La conversación que siguió fue la más extraña y la más honesta que ella había tenido en años. Él sabía todo sobre su vida — los cinco maridos, el hombre con quien vivía ahora. Y no la condenó. Solo habló. Sobre el agua que sacia para siempre. Sobre adorar en espíritu y en verdad.",
      "\"Yo soy el Mesías\", dijo él. \"El que habla contigo.\"",
      "Ella dejó el cántaro junto al pozo y corrió al pueblo. \"Vengan a ver a un hombre que me dijo todo lo que he hecho.\" Y toda la ciudad fue a verlo.",
      "Un cántaro olvidado junto a un pozo. Y una mujer que ya no necesitaba esconderse."
    ],
    "question": "Jesús eligió hablar con alguien que muchos ignoraban. ¿Hay personas en nuestra vida que ignoramos sin darnos cuenta?",
    "prayer": "Jesús, gracias porque no te importa de dónde venimos ni lo que hemos hecho. Hablas con nosotros como hablaste con ella junto al pozo. Que nunca dejemos de escucharte. Amén."
  },
  {
    "number": 23,
    "visual": "bread",
    "ref": "Mateo 5:14–16",
    "title": "La luz del mundo",
    "scene": "La pequeña Isabel recibió una linterna nueva en su cumpleaños.",
    "image": "assets/stories/story-23.png",
    "story": [
      "La pequeña Isabel recibió una linterna nueva en su cumpleaños.",
      "Era brillante, roja y tenía una luz muy fuerte. Esa noche se la llevó al cuarto y la metió debajo de la cama para que nadie la viera. \"Es mía\", pensó. \"No quiero que se me pierda.\"",
      "Esa noche hubo apagón en toda la calle.",
      "Su mamá caminó a tientas por el pasillo. Su papá buscó velas. Su hermano pequeño empezó a llorar porque le tenía miedo a la oscuridad. Toda la familia tropezando en la oscuridad.",
      "Isabel estaba en su cuarto, con la linterna apagada debajo de la cama.",
      "La sacó. La encendió. Salió al pasillo.",
      "La luz llegó a todas partes. Su hermano dejó de llorar. Su mamá encontró las velas. Su papá no tropezó más.",
      "Al día siguiente, Isabel le contó esto a su maestra en la escuela dominical. La maestra sonrió y le leyó algo de Jesús: \"Ustedes son la luz del mundo. Nadie enciende una lámpara para meterla debajo de un cajón. La pone en alto para que alumbre a todos.\"",
      "Isabel nunca más metió la linterna debajo de la cama. Y aprendió que la fe funciona igual."
    ],
    "question": "¿Hay maneras en que guardamos nuestra fe \"debajo de la cama\"? ¿Cómo podemos ser luz en nuestra familia, escuela o vecindario?",
    "prayer": "Señor, que no escondamos lo que tú pusiste en nosotros. Que nuestra familia sea una casa donde la luz se ve desde afuera. Amén."
  },
  {
    "number": 24,
    "visual": "shepherd",
    "ref": "Mateo 8:5–13",
    "title": "El soldado y el siervo",
    "scene": "Un centurión romano se acercó a Jesús. Era un oficial militar, un hombre de autoridad real, alguien acostumbrado a dar órdenes y recibirlas.",
    "image": "assets/stories/story-24.png",
    "story": [
      "Un centurión romano se acercó a Jesús. Era un oficial militar, un hombre de autoridad real, alguien acostumbrado a dar órdenes y recibirlas.",
      "Pero ese día venía a pedir, no a ordenar.",
      "\"Señor, mi siervo está en casa, paralizado, sufriendo terriblemente.\"",
      "Jesús respondió de inmediato: \"Iré y lo sanaré.\"",
      "Entonces el centurión dijo algo que sorprendió a todos: \"Señor, no soy digno de que entres bajo mi techo. Solo di la palabra, y mi siervo quedará sano.\"",
      "Y explicó: \"Yo también soy hombre bajo autoridad. Cuando digo a un soldado 've', va. Cuando digo 'ven', viene.\"",
      "Jesús se detuvo. Se volvió a la gente que lo seguía y dijo: \"En Israel no he encontrado tanta fe como en este hombre.\"",
      "Luego le dijo al centurión: \"Ve. Como creíste, así te sea hecho.\"",
      "En ese mismo momento, el siervo quedó sano.",
      "Lo más notable no es el milagro. Es quién lo creyó. Un soldado romano que no era judío, que no había crecido con las Escrituras, pero que llegó a Jesús con una lógica simple: si él tiene autoridad sobre la enfermedad, solo necesito su palabra.",
      "A veces la fe más grande viene de donde menos se espera."
    ],
    "question": "¿Creemos de verdad que la palabra de Jesús es suficiente? ¿O necesitamos verlo \"en persona\" para confiar?",
    "prayer": "Señor, que tengamos la fe del centurión. Que no necesitemos que estés físicamente para creer que lo que dices se cumple. Tu palabra es suficiente. Amén."
  },
  {
    "number": 25,
    "visual": "family",
    "ref": "Génesis 15:1–6",
    "title": "Abraham y las estrellas",
    "scene": "Abraham era viejo. Su esposa Sara también era vieja. Y no tenían hijos.",
    "image": "assets/stories/story-25.png",
    "story": [
      "Abraham era viejo. Su esposa Sara también era vieja. Y no tenían hijos.",
      "Eso, en su época, era más que una tristeza personal. Significaba que no habría nadie que continuara su nombre. Era una herida que cargaban en silencio hace años.",
      "Una noche, Dios le habló a Abraham en una visión. Le dijo que no tuviera miedo. Que Él era su escudo y su recompensa.",
      "Pero Abraham respondió con honestidad: \"¿Qué me puedes dar, si no tengo hijos? Un sirviente de mi casa va a heredar todo lo que tengo.\"",
      "Y entonces Dios hizo algo sencillo pero poderoso. Lo sacó afuera.",
      "\"Mira el cielo. Cuenta las estrellas, si puedes.\"",
      "Abraham levantó los ojos. El cielo estaba lleno — más puntos de luz de los que se podían contar.",
      "\"Así será tu descendencia\", dijo Dios.",
      "Abraham lo miró. Tenía casi cien años. Sara era anciana. Era humanamente imposible. Pero la Biblia dice algo que se ha repetido por miles de años: Abraham le creyó a Dios. Y eso le fue contado como justicia.",
      "No lo entendió. No lo vio todavía. Pero creyó.",
      "Muchas generaciones después, de esa familia nació un niño en Belén. Y su nombre era Jesús.",
      "Las estrellas que Abraham contó esa noche eran parte de una promesa que todavía se estaba cumpliendo."
    ],
    "question": "¿Hay algo que le has pedido a Dios y que todavía no ha llegado? ¿Qué nos enseña Abraham sobre cómo esperar?",
    "prayer": "Señor, ayúdanos a creer tus promesas como Abraham creyó — aunque no las veamos todavía. Que nuestra fe no dependa de lo que entendemos sino de quién eres tú. Amén."
  },
  {
    "number": 26,
    "visual": "water",
    "ref": "Juan 4:46–54",
    "title": "El hijo del funcionario",
    "scene": "El hombre era funcionario del rey, y ese día no le importaba ninguno de sus títulos.",
    "image": "assets/stories/story-26.png",
    "story": [
      "El hombre era funcionario del rey, y ese día no le importaba ninguno de sus títulos.",
      "Su hijo estaba muriendo.",
      "Había escuchado que Jesús había llegado a Caná. Sin pensarlo dos veces, caminó hasta allá. Cuando lo encontró entre la gente, fue directo: \"Señor, baja y sana a mi hijo antes de que muera.\"",
      "Jesús le dijo: \"Ve. Tu hijo vive.\"",
      "No fue con él. No hizo nada visible. No tocó al niño. Solo dijo esas palabras.",
      "Y el hombre creyó. Y se fue.",
      "Eso era lo que tenía — una palabra. Solo una palabra de Jesús y un camino de regreso a casa.",
      "Cuando todavía estaba en el camino, salieron a su encuentro sus siervos. \"Tu hijo vive.\" Preguntó a qué hora había mejorado. Le dijeron que a la una de la tarde. El hombre recordó: era exactamente la hora en que Jesús había dicho esas palabras.",
      "Llegó a casa y encontró a su hijo sentado, con color en el rostro, comiendo.",
      "Ese día creyó él y toda su familia.",
      "La distancia entre donde estaba Jesús y donde estaba su hijo no fue obstáculo. La palabra de Jesús llegó antes que él."
    ],
    "question": "El padre no vio nada — solo escuchó la palabra de Jesús y eligió creer. ¿Podemos creer lo que Dios dice aunque todavía no lo veamos?",
    "prayer": "Señor, que aprendamos a confiar en tu palabra antes de ver el resultado. Que lo que tú dices sea suficiente para nosotros. Amén."
  },
  {
    "number": 27,
    "visual": "bread",
    "ref": "Mateo 18:21–35",
    "title": "El siervo que no supo perdonar",
    "scene": "Pedro le preguntó a Jesús: \"¿Cuántas veces tengo que perdonar a alguien que me ofende? ¿Hasta siete veces?\"",
    "image": "assets/stories/story-27.png",
    "story": [
      "Pedro le preguntó a Jesús: \"¿Cuántas veces tengo que perdonar a alguien que me ofende? ¿Hasta siete veces?\"",
      "Jesús respondió: \"No siete, sino setenta veces siete.\" Y contó una historia.",
      "Había un rey que decidió cobrar las deudas de sus siervos. Uno de ellos le debía una cantidad imposible — más de lo que podría ganar en diez mil vidas. No tenía cómo pagar. El rey ordenó que lo vendieran junto con su familia.",
      "El siervo cayó de rodillas. \"Ten paciencia conmigo y te lo pagaré todo.\"",
      "El rey lo miró. Y sintió compasión. Perdonó toda la deuda. Todo. Borrado.",
      "El siervo salió libre. Y en el camino encontró a un compañero que le debía una cantidad pequeña. Lo tomó del cuello. \"Págame lo que me debes.\"",
      "El compañero cayó de rodillas con las mismas palabras. \"Ten paciencia conmigo.\"",
      "Pero el siervo no quiso escuchar. Lo hizo meter en la cárcel.",
      "Cuando el rey se enteró, lo llamó. \"Siervo malvado. Yo te perdoné toda aquella deuda. ¿No debías tú también tener misericordia?\"",
      "Jesús terminó mirando a Pedro. \"Así también mi Padre celestial hará con vosotros si no perdonáis de corazón cada uno a su hermano.\"",
      "El perdón que recibimos no es para guardarlo. Es para darlo."
    ],
    "question": "¿Hay alguien a quien le debemos perdón? ¿Cómo cambia saber que nosotros también hemos sido perdonados de algo muy grande?",
    "prayer": "Señor, gracias porque perdonaste la deuda que nosotros no podíamos pagar. Ayúdanos a dar a otros lo que tú nos diste a nosotros. Amén."
  },
  {
    "number": 28,
    "visual": "shepherd",
    "ref": "Juan 11:1–44",
    "title": "La resurrección de Lázaro",
    "scene": "Lázaro estaba enfermo. Sus hermanas Marta y María mandaron un mensaje a Jesús: \"Señor, el que amas está enfermo.\"",
    "image": "assets/stories/story-28.png",
    "story": [
      "Lázaro estaba enfermo. Sus hermanas Marta y María mandaron un mensaje a Jesús: \"Señor, el que amas está enfermo.\"",
      "Jesús amaba a esa familia. Pero no fue de inmediato. Cuando por fin fue, Lázaro ya llevaba cuatro días muerto.",
      "Marta salió a recibirlo en el camino. \"Señor, si hubieras estado aquí, mi hermano no habría muerto.\" No era un reproche suave — era el dolor de alguien que había esperado y la espera no había funcionado como pensaba.",
      "Jesús le dijo: \"Yo soy la resurrección y la vida. El que cree en mí, aunque muera, vivirá.\"",
      "Luego llegó María. Ella también dijo lo mismo: \"Si hubieras estado aquí...\" Y lloraba.",
      "Jesús también lloró.",
      "El Dios del universo, parado frente a una tumba, con lágrimas en el rostro. No porque no supiera lo que iba a pasar. Sino porque el dolor de los que amaba le dolía a Él también.",
      "\"Quiten la piedra.\"",
      "Marta protestó. \"Ya huele mal, lleva cuatro días.\"",
      "\"¿No te dije que si crees, verás la gloria de Dios?\"",
      "Quitaron la piedra. Jesús oró. Y luego gritó: \"¡Lázaro, sal fuera!\"",
      "Y Lázaro salió. Todavía envuelto en las vendas de la tumba. Vivo."
    ],
    "question": "Jesús lloró aunque sabía lo que venía. ¿Qué nos dice eso sobre cómo Dios ve nuestro dolor? ¿Hay algo en tu vida que sientes que llegó \"tarde\"?",
    "prayer": "Jesús, gracias porque nuestro dolor te importa. Que cuando sintamos que llegaste tarde, recordemos que tú ves lo que nosotros no podemos ver todavía. Eres la resurrección y la vida. Amén."
  },
  {
    "number": 29,
    "visual": "family",
    "ref": "Mateo 17:1–9",
    "title": "La transfiguración",
    "scene": "Jesús subió al monte con tres de sus discípulos — Pedro, Jacobo y Juan. Solo ellos tres.",
    "image": "assets/stories/story-29.png",
    "story": [
      "Jesús subió al monte con tres de sus discípulos — Pedro, Jacobo y Juan. Solo ellos tres.",
      "Mientras estaban en la cumbre, algo pasó que ninguno de ellos supo bien cómo describir después. El rostro de Jesús cambió. Brilló como el sol. Su ropa se volvió blanca como la luz.",
      "Y entonces aparecieron dos hombres hablando con Él — Moisés y Elías. Los dos grandes del Antiguo Testamento. Uno había sacado a Israel de Egipto. El otro había desafiado a reyes. Y ahora estaban ahí, en el monte, conversando con Jesús.",
      "Pedro, que nunca sabía cuándo callarse, dijo lo primero que se le ocurrió: \"Señor, qué bueno que estemos aquí. Si quieres, hago tres tiendas — una para ti, una para Moisés, una para Elías.\"",
      "Mientras todavía hablaba, una nube brillante los cubrió. Y desde la nube vino una voz: \"Este es mi Hijo amado, en quien tengo complacencia. A él oíd.\"",
      "Los tres discípulos cayeron con su rostro en tierra, llenos de temor.",
      "Entonces Jesús se acercó. Los tocó. \"Levantaos y no temáis.\"",
      "Cuando levantaron los ojos, no vieron a nadie más que a Jesús solo.",
      "Bajaron del monte en silencio. Habían visto algo que nadie más había visto. Y no tenían palabras suficientes para describirlo."
    ],
    "question": "Dios dijo \"a él oíd\" — escúchenlo a Él. ¿Qué significa escuchar a Jesús en tu vida diaria? ¿Cómo lo hacemos en familia?",
    "prayer": "Señor Jesús, tú eres el Hijo amado de Dios. Hoy elegimos escucharte a ti — en tu Palabra, en la oración, en los momentos quietos. Que tu voz sea la que guíe nuestra familia. Amén."
  },
  {
    "number": 30,
    "visual": "water",
    "ref": "Juan 13:1–17",
    "title": "La última noche",
    "scene": "Era la última noche antes de que todo cambiara.",
    "image": "assets/stories/story-30.png",
    "story": [
      "Era la última noche antes de que todo cambiara.",
      "Jesús lo sabía. Sabía lo que vendría en pocas horas. Y aun así eligió ese momento para hacer algo que dejó a todos sin palabras.",
      "Se levantó de la mesa.",
      "Se quitó la túnica exterior y se envolvió una toalla en la cintura. Llenó una vasija con agua. Y empezó a lavar los pies de sus discípulos.",
      "Lavar los pies era el trabajo del sirviente más bajo de la casa. Nadie que tuviera algún título lo haría. Pedro protestó: \"Señor, ¿tú lavarme los pies a mí?\" Jesús respondió: \"Ahora no entiendes lo que hago, pero lo entenderás después.\"",
      "Lavó los pies de todos. Incluso los de Judas.",
      "Luego se volvió a poner la túnica y regresó a la mesa. \"¿Entienden lo que hice? Ustedes me llaman Maestro y Señor, y tienen razón. Pues si yo, siendo el Maestro y el Señor, les lavé los pies, ustedes también deben lavarse los pies unos a otros.\"",
      "El que más tenía sirvió al que menos tenía. El que tenía todo el poder se arrodilló.",
      "Esa es la última lección que Jesús dio antes de ir a la cruz. No fue sobre teología. Fue sobre una toalla y una vasija de agua."
    ],
    "question": "¿Cómo podemos \"lavarnos los pies\" unos a otros en nuestra familia esta semana? ¿Qué significa servir de verdad a alguien que amamos?",
    "prayer": "Señor Jesús, que el espíritu de la toalla viva en nuestra familia. Que el más grande aprenda a servir. Que el amor no sea solo una palabra sino una vasija de agua y unas manos arrodilladas. Amén."
  }
];

const englishBible = {
  JHN: { 1: ["In the beginning was the Word, and the Word was with God, and the Word was God.", "The same was in the beginning with God.", "All things were made by him; and without him was not any thing made that was made.", "In him was life; and the life was the light of men.", "And the light shineth in darkness; and the darkness comprehended it not."], 3: ["There was a man of the Pharisees, named Nicodemus, a ruler of the Jews.", "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God.", "Jesus answered and said unto him, Except a man be born again, he cannot see the kingdom of God.", "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."] },
  PSA: { 23: ["The LORD is my shepherd; I shall not want.", "He maketh me to lie down in green pastures: he leadeth me beside the still waters.", "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.", "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me.", "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.", "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever."] },
  PHP: { 4: ["Therefore, my brethren dearly beloved and longed for, my joy and crown, so stand fast in the Lord, my dearly beloved.", "Rejoice in the Lord alway: and again I say, Rejoice.", "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.", "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."] }
};

const defaultState = {
  lang: "es",
  theme: "system",
  completed: [],
  favorites: [],
  storyProgress: {},
  overviewProgress: [],
  profilePhoto: "",
  progress: {},
  activeJourney: "meet-jesus",
  journal: [],
  guest: true,
  onboarded: false,
  goals: [],
  rhythm: "",
  interests: ["bible", "oracion", "paz", "familia"],
  subscriptionQuiz: {},
  subscriptionResult: null,
  trialStartedAt: "",
  lastBible: { book: "JHN", chapter: 1 }
};
let state = loadState();
let route = location.hash.slice(1) || "home";
let previousRoute = "home";
let installPrompt = null;
let activeDay = null;
let activeMoment = null;
let activeStory = null;
let activeOverviewBook = null;
let activeOverviewStage = null;
let activeCategory = null;
let activeWisdomDay = 1;
let assistantPanelOpen = false;
let showAllCollections = false;
let authMode = "login";
let accessChecking = false;
let userAccess = { allowed: false, record: null, reason: "unchecked" };
let wisdomDaysCache = null;
let activeNight = 1;
let nightGuidesCache = null;
let prayerMomentsCache = null;
let prayerQuestionsCache = null;
let prayerResultsCache = null;
let prayerQuizIndex = 0;
let prayerQuizAnswers = [];
let subscriptionQuizIndex = 0;
let assistantMessages = [];
let scrollTargetAfterRender = null;
let currentUser = null;
let authConfigured = isSupabaseConfigured();
let authInitializing = authConfigured;
let schemaReady = false;
let currentUtterance = null;
let narrationQueue = [];
let narrationIndex = 0;
const bibleBookCache = new Map();

function loadState() {
  try { return normalizeState({ ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }); }
  catch { return normalizeState({ ...defaultState }); }
}

function normalizeState(input) {
  const next = { ...defaultState, ...input };
  next.progress = { ...(next.progress || {}) };
  next.storyProgress = next.storyProgress && typeof next.storyProgress === "object" ? next.storyProgress : {};
  next.overviewProgress = Array.isArray(next.overviewProgress) ? [...new Set(next.overviewProgress.map(String))] : [];
  next.favorites = Array.isArray(next.favorites) ? next.favorites : [];
  next.profilePhoto = typeof next.profilePhoto === "string" ? next.profilePhoto : "";
  next.interests = Array.isArray(next.interests)
    ? [...new Set(next.interests.filter(id => interestOptions.some(option => option.id === id)))]
    : ["bible", "oracion", "paz", "familia"];
  if (!next.interests.length) next.interests = ["bible", "oracion", "paz", "familia"];
  next.subscriptionQuiz = next.subscriptionQuiz && typeof next.subscriptionQuiz === "object" ? next.subscriptionQuiz : {};
  next.subscriptionResult = next.subscriptionResult && typeof next.subscriptionResult === "object" ? next.subscriptionResult : null;
  next.trialStartedAt = typeof next.trialStartedAt === "string" ? next.trialStartedAt : "";
  if (!Array.isArray(next.progress["meet-jesus"]) && Array.isArray(next.completed)) {
    next.progress["meet-jesus"] = next.completed;
  }
  Object.keys(next.progress).forEach(journeyId => {
    next.progress[journeyId] = [...new Set((next.progress[journeyId] || []).map(Number))]
      .filter(day => Number.isInteger(day) && day >= 0)
      .sort((a, b) => a - b);
  });
  if (!devotionalJourneys[next.activeJourney]) next.activeJourney = "meet-jesus";
  next.completed = next.progress["meet-jesus"] || [];
  return next;
}

function saveState() {
  state = normalizeState(state);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function t(key) { return copy[state.lang][key] || key; }
function localized(value, fallback = "") {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return fallback;
  return value[state.lang] || value.es || value.en || fallback;
}
function localizedList(value) { return Array.isArray(value) ? value : value?.[state.lang] || []; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function authErrorMessage(error) {
  const message = String(error?.message || "");
  if (/invalid login|invalid credentials/i.test(message)) return state.lang === "en" ? "Email or password is not correct." : "El correo o la contraseña no son correctos.";
  if (/already registered|already exists|user already/i.test(message)) return state.lang === "en" ? "This email already has an account. Try signing in." : "Este correo ya tiene una cuenta. Intenta iniciar sesión.";
  if (/password/i.test(message)) return state.lang === "en" ? "Use a password with at least 8 characters." : "Usa una contraseña de al menos 8 caracteres.";
  if (/rate limit/i.test(message)) return t("authRateLimit");
  return t("authHumanError");
}
function validateEmailPassword({ email, password, confirmPassword, name, requireName = false, requireConfirm = false }) {
  if (requireName && !name.trim()) return state.lang === "en" ? "Write your name." : "Escribe tu nombre.";
  if (!isValidEmail(email)) return state.lang === "en" ? "Write a valid email." : "Escribe un correo válido.";
  if (!password || password.length < 8) return state.lang === "en" ? "Password must be at least 8 characters." : "La contraseña debe tener al menos 8 caracteres.";
  if (requireConfirm && password !== confirmPassword) return state.lang === "en" ? "Passwords do not match." : "Las contraseñas no coinciden.";
  return "";
}

function subscriptionQuizSteps() {
  return [
    {
      id: "seeking",
      type: "single",
      title: state.lang === "en" ? "What are you looking for in Yeshua?" : "¿Qué buscas en Yeshua?",
      subtitle: state.lang === "en" ? "This helps us open the app with the right first step." : "Esto nos ayuda a abrir la app con el primer paso correcto.",
      options: [
        { id: "peace", icon: "☘", label: state.lang === "en" ? "Peace and refuge" : "Paz y refugio" },
        { id: "bible", icon: "▦", label: state.lang === "en" ? "Understand the Bible" : "Comprender la Biblia" },
        { id: "prayer", icon: "✦", label: state.lang === "en" ? "Learn to pray" : "Aprender a orar" },
        { id: "family", icon: "♡", label: state.lang === "en" ? "Faith for my family" : "Fe para mi familia" }
      ]
    },
    {
      id: "prayerLife",
      type: "single",
      title: state.lang === "en" ? "How is your prayer life right now?" : "¿Cómo está tu vida de oración?",
      subtitle: state.lang === "en" ? "No guilt here. We are choosing a realistic rhythm." : "Sin culpa. Estamos eligiendo un ritmo realista.",
      options: [
        { id: "starting", icon: "○", label: state.lang === "en" ? "I am beginning" : "Estoy comenzando" },
        { id: "inconsistent", icon: "◐", label: state.lang === "en" ? "It comes and goes" : "Soy intermitente" },
        { id: "steady", icon: "●", label: state.lang === "en" ? "I pray often" : "Oro con frecuencia" },
        { id: "stuck", icon: "◇", label: state.lang === "en" ? "I do not know what to say" : "No sé qué decir" }
      ]
    },
    {
      id: "time",
      type: "single",
      title: state.lang === "en" ? "How much time do you have each day?" : "¿Cuánto tiempo tienes al día?",
      subtitle: state.lang === "en" ? "A small faithful rhythm is better than a plan you cannot keep." : "Un ritmo pequeño y fiel es mejor que un plan imposible de sostener.",
      options: [
        { id: "5", icon: "5", label: "5 min" },
        { id: "10", icon: "10", label: "10 min" },
        { id: "15", icon: "15", label: "15 min" },
        { id: "20", icon: "20", label: state.lang === "en" ? "20+ min" : "20+ min" }
      ]
    },
    {
      id: "format",
      type: "single",
      title: state.lang === "en" ? "How do you prefer to receive content?" : "¿Cómo prefieres recibir el contenido?",
      subtitle: state.lang === "en" ? "Yeshua can guide you by reading, listening, or both." : "Yeshua puede acompañarte leyendo, escuchando o combinando ambos.",
      options: [
        { id: "read", icon: "▤", label: state.lang === "en" ? "Read" : "Leer" },
        { id: "listen", icon: "♪", label: state.lang === "en" ? "Listen" : "Escuchar" },
        { id: "both", icon: "◈", label: state.lang === "en" ? "Both" : "Ambas" }
      ]
    },
    {
      id: "interests",
      type: "multi",
      title: state.lang === "en" ? "What themes matter most to you?" : "¿Qué temas te interesan más?",
      subtitle: state.lang === "en" ? "Choose all that apply. We will use them to shape your start." : "Elige todos los que apliquen. Los usaremos para formar tu inicio.",
      options: [
        { id: "peace", icon: "☘", label: state.lang === "en" ? "Peace" : "Paz" },
        { id: "anxiety", icon: "◌", label: state.lang === "en" ? "Anxiety" : "Ansiedad" },
        { id: "bible", icon: "▦", label: "Biblia" },
        { id: "family", icon: "♡", label: state.lang === "en" ? "Family" : "Familia" },
        { id: "prayer", icon: "✦", label: state.lang === "en" ? "Prayer" : "Oración" },
        { id: "rest", icon: "☾", label: state.lang === "en" ? "Rest" : "Descanso" },
        { id: "purpose", icon: "◇", label: state.lang === "en" ? "Purpose" : "Propósito" }
      ]
    }
  ];
}

function quizAnswerValue(step) {
  const value = state.subscriptionQuiz?.[step.id];
  return step.type === "multi" ? (Array.isArray(value) ? value : []) : value;
}

function hasQuizAnswer(step) {
  const value = quizAnswerValue(step);
  return step.type === "multi" ? value.length > 0 : !!value;
}

function buildSubscriptionResult() {
  const answers = state.subscriptionQuiz || {};
  const interests = Array.isArray(answers.interests) ? answers.interests : [];
  const focus = answers.seeking || interests[0] || "peace";
  const time = answers.time || "10";
  const wantsAudio = answers.format === "listen" || answers.format === "both";
  const devotionalMap = {
    peace: state.lang === "en" ? "When you need peace" : "Cuando necesitas paz",
    anxiety: state.lang === "en" ? "When anxiety rises" : "Cuando la ansiedad se levanta",
    bible: state.lang === "en" ? "Explore the Bible" : "Explora la Biblia",
    family: state.lang === "en" ? "Stories of Jesus for the family" : "Historias de Jesús para la familia",
    prayer: state.lang === "en" ? "Effective prayer" : "Oración eficaz",
    rest: state.lang === "en" ? "Night peace" : "Paz nocturna",
    purpose: state.lang === "en" ? "Grow in wisdom" : "Crecer en sabiduría"
  };
  const prayerMap = {
    peace: state.lang === "en" ? "A prayer to receive peace" : "Una oración para recibir paz",
    anxiety: state.lang === "en" ? "A prayer to surrender anxiety" : "Una oración para entregar la ansiedad",
    bible: state.lang === "en" ? "A prayer before reading Scripture" : "Una oración antes de leer la Palabra",
    family: state.lang === "en" ? "A prayer for my family" : "Una oración por mi familia",
    prayer: state.lang === "en" ? "Teach me to pray" : "Enséñame a orar",
    rest: state.lang === "en" ? "A prayer before sleeping" : "Una oración antes de dormir",
    purpose: state.lang === "en" ? "A prayer for direction" : "Una oración por dirección"
  };
  return {
    focus,
    time,
    format: answers.format || "both",
    devotional: devotionalMap[focus] || devotionalMap.peace,
    prayer: prayerMap[focus] || prayerMap.peace,
    plan: wantsAudio
      ? (state.lang === "en" ? "Begin with audio, continue with a short reflection, and close with one written prayer." : "Comienza con audio, sigue con una reflexión breve y cierra con una oración escrita.")
      : (state.lang === "en" ? "Read one passage slowly, write one phrase, and take one simple step." : "Lee un pasaje con calma, escribe una frase y toma un paso sencillo."),
    recommendedTime: `${time} min`
  };
}

function saveSubscriptionResult() {
  state.subscriptionResult = buildSubscriptionResult();
  saveState();
  syncPreferences();
}

function setTheme() {
  const actual = state.theme === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : state.theme;
  document.documentElement.dataset.theme = actual;
  document.querySelector('meta[name="theme-color"]').content = actual === "dark" ? "#0d1813" : "#f5f1e8";
  document.getElementById("theme-icon").textContent = actual === "dark" ? "\u2600" : "\u263D";
  document.getElementById("theme-button").ariaLabel = actual === "dark" ? t("themeDay") : t("themeNight");
}

function setLanguage() {
  document.documentElement.lang = state.lang;
  document.getElementById("language-button").textContent = state.lang === "es" ? "EN" : "ES";
  document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
  document.getElementById("back-button").ariaLabel = t("back");
  document.getElementById("bottom-nav").ariaLabel = state.lang === "es" ? "Navegación principal" : "Main navigation";
}

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? t("greetingMorning") : hour < 19 ? t("greetingAfternoon") : t("greetingEvening");
}

function currentJourneyId() { return devotionalJourneys[state.activeJourney] ? state.activeJourney : "meet-jesus"; }
function currentJourney() { return devotionalJourneys[currentJourneyId()]; }
function completedFor(journeyId = currentJourneyId()) { return state.progress?.[journeyId] || []; }
function setCompletedFor(journeyId, completed) {
  state.progress = { ...(state.progress || {}), [journeyId]: [...new Set(completed)].sort((a, b) => a - b) };
  state.completed = state.progress["meet-jesus"] || [];
}
function journeyTodayIndex(journeyId = currentJourneyId()) {
  const journey = devotionalJourneys[journeyId] || devotionalJourneys["meet-jesus"];
  const completed = completedFor(journeyId);
  const nextDay = journey.days.findIndex((_day, index) => !completed.includes(index));
  return nextDay === -1 ? journey.days.length - 1 : nextDay;
}
function todayIndex() { return journeyTodayIndex(); }
function totalCompleted() { return Object.values(state.progress || {}).reduce((sum, items) => sum + new Set(items).size, 0); }
function bibleVersion() { return state.lang === "es" ? "RV1909" : "KJV"; }
function dayVerse(day, index) { return day.verse?.[state.lang] || (state.lang === "en" ? englishDayScripture[index].verse : day.verse); }
function dayReference(day, index) { return day.ref?.[state.lang] || (state.lang === "en" ? englishDayScripture[index].ref : day.ref); }
function devotionalDeepening(journeyId, day, index) {
  const entry = devotionalDepth[journeyId]?.[index] || {};
  return {
    visual: entry.visual || "light",
    caption: localized(entry.caption || day.title),
    scene: localized(entry.scene || day.context),
    teaching: localized(entry.teaching || day.context),
    practice: localized(entry.practice || day.reflect)
  };
}
function supportsSpeech() { return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window; }
function narrationLanguage() { return state.lang === "es" ? "es-ES" : "en-US"; }
function preferredVoice() {
  if (!supportsSpeech()) return null;
  const voices = speechSynthesis.getVoices();
  const preferences = state.lang === "es"
    ? ["es-CO", "es-MX", "es-419", "es-US", "es-ES"]
    : ["en-US", "en-GB"];
  return preferences.map(code => voices.find(voice => voice.lang?.toLowerCase() === code.toLowerCase())).find(Boolean)
    || voices.find(voice => voice.lang?.toLowerCase().startsWith(state.lang))
    || null;
}
function clearReadingHighlight() {
  document.querySelectorAll(".is-reading").forEach(node => node.classList.remove("is-reading"));
  document.querySelectorAll(".audio-card").forEach(node => node.classList.remove("is-speaking"));
}
function stopNarration() {
  if (!supportsSpeech()) return;
  speechSynthesis.cancel();
  currentUtterance = null;
  narrationQueue = [];
  narrationIndex = 0;
  clearReadingHighlight();
}
function highlightNarrationSegment(segment) {
  document.querySelectorAll(".is-reading").forEach(node => node.classList.remove("is-reading"));
  if (segment?.element?.isConnected) {
    segment.element.classList.add("is-reading");
    segment.element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
function speakNextSegment() {
  if (!supportsSpeech() || narrationIndex >= narrationQueue.length) {
    currentUtterance = null;
    narrationQueue = [];
    narrationIndex = 0;
    clearReadingHighlight();
    return;
  }
  const segment = narrationQueue[narrationIndex];
  highlightNarrationSegment(segment);
  const utterance = new SpeechSynthesisUtterance(segment.text);
  utterance.lang = narrationLanguage();
  utterance.rate = state.lang === "es" ? 0.84 : 0.88;
  utterance.pitch = 1;
  const voice = preferredVoice();
  if (voice) utterance.voice = voice;
  utterance.onend = () => {
    narrationIndex += 1;
    speakNextSegment();
  };
  utterance.onerror = () => {
    narrationIndex += 1;
    speakNextSegment();
  };
  currentUtterance = utterance;
  speechSynthesis.speak(utterance);
}
function speakSegments(segments) {
  if (!supportsSpeech()) {
    toast(t("audioUnsupported"));
    return;
  }
  const cleanSegments = segments
    .map(segment => typeof segment === "string" ? { text: segment } : segment)
    .map(segment => ({ ...segment, text: String(segment.text || "").replace(/\s+/g, " ").trim() }))
    .filter(segment => segment.text);
  if (!cleanSegments.length) return;
  stopNarration();
  narrationQueue = cleanSegments;
  narrationIndex = 0;
  document.querySelectorAll(".audio-card").forEach(node => node.classList.add("is-speaking"));
  speakNextSegment();
  toast(t("audioPlaying"));
}
function speakText(text) { speakSegments([text]); }
function toggleNarrationPause() {
  if (!supportsSpeech()) return toast(t("audioUnsupported"));
  if (speechSynthesis.paused) speechSynthesis.resume();
  else if (speechSynthesis.speaking) speechSynthesis.pause();
}
function devotionalNarration(journeyId, day, index) {
  const journey = devotionalJourneys[journeyId] || currentJourney();
  const depth = devotionalDeepening(journeyId, day, index);
  return [
    localized(journey.title),
    `${t("day")} ${index + 1}. ${localized(day.title)}.`,
    `${t("read")}. ${dayReference(day, index)}. ${dayVerse(day, index)}`,
    `${t("scene")}. ${depth.scene}`,
    `${t("teaching")}. ${depth.teaching}`,
    `${t("practice")}. ${depth.practice}`,
    `${t("reflect")}. ${localized(day.reflect)}`,
    `${t("pray")}. ${localized(day.prayer)}`
  ].join(" ");
}
function audioControls(id) {
  return `<section class="audio-card card">
    <span class="audio-icon" aria-hidden="true">♪</span>
    <div><p class="eyebrow">${t("audioTitle")}</p><p>${t("audioIntro")}</p></div>
    <div class="audio-actions">
      <button class="secondary-button" data-listen="${id}">${t("listen")}</button>
      <button class="secondary-button" data-audio-pause>${t("pauseAudio")}/${t("resumeAudio")}</button>
      <button class="quiet-button" data-audio-stop>${t("stopAudio")}</button>
    </div>
  </section>`;
}
function accountName() { return currentUser?.user_metadata?.display_name || currentUser?.email?.split("@")[0] || (state.lang === "en" ? "Yeshua user" : "Usuario Yeshua"); }
function accountAvatarUrl() { return state.profilePhoto || currentUser?.user_metadata?.avatar_url || currentUser?.user_metadata?.picture || ""; }
function accountInitial() { return (accountName().trim()[0] || "Y").toUpperCase(); }
function shortAccountName() {
  const name = accountName();
  return name.length > 18 ? `${name.slice(0, 16)}...` : name;
}
function goalLabel(goal) { return t(onboardingGoals.find(item => item[0] === goal)?.[1] || goal); }
function rhythmLabel() { return state.rhythm ? t(onboardingRhythms.find(item => item[0] === state.rhythm)?.[1] || state.rhythm) : ""; }
function bookLabel(bookId) { return bibleBooks.find(book => book.code === bookId)?.[state.lang] || bookId; }
function focusCopy() {
  const focusByGoal = { bible: "focusBible", prayer: "focusPrayer", peace: "focusPeace", rest: "focusRest", jesus: "focusJesus", family: "focusPrayer" };
  return t(focusByGoal[state.goals[0]] || "focusDefault");
}

function onboardingView() {
  return `<section class="screen onboarding-screen">
    <div class="onboarding-hero">
      <img class="brand-lockup" src="assets/logo-official.png" alt="Yeshua">
      <p class="eyebrow">${t("onboardingEyebrow")}</p>
      <h1>${t("onboardingTitle")}</h1>
      <p class="lede">${t("onboardingIntro")}</p>
    </div>
    <form id="onboarding-form" class="onboarding-form">
      <section class="card">
        <p class="eyebrow">${t("onboardingStep1")}</p>
        <div class="choice-grid">
          ${onboardingGoals.map(([value, label, icon]) => `<label class="choice-tile"><input type="checkbox" name="goals" value="${value}" ${state.goals.includes(value) ? "checked" : ""}><span aria-hidden="true">${icon}</span><strong>${t(label)}</strong></label>`).join("")}
        </div>
      </section>
      <section class="card">
        <p class="eyebrow">${t("onboardingStep2")}</p>
        <div class="rhythm-list">
          ${onboardingRhythms.map(([value, label]) => `<label class="rhythm-option"><input type="radio" name="rhythm" value="${value}" ${state.rhythm === value ? "checked" : ""}><span>${t(label)}</span></label>`).join("")}
        </div>
      </section>
      <section class="card accent">
        <p class="eyebrow">${t("onboardingStep3")}</p>
        <p class="scripture">“${dayVerse(days[0], 0)}”</p>
        <p class="reference">${dayReference(days[0], 0)} · ${bibleVersion()}</p>
      </section>
      <div class="button-row">
        <button class="primary-button full" type="submit">${t("onboardingStart")}</button>
        <button class="secondary-button full" type="button" data-route="login">${t("onboardingLogin")}</button>
      </div>
    </form>
  </section>`;
}

function renderPersonalizedHomeCard() {
  const result = state.subscriptionResult;
  if (!result) {
    return `<section class="personalized-home-card quiz-invite-card">
      <div>
        <p class="eyebrow">${state.lang === "en" ? "Recommended" : "Recomendado"}</p>
        <h2>${t("bibleOverviewTitle")}</h2>
        <p>${t("bibleOverviewIntro")}</p>
      </div>
      <button class="primary-button" type="button" data-route="overview">${state.lang === "en" ? "Explore the Bible" : "Explorar la Biblia"} <span>›</span></button>
    </section>`;
  }
  return `<section class="personalized-home-card">
    <div>
      <p class="eyebrow">${state.lang === "en" ? "Your path is ready" : "Tu camino está listo"}</p>
      <h2>${escapeHtml(result.devotional)}</h2>
      <p>${escapeHtml(result.plan)}</p>
    </div>
    <div class="personalized-home-meta">
      <span>${escapeHtml(result.recommendedTime)}</span>
      <span>${state.lang === "en" ? "Prayer" : "Oración"}: ${escapeHtml(result.prayer)}</span>
    </div>
    <button class="secondary-button" type="button" data-route="overview">${state.lang === "en" ? "Explore the Bible" : "Explorar la Biblia"}</button>
  </section>`;
}

function renderHomeFocusGrid() {
  return `<section class="home-focus-grid">
    <section class="assistant-feature-card" data-assistant-open>
      <div class="assistant-feature-orb"><span aria-hidden="true">◇</span></div>
      <div class="assistant-feature-copy">
        <p class="eyebrow">${state.lang === "en" ? "Companion" : "Acompañamiento"}</p>
        <h2>${t("assistantTitle")}</h2>
        <p class="assistant-short-copy">${state.lang === "en" ? "Ask.\nPray.\nReflect." : "Pregunta.\nOra.\nReflexiona."}</p>
        <button class="primary-button" type="button">${state.lang === "en" ? "Open assistant" : "Abrir asistente"} <span>›</span></button>
      </div>
    </section>
    <section class="overview-home-card" data-route="overview">
      <span class="overview-home-orb" aria-hidden="true">◈</span>
      <div>
        <h2>${t("bibleOverviewTitle")}</h2>
        <p>${state.lang === "en" ? "66 books.\nA visual journey." : "66 libros.\nUn recorrido visual."}</p>
      </div>
      <button class="secondary-button" type="button">${state.lang === "en" ? "Explore" : "Explorar"} <span>›</span></button>
    </section>
  </section>`;
}

function renderCategoryHub() {
  return `<section class="content-shelf category-hub-section">
    <div class="section-heading">
      <div><p class="eyebrow">${state.lang === "en" ? "Explore Yeshua" : "Explora Yeshua"}</p><h2>${state.lang === "en" ? "Choose an experience" : "Elige una experiencia"}</h2></div>
    </div>
    <div class="category-hub-grid">
      ${experienceCategories.map(category => `<button class="category-card ${category.visual}" type="button" data-category-open="${category.id}" style="--category-image: url('${category.image}')">
        <span class="category-card-copy"><strong>${escapeHtml(localized(category.title))}</strong><small>${escapeHtml(localized(category.subtitle))}</small></span>
        <span class="category-enter">${state.lang === "en" ? "Enter" : "Entrar"} ›</span>
      </button>`).join("")}
    </div>
  </section>`;
}

function categoryView() {
  const category = experienceCategories.find(item => item.id === activeCategory) || experienceCategories[0];
  return `<section class="screen category-screen">
    <article class="category-hero ${category.visual}" style="--category-image: url('${category.image}')">
      <div class="category-hero-copy">
        <p class="eyebrow">${state.lang === "en" ? "Yeshua experience" : "Experiencia Yeshua"}</p>
        <h1>${escapeHtml(localized(category.title))}</h1>
        <p>${escapeHtml(localized(category.subtitle))}</p>
      </div>
    </article>
    <section class="category-content-grid">
      ${category.items.map((item, index) => `<article class="favorite-shell ${index === 0 ? "category-primary-item" : ""}">${renderCategoryItem(item)}</article>`).join("")}
    </section>
  </section>`;
}

function renderCategoryItem(item) {
  const attrs = `${item.route ? `data-route="${item.route}"` : ""}${item.journey ? ` data-home-journey="${item.journey}"` : ""}${item.book ? ` data-home-book="${item.book}" data-home-chapter="${item.chapter || 1}"` : ""}`;
  return `<button class="premium-cover ${item.visual || "peace"}" type="button" ${attrs} style="--cover-image: url('${cardImage(item)}')">
    <span class="cover-tag">${escapeHtml(cardSubtitle(item))}</span>
    <span class="cover-copy"><strong>${escapeHtml(cardTitle(item))}</strong><small>${state.lang === "en" ? "Open experience" : "Abrir experiencia"}</small></span>
    <span class="cover-meta">${state.lang === "en" ? "Open" : "Entrar"} ›</span>
  </button>`;
}

function dailyIndex(length) {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const day = Math.floor((Date.now() - start.getTime()) / 86400000);
  return Math.abs(day) % length;
}

function dailyHeroTitle() {
  const options = state.lang === "en"
    ? ["God already has something beautiful for today.", "Today you can walk with Jesus.", "His Word is also for this day.", "You are not walking alone.", "Jesus is still calling your heart.", "Begin this day with Him.", "There is peace for this moment."]
    : ["Dios ya tiene algo hermoso para hoy.", "Hoy puedes caminar con Jesús.", "Su Palabra también es para este día.", "No estás caminando solo.", "Jesús sigue llamando tu corazón.", "Comienza este día con Él.", "Hay paz para este momento."];
  return options[dailyIndex(options.length)];
}

function dailyHeroVerse() {
  const verses = state.lang === "en"
    ? [
      { text: "Trust in the Lord with all your heart, and lean not on your own understanding.", ref: "Proverbs 3:5" },
      { text: "Peace I leave with you, my peace I give unto you.", ref: "John 14:27" },
      { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
      { text: "Thy word is a lamp unto my feet, and a light unto my path.", ref: "Psalm 119:105" },
      { text: "Casting all your care upon him; for he careth for you.", ref: "1 Peter 5:7" }
    ]
    : [
      { text: "Confía en el Señor con todo tu corazón y no te apoyes en tu propia prudencia.", ref: "Proverbios 3:5" },
      { text: "La paz os dejo, mi paz os doy.", ref: "Juan 14:27" },
      { text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", ref: "Mateo 11:28" },
      { text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", ref: "Salmo 119:105" },
      { text: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.", ref: "1 Pedro 5:7" }
    ];
  return verses[dailyIndex(verses.length)];
}

function homeView() {
  const journeyId = currentJourneyId();
  const journey = currentJourney();
  const completed = completedFor(journeyId);
  const index = journeyTodayIndex(journeyId);
  const day = journey.days[index];
  const progress = Math.min(100, Math.round(((completed.length || 1) / Math.max(journey.days.length, 1)) * 100));
  const heroVerse = dailyHeroVerse();
  const journalFocus = [t("gratitude"), t("request"), t("intercession")][dailyIndex(3)];
  return `<section class="screen home-premium">
    <section class="premium-home-hero" style="--hero-image: url('assets/covers/cover-home-jesus-walk.webp')">
      <div class="premium-hero-copy">
        <p class="eyebrow">${greeting()}, ${escapeHtml(shortAccountName())} ☀</p>
        <h1>${dailyHeroTitle()}</h1>
        <div class="hero-insights">
          <div class="streak-insight"><span>🔥</span><strong>${completed.length || 1} ${state.lang === "en" ? "days" : "días"}</strong><small>${t("streak")}</small></div>
          <div class="verse-insight"><p>${heroVerse.text}</p><strong>${heroVerse.ref}</strong></div>
        </div>
      </div>
      <article class="hero-devotional-card">
        <div class="hero-devotional-icon">✎</div>
        <div class="hero-devotional-copy">
          <p><span>${t("journalTitle")}</span><em>${journalFocus}</em></p>
          <h2>${state.lang === "en" ? "Write your prayer" : "Escribe tu oración"}</h2>
          <small>${state.lang === "en" ? "Gratitude · Request · Intercession" : "Gratitud · Petición · Intercesión"}</small>
          <button class="primary-button" data-route="journal">${state.lang === "en" ? "Write prayer" : "Escribir oración"} <span>›</span></button>
        </div>
      </article>
    </section>
    <section class="premium-section moments-section">
      <div class="premium-section-title"><h2>${state.lang === "en" ? "Moments" : "Momentos"}</h2><button type="button" data-moment-index>${state.lang === "en" ? "See all" : "Ver todos"} ›</button></div>
      <div class="moments-row">${homeMoments.map(renderMomentCard).join("")}</div>
    </section>
    ${renderHomeFocusGrid()}
    <section class="premium-section plan-section">
      <div class="premium-section-title"><h2>${state.lang === "en" ? "Your path today" : "Tu camino de hoy"}</h2></div>
      ${renderDailyPath()}
    </section>
    <section class="premium-grid">
      ${renderContinuePanel(journey, day, index, progress)}
      ${renderDailyWordPanel(day, index, journey)}
    </section>
    <section class="premium-section favorites-section">
      <div class="premium-section-title"><h2>${t("myFavorites")}</h2></div>
      ${renderFavoritesGrid(3)}
    </section>
    ${renderCategoryHub()}
    ${renderFeaturedCollections()}
    ${renderShelf(homeShelves.find(shelf => shelf.titleKey === "forToday"))}
    ${renderShelf(homeShelves.find(shelf => shelf.titleKey === "startBible"))}
  </section>`;
}

function feature(target, icon, title, subtitle) { return `<button class="feature-card" data-route="${target}"><span class="feature-icon" aria-hidden="true">${icon}</span><span><strong>${title}</strong><small>${subtitle}</small></span></button>`; }

function homeAttrs(item) {
  return `${item.route ? `data-route="${item.route}"` : ""}${item.journey ? ` data-home-journey="${item.journey}"` : ""}${item.book ? ` data-home-book="${item.book}" data-home-chapter="${item.chapter || 1}"` : ""}`;
}

function cardTitle(item) {
  return localized(item?.title, state.lang === "en" ? "Yeshua" : "Yeshua");
}

function cardSubtitle(item) {
  return localized(item?.subtitle || item?.meta || item?.tag, state.lang === "en" ? "Continue your path with God" : "Continúa tu camino con Dios");
}

function cardImage(item) {
  return item?.image || "assets/covers/cover-path-sunrise.png";
}

function isRenderableCard(item) {
  return !!item && (item.route || item.soon) && !!cardTitle(item);
}

function favoriteId(item) {
  return item.favoriteId || [item.route || "content", item.journey, item.book, cardTitle(item)].filter(Boolean).join(":").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function isFavorite(id) {
  return state.favorites.includes(id);
}

function favoriteButton(item) {
  if (item.soon) return "";
  const id = favoriteId(item);
  const active = isFavorite(id);
  return `<button class="favorite-toggle ${active ? "active" : ""}" type="button" data-favorite-id="${escapeHtml(id)}" aria-label="${active ? t("removeFavorite") : t("addFavorite")}">${active ? "♥" : "♡"}</button>`;
}

function favoriteCatalog() {
  const all = [...homeFavorites, ...featuredCollections, ...homePlan, ...homeShelves.flatMap(shelf => shelf.items)].filter(item => !item.soon && isRenderableCard(item));
  const unique = new Map();
  all.forEach(item => unique.set(favoriteId(item), item));
  return unique;
}

function renderFavoritesGrid(limit = null) {
  const catalog = favoriteCatalog();
  const items = state.favorites.map(id => catalog.get(id)).filter(Boolean);
  const visible = limit ? items.slice(0, limit) : items;
  const addFavorite = limit && items.length < 3 ? `<article class="favorite-add-card"><span>+</span><strong>${state.lang === "en" ? "Add favorite" : "Agregar favorito"}</strong><small>${state.lang === "en" ? "Tap the heart on any card to save it here." : "Toca el corazón en cualquier tarjeta para guardarla aquí."}</small></article>` : "";
  return `<div class="favorites-grid home-favorites-row">${visible.map(renderFavoriteCard).join("")}${addFavorite}</div>${limit && items.length > limit ? `<button class="quiet-button see-all-favorites" type="button" data-route="journal">${state.lang === "en" ? "See all" : "Ver todos"} ›</button>` : ""}`;
}

function renderMomentCard(item) {
  return `<button class="moment-card ${item.visual}" data-moment-open="${item.id}">
    <span>${item.icon}</span>
    <strong>${localized(item.label)}</strong>
  </button>`;
}

function momentView() {
  return `<section class="screen moment-screen"><div id="moment-root" class="card empty-state">${state.lang === "en" ? "Preparing prayer moments..." : "Preparando Momentos de oración..."}</div></section>`;
}

function momentVisualForCategory(category) {
  if (category === "Relaciones") return "rose";
  if (category === "Circunstancias") return "teal";
  if (category === "Fe y espiritualidad") return "green";
  if (category === "Gratitud y nuevos comienzos") return "gold";
  return "peace";
}

function momentIconForCategory(category) {
  if (category === "Relaciones") return "♡";
  if (category === "Circunstancias") return "◇";
  if (category === "Fe y espiritualidad") return "✦";
  if (category === "Gratitud y nuevos comienzos") return "☀";
  return "☁";
}

function prayerMomentEntries(momentMap) {
  return Object.entries(momentMap).map(([id, item]) => ({ id, ...item }));
}

function renderPrayerMomentIndex(momentMap) {
  const groups = prayerMomentEntries(momentMap).reduce((acc, item) => {
    (acc[item.cat] ||= []).push(item);
    return acc;
  }, {});
  return `<section class="moment-native">
    <article class="moment-hero peace" style="--moment-image: url('assets/covers/cover-prayer-window.png')">
      <div class="moment-hero-copy">
        <span class="moment-icon">✦</span>
        <p class="eyebrow">${state.lang === "en" ? "Prayer moments" : "Momentos de oración"}</p>
        <h1>${state.lang === "en" ? "How are you today?" : "¿Cómo estás hoy?"}</h1>
        <p>${state.lang === "en" ? "Choose what best describes what you are carrying, and let the Word guide your prayer." : "Elige lo que más se acerca a lo que estás viviendo y deja que la Palabra guíe tu oración."}</p>
      </div>
    </article>
    <section class="moment-category-grid">
      ${Object.entries(groups).map(([category, items]) => `<article class="moment-category ${momentVisualForCategory(category)}">
        <div class="moment-category-head">
          <span>${momentIconForCategory(category)}</span>
          <div><p class="eyebrow">${escapeHtml(category)}</p><h2>${escapeHtml(category)}</h2></div>
        </div>
        <div class="moment-chip-grid">${items.map(item => `<button class="moment-chip" type="button" data-prayer-moment="${escapeHtml(item.id)}"><span>${momentIconForCategory(category)}</span><strong>${escapeHtml(item.sit)}</strong></button>`).join("")}</div>
      </article>`).join("")}
    </section>
  </section>`;
}

function renderPrayerMoment(momentMap, id) {
  const item = momentMap[id] || momentMap.ansiedad || Object.values(momentMap)[0];
  const visual = momentVisualForCategory(item.cat);
  const plainPrayer = plainTextFromHtml(item.prayer);
  return `<section class="moment-native">
    <article class="moment-hero ${visual}" style="--moment-image: url('assets/covers/cover-path-sunrise.png')">
      <div class="moment-hero-copy">
        <span class="moment-icon">${momentIconForCategory(item.cat)}</span>
        <p class="eyebrow">${escapeHtml(item.cat)}</p>
        <h1>${escapeHtml(item.sit)}</h1>
        <p>${escapeHtml(item.ack)}</p>
      </div>
    </article>
    <section class="moment-grid">
      <article class="word-panel moment-word">
        <span class="quote-mark">“</span>
        <p class="word-verse" data-read-block data-read-text="${escapeHtml(`${item.ref}. ${item.verse}`)}">${escapeHtml(item.verse)}</p>
        <p class="word-ref">${escapeHtml(item.ref)}</p>
      </article>
      <article class="card content-block moment-prayer">
        <p class="eyebrow" data-read-title="${escapeHtml(`${state.lang === "en" ? "Prayer moment" : "Momento de oración"}. ${item.sit}`)}">${state.lang === "en" ? "Guided prayer" : "Oración guiada"}</p>
        <h2>${state.lang === "en" ? "Pray this slowly" : "Ora esto con calma"}</h2>
        <div class="moment-prayer-text" data-read-block data-read-text="${escapeHtml(plainPrayer)}">${item.prayer}</div>
        ${audioControls("moment")}
      </article>
    </section>
    <section class="moment-promise-card">
      <p class="eyebrow">${state.lang === "en" ? "Carry this today" : "Llévate esto hoy"}</p>
      <p>${escapeHtml(item.promise)}</p>
    </section>
    <div class="button-row"><button class="secondary-button full" type="button" data-moment-index>${state.lang === "en" ? "See all prayer moments" : "Ver todos los momentos de oración"}</button></div>
  </section>`;
}

async function loadPrayerMoments() {
  if (prayerMomentsCache) return prayerMomentsCache;
  prayerMomentsCache = await loadHtmlObject("./content/momentos-oracion.html", "P", "function open_prayer");
  return prayerMomentsCache;
}

async function hydrateMomentView() {
  const root = document.getElementById("moment-root");
  if (!root) return;
  try {
    const moments = await loadPrayerMoments();
    root.outerHTML = activeMoment ? renderPrayerMoment(moments, activeMoment) : renderPrayerMomentIndex(moments);
    bindMomentPrayerEvents(moments);
  } catch (error) {
    console.error(error);
    root.innerHTML = state.lang === "en" ? "Prayer moments could not be loaded." : "No fue posible cargar Momentos de oración.";
  }
}

function bindMomentPrayerEvents(momentMap) {
  document.querySelectorAll("[data-prayer-moment]").forEach(button => button.addEventListener("click", () => {
    activeMoment = button.dataset.prayerMoment;
    history.replaceState({ route }, "", "#moment");
    const root = document.getElementById("moment-root") || document.querySelector(".moment-native");
    if (root) root.outerHTML = renderPrayerMoment(momentMap, activeMoment);
    bindMomentPrayerEvents(momentMap);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
  document.querySelectorAll("[data-moment-index]").forEach(button => button.addEventListener("click", () => {
    activeMoment = null;
    const root = document.getElementById("moment-root") || document.querySelector(".moment-native");
    if (root) root.outerHTML = renderPrayerMomentIndex(momentMap);
    bindMomentPrayerEvents(momentMap);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
}

function renderContinuePanel(journey, day, index, progress) {
  return `<article class="continue-panel" style="--panel-image: url('assets/covers/cover-path-sunrise.png')" data-route="journey" data-home-journey="${journey.id}">
    <span class="play-pill">▶</span>
    <p class="eyebrow">${t("journey")}</p>
    <h2>${localized(journey.title)}</h2>
    <p>${localized(day.context || day.teaching || { es: "Un camino bíblico para ansiedad, carga y descanso.", en: "A biblical path for anxiety, burden, and rest." })}</p>
    <div class="continue-progress"><span>${journey.days.length} ${state.lang === "en" ? "days" : "días"}</span><div><i style="width:${progress}%"></i></div><span>${progress}%</span></div>
  </article>`;
}

function renderDailyWordPanel(day, index, journey) {
  return `<article class="word-panel">
    <span class="quote-mark">“</span>
    <p class="word-verse">${dayVerse(day, index)}</p>
    <p class="word-ref">${dayReference(day, index)}</p>
    <div class="word-actions"><button type="button" aria-label="Favorito">♡</button><button type="button" aria-label="Compartir">⌯</button></div>
  </article>`;
}

function renderFavoriteCard(item) {
  if (!isRenderableCard(item)) return "";
  return `<article class="favorite-shell"><button class="favorite-card" ${homeAttrs(item)} style="--favorite-image: url('${cardImage(item)}')">
      <span>${item.icon || "✦"}</span>
      <strong>${escapeHtml(cardTitle(item))}</strong>
      <small>${escapeHtml(cardSubtitle(item))}</small>
    </button>${favoriteButton(item)}</article>`;
}

function renderDailyPath() {
  const devotionalDone = completedFor(currentJourneyId()).length ? 1 : 0;
  const journalDone = state.journal?.length ? 1 : 0;
  const steps = homePlan.map((item, index) => ({ ...item, done: index === 0 ? devotionalDone : index === 2 ? journalDone : 0 }));
  const doneCount = steps.filter(item => item.done).length;
  const percent = Math.max(25, Math.round((doneCount / steps.length) * 100));
  return `<article class="daily-path-card">
    <div class="daily-path-head">
      <div><p class="eyebrow">${state.lang === "en" ? "Spiritual focus" : "Enfoque espiritual"}</p><h3>${state.lang === "en" ? "Your path today" : "Tu camino de hoy"}</h3><small>${state.lang === "en" ? "Keep walking one more step." : "Sigue caminando un paso más."}</small></div>
      <strong>${percent}% <span>${state.lang === "en" ? "completed" : "completado"}</span></strong>
    </div>
    <div class="daily-path-progress"><span style="width:${percent}%"></span></div>
    <div class="day-plan daily-path-steps">${steps.map(renderPlanItem).join("")}</div>
  </article>`;
}

function renderPlanItem(item) {
  return `<button class="plan-item ${item.visual}" ${homeAttrs(item)}>
    <span class="plan-icon">${item.icon}</span>
    <span class="plan-copy"><em>${item.done ? "✓" : "○"} ${item.done ? (state.lang === "en" ? "Done" : "Completado") : (state.lang === "en" ? "Pending" : "Pendiente")}</em><strong>${escapeHtml(cardTitle(item))}</strong><small>${escapeHtml(cardSubtitle(item))}</small></span>
  </button>`;
}

function featuredCard(item) {
  if (!isRenderableCard(item)) return "";
  const attrs = `${item.route ? `data-route="${item.route}"` : ""}${item.journey ? ` data-home-journey="${item.journey}"` : ""}${item.book ? ` data-home-book="${item.book}" data-home-chapter="${item.chapter || 1}"` : ""}`;
  const style = ` style="--cover-image: url('${cardImage(item)}')"`;
  return `<article class="favorite-shell"><button class="premium-cover ${item.visual}" ${attrs}${style}>
      <span class="cover-tag">${escapeHtml(localized(item.tag, state.lang === "en" ? "Featured" : "Destacado"))}</span>
      <span class="cover-copy"><strong>${escapeHtml(cardTitle(item))}</strong><small>${escapeHtml(cardSubtitle(item))}</small></span>
      <span class="cover-meta">${escapeHtml(localized(item.meta, state.lang === "en" ? "Open" : "Abrir"))}</span>
    </button>${favoriteButton(item)}</article>`;
}

function renderFeaturedCollections() {
  const primary = featuredCollections[0];
  const secondary = showAllCollections ? featuredCollections.slice(1) : featuredCollections.slice(1, 5);
  const hasMore = featuredCollections.length > 4;
  return `<section class="content-shelf premium-collections" id="featured-collections">
    <div class="section-heading"><h2>${t("featuredCollections")}</h2>${hasMore ? `<button type="button" data-toggle-collections>${showAllCollections ? (state.lang === "en" ? "Show less" : "Ver menos") : (state.lang === "en" ? "See all" : "Ver todas")} ›</button>` : ""}</div>
    <div class="featured-showcase">
      <div class="featured-hero-card">${featuredCard(primary)}</div>
      <div class="featured-mini-row">${secondary.map(featuredCard).join("")}</div>
    </div>
  </section>`;
}

function itemInterestTags(item) {
  const title = `${cardTitle(item)} ${cardSubtitle(item)}`.toLowerCase();
  const tags = new Set();
  if (item.route === "bible" || item.route === "overview" || item.route === "wisdom" || title.includes("biblia") || title.includes("bible") || title.includes("salmos") || title.includes("proverb")) tags.add("bible");
  if (item.route === "prayer" || item.route === "moment" || item.route === "journal" || title.includes("oraci") || title.includes("prayer")) tags.add("oracion");
  if (item.route === "sleep" || item.journey === "peace-anxiety" || title.includes("paz") || title.includes("peace") || title.includes("ansiedad") || title.includes("anxiety")) tags.add("paz");
  if (item.journey === "peace-anxiety" || title.includes("ansiedad") || title.includes("anxiety")) tags.add("ansiedad");
  if (item.route === "stories" || title.includes("familia") || title.includes("family")) tags.add("familia");
  if (title.includes("niños") || title.includes("kids")) tags.add("ninos");
  if (title.includes("gratitud") || title.includes("gratitude")) tags.add("gratitud");
  if (title.includes("perdón") || title.includes("forgive")) tags.add("perdon");
  if (item.route === "devotional" || title.includes("devocional") || title.includes("devotional")) tags.add("devocionales");
  if (item.route === "stories" || title.includes("historias") || title.includes("stories")) tags.add("historias");
  if (title.includes("matrimonio") || title.includes("marriage")) tags.add("matrimonio");
  return [...tags];
}

function interestScore(item) {
  const selected = state.interests || [];
  const tags = itemInterestTags(item);
  const preferenceScore = tags.filter(tag => selected.includes(tag)).length * 8;
  const favoriteScore = isFavorite(favoriteId(item)) ? 4 : 0;
  const journeyScore = item.journey && completedFor(item.journey).length ? 2 : 0;
  return preferenceScore + favoriteScore + journeyScore;
}

function preferredItems(items) {
  return [...items].sort((a, b) => interestScore(b) - interestScore(a));
}

function renderShelf(shelf) {
  if (shelf.titleKey === "forToday") return renderTodayShelf(shelf);
  if (shelf.titleKey === "startBible") return renderStartBibleShelf(shelf);
  const cards = preferredItems(shelf.items).map(renderShelfCard).filter(Boolean).join("");
  if (!cards) return "";
  return `<section class="content-shelf shelf-${shelf.titleKey}">
    <div class="section-heading"><h2>${t(shelf.titleKey)}</h2></div>
    <div class="shelf-row">${cards}</div>
  </section>`;
}

function renderTodayShelf(shelf) {
  const items = preferredItems(shelf.items);
  const primary = items[0];
  const secondary = items.slice(1);
  return `<section class="content-shelf shelf-${shelf.titleKey} today-editorial-shelf">
    <div class="section-heading"><h2>${t(shelf.titleKey)}</h2></div>
    <div class="today-editorial-grid">
      <div class="today-primary-card">${renderShelfCard(primary)}</div>
      <div class="today-secondary-stack">${secondary.map(renderShelfCard).join("")}</div>
    </div>
  </section>`;
}

function renderStartBibleShelf(shelf) {
  const overview = shelf.items.find(item => item.route === "overview") || shelf.items[0];
  const secondary = shelf.items.filter(item => item !== overview);
  return `<section class="content-shelf shelf-${shelf.titleKey} start-editorial-shelf">
    <div class="section-heading"><h2>${t(shelf.titleKey)}</h2></div>
    <article class="start-here-welcome">
      <div>
        <p class="eyebrow">${state.lang === "en" ? "New to Yeshua" : "Nuevo en Yeshua"}</p>
        <p class="section-lede start-here-copy">${state.lang === "en" ? "A simple guide to begin with Scripture, prayer, and wisdom." : "Una guía sencilla para comenzar con la Palabra, oración y sabiduría."}</p>
      </div>
    </article>
    <div class="start-editorial-grid">
      <div class="start-primary-card">${renderShelfCard(overview)}</div>
      <div class="start-secondary-row">${secondary.map(renderShelfCard).join("")}</div>
    </div>
  </section>`;
}

function renderShelfCard(item) {
  if (!isRenderableCard(item)) return "";
  const attrs = item.soon
    ? `data-soon="true"`
    : `${item.route ? `data-route="${item.route}"` : ""}${item.journey ? ` data-home-journey="${item.journey}"` : ""}${item.book ? ` data-home-book="${item.book}" data-home-chapter="${item.chapter || 1}"` : ""}`;
  const style = ` style="--card-image: url('${cardImage(item)}')"`;
  return `<article class="favorite-shell"><button class="shelf-card ${item.visual || "light"}" ${attrs}${style}>
      <span class="shelf-art"><span aria-hidden="true">${item.icon || "✦"}</span></span>
      <span class="shelf-copy"><strong>${escapeHtml(cardTitle(item))}</strong><small>${escapeHtml(cardSubtitle(item))}${item.soon ? ` · ${t("comingSoon")}` : ""}</small></span>
    </button>${favoriteButton(item)}</article>`;
}

function devotionalView(index = activeDay ?? todayIndex()) {
  const journeyId = currentJourneyId();
  const journey = currentJourney();
  const completed = completedFor();
  const day = journey.days[index] || journey.days[0];
  const depth = devotionalDeepening(journeyId, day, index);
  const done = completed.includes(index);
  return `<article class="screen" data-day="${index}">
    <div class="hero"><p class="eyebrow">${localized(journey.title)} · ${t("day")} ${index + 1} ${t("of")} ${journey.days.length} · ${dayReference(day, index)}</p><h1 data-read-block data-read-text="${escapeHtml(localized(day.title))}">${localized(day.title)}</h1></div>
    <figure class="devotional-visual ${depth.visual}">
      <div class="visual-sky"><span class="visual-light" aria-hidden="true"></span><span class="visual-symbol" aria-hidden="true">${journey.icon}</span></div>
      <figcaption>${depth.caption}</figcaption>
    </figure>
    ${audioControls("devotional")}
    <section class="card accent"><p class="eyebrow">${t("read")}</p><p class="scripture" data-read-block data-read-text="${escapeHtml(`${dayReference(day, index)}. ${dayVerse(day, index)}`)}">“${dayVerse(day, index)}”</p><p class="reference">${dayReference(day, index)} · ${bibleVersion()}</p></section>
    <section class="card content-block devotional-section"><h3>${t("scene")}</h3><p data-read-block data-read-text="${escapeHtml(`${t("scene")}. ${depth.scene}`)}">${depth.scene}</p></section>
    <section class="card content-block devotional-section"><h3>${t("teaching")}</h3><p data-read-block data-read-text="${escapeHtml(`${t("teaching")}. ${depth.teaching}`)}">${depth.teaching}</p></section>
    <section class="card content-block devotional-section practice"><h3>${t("practice")}</h3><p data-read-block data-read-text="${escapeHtml(`${t("practice")}. ${depth.practice}`)}">${depth.practice}</p></section>
    <section class="content-block"><h3>${t("context")}</h3><p>${localized(day.context)}</p></section>
    <section class="card content-block"><h3>${t("reflect")}</h3><p class="serif" data-read-block data-read-text="${escapeHtml(`${t("reflect")}. ${localized(day.reflect)}`)}">${localized(day.reflect)}</p></section>
    <section class="card prayer content-block"><h3>${t("pray")}</h3><p data-read-block data-read-text="${escapeHtml(`${t("pray")}. ${localized(day.prayer)}`)}">${localized(day.prayer)}</p></section>
    <div class="button-row"><button class="primary-button full" id="complete-day" data-day="${index}" ${done ? "disabled" : ""}>${done ? t("completedToday") : t("markComplete")}</button></div>
    ${done ? `<p class="completion-note">${t("completionTomorrow")}</p>` : ""}
  </article>`;
}

function storyIcon(story) {
  return { family: "♡", water: "♧", bread: "✦", shepherd: "☾" }[story.visual] || "✝";
}

function storyDurationMinutes(story) {
  const text = localizedList(story.story).join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 130));
}

function storyFavoriteId(story) {
  return `story-${story.number || favoriteId({ route: "stories", title: story.title })}`;
}

function storyId(story, index = 0) {
  const number = Number(story?.number || index + 1);
  return `story-${String(number).padStart(2, "0")}`;
}

function storyCategory(story) {
  const categories = {
    family: { es: "Jesús y la familia", en: "Jesus and family" },
    water: { es: "Milagros de Jesús", en: "Miracles of Jesus" },
    bread: { es: "Parábolas y enseñanzas", en: "Parables and teachings" },
    shepherd: { es: "Fe y confianza", en: "Faith and trust" }
  };
  return localized(categories[story?.visual] || { es: "Historias bíblicas", en: "Biblical stories" });
}

function storyProgressStatus(index) {
  const id = storyId(jesusStories[index], index);
  return state.storyProgress?.[id] || "new";
}

function storyProgressLabel(status) {
  const labels = {
    new: { es: "Nueva", en: "New" },
    started: { es: "Iniciada", en: "Started" },
    read: { es: "Leída", en: "Read" }
  };
  return localized(labels[status] || labels.new);
}

function storyProgressPercent(index) {
  const status = storyProgressStatus(index);
  if (status === "read") return 100;
  if (status === "started") return 35;
  return 0;
}

function setStoryProgress(index, status) {
  const story = jesusStories[index] || jesusStories[0];
  const id = storyId(story, index);
  state.storyProgress = { ...(state.storyProgress || {}), [id]: status };
  saveState();
  syncPreferences();
}

function storyCover(story) {
  if (story?.image) return story.image;
  return {
    family: "assets/covers/cover-jesus-children.png",
    water: "assets/covers/cover-sleep-path.png",
    bread: "assets/covers/cover-start-bible.png",
    shepherd: "assets/covers/cover-family-jesus-child.png"
  }[story.visual] || "assets/covers/cover-family-walk.png";
}

function storyOptimizedImage(story, kind = "cover") {
  const number = Number(story?.number || 0);
  if (number) return `assets/stories/story-${String(number).padStart(2, "0")}-${kind}.webp`;
  return storyCover(story);
}

function storyModel(story, index) {
  const title = localized(story.title);
  const biblicalReference = localized(story.ref) || (state.lang === "en" ? "Scripture story" : "Relato bíblico");
  const duration = `${storyDurationMinutes(story)} min`;
  const coverImage = storyOptimizedImage(story, "cover");
  const thumbnailImage = storyOptimizedImage(story, "thumb");
  const status = storyProgressStatus(index);
  return {
    id: storyId(story, index),
    title,
    biblicalReference,
    category: storyCategory(story),
    duration,
    excerpt: localized(story.scene),
    coverImage,
    thumbnailImage,
    content: localizedList(story.story),
    conversationQuestion: localized(story.question),
    familyPrayer: localized(story.prayer),
    isFavorite: isFavorite(storyFavoriteId(story)),
    progressStatus: status,
    progressPercent: storyProgressPercent(index),
    nextStoryId: storyId(jesusStories[(index + 1) % jesusStories.length], (index + 1) % jesusStories.length),
    relatedStoryIds: relatedStoryIndexes(index).map(item => storyId(jesusStories[item], item))
  };
}

function relatedStoryIndexes(index) {
  const story = jesusStories[index] || jesusStories[0];
  const sameKind = jesusStories
    .map((item, itemIndex) => ({ item, itemIndex }))
    .filter(({ item, itemIndex }) => itemIndex !== index && item.visual === story.visual)
    .map(({ itemIndex }) => itemIndex);
  const nearby = [index + 1, index + 2, index - 1, index + 3]
    .map(item => (item + jesusStories.length) % jesusStories.length)
    .filter(item => item !== index);
  return [...new Set([...sameKind, ...nearby])].slice(0, 4);
}

function featuredStoryIndex() {
  const unread = jesusStories.findIndex((story, index) => storyProgressStatus(index) !== "read");
  return unread >= 0 ? unread : 0;
}

function storyCatalogCard(story, index, compact = false) {
  const model = storyModel(story, index);
  const favoriteKey = storyFavoriteId(story);
  return `<article class="story-catalog-card ${compact ? "compact" : ""}" id="${model.id}">
    <button class="story-catalog-image" type="button" data-story-open="${index}" aria-label="${escapeHtml(model.title)}">
      <img src="${model.thumbnailImage}" alt="${escapeHtml(model.title)}" loading="lazy">
      ${model.progressStatus === "read" ? `<span class="story-status ${model.progressStatus}">${storyProgressLabel(model.progressStatus)}</span>` : ""}
      <span class="story-card-icon" aria-hidden="true">${storyIcon(story)}</span>
      <span class="story-catalog-copy">
        <small>${escapeHtml(model.biblicalReference)} · ${model.duration}</small>
        <strong>${escapeHtml(model.title)}</strong>
      </span>
    </button>
    <button class="story-favorite-mini ${model.isFavorite ? "active" : ""}" type="button" data-favorite-id="${escapeHtml(favoriteKey)}" aria-label="${t("favorite")}">${model.isFavorite ? "♥" : "♡"}</button>
  </article>`;
}

function storiesView() {
  const featuredIndex = featuredStoryIndex();
  const featured = storyModel(jesusStories[featuredIndex], featuredIndex);
  return `<section class="screen stories-screen story-catalog-screen">
    <div class="stories-hero catalog-hero">
      <p class="eyebrow">${t("familyKids")}</p>
      <h1>${t("jesusStories")}</h1>
      <p>${t("jesusStoriesIntro")}</p>
      <span>${state.lang === "en" ? "Read together" : "Para leer juntos"}</span>
    </div>
    <section class="story-featured-card">
      <button class="story-featured-media" type="button" data-story-open="${featuredIndex}">
        <img src="${featured.coverImage}" alt="${escapeHtml(featured.title)}" fetchpriority="high">
      </button>
      <div class="story-featured-copy">
        <p class="eyebrow">${state.lang === "en" ? "Featured today" : "Historia destacada"}</p>
        <h2>${escapeHtml(featured.title)}</h2>
        <p>${escapeHtml(featured.excerpt)}</p>
        <div class="story-featured-meta"><span>${escapeHtml(featured.biblicalReference)}</span><span>${featured.duration}</span>${featured.progressStatus === "read" ? `<span>${storyProgressLabel(featured.progressStatus)}</span>` : ""}</div>
        <div class="progress-track story-progress-track"><div class="progress-fill" style="width:${featured.progressPercent}%"></div></div>
        <button class="primary-button" type="button" data-story-open="${featuredIndex}">${state.lang === "en" ? "Begin" : "Comenzar"}</button>
      </div>
    </section>
    <section class="story-catalog-section">
      <div class="section-heading">
        <div><p class="eyebrow">${state.lang === "en" ? "Library" : "Biblioteca visual"}</p><h2>${state.lang === "en" ? "Choose a story" : "Elige una historia"}</h2></div>
        <span>${jesusStories.length} ${state.lang === "en" ? "stories" : "relatos"}</span>
      </div>
      <div class="story-catalog-grid">${jesusStories.map((story, index) => storyCatalogCard(story, index)).join("")}</div>
    </section>
  </section>`;
}

function storyReaderView() {
  const index = Number.isInteger(activeStory) ? activeStory : 0;
  const story = jesusStories[index] || jesusStories[0];
  const model = storyModel(story, index);
  const favoriteKey = storyFavoriteId(story);
  const nextIndex = (index + 1) % jesusStories.length;
  const next = storyModel(jesusStories[nextIndex], nextIndex);
  const related = relatedStoryIndexes(index);
  return `<section class="screen story-reader-screen">
    <div class="story-reader-topbar">
      <button class="icon-button" type="button" data-route="stories" aria-label="${t("back")}">←</button>
      <div class="story-reader-brand"><img src="assets/icons/icon-96.png" alt="Yeshua"><strong>Yeshua</strong></div>
      <button class="icon-button" type="button" data-story-share="${index}" aria-label="${t("share")}">↗</button>
    </div>
    <figure class="story-reader-cover">
      <img src="${model.coverImage}" alt="${escapeHtml(model.title)}">
      <figcaption>
        <span>${escapeHtml(model.category)}</span>
        <h1 data-read-title="${escapeHtml(`${model.title}. ${model.biblicalReference}`)}">${escapeHtml(model.title)}</h1>
      </figcaption>
    </figure>
    <section class="story-reader-info">
      <div class="story-stream-meta">
        <span>${escapeHtml(model.biblicalReference)}</span>
        <span>${model.duration}</span>
        <span>${escapeHtml(model.category)}</span>
      </div>
      <div class="story-action-row">
        <button class="primary-button" type="button" data-listen="story">♪ ${t("listen")}</button>
        <button class="secondary-button" type="button" data-story-read>${t("readStory")}</button>
        <button class="secondary-button ${model.isFavorite ? "active" : ""}" type="button" data-favorite-id="${escapeHtml(favoriteKey)}">${model.isFavorite ? "♥" : "♡"} ${t("favorite")}</button>
      </div>
    </section>
    <section class="story-content-section story-narration-section" id="story-reader-narration">
      <p class="section-label">${state.lang === "en" ? "Narration" : "Narración"}</p>
      <div class="story-prose">${model.content.map(paragraph => `<p data-read-block data-read-text="${escapeHtml(paragraph)}">${escapeHtml(paragraph)}</p>`).join("")}</div>
    </section>
    <section class="story-content-section">
      <p class="section-label">${state.lang === "en" ? "Question to talk about" : "Pregunta para conversar"}</p>
      <div class="conversation-box"><p data-read-block data-read-text="${escapeHtml(`${t("familyQuestion")}. ${model.conversationQuestion}`)}">${escapeHtml(model.conversationQuestion)}</p></div>
    </section>
    <section class="story-content-section">
      <p class="section-label">${t("familyPrayer")}</p>
      <div class="prayer-box"><p data-read-block data-read-text="${escapeHtml(`${t("familyPrayer")}. ${model.familyPrayer}`)}">${escapeHtml(model.familyPrayer)}</p></div>
    </section>
    <button class="primary-button full story-read-complete" type="button" data-story-complete="${index}">${model.progressStatus === "read" ? (state.lang === "en" ? "Story read" : "Historia leída") : (state.lang === "en" ? "Mark as read" : "Marcar como leída")}</button>
    <section class="story-next-card story-next-visual">
      <img src="${next.thumbnailImage}" alt="${escapeHtml(next.title)}" loading="lazy">
      <div>
        <p class="eyebrow">${state.lang === "en" ? "Next story" : "Siguiente historia"}</p>
        <h3>${escapeHtml(next.title)}</h3>
        <p>${escapeHtml(next.biblicalReference)} · ${next.duration}</p>
        <button class="secondary-button" type="button" data-story-open="${nextIndex}">${state.lang === "en" ? "Continue" : "Continuar"}</button>
      </div>
    </section>
    <section class="story-related-section">
      <div class="section-heading"><div><p class="eyebrow">${state.lang === "en" ? "More for your family" : "También te puede gustar"}</p><h2>${state.lang === "en" ? "Related stories" : "Relatos relacionados"}</h2></div></div>
      <div class="story-related-grid">${related.map(item => storyCatalogCard(jesusStories[item], item, true)).join("")}</div>
    </section>
  </section>`;
}

function guidedPathAccessItems() {
  return [
    { route: "wisdom", image: "assets/covers/cover-path-sunrise.png", icon: "◇", title: { es: "Crecer en sabiduría", en: "Grow in wisdom" }, subtitle: { es: "31 días en Proverbios", en: "31 days in Proverbs" } },
    { route: "sleep", image: "assets/covers/cover-sleep-word.png", icon: "☾", title: { es: "Paz nocturna", en: "Night peace" }, subtitle: { es: "30 noches para descansar", en: "30 nights for rest" } }
  ];
}

function journeyView() {
  const journeyId = currentJourneyId();
  return `<section class="screen">
    <div class="hero"><p class="eyebrow">${t("journey")}</p><h1>${t("journeyTitle")}</h1><p class="lede">${t("journeyIntro")}</p></div>
    <section class="journey-picker" aria-label="${t("chooseJourney")}">
      ${Object.entries(devotionalJourneys).map(([id, item]) => {
        const isActive = id === journeyId;
        const itemCompleted = completedFor(id);
        const itemPercent = Math.round(itemCompleted.length / item.days.length * 100);
        return `<article class="journey-card ${isActive ? "active" : ""}" ${isActive ? 'id="active-journey-card"' : ""}>
          <div class="journey-card-header"><span class="journey-icon" aria-hidden="true">${item.icon}</span><span class="journey-status">${itemCompleted.length} ${t("of")} ${item.days.length}</span></div>
          <h2>${localized(item.title)}</h2>
          <p>${localized(item.intro)}</p>
          <div class="progress-track"><div class="progress-fill" style="width:${itemPercent}%"></div></div>
          <button class="${isActive ? "primary-button" : "secondary-button"} full" ${isActive ? 'data-route="devotional"' : `data-journey-select="${id}"`}>${isActive ? t("continueJourney") : t("startJourney")}</button>
          ${isActive ? `<div class="journey-expanded">
            <p class="eyebrow">${t("journeyProgress")}</p>
            <strong>${itemCompleted.length} ${t("of")} ${item.days.length} · ${itemPercent}%</strong>
            ${itemCompleted.length ? `<button class="quiet-button reset-journey" data-reset-journey="${id}">${t("resetJourney")}</button>` : ""}
            <div class="day-list">${item.days.map((day, index) => `<button class="day-item ${itemCompleted.includes(index) ? "done" : ""}" data-day-open="${index}"><span class="day-number">${itemCompleted.includes(index) ? "✓" : index + 1}</span><span><strong>${localized(day.title)}</strong><small>${dayReference(day, index)}</small></span><span aria-hidden="true">&#8250;</span></button>`).join("")}</div>
          </div>` : ""}
        </article>`;
      }).join("")}
    </section>
    <section class="journey-hub-section">
      <div class="section-heading"><h2>${state.lang === "en" ? "More guided paths" : "Más recorridos guiados"}</h2></div>
      <div class="journey-hub-grid">${guidedPathAccessItems().map(renderShelfCard).join("")}</div>
    </section>
  </section>`;
}

function renderExperienceCard(item, type) {
  return `<article class="experience-card" style="--experience-image: url('${item.image}')">
    <div class="experience-media"><span>${type === "sleep" ? "☾" : "✦"}</span></div>
    <div class="experience-copy">
      <p class="eyebrow">${localized(item.reference)}</p>
      <h2 data-read-block data-read-text="${escapeHtml(localized(item.title))}">${localized(item.title)}</h2>
      <p>${localized(item.subtitle)}</p>
      <blockquote data-read-block data-read-text="${escapeHtml(`${localized(item.reference)}. ${localized(item.scripture)}`)}">“${localized(item.scripture)}”</blockquote>
      ${item.prayer ? `<p data-read-block data-read-text="${escapeHtml(localized(item.prayer))}">${localized(item.prayer)}</p>` : ""}
      <button class="primary-button" ${homeAttrs(item)}>${localized(item.action)} <span>›</span></button>
    </div>
  </article>`;
}

async function loadHtmlConst(path, name, afterPattern) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  const html = await response.text();
  const match = html.match(new RegExp(`const ${name}\\s*=\\s*(\\[[\\s\\S]*?\\]);\\s*${afterPattern}`));
  if (!match) throw new Error(`Unable to parse ${name}`);
  return Function(`"use strict"; return (${match[1]});`)();
}

async function loadHtmlObject(path, name, afterPattern) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  const html = await response.text();
  const match = html.match(new RegExp(`const ${name}\\s*=\\s*(\\{[\\s\\S]*?\\});\\s*${afterPattern}`));
  if (!match) throw new Error(`Unable to parse ${name}`);
  return Function(`"use strict"; return (${match[1]});`)();
}

async function loadNightGuides() {
  if (nightGuidesCache) return nightGuidesCache;
  nightGuidesCache = await loadHtmlConst("./content/paz-nocturna.html", "NIGHTS", "let current");
  return nightGuidesCache;
}

async function loadPrayerQuiz() {
  if (prayerQuestionsCache && prayerResultsCache) return { questions: prayerQuestionsCache, results: prayerResultsCache };
  const response = await fetch("./content/oracion-eficaz.html");
  if (!response.ok) throw new Error("Unable to load prayer quiz");
  const html = await response.text();
  const questions = html.match(/const QUESTIONS\s*=\s*(\[[\s\S]*?\]);\s*const RESULTS/);
  const results = html.match(/const RESULTS\s*=\s*(\[[\s\S]*?\]);\s*let current/);
  if (!questions || !results) throw new Error("Unable to parse prayer quiz");
  prayerQuestionsCache = Function(`"use strict"; return (${questions[1]});`)();
  prayerResultsCache = Function(`"use strict"; return (${results[1]});`)();
  return { questions: prayerQuestionsCache, results: prayerResultsCache };
}

function bindNightEvents(nights) {
  document.querySelectorAll("[data-night]").forEach(button => button.addEventListener("click", () => renderNight(nights, Number(button.dataset.night))));
  document.querySelector("[data-night-prev]")?.addEventListener("click", () => renderNight(nights, activeNight - 1));
  document.querySelector("[data-night-next]")?.addEventListener("click", () => renderNight(nights, activeNight + 1));
}

function renderNight(nights, requestedNight = activeNight) {
  if (!nights?.length) return;
  activeNight = Math.min(Math.max(Number(requestedNight) || 1, 1), nights.length);
  const night = nights[activeNight - 1];
  const percent = Math.round((activeNight / nights.length) * 100);
  const nightLabel = state.lang === "en" ? "Night" : "Noche";
  const selectorTitle = state.lang === "en" ? "Choose your night" : "Elige una noche";
  const selectorCopy = state.lang === "en"
    ? "Start with one reflection tonight, or tap any day to revisit it. You can also use the Next button at the bottom."
    : "Comienza con una reflexión esta noche o toca cualquier día para volver a ella. También puedes usar el botón Siguiente al final.";
  const selectorHint = state.lang === "en"
    ? "Swipe this row to see all 30 nights."
    : "Desliza esta fila para ver las 30 noches.";
  const root = document.getElementById("night-root");
  if (!root) return;
  root.outerHTML = `<section id="night-root" class="night-native">
    <section class="night-hero">
      <div class="night-hero-copy">
        <span class="night-moon" aria-hidden="true">${night.icon || "☾"}</span>
        <p class="eyebrow">${t("sleepWithWord")} · ${nightLabel} ${activeNight}</p>
        <h1 data-read-block data-read-text="${escapeHtml(night.title)}">${escapeHtml(night.title)}</h1>
        <p>${t("sleepIntro")}</p>
        <div class="wisdom-progress"><span>${activeNight} / ${nights.length}</span><div><i style="width:${percent}%"></i></div><strong>${percent}%</strong></div>
      </div>
    </section>

    <section class="night-selector-card">
      <p class="eyebrow">${selectorTitle}</p>
      <p>${selectorCopy}</p>
      <div class="night-strip" aria-label="${selectorHint}">${nights.map((_item, index) => `<button class="${index + 1 === activeNight ? "active" : ""}" data-night="${index + 1}" aria-label="${nightLabel} ${index + 1}"><span>${nightLabel} ${index + 1}</span></button>`).join("")}</div>
      <p class="night-scroll-hint">${selectorHint}</p>
    </section>

    ${audioControls("sleep")}

    <article class="night-reading-card">
      <p class="eyebrow" data-read-title="${escapeHtml(`${t("sleepTitle")}. ${nightLabel} ${activeNight}. ${night.title}`)}">${escapeHtml(night.ref)}</p>
      <blockquote data-read-block data-read-text="${escapeHtml(`${night.ref}. ${night.verse}`)}">${escapeHtml(night.verse)}</blockquote>
      <div class="wisdom-prose" data-read-block data-read-text="${escapeHtml(plainTextFromHtml(night.prose))}">${night.prose}</div>
    </article>

    <section class="night-prayer-card">
      <p class="eyebrow">${state.lang === "en" ? "Prayer of surrender" : "Oración de entrega"}</p>
      <p data-read-block data-read-text="${escapeHtml(night.prayer)}">${escapeHtml(night.prayer)}</p>
    </section>

    <section class="night-silence-card">
      <p class="eyebrow">${state.lang === "en" ? "Word for silence" : "Palabra para el silencio"}</p>
      <strong>${escapeHtml(night.word)}</strong>
    </section>

    <div class="button-row">
      <button class="secondary-button" data-night-prev ${activeNight === 1 ? "disabled" : ""}>← ${state.lang === "en" ? "Previous" : "Anterior"}</button>
      <button class="primary-button" data-night-next ${activeNight === nights.length ? "disabled" : ""}>${state.lang === "en" ? "Next" : "Siguiente"} →</button>
    </div>
  </section>`;
  bindNightEvents(nights);
}

async function hydrateSleepView() {
  const root = document.getElementById("night-root");
  if (!root) return;
  try {
    const nights = await loadNightGuides();
    renderNight(nights, activeNight);
  } catch (error) {
    console.error(error);
    root.innerHTML = state.lang === "en" ? "Night peace could not be loaded." : "No fue posible cargar Paz nocturna.";
  }
}

function bindPrayerQuizEvents(questions, results) {
  document.querySelector("[data-prayer-start]")?.addEventListener("click", () => {
    prayerQuizIndex = 0;
    prayerQuizAnswers = [];
    renderPrayerQuestion(questions, results);
  });
  document.querySelectorAll("[data-prayer-answer]").forEach(button => button.addEventListener("click", () => {
    prayerQuizAnswers[prayerQuizIndex] = button.dataset.prayerAnswer === "yes";
    if (prayerQuizIndex >= questions.length - 1) renderPrayerResults(questions, results);
    else {
      prayerQuizIndex += 1;
      renderPrayerQuestion(questions, results);
    }
  }));
  document.querySelector("[data-prayer-restart]")?.addEventListener("click", () => {
    prayerQuizIndex = 0;
    prayerQuizAnswers = [];
    renderPrayerIntro(questions, results);
  });
}

function prayerRoot() { return document.getElementById("prayer-root"); }

function renderPrayerIntro(questions, results) {
  const root = prayerRoot();
  if (!root) return;
  root.outerHTML = `<section id="prayer-root" class="prayer-native">
    <section class="prayer-hero-card">
      <span class="prayer-hero-icon" aria-hidden="true">✎</span>
      <p class="eyebrow">${state.lang === "en" ? "Practical guide" : "Guía práctica"}</p>
      <h1>${t("prayerTitle")}</h1>
      <p>${t("prayerIntro")}</p>
      <button class="primary-button" data-prayer-start>${state.lang === "en" ? "Begin evaluation" : "Comenzar evaluación"} →</button>
    </section>
  </section>`;
  bindPrayerQuizEvents(questions, results);
}

function renderPrayerQuestion(questions, results) {
  const question = questions[prayerQuizIndex];
  const percent = Math.round((prayerQuizIndex / questions.length) * 100);
  const root = prayerRoot();
  if (!root) return;
  root.outerHTML = `<section id="prayer-root" class="prayer-native">
    <section class="prayer-question-card">
      <div class="wisdom-progress"><span>${prayerQuizIndex + 1} / ${questions.length}</span><div><i style="width:${percent}%"></i></div><strong>${percent}%</strong></div>
      <span class="prayer-question-icon" aria-hidden="true">${question.icon}</span>
      <p class="eyebrow" data-read-title="${escapeHtml(`${t("prayerTitle")}. Clave ${prayerQuizIndex + 1}`)}">${state.lang === "en" ? "Key" : "Clave"} ${prayerQuizIndex + 1}</p>
      <h1 data-read-block data-read-text="${escapeHtml(question.text)}">${escapeHtml(question.text)}</h1>
      <p data-read-block data-read-text="${escapeHtml(question.desc)}">${escapeHtml(question.desc)}</p>
      <div class="prayer-answer-row">
        <button class="primary-button" data-prayer-answer="yes">✓ ${state.lang === "en" ? "Yes" : "Sí"}</button>
        <button class="secondary-button" data-prayer-answer="no">✕ No</button>
      </div>
    </section>
  </section>`;
  bindPrayerQuizEvents(questions, results);
}

function renderPrayerResults(questions, results) {
  const score = prayerQuizAnswers.filter(Boolean).length;
  const result = results.find(item => score >= item.min && score <= item.max) || results[0];
  const root = prayerRoot();
  if (!root) return;
  root.outerHTML = `<section id="prayer-root" class="prayer-native">
    <section class="prayer-results-card">
      <p class="eyebrow" data-read-title="${escapeHtml(`${t("prayerTitle")}. ${result.title}`)}">${state.lang === "en" ? "Your result" : "Tu resultado"}</p>
      <div class="prayer-score"><strong>${score}</strong><span>${state.lang === "en" ? "of" : "de"} ${questions.length}</span></div>
      <h1 data-read-block data-read-text="${escapeHtml(result.title)}">${escapeHtml(result.title)}</h1>
      <p data-read-block data-read-text="${escapeHtml(result.sub)}">${escapeHtml(result.sub)}</p>
    </section>
    <section class="night-prayer-card">
      <p class="eyebrow">${t("pray")}</p>
      <p data-read-block data-read-text="${escapeHtml(result.prayer)}">${escapeHtml(result.prayer)}</p>
    </section>
    <section class="prayer-answer-summary">
      ${questions.map((question, index) => `<article class="${prayerQuizAnswers[index] ? "yes" : "no"}"><span>${prayerQuizAnswers[index] ? "✓" : "✕"}</span><p>${escapeHtml(question.text)}</p></article>`).join("")}
    </section>
    <button class="secondary-button full" data-prayer-restart>${state.lang === "en" ? "Repeat evaluation" : "Repetir evaluación"}</button>
  </section>`;
  bindPrayerQuizEvents(questions, results);
}

async function hydratePrayerView() {
  const root = prayerRoot();
  if (!root) return;
  try {
    const { questions, results } = await loadPrayerQuiz();
    renderPrayerIntro(questions, results);
  } catch (error) {
    console.error(error);
    root.innerHTML = state.lang === "en" ? "Prayer guide could not be loaded." : "No fue posible cargar Oración eficaz.";
  }
}

function prayerView() {
  return `<section class="screen prayer-screen"><div id="prayer-root" class="card empty-state">${state.lang === "en" ? "Preparing prayer guide..." : "Preparando guía de oración..."}</div></section>`;
}

function sleepView() {
  return `<section class="screen sleep-screen"><div id="night-root" class="card empty-state">${state.lang === "en" ? "Preparing night peace..." : "Preparando Paz nocturna..."}</div></section>`;
}

function renderResourceCard(item) {
  const resourceAction = item.language === "en"
    ? (state.lang === "en" ? "Download English resources" : "Descargar recursos en inglés")
    : item.language === "es"
      ? (state.lang === "en" ? "Download Spanish resources" : "Descargar recursos en español")
      : t("download");
  const action = item.available
    ? `<a class="primary-button resource-download" href="${item.file}" download>${resourceAction} <span>⇩</span></a>`
    : `<p class="resource-soon">${state.lang === "en" ? "Resources will be available soon for members." : "Recursos disponibles pronto para miembros."}</p>`;
  return `<article class="resource-card" style="--resource-image: url('${item.image}')">
    <div class="resource-cover"></div>
    <div class="resource-copy">
      <p class="eyebrow">${localized(item.audience)}</p>
      <h2>${localized(item.title)}</h2>
      <p>${localized(item.description)}</p>
      ${action}
    </div>
  </article>`;
}

function resourcesView() {
  return `<section class="screen resources-screen">
    <div class="hero"><p class="eyebrow">${t("resources")}</p><h1>${t("resourcesTitle")}</h1><p class="lede">${t("resourcesIntro")}</p></div>
    <div class="resources-grid">${downloadableResources.map(renderResourceCard).join("")}</div>
  </section>`;
}

function bibleView() {
  const firstBook = state.lastBible.book || "JHN";
  const firstChapter = state.lastBible.chapter || 1;
  return `<section class="screen">
    <div class="hero"><p class="eyebrow">${state.lang === "en" ? "Scripture" : "Escritura"}</p><h1>${t("bibleTitle")}</h1><p class="lede">${t("bibleIntro")}</p></div>
    <form class="card" id="bible-form">
      <div class="inline-fields">
        <div class="field"><label for="bible-book">${t("book")}</label><select id="bible-book">${bibleBooks.map(book => `<option value="${book.code}" ${book.code === firstBook ? "selected" : ""}>${book[state.lang]}</option>`).join("")}</select></div>
        <div class="field"><label for="bible-chapter">${t("chapter")}</label><input id="bible-chapter" type="number" min="1" value="${firstChapter}" inputmode="numeric"></div>
      </div>
      <button class="primary-button full" type="submit">${t("load")}</button>
    </form>
    <div id="bible-result"><div class="card empty-state">${t("loadingBible")}</div></div>
  </section>`;
}

function overviewView() {
  const selected = bibleOverviewBooks.find(book => book.id === activeOverviewBook);
  return selected ? overviewBookDetailView(selected) : overviewCatalogView();
}

function overviewCatalogView() {
  const explored = state.overviewProgress.length;
  const percent = Math.round((explored / bibleOverviewBooks.length) * 100);
  const grouped = overviewCategories().map(category => {
    const books = bibleOverviewBooks.filter(book => book.section === category.id);
    return `<section class="overview-category-section overview-cat-${category.id}">
      <div class="section-head">
        <div>
          <p class="eyebrow">${category.testament}</p>
          <h2>${category.label}</h2>
        </div>
        <span>${books.length} ${state.lang === "en" ? "books" : "libros"}</span>
      </div>
      <div class="overview-book-grid">${books.map(renderOverviewBookCard).join("")}</div>
    </section>`;
  }).join("");

  return `<section class="screen overview-screen overview-native">
    <div class="overview-hero-panel">
      <div class="overview-hero-copy">
        <p class="eyebrow">${state.lang === "en" ? "Interactive guide" : "Guía interactiva"}</p>
        <h1>${t("bibleOverviewTitle")}</h1>
        <p>${t("bibleOverviewIntro")}</p>
        <button class="primary-button" type="button" data-overview-scroll="overview-library">${state.lang === "en" ? "Explore the 66 books" : "Explorar los 66 libros"} <span>›</span></button>
      </div>
      <article class="overview-progress-panel">
        <span>${percent}%</span>
        <strong>${state.lang === "en" ? "Journey explored" : "Recorrido explorado"}</strong>
        <small>${explored} / ${bibleOverviewBooks.length} ${state.lang === "en" ? "books marked" : "libros marcados"}</small>
        <div><i style="width:${percent}%"></i></div>
      </article>
    </div>
    <div id="overview-library" class="overview-library">${grouped}</div>
  </section>`;
}

function renderOverviewBookCard(book) {
  const category = overviewCategoryMeta(book.section);
  const explored = state.overviewProgress.includes(book.id);
  return `<button class="overview-book-card overview-cat-${book.section} ${explored ? "is-explored" : ""}" type="button" data-overview-book="${book.id}" style="--book-image:url('${book.thumbnailImage}')">
    <span class="overview-book-media" aria-hidden="true">
      <span class="overview-book-mark">${category.icon}</span>
      ${explored ? `<span class="overview-book-status">${state.lang === "en" ? "Explored" : "Explorado"}</span>` : ""}
    </span>
    <span class="overview-book-copy">
      <small>${book.chapterRange}</small>
      <strong>${book.name}</strong>
      <em>${book.centralTheme}</em>
    </span>
  </button>`;
}

function overviewBookDetailView(book) {
  const category = overviewCategoryMeta(book.section);
  const explored = state.overviewProgress.includes(book.id);
  const timeline = overviewTimeline(book);
  return `<section class="screen overview-screen overview-detail-screen">
    <button class="icon-button overview-detail-back" type="button" data-overview-back aria-label="${t("back")}">←</button>
    <div class="overview-detail-hero overview-cat-${book.section}" style="--book-image:url('${book.coverImage}')">
      <div class="overview-detail-copy">
        <p class="eyebrow">${book.categoryLabel}</p>
        <h1>${book.name}</h1>
        <p>${book.chapterRange} · ${book.centralTheme}</p>
        <div class="overview-detail-actions">
          <button class="primary-button" type="button" data-overview-scroll="overview-timeline">${state.lang === "en" ? "Start journey" : "Comenzar recorrido"} <span>›</span></button>
          <button class="${explored ? "secondary-button" : "quiet-button"}" type="button" data-overview-complete="${book.id}">${explored ? (state.lang === "en" ? "Explored" : "Explorado") : (state.lang === "en" ? "Mark explored" : "Marcar como explorado")}</button>
        </div>
      </div>
      <div class="overview-book-facts">
        <span><strong>${book.chapters}</strong><small>${state.lang === "en" ? "chapters" : "capítulos"}</small></span>
        <span><strong>${book.testament === "nt" ? "NT" : "AT"}</strong><small>${state.lang === "en" ? "testament" : "testamento"}</small></span>
        <span><strong>${category.short}</strong><small>${state.lang === "en" ? "section" : "sección"}</small></span>
      </div>
    </div>

    <section id="overview-timeline" class="overview-panel">
      <div class="section-head">
        <div><p class="eyebrow">${state.lang === "en" ? "Visual summary" : "Resumen visual"}</p><h2>${state.lang === "en" ? "Journey map" : "Mapa del recorrido"}</h2></div>
      </div>
      <div class="overview-timeline">${timeline.map((item, index) => `<button class="overview-timeline-node" type="button" data-overview-stage="${index}"><span>${index + 1}</span><strong>${escapeHtml(item)}</strong></button>`).join("")}</div>
      <p class="overview-theme">${escapeHtml(book.theme)}</p>
    </section>

    <section class="overview-insight-grid">
      ${overviewInsightCard("✦", state.lang === "en" ? "Jesus in this book" : "Jesús en este libro", book.jesus, "jesus")}
      ${overviewInsightCard("“", state.lang === "en" ? "Key verse" : "Versículo clave", `${book.keyVerse}<br><strong>${book.keyVerseRef}</strong>`, "verse")}
      ${overviewInsightCard("◇", state.lang === "en" ? "Did you know?" : "¿Sabías que...?", book.didYouKnow, "fact")}
    </section>

    <section class="overview-panel">
      <div class="section-head">
        <div><p class="eyebrow">${state.lang === "en" ? "For today" : "Para hoy"}</p><h2>${state.lang === "en" ? "Devotional guide" : "Guía devocional"}</h2></div>
      </div>
      <div class="overview-devotional-grid">
        ${overviewDevotionalCard(state.lang === "en" ? "Reflection" : "Reflexión", book.devotional.reflection)}
        ${overviewDevotionalCard(state.lang === "en" ? "Question" : "Pregunta para hoy", book.devotional.question)}
        ${overviewDevotionalCard(state.lang === "en" ? "Prayer" : "Oración sugerida", book.devotional.prayer)}
      </div>
    </section>
    ${activeOverviewStage !== null ? overviewStageModal(book, timeline[activeOverviewStage] || timeline[0], activeOverviewStage) : ""}
  </section>`;
}

function overviewStageModal(book, stageTitle, index) {
  const title = escapeHtml(stageTitle);
  const mainPerson = book.author || (state.lang === "en" ? "God's people" : "El pueblo de Dios");
  return `<div class="overview-stage-modal" role="dialog" aria-modal="true">
    <button class="overview-stage-backdrop" type="button" data-overview-stage-close aria-label="${t("back")}"></button>
    <article class="overview-stage-card">
      <button class="icon-button" type="button" data-overview-stage-close aria-label="${t("back")}">×</button>
      <p class="eyebrow">${escapeHtml(book.name)} · ${state.lang === "en" ? "Stage" : "Etapa"} ${index + 1}</p>
      <h2>${title}</h2>
      <div class="overview-stage-grid">
        <div><strong>${state.lang === "en" ? "What happened" : "Qué ocurrió"}</strong><p>${escapeHtml(book.summary || book.theme)}</p></div>
        <div><strong>${state.lang === "en" ? "Main character" : "Personaje principal"}</strong><p>${escapeHtml(mainPerson)}</p></div>
        <div><strong>${state.lang === "en" ? "What it reveals about God" : "Qué revela acerca de Dios"}</strong><p>${escapeHtml(book.jesus || book.theme)}</p></div>
        <div><strong>${state.lang === "en" ? "Key verse" : "Versículo clave"}</strong><p>${escapeHtml(book.keyVerseRef)} · ${escapeHtml(book.keyVerse)}</p></div>
      </div>
      <div class="overview-stage-application"><strong>${state.lang === "en" ? "Application for today" : "Aplicación para hoy"}</strong><p>${escapeHtml(book.devotional?.question || book.theme)}</p></div>
      <button class="primary-button full" type="button" data-overview-stage-close>${state.lang === "en" ? "Continue journey" : "Continuar recorrido"}</button>
    </article>
  </div>`;
}

function overviewInsightCard(icon, title, body, variant) {
  return `<article class="overview-insight-card ${variant}">
    <span aria-hidden="true">${icon}</span>
    <p class="eyebrow">${title}</p>
    <p>${body}</p>
  </article>`;
}

function overviewDevotionalCard(title, body) {
  return `<article class="overview-devotional-card">
    <p class="eyebrow">${title}</p>
    <p>${escapeHtml(body)}</p>
  </article>`;
}

function overviewCategories() {
  const categories = [];
  bibleOverviewBooks.forEach(book => {
    if (!categories.some(category => category.id === book.section)) {
      const meta = overviewCategoryMeta(book.section);
      categories.push({
        id: book.section,
        label: book.categoryLabel,
        testament: book.testament === "nt"
          ? (state.lang === "en" ? "New Testament" : "Nuevo Testamento")
          : (state.lang === "en" ? "Old Testament" : "Antiguo Testamento"),
        order: book.sectionOrder,
        ...meta
      });
    }
  });
  return categories.sort((a, b) => a.order - b.order);
}

function overviewCategoryMeta(section) {
  const map = {
    pentateuco: { icon: "I", short: "Torá" },
    historia: { icon: "II", short: "Historia" },
    sabiduria: { icon: "III", short: "Poesía" },
    "profetas-mayores": { icon: "IV", short: "Profetas" },
    "profetas-menores": { icon: "V", short: "Profetas" },
    evangelios: { icon: "VI", short: "Evangelios" },
    "historia-nt": { icon: "VII", short: "Hechos" },
    "cartas-pablo": { icon: "VIII", short: "Pablo" },
    "cartas-generales": { icon: "IX", short: "Cartas" },
    profecia: { icon: "X", short: "Profecía" }
  };
  return map[section] || { icon: "•", short: "Biblia" };
}

function overviewTimeline(book) {
  if (book.timeline?.length) return book.timeline;
  const christ = book.testament === "nt" ? "Cristo revelado" : "Promesa de Cristo";
  return ["Contexto", book.centralTheme || book.categoryLabel, christ, "Respuesta de fe"];
}

function wisdomView() {
  return `<section class="screen wisdom-native-screen">
    <div id="wisdom-root" class="card empty-state">${state.lang === "en" ? "Preparing Proverbs..." : "Preparando Proverbios..."}</div>
  </section>`;
}

async function loadWisdomDays() {
  if (wisdomDaysCache) return wisdomDaysCache;
  const response = await fetch("./coach-proverbios.html");
  if (!response.ok) throw new Error("Unable to load Proverbs coach content");
  const html = await response.text();
  const match = html.match(/const DAYS\s*=\s*(\[[\s\S]*?\]);\s*let currentDay/);
  if (!match) throw new Error("Unable to parse Proverbs coach content");
  wisdomDaysCache = Function(`"use strict"; return (${match[1]});`)();
  return wisdomDaysCache;
}

function wisdomStorageKey(dayNumber, key) { return `prov_d${dayNumber}_${key}`; }
function savedWisdom(dayNumber, key) { return localStorage.getItem(wisdomStorageKey(dayNumber, key)) || ""; }
function wisdomChecked(dayNumber) { return localStorage.getItem(wisdomStorageKey(dayNumber, "check")) === "1"; }
function wisdomCompleted(dayNumber) {
  return Boolean(savedWisdom(dayNumber, "q1") || savedWisdom(dayNumber, "q2") || savedWisdom(dayNumber, "q3") || wisdomChecked(dayNumber));
}
function wisdomProgress(days) { return days.filter((_day, index) => wisdomCompleted(index + 1)).length; }

function plainTextFromHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html || "";
  return template.content.textContent || "";
}

function wisdomReflectionCard(key, title, prompt, dayNumber, placeholder) {
  const value = savedWisdom(dayNumber, key);
  return `<section class="wisdom-reflection-card">
    <p class="eyebrow">${title}</p>
    <h3>${prompt}</h3>
    <textarea data-wisdom-input="${key}" rows="3" placeholder="${placeholder}">${escapeHtml(value)}</textarea>
    <button class="secondary-button" data-wisdom-save="${key}">${state.lang === "en" ? "Save" : "Guardar"}</button>
  </section>`;
}

function bindWisdomEvents(days) {
  document.querySelectorAll("[data-wisdom-day]").forEach(button => button.addEventListener("click", () => renderWisdomDay(days, Number(button.dataset.wisdomDay))));
  document.querySelectorAll("[data-wisdom-save]").forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.wisdomSave;
    const input = document.querySelector(`[data-wisdom-input="${key}"]`);
    localStorage.setItem(wisdomStorageKey(activeWisdomDay, key), input?.value?.trim() || "");
    toast(t("saved"));
    renderWisdomDay(days, activeWisdomDay);
  }));
  document.querySelector("[data-wisdom-check]")?.addEventListener("click", () => {
    localStorage.setItem(wisdomStorageKey(activeWisdomDay, "check"), wisdomChecked(activeWisdomDay) ? "0" : "1");
    toast(t("saved"));
    renderWisdomDay(days, activeWisdomDay);
  });
  document.querySelector("[data-wisdom-bible]")?.addEventListener("click", () => {
    state.lastBible = { book: "PRO", chapter: activeWisdomDay };
    saveState();
    navigate("bible");
  });
}

function renderWisdomDay(days, requestedDay = activeWisdomDay) {
  if (!days?.length) return;
  activeWisdomDay = Math.min(Math.max(Number(requestedDay) || 1, 1), days.length);
  const day = days[activeWisdomDay - 1];
  const completed = wisdomProgress(days);
  const progress = Math.round((completed / days.length) * 100);
  const checked = wisdomChecked(activeWisdomDay);
  const q2 = day.q2 || (state.lang === "en" ? "What practical step do you sense God inviting you to take?" : "¿Qué paso práctico sientes que Dios te invita a dar?");
  const proseText = plainTextFromHtml(day.prose);
  const root = document.getElementById("wisdom-root");
  if (!root) return;
  root.outerHTML = `<section id="wisdom-root" class="wisdom-native">
    <section class="wisdom-hero">
      <div class="wisdom-hero-copy">
        <p class="eyebrow">${state.lang === "en" ? "Proverbs" : "Proverbios"}</p>
        <h1>${t("wisdomTitle")}</h1>
        <p>${t("wisdomIntro")}</p>
        <div class="wisdom-progress">
          <span>${completed} / ${days.length}</span>
          <div><i style="width:${progress}%"></i></div>
          <strong>${progress}%</strong>
        </div>
      </div>
      <div class="wisdom-verse-card">
        <span>${activeWisdomDay}</span>
        <p>“${escapeHtml(day.verse)}”</p>
        <strong>${escapeHtml(day.ref)}</strong>
      </div>
    </section>

    <section class="wisdom-day-guide">
      <p class="eyebrow">${t("wisdomGuideTitle")}</p>
      <p>${t("wisdomGuideText")}</p>
    </section>

    <div class="wisdom-day-strip" aria-label="${state.lang === "en" ? "Proverbs days" : "Días de Proverbios"}">
      ${days.map((item, index) => `<button class="${index + 1 === activeWisdomDay ? "active" : ""} ${wisdomCompleted(index + 1) ? "done" : ""}" data-wisdom-day="${index + 1}"><span>${state.lang === "en" ? "Day" : "Día"} ${index + 1}</span><small>${state.lang === "en" ? "Chapter" : "Capítulo"} ${escapeHtml(item.cap)}</small></button>`).join("")}
    </div>

    ${audioControls("wisdom")}

    <article class="wisdom-reading-card">
      <div class="wisdom-reading-head">
        <p class="eyebrow" data-read-title="${escapeHtml(`${t("wisdomTitle")}. Día ${activeWisdomDay}. ${day.title}`)}">Día ${activeWisdomDay} · ${escapeHtml(day.cap)}</p>
        <h2 data-read-block data-read-text="${escapeHtml(day.title)}">${escapeHtml(day.title)}</h2>
      </div>
      <blockquote data-read-block data-read-text="${escapeHtml(`${day.ref}. ${day.verse}`)}">“${escapeHtml(day.verse)}” <strong>${escapeHtml(day.ref)}</strong></blockquote>
      <div class="wisdom-prose" data-read-block data-read-text="${escapeHtml(proseText)}">${day.prose}</div>
      <button class="quiet-button wisdom-bible-link" data-wisdom-bible>${state.lang === "en" ? "Read the chapter in the Bible" : "Leer el capítulo en la Biblia"} →</button>
    </article>

    <section class="wisdom-practice-grid">
      ${wisdomReflectionCard("q1", state.lang === "en" ? "Listen" : "Escucha", escapeHtml(day.q1), activeWisdomDay, state.lang === "en" ? "Write what stood out today..." : "Escribe lo que más te habló hoy...")}
      ${wisdomReflectionCard("q2", state.lang === "en" ? "Discern" : "Discierne", escapeHtml(q2), activeWisdomDay, state.lang === "en" ? "Write honestly..." : "Responde con honestidad...")}
    </section>

    <section class="wisdom-action-card">
      <div>
        <p class="eyebrow">${state.lang === "en" ? "Practice today" : "Practica hoy"}</p>
        <p class="wisdom-action-text" data-read-block data-read-text="${escapeHtml(day.action)}">${escapeHtml(day.action)}</p>
      </div>
      <div class="completion-actions">
        <button class="${checked ? "primary-button" : "secondary-button"}" data-wisdom-check>${checked ? (state.lang === "en" ? "Completed" : "Hecho") : (state.lang === "en" ? "Mark as done" : "Marcar como hecho")}</button>
        ${checked ? `<p class="completion-note">${t("completionTomorrow")}</p>` : ""}
      </div>
    </section>

    <section class="wisdom-prayer-card">
      <p class="eyebrow">${t("pray")}</p>
      <p data-read-block data-read-text="${escapeHtml(day.prayer)}">${escapeHtml(day.prayer)}</p>
    </section>
  </section>`;
  bindWisdomEvents(days);
}

async function hydrateWisdomView() {
  const root = document.getElementById("wisdom-root");
  if (!root) return;
  try {
    const days = await loadWisdomDays();
    const firstOpen = days.findIndex((_day, index) => !wisdomCompleted(index + 1));
    renderWisdomDay(days, firstOpen === -1 ? activeWisdomDay : firstOpen + 1);
  } catch (error) {
    console.error(error);
    root.innerHTML = state.lang === "en" ? "This section could not be loaded." : "No fue posible cargar esta sección.";
  }
}

async function loadBibleBook(bookId) {
  if (bibleBookCache.has(bookId)) return bibleBookCache.get(bookId);
  const response = await fetch(`./bible-data/${bookId}.json`);
  if (!response.ok) throw new Error(`Unable to load ${bookId}`);
  const book = await response.json();
  bibleBookCache.set(bookId, book);
  return book;
}

async function renderChapter(bookId, requestedChapter) {
  const result = document.getElementById("bible-result");
  if (!result) return;
  result.innerHTML = `<div class="card empty-state">${t("loadingBible")}</div>`;
  try {
    const book = await loadBibleBook(bookId);
    const chapters = Object.keys(book.chapters).map(Number).sort((a, b) => a - b);
    const chapter = Math.min(Math.max(Number(requestedChapter) || 1, 1), chapters.length);
    const input = document.getElementById("bible-chapter");
    if (input) { input.max = String(chapters.length); input.value = String(chapter); }
    const verses = book.chapters[chapter]?.[state.lang];
    if (!verses) throw new Error("Chapter unavailable");
    state.lastBible = { book: bookId, chapter };
    saveState();
    result.innerHTML = `${audioControls("bible")}<article class="card"><p class="eyebrow" data-read-title="${escapeHtml(`${book[state.lang]} ${chapter}`)}">${book[state.lang]} ${chapter} · ${bibleVersion()}</p><div class="scripture">${verses.map((verse, index) => `<p data-read-block data-read-text="${escapeHtml(verse)}"><sup>${index + 1}</sup> ${verse}</p>`).join("")}</div></article><div class="button-row"><button class="secondary-button" data-bible-page="${chapter - 1}" ${chapter === 1 ? "disabled" : ""}>← ${t("previousChapter")}</button><button class="secondary-button" data-bible-page="${chapter + 1}" ${chapter === chapters.length ? "disabled" : ""}>${t("nextChapter")} →</button></div>`;
    result.querySelectorAll("[data-bible-page]").forEach(button => button.addEventListener("click", () => renderChapter(bookId, button.dataset.biblePage)));
  } catch (error) {
    console.error("Bible chapter loading failed", error);
    result.innerHTML = `<div class="card empty-state">${t("notAvailable")}</div>`;
  }
}

function journalView() {
  const markerLabel = state.lang === "en" ? "Last Bible marker" : "Último marcador bíblico";
  const markerBook = bibleBooks.find(book => book.code === state.lastBible?.book);
  const markerText = markerBook ? `${markerBook[state.lang]} ${state.lastBible.chapter || 1}` : (state.lang === "en" ? "No marker yet" : "Sin marcador todavía");
  return `<section class="screen">
    <div class="hero"><p class="eyebrow">${t("journal")}</p><h1>${t("journalTitle")}</h1><p class="lede">${t("journalIntro")}</p></div>
    <form class="card" id="journal-form">
      <div class="field"><label for="journal-category">${t("category")}</label><select id="journal-category"><option>${t("gratitude")}</option><option>${t("request")}</option><option>${t("intercession")}</option><option>${t("confession")}</option><option>${t("praise")}</option><option>${t("other")}</option></select></div>
      <div class="field"><label for="journal-entry">${t("entry")}</label><textarea id="journal-entry" maxlength="3000" placeholder="${t("entryPlaceholder")}" required></textarea><span class="field-hint">0 / 3000</span></div>
      <button class="primary-button full" type="submit">${t("save")}</button>
    </form>
    <div id="journal-list">${renderJournal()}</div>
    <section class="journal-personal-section">
      <div class="section-heading"><h2>${state.lang === "en" ? "Favorites and markers" : "Favoritos y marcadores"}</h2></div>
      ${renderFavoritesGrid()}
      <article class="marker-card" data-route="bible">
        <span aria-hidden="true">▦</span>
        <div><p class="eyebrow">${markerLabel}</p><h2>${escapeHtml(markerText)}</h2><small>${state.lang === "en" ? "Continue reading where you left off." : "Continúa leyendo donde quedaste."}</small></div>
      </article>
    </section>
  </section>`;
}

function renderJournal() {
  if (!state.journal.length) return `<div class="empty-state">${t("noEntries")}</div>`;
  return state.journal.map(item => `<article class="card journal-entry"><button class="delete-button" data-delete-entry="${item.id}" aria-label="${t("delete")}">×</button><p class="eyebrow">${escapeHtml(item.category)}</p><time datetime="${item.created}">${new Intl.DateTimeFormat(state.lang, { dateStyle: "medium" }).format(new Date(item.created))}</time><p>${escapeHtml(item.text).replace(/\n/g, "<br>")}</p></article>`).join("");
}

function subscriptionView() {
  const benefits = state.lang === "en"
    ? ["Guided biblical paths", "Bible and visual exploration", "Prayer journal", "Yeshua Assistant", "Family content", "Night peace"]
    : ["Caminos bíblicos guiados", "Biblia y exploración visual", "Diario de oración", "Asistente Yeshua", "Contenido para familia", "Paz nocturna"];
  return `<section class="screen subscription-screen">
    <section class="subscription-hero">
      <div class="subscription-orb"><img src="assets/icons/app-icon.png" alt="Yeshua"></div>
      <p class="eyebrow">${currentUser?.email ? escapeHtml(currentUser.email) : "Yeshua Premium"}</p>
      <h1>${t("subscribeTitle")}</h1>
      <p class="lede">${t("subscribeIntro")}</p>
      ${accessChecking ? `<p class="access-note">${t("accessChecking")}</p>` : userAccess.allowed ? `<p class="access-note success">${state.lang === "en" ? "Access active." : "Acceso activo."}</p>` : `<p class="access-note">${t("accessNeeded")}</p>`}
      <div class="hero-actions">
        <button class="primary-button" type="button" id="start-trial-button" ${accessChecking ? "disabled" : ""}>${t("startTrial")}</button>
        <button class="secondary-button" type="button" id="subscribe-button">${t("subscribeNow")}</button>
      </div>
    </section>
    <section class="subscription-benefits">
      ${benefits.map((benefit, index) => `<article><span>${["✦", "▦", "✎", "◇", "♡", "☾"][index]}</span><p>${benefit}</p></article>`).join("")}
    </section>
    <section class="pricing-card">
      <p class="eyebrow">${state.lang === "en" ? "Founding plan" : "Plan inicial"}</p>
      <h2>${state.lang === "en" ? "7 days free, then USD 39.99/year" : "7 días gratis, luego USD 39.99/año"}</h2>
      <p>${state.lang === "en" ? "Your access can be activated through a trial, subscription, or internal invitation." : "Tu acceso puede activarse con una prueba, suscripción o invitación interna."}</p>
      <button class="primary-button full" type="button" id="start-trial-button-bottom" ${accessChecking ? "disabled" : ""}>${t("startTrial")}</button>
    </section>
  </section>`;
}

function subscriptionQuizView() {
  const steps = subscriptionQuizSteps();
  const index = Math.min(subscriptionQuizIndex, steps.length - 1);
  const step = steps[index];
  const answer = quizAnswerValue(step);
  const progress = Math.round(((index + 1) / steps.length) * 100);
  return `<section class="screen subscription-quiz-screen">
    <section class="quiz-shell">
      <div class="quiz-topbar">
        <button class="icon-button" type="button" data-quiz-back aria-label="${state.lang === "en" ? "Back" : "Atrás"}">←</button>
        <div><strong>Yeshua</strong><small>${index + 1} / ${steps.length}</small></div>
      </div>
      <div class="quiz-progress"><span style="width:${progress}%"></span></div>
      <article class="quiz-question-card">
        <p class="eyebrow">${state.lang === "en" ? "Personalized path" : "Camino personalizado"}</p>
        <h1>${step.title}</h1>
        <p class="lede">${step.subtitle}</p>
        <div class="${step.type === "multi" ? "quiz-options multi" : "quiz-options"}">
          ${step.options.map(option => {
            const selected = step.type === "multi" ? answer.includes(option.id) : answer === option.id;
            return `<button class="quiz-option ${selected ? "selected" : ""}" type="button" data-quiz-option="${option.id}">
              <span class="quiz-option-icon">${option.icon}</span>
              <strong>${escapeHtml(option.label)}</strong>
              <em>${selected ? "✓" : ""}</em>
            </button>`;
          }).join("")}
        </div>
        <div class="quiz-actions">
          <button class="secondary-button" type="button" data-route="subscription">${state.lang === "en" ? "Exit" : "Salir"}</button>
          <button class="primary-button" type="button" data-quiz-next ${hasQuizAnswer(step) ? "" : "disabled"}>${index === steps.length - 1 ? (state.lang === "en" ? "See result" : "Ver resultado") : (state.lang === "en" ? "Continue" : "Continuar")}</button>
        </div>
      </article>
    </section>
  </section>`;
}

function subscriptionResultView() {
  const result = state.subscriptionResult || buildSubscriptionResult();
  return `<section class="screen subscription-result-screen">
    <section class="result-hero-card">
      <div class="result-badge">✓</div>
      <p class="eyebrow">${state.lang === "en" ? "Ready" : "Listo"}</p>
      <h1>${state.lang === "en" ? "Your path is ready" : "Tu camino está listo"}</h1>
      <p class="lede">${state.lang === "en" ? "We prepared an initial experience based on your answers." : "Preparamos una experiencia inicial según tus respuestas."}</p>
    </section>
    <section class="recommendation-grid">
      <article><span>▦</span><p class="eyebrow">${state.lang === "en" ? "Suggested devotional" : "Devocional sugerido"}</p><h2>${escapeHtml(result.devotional)}</h2></article>
      <article><span>✦</span><p class="eyebrow">${state.lang === "en" ? "Suggested prayer" : "Oración sugerida"}</p><h2>${escapeHtml(result.prayer)}</h2></article>
      <article><span>◌</span><p class="eyebrow">${state.lang === "en" ? "Daily plan" : "Plan diario"}</p><h2>${escapeHtml(result.plan)}</h2></article>
      <article><span>☼</span><p class="eyebrow">${state.lang === "en" ? "Recommended time" : "Tiempo recomendado"}</p><h2>${escapeHtml(result.recommendedTime)}</h2></article>
    </section>
    <section class="pricing-card">
      <h2>${state.lang === "en" ? "Start your 7-day free trial" : "Comienza tu prueba gratis de 7 días"}</h2>
      <p>${state.lang === "en" ? "Then USD 39.99/year. Your initial experience will be ready when your access is active." : "Luego USD 39.99/año. Tu experiencia inicial estará lista cuando tu acceso esté activo."}</p>
      <button class="primary-button full" type="button" data-route="subscription-trial">${state.lang === "en" ? "Start free trial" : "Comenzar prueba gratis"}</button>
    </section>
  </section>`;
}

function subscriptionTrialView() {
  return subscriptionView();
}

function settingsRow(icon, title, subtitle, attrs = "") {
  return `<button class="settings-row" type="button" ${attrs}>
    <span class="settings-row-icon" aria-hidden="true">${icon}</span>
    <span class="settings-row-copy"><strong>${title}</strong>${subtitle ? `<small>${subtitle}</small>` : ""}</span>
    <span class="settings-row-arrow" aria-hidden="true">›</span>
  </button>`;
}

function profileStats() {
  const journeyCompleted = Object.values(state.progress || {}).flat().length;
  const bibleDays = Math.max(1, new Set([state.lastBible?.book, ...(state.completed || [])]).size);
  const prayerMinutes = Math.max(5, (state.journal?.length || 0) * 4 + journeyCompleted * 3);
  const favorites = state.favorites?.length || 0;
  const listenedMinutes = Math.max(8, journeyCompleted * 5 + Object.values(state.storyProgress || {}).filter(status => status === "read").length * 4);
  return [
    { icon: "🔥", value: `${Math.max(1, completedFor(currentJourneyId()).length || 1)}`, label: state.lang === "en" ? "Current streak" : "Racha actual" },
    { icon: "📖", value: `${bibleDays}`, label: state.lang === "en" ? "Bible reading days" : "Días leyendo la Biblia" },
    { icon: "🙏", value: `${prayerMinutes}m`, label: state.lang === "en" ? "Prayer time" : "Tiempo de oración" },
    { icon: "⭐", value: `${favorites}`, label: state.lang === "en" ? "Favorites" : "Contenido favorito" },
    { icon: "🎧", value: `${listenedMinutes}m`, label: state.lang === "en" ? "Minutes listened" : "Minutos escuchados" }
  ];
}

function renderProfileStats() {
  return `<section class="profile-stats-card">
    <div class="profile-stats-head">
      <p class="eyebrow">${state.lang === "en" ? "Your rhythm" : "Tu ritmo"}</p>
      <h2>${state.lang === "en" ? "A living path with God" : "Un camino vivo con Dios"}</h2>
    </div>
    <div class="profile-stats-grid">${profileStats().map(item => `<article class="profile-stat"><span>${item.icon}</span><strong>${escapeHtml(item.value)}</strong><small>${escapeHtml(item.label)}</small></article>`).join("")}</div>
    <p class="profile-stats-note">${state.lang === "en" ? "Temporary local stats while cloud analytics are connected." : "Estadísticas temporales locales mientras conectamos métricas en la nube."}</p>
  </section>`;
}

function renderInterestPreferences() {
  return `<section class="settings-group interest-settings">
    <h2>${state.lang === "en" ? "Preferences and interests" : "Preferencias e intereses"}</h2>
    <article class="settings-card">
      <p class="preference-hint">${state.lang === "en"
        ? "Choose what you want to see more often. Home will prioritize these themes and later learn from your reading, favorites, completed paths, and Assistant use."
        : "Elige lo que quieres ver con mayor frecuencia. El inicio priorizará estos temas y luego aprenderá de tus lecturas, favoritos, caminos completados y uso del Asistente."}</p>
      <div class="interest-grid">
        ${interestOptions.map(option => {
          const active = state.interests.includes(option.id);
          return `<button class="interest-chip ${active ? "active" : ""}" type="button" data-interest-toggle="${option.id}">
            <span aria-hidden="true">${option.icon}</span>
            <strong>${escapeHtml(localized(option.label))}</strong>
          </button>`;
        }).join("")}
      </div>
    </article>
  </section>`;
}

function profileView() {
  const avatar = accountAvatarUrl();
  const passwordCard = currentUser
    ? `<section class="settings-group">
        <h2>${t("account")}</h2>
        <details class="settings-card change-password-card">
          <summary><strong>${t("changePassword")}</strong></summary>
          <form id="change-password-form" class="auth-form compact-auth-form">
            <div class="field"><label for="new-password">${t("password")}</label><input id="new-password" type="password" autocomplete="new-password" minlength="8" required></div>
            <div class="field"><label for="new-password-confirm">${t("confirmPassword")}</label><input id="new-password-confirm" type="password" autocomplete="new-password" minlength="8" required></div>
            <button class="primary-button full" type="submit">${t("changePassword")}</button>
          </form>
        </details>
      </section>`
    : "";
  const accountCard = currentUser
    ? `<section class="profile-card">
        <div class="profile-avatar">${avatar ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(accountName())}">` : escapeHtml(accountInitial())}</div>
        <div class="profile-copy">
          <p class="eyebrow">${t("signedIn")}</p>
          <h2>${escapeHtml(accountName())}</h2>
          <p>${escapeHtml(currentUser.email || "")}</p>
          <span class="profile-meta">${t("syncedDescription")}</span>
          <input class="visually-hidden" id="profile-photo-input" type="file" accept="image/*">
          <div class="button-row profile-actions">
            <button class="secondary-button" type="button" id="change-profile-photo">${t("changePhoto")}</button>
            ${state.profilePhoto ? `<button class="quiet-button" type="button" id="remove-profile-photo">${t("removePhoto")}</button>` : ""}
          </div>
        </div>
      </section>`
    : `<section class="profile-card">
        <div class="profile-avatar">${escapeHtml(accountInitial())}</div>
        <div class="profile-copy"><p class="eyebrow">${t("account")}</p><h2>${t("guestMode")}</h2><p>${t("guestDescription")}</p><button class="primary-button" data-route="login">${t("signIn")}</button></div>
      </section>`;
  return `<section class="screen settings-screen">
    <div class="hero"><p class="eyebrow">${t("navProfile")}</p><h1>${t("profileTitle")}</h1><p class="lede">${t("profileIntro")}</p></div>
    ${accountCard}
    ${passwordCard}
    <section class="settings-group">
      <h2>${t("settingsGeneral")}</h2>
      <article class="settings-card">
        <div class="field"><label>${t("language")}</label><div class="segmented"><button data-set-lang="es" class="${state.lang === "es" ? "active" : ""}">Español</button><button data-set-lang="en" class="${state.lang === "en" ? "active" : ""}">English</button></div></div>
        <div class="field"><label>${t("appearance")}</label><div class="segmented"><button data-set-theme="dark" class="${state.theme === "dark" || state.theme === "light" ? "active" : ""}">${t("dark")}</button><button data-set-theme="system" class="${state.theme === "system" ? "active" : ""}">${t("system")}</button></div><p class="preference-hint">${t("themeAutoHint")}</p></div>
        ${settingsRow("◇", t("notifications"), state.lang === "en" ? "Daily reminders will be available soon." : "Recordatorios diarios estarán disponibles pronto.", 'data-soon="true"')}
        ${settingsRow("⇩", t("offline"), state.lang === "en" ? "Save readings and resources for later." : "Guarda lecturas y recursos para después.", installPrompt ? 'id="install-button"' : 'data-soon="true"')}
      </article>
    </section>
    <section class="settings-group">
      <h2>${t("settingsSubscribe")}</h2>
      <article class="settings-card subscribe-card">
        <p>${state.lang === "en" ? "Premium plans will unlock deeper paths, audio, downloads, and future AI features." : "Los planes premium desbloquearán caminos más profundos, audio, descargas y futuras funciones de IA."}</p>
        <button class="secondary-button full" type="button" data-route="subscription">${state.lang === "en" ? "View plans" : "Ver planes"}</button>
      </article>
    </section>
    <section class="settings-group">
      <h2>${t("settingsLegal")}</h2>
      <details class="settings-card"><summary><strong>${t("terms")}</strong></summary><p class="muted">${state.lang === "en" ? "By using Yeshua, you agree to use the content for personal spiritual growth and not as a replacement for professional care." : "Al usar Yeshua aceptas utilizar el contenido para crecimiento espiritual personal y no como reemplazo de atención profesional."}</p></details>
      <details class="settings-card"><summary><strong>${t("privacy")}</strong></summary><p class="muted">${t("privacyText")}</p></details>
      <details class="settings-card"><summary><strong>${t("importantNotices")}</strong></summary><p class="muted">${t("doctrineText")}</p></details>
    </section>
    <section class="settings-group">
      <article class="settings-card">
        ${currentUser ? `<button class="danger-button full" id="sign-out-button">${t("signOut")}</button>` : ""}
      </article>
    </section>
    <p class="app-version">${t("appVersion")} ${APP_VERSION}</p>
  </section>`;
}

function loginView() {
  const authReady = authConfigured && location.protocol !== "file:";
  const mode = authMode;
  const title = mode === "register" ? t("createAccount") : mode === "magic" ? t("magicAlternative") : t("authTitle");
  const intro = mode === "register"
    ? (state.lang === "en" ? "Create your account to save your journal, progress, and favorites." : "Crea tu cuenta para guardar tu diario, progreso y favoritos.")
    : mode === "magic"
      ? t("authIntro")
      : (state.lang === "en" ? "Sign in with your email and password, or use a magic link." : "Inicia sesión con correo y contraseña, o usa un enlace mágico.");

  const registerForm = `<form id="register-form" class="auth-form">
    <div class="field"><label for="register-name">${t("fullName")}</label><input id="register-name" type="text" autocomplete="name" required ${authReady ? "" : "disabled"}></div>
    <div class="field"><label for="register-email">${t("email")}</label><input id="register-email" type="email" autocomplete="email" inputmode="email" required ${authReady ? "" : "disabled"}></div>
    <div class="field"><label for="register-password">${t("password")}</label><input id="register-password" type="password" autocomplete="new-password" minlength="8" required ${authReady ? "" : "disabled"}></div>
    <div class="field"><label for="register-confirm">${t("confirmPassword")}</label><input id="register-confirm" type="password" autocomplete="new-password" minlength="8" required ${authReady ? "" : "disabled"}></div>
    <button class="primary-button full" ${authReady ? "" : "disabled"}>${authReady ? t("createAccount") : t("authUnavailable")}</button>
  </form>`;

  const passwordForm = `<form id="password-login-form" class="auth-form">
    <div class="field"><label for="login-email">${t("email")}</label><input id="login-email" type="email" autocomplete="email" inputmode="email" required ${authReady ? "" : "disabled"}></div>
    <div class="field"><label for="login-password">${t("password")}</label><input id="login-password" type="password" autocomplete="current-password" minlength="8" required ${authReady ? "" : "disabled"}></div>
    <button class="primary-button full" ${authReady ? "" : "disabled"}>${authReady ? t("passwordLogin") : t("authUnavailable")}</button>
  </form>`;

  const magicForm = `<form id="magic-link-form" class="auth-form">
    <div class="field"><label for="magic-email">${t("email")}</label><input id="magic-email" type="email" autocomplete="email" inputmode="email" required ${authReady ? "" : "disabled"}></div>
    <button class="primary-button full" ${authReady ? "" : "disabled"}>${authReady ? t("sendLink") : t("authUnavailable")}</button>
  </form>`;

  return `<section class="screen auth-shell"><div class="card auth-card">
    <p class="eyebrow">${t("account")}</p>
    <h1>${title}</h1>
    <p class="muted">${intro}</p>
    <div class="auth-tabs">
      <button type="button" data-auth-mode="login" class="${mode === "login" ? "active" : ""}">${t("passwordLogin")}</button>
      <button type="button" data-auth-mode="register" class="${mode === "register" ? "active" : ""}">${t("createAccount")}</button>
    </div>
    ${mode === "register" ? registerForm : mode === "magic" ? magicForm : passwordForm}
    ${authReady && mode !== "magic" ? `<div class="auth-divider"><span>${state.lang === "en" ? "or" : "o"}</span></div>
    <button type="button" class="google-auth-button" id="google-auth-button">
      <span class="google-mark" aria-hidden="true">G</span>
      <span>${t("continueGoogle")}</span>
    </button>` : ""}
    <div class="auth-secondary-actions">
      ${mode !== "magic" ? `<button type="button" class="link-button" data-auth-mode="magic">${t("magicAlternative")}</button>` : `<button type="button" class="link-button" data-auth-mode="login">${t("passwordLogin")}</button>`}
      ${mode !== "register" ? `<button type="button" class="link-button" data-auth-mode="register">${t("needAccount")}</button>` : `<button type="button" class="link-button" data-auth-mode="login">${t("alreadyAccount")}</button>`}
      <button type="button" class="link-button" id="forgot-password-button">${t("forgotPassword")}</button>
    </div>
    <p class="security-note"><span aria-hidden="true">&#128274;</span><span>${t("security")}</span></p>
  </div></section>`;
}

function assistantSuggestions() {
  return state.lang === "en"
    ? ["How can I start praying?", "Explain Philippians 4.", "Help me with a moment of anxiety.", "What does Jesus say about forgiveness?"]
    : ["¿Cómo puedo empezar a orar?", "Explícame Filipenses 4.", "Ayúdame con un momento de ansiedad.", "¿Qué dice Jesús sobre el perdón?"];
}

function assistantLocalReply(question) {
  const lower = question.toLowerCase();
  if (/ansios|anx/i.test(lower)) {
    return state.lang === "en"
      ? "A simple beginning could be: Father, I bring this anxiety before You. Help me name what I am carrying, receive Your care, and take one faithful next step. You may also read Philippians 4:6-7 slowly."
      : "Un inicio sencillo podría ser: Padre, traigo esta ansiedad delante de Ti. Ayúdame a nombrar lo que estoy cargando, recibir tu cuidado y dar un siguiente paso fiel. También puedes leer Filipenses 4:6-7 con calma.";
  }
  if (/paz|peace/i.test(lower)) {
    return state.lang === "en"
      ? "Scripture presents peace as a gift rooted in God's presence, not merely the absence of problems. You can begin with John 14:27 and ask: What peace does Christ give that the world cannot give?"
      : "La Biblia presenta la paz como un regalo arraigado en la presencia de Dios, no solo como ausencia de problemas. Puedes comenzar con Juan 14:27 y preguntarte: ¿qué paz da Cristo que el mundo no puede dar?";
  }
  if (/devocional|devotional|5/i.test(lower)) {
    return state.lang === "en"
      ? "Try this 5-minute rhythm: 1 minute to breathe and ask God for attention, 2 minutes to read a short passage, 1 minute to notice one phrase, and 1 minute to pray it back to God."
      : "Prueba este ritmo de 5 minutos: 1 minuto para respirar y pedir atención a Dios, 2 minutos para leer un pasaje breve, 1 minuto para notar una frase y 1 minuto para convertirla en oración.";
  }
  if (/filipenses|philippians|filip/i.test(lower)) {
    return state.lang === "en"
      ? "Philippians 4 invites you to bring anxiety to God through prayer, thanksgiving, and trust. The promise is not that every problem disappears immediately, but that God's peace guards the heart and mind in Christ."
      : "Filipenses 4 te invita a llevar la ansiedad delante de Dios con oración, gratitud y confianza. La promesa no es que todo problema desaparece de inmediato, sino que la paz de Dios guarda el corazón y la mente en Cristo.";
  }
  if (/perd[oó]n|forgiv/i.test(lower)) {
    return state.lang === "en"
      ? "Jesus teaches forgiveness as a response to the mercy we have received from God. Forgiving does not always mean pretending nothing happened; it means releasing revenge, seeking truth, and walking toward healing with wisdom."
      : "Jesús enseña el perdón como respuesta a la misericordia que hemos recibido de Dios. Perdonar no siempre significa fingir que nada pasó; significa soltar la venganza, buscar la verdad y caminar hacia sanidad con sabiduría.";
  }
  if (/orar|prayer|pray/i.test(lower)) {
    return state.lang === "en"
      ? "You can begin simply: Father, here I am. Teach me to listen, to trust You, and to take the next faithful step today. Then stay quiet for a moment and bring one specific need before Him."
      : "Puedes comenzar de forma sencilla: Padre, aquí estoy. Enséñame a escuchar, a confiar en Ti y a dar hoy el siguiente paso fiel. Luego guarda silencio un momento y presenta una necesidad concreta delante de Él.";
  }
  return state.lang === "en"
    ? "I can offer a brief, Bible-inspired reflection. Start by naming what you are carrying, then connect it to a passage, a prayer, and one concrete next step. For sensitive situations, seek pastoral or professional support."
    : "Puedo ofrecer una reflexión breve inspirada en principios bíblicos. Comienza nombrando lo que estás cargando, luego conéctalo con un pasaje, una oración y un paso concreto. En situaciones delicadas, busca apoyo pastoral o profesional.";
}

function assistantView() {
  const messages = assistantMessages.length
    ? assistantMessages
    : [{ role: "assistant", text: state.lang === "en" ? "Tell me what you are carrying today. We can look for a passage, shape a short prayer, or begin with one faithful next step." : "Cuéntame qué estás cargando hoy. Podemos buscar un pasaje, formar una oración breve o comenzar con un siguiente paso fiel." }];
  return `<section class="screen assistant-screen">
    <div class="hero"><p class="eyebrow">${state.lang === "en" ? "Biblical guidance" : "Orientación bíblica"}</p><h1>${t("assistantTitle")}</h1><span class="assistant-powered">${t("assistantPowered")}</span><p class="lede">${t("assistantIntro")}</p></div>
    <section class="assistant-suggestions">
      ${assistantSuggestions().map(item => `<button type="button" data-assistant-suggestion="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}
    </section>
    <section class="assistant-chat" id="assistant-chat">
      ${messages.map(message => `<article class="assistant-message ${message.role}"><span>${message.role === "user" ? (state.lang === "en" ? "You" : "Tú") : t("assistantTitle")}</span><p>${escapeHtml(message.text)}</p></article>`).join("")}
    </section>
    <form class="assistant-form" id="assistant-form">
      <input id="assistant-input" type="text" autocomplete="off" placeholder="${t("assistantPlaceholder")}" required>
      <button class="primary-button" type="submit">${t("assistantSend")}</button>
    </form>
    <section class="assistant-warning assistant-note-card"><p>${t("assistantWarning")}</p></section>
  </section>`;
}

function assistantPanelView() {
  const messages = assistantMessages.length
    ? assistantMessages
    : [{ role: "assistant", text: state.lang === "en" ? "Tell me what you are carrying today. We can look for a passage, shape a short prayer, or begin with one faithful next step." : "Cuéntame qué estás cargando hoy. Podemos buscar un pasaje, formar una oración breve o comenzar con un siguiente paso fiel." }];
  return `<div class="assistant-drawer-backdrop" data-assistant-close></div>
    <section class="assistant-drawer-panel" role="dialog" aria-modal="true" aria-label="${t("assistantTitle")}">
      <div class="assistant-drawer-head">
        <div><p class="eyebrow">${t("assistantPowered")}</p><h2>${t("assistantTitle")}</h2></div>
        <button class="icon-button" type="button" data-assistant-close aria-label="${state.lang === "en" ? "Close" : "Cerrar"}">×</button>
      </div>
      <div class="assistant-suggestions compact">
        ${assistantSuggestions().slice(0, 4).map(item => `<button type="button" data-assistant-panel-suggestion="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}
      </div>
      <section class="assistant-chat drawer-chat">
        ${messages.map(message => `<article class="assistant-message ${message.role}"><span>${message.role === "user" ? (state.lang === "en" ? "You" : "Tú") : t("assistantTitle")}</span><p>${escapeHtml(message.text)}</p></article>`).join("")}
      </section>
      <form class="assistant-form" id="assistant-panel-form">
        <input id="assistant-panel-input" type="text" autocomplete="off" placeholder="${t("assistantPlaceholder")}" required>
        <button class="primary-button" type="submit">${t("assistantSend")}</button>
      </form>
      <p class="assistant-warning-mini">${t("assistantWarning")}</p>
    </section>`;
}

function render() {
  if (["subscription/quiz", "subscription-quiz", "subscription/result", "subscription-result"].includes(route)) {
    route = "subscription";
    history.replaceState({ route }, "", "#subscription");
  }
  if (route === "subscribe") route = "subscription";
  const views = { onboarding: onboardingView, home: homeView, category: categoryView, moment: momentView, devotional: devotionalView, journey: journeyView, stories: storiesView, story: storyReaderView, prayer: prayerView, sleep: sleepView, bible: bibleView, overview: overviewView, wisdom: wisdomView, resources: resourcesView, journal: journalView, profile: profileView, settings: profileView, subscription: subscriptionView, subscribe: subscriptionView, "subscription/trial": subscriptionTrialView, "subscription-trial": subscriptionTrialView, assistant: assistantView, login: loginView };
  const publicRoutes = ["login", "onboarding", "subscription", "subscribe", "subscription/trial", "subscription-trial"];
  if (authConfigured && state.onboarded && (authInitializing || accessChecking) && !publicRoutes.includes(route)) {
    document.getElementById("app-main").innerHTML = `<section class="screen auth-shell"><div class="card auth-card"><p class="eyebrow">${t("account")}</p><h1>${t("accessChecking")}</h1><p class="muted">${state.lang === "en" ? "One moment while we confirm your session and access." : "Un momento mientras confirmamos tu sesión y tu acceso."}</p></div></section>`;
    document.getElementById("back-button").hidden = true;
    document.getElementById("bottom-nav").hidden = true;
    document.getElementById("assistant-fab").hidden = true;
    document.getElementById("assistant-drawer").hidden = true;
    setLanguage();
    setTheme();
    return;
  }
  if (!state.onboarded && route !== "login") {
    route = "onboarding";
    if (location.hash !== "#onboarding") history.replaceState({ route }, "", "#onboarding");
  }
  if (authConfigured && !authInitializing && state.onboarded && !currentUser && !publicRoutes.includes(route)) {
    route = "login";
    if (location.hash !== "#login") history.replaceState({ route }, "", "#login");
  }
  if (authConfigured && !authInitializing && currentUser && !accessChecking && !userAccess.allowed && !publicRoutes.includes(route)) {
    route = "subscription";
    if (location.hash !== "#subscribe") history.replaceState({ route }, "", "#subscribe");
  }
  if (!views[route]) route = "home";
  document.getElementById("app-main").innerHTML = views[route]();
  const subRoute = !["onboarding", "home", "login"].includes(route);
  document.getElementById("back-button").hidden = !subRoute;
  document.getElementById("bottom-nav").hidden = route === "login" || route === "onboarding" || route === "subscription";
  const showAssistantFab = state.onboarded && !["login", "onboarding", "assistant", "subscription"].includes(route);
  const assistantFab = document.getElementById("assistant-fab");
  const assistantDrawer = document.getElementById("assistant-drawer");
  if (assistantFab) {
    assistantFab.hidden = !showAssistantFab;
    assistantFab.classList.toggle("has-thread", assistantMessages.length > 0);
  }
  if (assistantDrawer) {
    assistantDrawer.hidden = !assistantPanelOpen;
    assistantDrawer.innerHTML = assistantPanelOpen ? assistantPanelView() : "";
  }
  document.querySelectorAll(".bottom-nav button").forEach(button => button.classList.toggle("active", button.dataset.route === route));
  setLanguage(); setTheme(); bindViewEvents();
  if (route === "moment") hydrateMomentView();
  if (route === "wisdom") hydrateWisdomView();
  if (route === "sleep") hydrateSleepView();
  if (route === "prayer") hydratePrayerView();
  if (scrollTargetAfterRender) {
    document.getElementById(scrollTargetAfterRender)?.scrollIntoView({ behavior: "smooth", block: "start" });
    scrollTargetAfterRender = null;
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

function navigate(next) {
  if (next === route) return;
  stopNarration();
  if (next === "devotional") activeDay = todayIndex();
  previousRoute = route;
  route = next;
  history.pushState({ route }, "", `#${route}`);
  render();
}

function toast(message) {
  const node = document.getElementById("toast");
  node.textContent = message; node.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => node.classList.remove("show"), 2200);
}

function reportSyncError(error) {
  console.error("Yeshua sync error", error);
  toast(t("syncError"));
}

function resizeProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Invalid profile image"));
      image.onload = () => {
        const size = 512;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const scale = Math.max(size / image.width, size / image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        canvas.width = size;
        canvas.height = size;
        context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function syncPreferences() {
  if (currentUser) saveProfile(currentUser.id, state).catch(reportSyncError);
}

function bindViewEvents() {
  const assistantFab = document.getElementById("assistant-fab");
  if (assistantFab) assistantFab.onclick = () => { assistantPanelOpen = true; render(); };
  document.querySelectorAll("[data-assistant-open]").forEach(button => button.addEventListener("click", () => {
    assistantPanelOpen = true;
    render();
  }));
  document.querySelectorAll("[data-toggle-collections]").forEach(button => button.addEventListener("click", () => {
    showAllCollections = !showAllCollections;
    scrollTargetAfterRender = "featured-collections";
    render();
  }));
  document.querySelectorAll("[data-assistant-close]").forEach(button => button.addEventListener("click", () => {
    assistantPanelOpen = false;
    render();
  }));
  document.querySelectorAll("[data-assistant-panel-suggestion]").forEach(button => button.addEventListener("click", () => {
    const text = button.dataset.assistantPanelSuggestion;
    assistantMessages.push({ role: "user", text }, { role: "assistant", text: assistantLocalReply(text) });
    render();
  }));
  document.getElementById("assistant-panel-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const input = document.getElementById("assistant-panel-input");
    const text = input.value.trim();
    if (!text) return;
    assistantMessages.push({ role: "user", text }, { role: "assistant", text: assistantLocalReply(text) });
    render();
  });
  document.querySelectorAll("[data-moment-open]").forEach(button => button.addEventListener("click", () => {
    activeMoment = button.dataset.momentOpen;
    previousRoute = route;
    route = "moment";
    history.pushState({ route }, "", "#moment");
    render();
  }));
  document.querySelectorAll("[data-moment-index]").forEach(button => button.addEventListener("click", () => {
    activeMoment = null;
    previousRoute = route;
    route = "moment";
    history.pushState({ route }, "", "#moment");
    render();
  }));
  document.querySelectorAll("[data-category-open]").forEach(button => button.addEventListener("click", () => {
    activeCategory = button.dataset.categoryOpen;
    navigate("category");
  }));
  document.querySelectorAll("[data-route]").forEach(button => button.addEventListener("click", () => {
    if (button.dataset.route === "moment") activeMoment = null;
    if (button.dataset.route === "overview") activeOverviewBook = null;
    if (button.dataset.route === "stories") activeStory = null;
    if (button.dataset.homeJourney) {
      state.activeJourney = button.dataset.homeJourney;
      activeDay = journeyTodayIndex(state.activeJourney);
      saveState();
    }
    if (button.dataset.homeBook) {
      state.lastBible = { book: button.dataset.homeBook, chapter: Number(button.dataset.homeChapter || 1) };
      saveState();
    }
    navigate(button.dataset.route);
  }));
  document.querySelectorAll("[data-overview-book]").forEach(button => button.addEventListener("click", () => {
    activeOverviewBook = button.dataset.overviewBook;
    activeOverviewStage = null;
    route = "overview";
    history.pushState({ route }, "", "#overview");
    render();
  }));
  document.querySelector("[data-overview-back]")?.addEventListener("click", () => {
    activeOverviewBook = null;
    activeOverviewStage = null;
    render();
  });
  document.querySelectorAll("[data-overview-stage]").forEach(button => button.addEventListener("click", () => {
    activeOverviewStage = Number(button.dataset.overviewStage);
    render();
  }));
  document.querySelectorAll("[data-overview-stage-close]").forEach(button => button.addEventListener("click", () => {
    activeOverviewStage = null;
    render();
  }));
  document.querySelectorAll("[data-overview-scroll]").forEach(button => button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.overviewScroll);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  document.querySelector("[data-overview-complete]")?.addEventListener("click", button => {
    const id = button.currentTarget.dataset.overviewComplete;
    state.overviewProgress = state.overviewProgress.includes(id)
      ? state.overviewProgress.filter(item => item !== id)
      : [...state.overviewProgress, id];
    saveState();
    render();
  });
  document.querySelectorAll("[data-interest-toggle]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.interestToggle;
    state.interests = state.interests.includes(id)
      ? state.interests.filter(item => item !== id)
      : [...state.interests, id];
    if (!state.interests.length) state.interests = ["bible"];
    saveState();
    render();
  }));
  document.querySelectorAll("[data-quiz-option]").forEach(button => button.addEventListener("click", () => {
    const steps = subscriptionQuizSteps();
    const step = steps[Math.min(subscriptionQuizIndex, steps.length - 1)];
    const option = button.dataset.quizOption;
    if (!state.subscriptionQuiz) state.subscriptionQuiz = {};
    if (step.type === "multi") {
      const current = Array.isArray(state.subscriptionQuiz[step.id]) ? state.subscriptionQuiz[step.id] : [];
      state.subscriptionQuiz[step.id] = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
    } else {
      state.subscriptionQuiz[step.id] = option;
    }
    saveState();
    render();
  }));
  document.querySelector("[data-quiz-next]")?.addEventListener("click", () => {
    const steps = subscriptionQuizSteps();
    const step = steps[Math.min(subscriptionQuizIndex, steps.length - 1)];
    if (!hasQuizAnswer(step)) return;
    if (subscriptionQuizIndex >= steps.length - 1) {
      saveSubscriptionResult();
      subscriptionQuizIndex = 0;
      navigate("subscription-result");
      return;
    }
    subscriptionQuizIndex += 1;
    render();
  });
  document.querySelector("[data-quiz-back]")?.addEventListener("click", () => {
    if (subscriptionQuizIndex > 0) {
      subscriptionQuizIndex -= 1;
      render();
    } else {
      navigate("subscription");
    }
  });
  document.getElementById("start-trial-button")?.addEventListener("click", handleStartTrial);
  document.getElementById("start-trial-button-bottom")?.addEventListener("click", handleStartTrial);
  document.getElementById("subscribe-button")?.addEventListener("click", () => {
    if (!currentUser) {
      navigate("login");
      return;
    }
    accessChecking = true;
    render();
    getUserAccess(currentUser).then(access => {
      userAccess = access;
      if (access.allowed) {
        toast(state.lang === "en" ? "Access confirmed." : "Acceso confirmado.");
        route = "home";
        history.replaceState({ route }, "", "#home");
      } else {
        toast(state.lang === "en" ? "We have not found active access for this account yet." : "Aún no encontramos acceso activo para esta cuenta.");
      }
    }).catch(error => {
      toast(authErrorMessage(error));
    }).finally(() => {
      accessChecking = false;
      render();
    });
  });
  document.querySelectorAll("[data-soon]").forEach(button => button.addEventListener("click", () => toast(t("comingSoon"))));
  document.querySelectorAll("[data-favorite-id]").forEach(button => button.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    const id = button.dataset.favoriteId;
    state.favorites = isFavorite(id) ? state.favorites.filter(item => item !== id) : [...state.favorites, id];
    saveState();
    syncPreferences();
    toast(isFavorite(id) ? t("saved") : t("removed"));
    render();
  }));
  document.querySelectorAll("[data-journey-select]").forEach(button => button.addEventListener("click", () => {
    state.activeJourney = button.dataset.journeySelect;
    activeDay = journeyTodayIndex(state.activeJourney);
    scrollTargetAfterRender = "active-journey-card";
    saveState();
    render();
  }));
  document.querySelectorAll("[data-story-open]").forEach(button => button.addEventListener("click", () => {
    const storyIndex = Number(button.dataset.storyOpen) || 0;
    activeStory = storyIndex;
    if (storyProgressStatus(storyIndex) === "new") setStoryProgress(storyIndex, "started");
    if (route === "story") render();
    else navigate("story");
  }));
  document.querySelectorAll("[data-story-read]").forEach(button => button.addEventListener("click", () => {
    if (activeStory === null) return;
    document.getElementById("story-reader-narration")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  document.querySelectorAll("[data-story-complete]").forEach(button => button.addEventListener("click", () => {
    const storyIndex = Number(button.dataset.storyComplete) || 0;
    setStoryProgress(storyIndex, "read");
    toast(state.lang === "en" ? "Story marked as read" : "Historia marcada como leída");
    render();
  }));
  document.querySelectorAll("[data-story-share]").forEach(button => button.addEventListener("click", async () => {
    const index = Number(button.dataset.storyShare) || 0;
    const story = jesusStories[index] || jesusStories[0];
    const title = localized(story.title);
    const text = `${title} · ${localized(story.ref)}`;
    const url = `${location.origin}${location.pathname}${location.search}#stories`;
    try {
      if (navigator.share) await navigator.share({ title: `Yeshua - ${title}`, text, url });
      else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        toast(t("copied"));
      }
    } catch (error) {
      if (error?.name !== "AbortError") toast(t("copied"));
    }
  }));
  document.querySelectorAll("[data-reset-journey]").forEach(button => button.addEventListener("click", () => {
    setCompletedFor(button.dataset.resetJourney, []);
    activeDay = 0;
    saveState();
    render();
  }));
  document.querySelectorAll("[data-day-open]").forEach(button => button.addEventListener("click", () => { previousRoute = "journey"; activeDay = Number(button.dataset.dayOpen); route = "devotional"; history.pushState({ route }, "", "#devotional"); render(); }));
  document.getElementById("complete-day")?.addEventListener("click", event => {
    const journeyId = currentJourneyId();
    const index = Number(event.currentTarget.dataset.day);
    const completed = completedFor(journeyId);
    if (!completed.includes(index)) setCompletedFor(journeyId, [...completed, index]);
    saveState();
    if (currentUser) saveCompletedDay(currentUser.id, journeyId, index).catch(reportSyncError);
    toast(t("done"));
    render();
  });
  document.getElementById("bible-form")?.addEventListener("submit", event => { event.preventDefault(); const book = document.getElementById("bible-book").value; const chapter = document.getElementById("bible-chapter").value; renderChapter(book, chapter); });
  document.getElementById("bible-book")?.addEventListener("change", event => renderChapter(event.target.value, 1));
  document.getElementById("journal-entry")?.addEventListener("input", event => { event.target.parentElement.querySelector(".field-hint").textContent = `${event.target.value.length} / 3000`; });
  document.getElementById("journal-form")?.addEventListener("submit", event => { event.preventDefault(); const text = document.getElementById("journal-entry").value.trim(); if (!text) return; const item = { id: crypto.randomUUID(), category: document.getElementById("journal-category").value, text, created: new Date().toISOString() }; state.journal.unshift(item); saveState(); if (currentUser) saveJournalEntry(currentUser.id, item).catch(reportSyncError); toast(t("saved")); render(); });
  document.querySelectorAll("[data-assistant-suggestion]").forEach(button => button.addEventListener("click", () => {
    const text = button.dataset.assistantSuggestion;
    assistantMessages.push({ role: "user", text }, { role: "assistant", text: assistantLocalReply(text) });
    render();
  }));
  document.getElementById("assistant-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const input = document.getElementById("assistant-input");
    const text = input.value.trim();
    if (!text) return;
    assistantMessages.push({ role: "user", text }, { role: "assistant", text: assistantLocalReply(text) });
    render();
  });
  document.querySelectorAll("[data-auth-mode]").forEach(button => button.addEventListener("click", () => {
    authMode = button.dataset.authMode || "login";
    render();
  }));
  document.getElementById("password-login-form")?.addEventListener("submit", handlePasswordLogin);
  document.getElementById("register-form")?.addEventListener("submit", handleRegister);
  document.getElementById("magic-link-form")?.addEventListener("submit", requestMagicLink);
  document.getElementById("google-auth-button")?.addEventListener("click", handleGoogleAuth);
  document.getElementById("forgot-password-button")?.addEventListener("click", handlePasswordReset);
  document.getElementById("change-password-form")?.addEventListener("submit", handleChangePassword);
  document.getElementById("onboarding-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    state.goals = [...form.querySelectorAll('input[name="goals"]:checked')].map(input => input.value);
    state.rhythm = form.querySelector('input[name="rhythm"]:checked')?.value || "flexible";
    state.onboarded = true;
    saveState();
    syncPreferences();
    toast(t("onboardingSaved"));
    navigate(currentUser ? "home" : "login");
  });
  document.querySelectorAll("[data-delete-entry]").forEach(button => button.addEventListener("click", () => { const id = button.dataset.deleteEntry; state.journal = state.journal.filter(item => item.id !== id); saveState(); if (currentUser) deleteCloudJournalEntry(currentUser.id, id).catch(reportSyncError); toast(t("removed")); render(); }));
  document.querySelectorAll("[data-set-lang]").forEach(button => button.addEventListener("click", () => { state.lang = button.dataset.setLang; saveState(); syncPreferences(); render(); }));
  document.querySelectorAll("[data-set-theme]").forEach(button => button.addEventListener("click", () => { state.theme = button.dataset.setTheme; saveState(); syncPreferences(); render(); }));
  document.getElementById("restart-onboarding")?.addEventListener("click", () => {
    state.onboarded = false;
    saveState();
    navigate("onboarding");
  });
  document.getElementById("sign-out-button")?.addEventListener("click", async () => { try { await signOutUser(); currentUser = null; state.guest = true; saveState(); toast(t("signedOut")); render(); } catch (error) { reportSyncError(error); } });
  document.getElementById("change-profile-photo")?.addEventListener("click", () => document.getElementById("profile-photo-input")?.click());
  document.getElementById("profile-photo-input")?.addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      state.profilePhoto = await resizeProfilePhoto(file);
      saveState();
      syncPreferences();
      toast(t("photoSaved"));
      render();
    } catch (error) {
      reportSyncError(error);
    }
  });
  document.getElementById("remove-profile-photo")?.addEventListener("click", () => {
    state.profilePhoto = "";
    saveState();
    syncPreferences();
    toast(t("removed"));
    render();
  });
  document.getElementById("install-button")?.addEventListener("click", async () => { installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; render(); });
  if (route === "bible") renderChapter(document.getElementById("bible-book").value, document.getElementById("bible-chapter").value);
}

function setFormLoading(form, loading) {
  form.querySelectorAll("button, input").forEach(control => { control.disabled = loading; });
}

async function handlePasswordLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.querySelector("#login-email")?.value.trim() || "";
  const password = form.querySelector("#login-password")?.value || "";
  const validation = validateEmailPassword({ email, password });
  if (validation) {
    toast(validation);
    return;
  }
  setFormLoading(form, true);
  try {
    await signInWithPassword(email, password);
    toast(t("signedIn"));
  } catch (error) {
    toast(authErrorMessage(error));
  } finally {
    setFormLoading(form, false);
  }
}

async function handleRegister(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.querySelector("#register-name")?.value.trim() || "";
  const email = form.querySelector("#register-email")?.value.trim() || "";
  const password = form.querySelector("#register-password")?.value || "";
  const confirmPassword = form.querySelector("#register-confirm")?.value || "";
  const validation = validateEmailPassword({ email, password, confirmPassword, name, requireName: true, requireConfirm: true });
  if (validation) {
    toast(validation);
    return;
  }
  setFormLoading(form, true);
  try {
    const result = await signUpWithPassword({ name, email, password });
    if (result.session?.user) {
      toast(t("signedIn"));
    } else {
      toast(t("accountCreatedEmail"));
      authMode = "login";
      render();
    }
  } catch (error) {
    toast(authErrorMessage(error));
  } finally {
    setFormLoading(form, false);
  }
}

async function handleGoogleAuth(event) {
  const button = event.currentTarget;
  button.disabled = true;
  try {
    await signInWithGoogle();
  } catch (error) {
    button.disabled = false;
    toast(authErrorMessage(error));
  }
}

async function requestMagicLink(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.querySelector('input[type="email"]')?.value.trim() || "";
  if (!isValidEmail(email)) {
    toast(state.lang === "en" ? "Write a valid email." : "Escribe un correo válido.");
    return;
  }
  setFormLoading(form, true);
  try {
    await sendMagicLink(email);
    toast(t("linkSent"));
    form.reset();
  } catch (error) {
    const rateLimited = error?.status === 429 || /rate limit/i.test(error?.message || "");
    toast(t(rateLimited ? "authRateLimit" : "authError"));
  } finally {
    setFormLoading(form, false);
  }
}

async function handlePasswordReset() {
  const email = document.querySelector("#login-email, #magic-email, #register-email")?.value.trim() || "";
  if (!isValidEmail(email)) {
    toast(state.lang === "en" ? "Write your email first." : "Escribe primero tu correo.");
    return;
  }
  try {
    await resetPasswordForEmail(email);
    toast(t("resetSent"));
  } catch (error) {
    toast(authErrorMessage(error));
  }
}

async function handleChangePassword(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const password = form.querySelector("#new-password")?.value || "";
  const confirmPassword = form.querySelector("#new-password-confirm")?.value || "";
  const validation = validateEmailPassword({ email: currentUser?.email || "user@example.com", password, confirmPassword, requireConfirm: true });
  if (validation) {
    toast(validation);
    return;
  }
  setFormLoading(form, true);
  try {
    await updateCurrentUserPassword(password);
    form.reset();
    toast(t("passwordChanged"));
  } catch (error) {
    toast(authErrorMessage(error));
  } finally {
    setFormLoading(form, false);
  }
}

async function handleStartTrial() {
  if (!currentUser) {
    authMode = "register";
    navigate("login");
    return;
  }
  accessChecking = true;
  render();
  try {
    userAccess = await startFreeTrial(currentUser);
    if (userAccess.allowed) {
      toast(state.lang === "en" ? "Trial activated" : "Prueba activada");
      route = "home";
      history.replaceState({ route }, "", "#home");
    } else {
      toast(t("accessNeeded"));
    }
  } catch (error) {
    toast(authErrorMessage(error));
  } finally {
    accessChecking = false;
    render();
  }
}

document.addEventListener("click", event => { const button = event.target.closest("[data-route]"); if (button && !document.getElementById("app-main").contains(button)) navigate(button.dataset.route); });
document.addEventListener("click", event => {
  const listenButton = event.target.closest("[data-listen]");
  if (listenButton) {
    if (listenButton.dataset.listen === "devotional") {
      const blocks = [...document.querySelectorAll("[data-read-block]")].map(element => ({ text: element.dataset.readText || element.textContent, element }));
      speakSegments(blocks);
    }
    if (listenButton.dataset.listen === "bible") {
      const titleNode = document.querySelector("#bible-result article .eyebrow");
      const title = titleNode?.dataset.readTitle || titleNode?.textContent?.split("·")[0]?.trim() || "";
      const verses = [...document.querySelectorAll("#bible-result article .scripture p")].map(element => ({ text: element.dataset.readText || element.textContent, element }));
      speakSegments([{ text: title }, ...verses]);
    }
    if (listenButton.dataset.listen === "story") {
      const title = document.querySelector(".story-reader-screen [data-read-title]")?.dataset.readTitle || "";
      const blocks = [...document.querySelectorAll(".story-reader-screen [data-read-block]")].map(element => ({ text: element.dataset.readText || element.textContent, element }));
      if (title) blocks.unshift({ text: title });
      speakSegments(blocks);
    }
    if (listenButton.dataset.listen === "wisdom") {
      const title = document.querySelector("[data-read-title]")?.dataset.readTitle || "";
      const blocks = [...document.querySelectorAll("#wisdom-root [data-read-block]")].map(element => ({ text: element.dataset.readText || element.textContent, element }));
      speakSegments([{ text: title }, ...blocks]);
    }
    if (listenButton.dataset.listen === "sleep" || listenButton.dataset.listen === "prayer") {
      const scope = listenButton.dataset.listen === "sleep" ? "#night-root" : "#prayer-root";
      const title = document.querySelector(`${scope} [data-read-title]`)?.dataset.readTitle || "";
      const blocks = [...document.querySelectorAll(`${scope} [data-read-block]`)].map(element => ({ text: element.dataset.readText || element.textContent, element }));
      speakSegments([{ text: title }, ...blocks]);
    }
  }
  if (event.target.closest("[data-audio-pause]")) toggleNarrationPause();
  if (event.target.closest("[data-audio-stop]")) stopNarration();
});
document.getElementById("back-button").addEventListener("click", () => navigate(previousRoute || "home"));
document.getElementById("language-button").addEventListener("click", () => { state.lang = state.lang === "es" ? "en" : "es"; saveState(); syncPreferences(); render(); });
document.getElementById("theme-button").addEventListener("click", () => { const actual = document.documentElement.dataset.theme; state.theme = actual === "dark" ? "light" : "dark"; saveState(); syncPreferences(); render(); });
addEventListener("popstate", () => { route = location.hash.slice(1) || "home"; render(); });
addEventListener("beforeinstallprompt", event => { event.preventDefault(); installPrompt = event; if (route === "profile") render(); });
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { if (state.theme === "system") setTheme(); });

async function applyAuthenticatedUser(user) {
  if (!user) {
    currentUser = null;
    userAccess = { allowed: false, record: null, reason: "no_user" };
    accessChecking = false;
    state.guest = true;
    saveState();
    render();
    return;
  }

  currentUser = user;
  accessChecking = true;
  render();
  try {
    userAccess = await getUserAccess(user);
  } catch (error) {
    userAccess = { allowed: false, record: null, reason: "error" };
    reportSyncError(error);
  } finally {
    accessChecking = false;
  }

  if (!userAccess.allowed) {
    route = "subscription";
    history.replaceState({ route }, "", "#subscribe");
    render();
    return;
  }

  try {
    state = await migrateAndMergeState(user, state);
    saveState();
  } catch (error) {
    state.guest = false;
    saveState();
    reportSyncError(error);
  }
  route = "home";
  history.replaceState({ route }, "", "#home");
  render();
}

async function connectAuthentication() {
  if (!authConfigured || location.protocol === "file:") {
    authInitializing = false;
    render();
    return;
  }
  try {
    const result = await initializeSupabase(applyAuthenticatedUser);
    authConfigured = result.configured;
    schemaReady = await verifyDatabaseSchema();
    authInitializing = false;
    if (result.user) await applyAuthenticatedUser(result.user);
    else render();
  } catch (error) {
    authInitializing = false;
    authConfigured = false;
    console.error("Supabase initialization failed", error);
    render();
  }
}

if ("serviceWorker" in navigator) {
  addEventListener("load", async () => {
    const isLocalDevelopment = ["localhost", "127.0.0.1"].includes(location.hostname);
    if (isLocalDevelopment) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(registration => registration.unregister()));
      return;
    }
    navigator.serviceWorker.register("service-worker.js");
  });
}
render();
connectAuthentication();




