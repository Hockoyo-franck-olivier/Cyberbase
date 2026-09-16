/* =========================================================
   CYBERBASE — script.js
   Toute la logique : navigation, quiz, progression (localStorage),
   gamification, révisions, certificat. Aucune dépendance externe.
   ========================================================= */

/* ---------------------------------------------------------
   1. BANQUE DE QUESTIONS (5 séries × 10 questions)
   --------------------------------------------------------- */
const QUESTION_BANK = {
  serie1: [
    { id: "s1q1", question: "Qu'est-ce que la cybersécurité ?", options: ["L'ensemble des pratiques visant à protéger les systèmes, réseaux et données contre les attaques numériques", "Un logiciel antivirus uniquement", "Une méthode de sauvegarde de fichiers", "Un protocole réseau"], answer: 0, explanation: "La cybersécurité englobe toutes les mesures techniques, organisationnelles et humaines destinées à protéger les systèmes d'information contre les menaces numériques." },
    { id: "s1q2", question: "Qu'est-ce que le principe de confidentialité en sécurité de l'information ?", options: ["Garantir que seules les personnes autorisées peuvent accéder à une information", "Garantir que les données ne sont jamais modifiées", "Garantir que le système est toujours disponible", "Garantir la vitesse de transmission des données"], answer: 0, explanation: "La confidentialité vise à empêcher l'accès aux informations par des personnes non autorisées." },
    { id: "s1q3", question: "Que signifie le principe d'intégrité des données ?", options: ["Les données restent exactes et non altérées de façon non autorisée", "Les données sont accessibles à tout moment", "Les données sont chiffrées", "Les données sont sauvegardées"], answer: 0, explanation: "L'intégrité garantit que les données n'ont pas été modifiées ou corrompues sans autorisation." },
    { id: "s1q4", question: "Que garantit le principe de disponibilité ?", options: ["Que les systèmes et données sont accessibles aux utilisateurs autorisés quand ils en ont besoin", "Que les données sont secrètes", "Que les mots de passe sont complexes", "Que le réseau est chiffré"], answer: 0, explanation: "La disponibilité assure un accès continu aux ressources pour les utilisateurs légitimes." },
    { id: "s1q5", question: "Qu'est-ce qu'une menace en cybersécurité ?", options: ["Un événement ou une action potentielle pouvant causer un dommage à un système", "Une faille dans un logiciel", "Un antivirus", "Un pare-feu"], answer: 0, explanation: "Une menace est un danger potentiel capable d'exploiter une vulnérabilité pour nuire à un système." },
    { id: "s1q6", question: "Qu'est-ce qu'une vulnérabilité ?", options: ["Une faiblesse dans un système pouvant être exploitée par une menace", "Un type de virus", "Un pare-feu mal configuré uniquement", "Une attaque réussie"], answer: 0, explanation: "Une vulnérabilité est une faille ou faiblesse qui peut être exploitée pour compromettre la sécurité d'un système." },
    { id: "s1q7", question: "Comment définit-on le risque en cybersécurité ?", options: ["La probabilité qu'une menace exploite une vulnérabilité et cause un impact", "Un logiciel malveillant", "Un mot de passe faible", "Une sauvegarde de données"], answer: 0, explanation: "Le risque combine la probabilité d'occurrence d'une menace et l'impact qu'elle aurait si elle se réalisait." },
    { id: "s1q8", question: "Qu'est-ce qu'une donnée sensible ?", options: ["Une information dont la divulgation, l'altération ou la perte peut causer un préjudice important", "N'importe quelle donnée stockée sur un ordinateur", "Un fichier temporaire", "Une image publique"], answer: 0, explanation: "Les données sensibles (santé, finances, identité) nécessitent une protection renforcée en raison des conséquences graves en cas de compromission." },
    { id: "s1q9", question: "Qu'est-ce qu'une attaque informatique ?", options: ["Une tentative malveillante d'exploiter une vulnérabilité pour compromettre un système", "Une mise à jour logicielle", "Une sauvegarde automatique", "Un test de performance réseau"], answer: 0, explanation: "Une attaque informatique est une action délibérée visant à compromettre la confidentialité, l'intégrité ou la disponibilité d'un système." },
    { id: "s1q10", question: "Parmi les propositions suivantes, laquelle NE décrit PAS un type d'attaquant courant ?", options: ["Hacktiviste", "Script kiddie", "Administrateur système effectuant une maintenance planifiée et autorisée", "Cybercriminel organisé"], answer: 2, explanation: "Un administrateur effectuant une maintenance autorisée n'est pas un attaquant ; hacktivistes, script kiddies et cybercriminels sont des catégories reconnues d'attaquants." }
  ],
  serie2: [
    { id: "s2q1", question: "Qu'est-ce qu'un réseau informatique ?", options: ["Un ensemble d'équipements interconnectés capables d'échanger des données", "Un logiciel de sécurité", "Un type de virus", "Une base de données"], answer: 0, explanation: "Un réseau informatique relie plusieurs appareils entre eux afin de permettre le partage de ressources et de données." },
    { id: "s2q2", question: "Que signifie PAN ?", options: ["Personal Area Network, un réseau à très courte portée (ex : Bluetooth)", "Public Access Node", "Protected Application Network", "Private Area Node"], answer: 0, explanation: "Le PAN (Personal Area Network) couvre une zone très restreinte, typiquement autour d'une personne, sur quelques mètres." },
    { id: "s2q3", question: "Que désigne un LAN ?", options: ["Un réseau local couvrant une zone limitée comme un bâtiment ou un bureau", "Un réseau mondial", "Un réseau satellite", "Un réseau téléphonique"], answer: 0, explanation: "Le LAN (Local Area Network) connecte des appareils dans une zone géographique restreinte, comme une maison ou une entreprise." },
    { id: "s2q4", question: "Que représente un MAN ?", options: ["Un réseau couvrant une zone métropolitaine, comme une ville", "Un réseau personnel", "Un réseau mondial", "Un réseau satellite uniquement"], answer: 0, explanation: "Le MAN (Metropolitan Area Network) relie plusieurs LAN à l'échelle d'une ville." },
    { id: "s2q5", question: "Qu'est-ce qu'un WAN ?", options: ["Un réseau étendu couvrant de grandes distances géographiques, comme Internet", "Un réseau limité à une pièce", "Un réseau Bluetooth", "Un réseau local d'entreprise uniquement"], answer: 0, explanation: "Le WAN (Wide Area Network) couvre de vastes zones géographiques, Internet en étant l'exemple le plus connu." },
    { id: "s2q6", question: "À quoi sert une adresse IP ?", options: ["À identifier de manière unique un appareil sur un réseau", "À chiffrer les données", "À stocker des mots de passe", "À accélérer la connexion"], answer: 0, explanation: "L'adresse IP est un identifiant numérique unique attribué à chaque appareil connecté à un réseau utilisant le protocole Internet." },
    { id: "s2q7", question: "Qu'est-ce qu'une adresse MAC ?", options: ["Un identifiant physique unique attribué à une carte réseau par le fabricant", "Une adresse email", "Un mot de passe réseau", "Une adresse IP publique"], answer: 0, explanation: "L'adresse MAC (Media Access Control) est gravée dans la carte réseau et permet d'identifier physiquement un équipement." },
    { id: "s2q8", question: "Quel est le rôle principal d'un routeur ?", options: ["Diriger les paquets de données entre différents réseaux", "Stocker des fichiers", "Chiffrer les emails", "Scanner les virus"], answer: 0, explanation: "Le routeur achemine les paquets de données entre réseaux différents en déterminant le meilleur chemin." },
    { id: "s2q9", question: "Quel est le rôle d'un switch (commutateur) ?", options: ["Relier plusieurs appareils au sein d'un même réseau local et diriger le trafic entre eux", "Connecter deux réseaux différents", "Chiffrer les communications", "Filtrer les emails indésirables"], answer: 0, explanation: "Le switch interconnecte les appareils d'un même réseau local en aiguillant les trames vers le bon destinataire." },
    { id: "s2q10", question: "Quelle est la principale différence entre TCP et UDP ?", options: ["TCP est fiable et orienté connexion, UDP est plus rapide mais sans garantie de livraison", "TCP est plus lent et UDP est toujours plus sécurisé", "Les deux sont identiques", "UDP chiffre les données, pas TCP"], answer: 0, explanation: "TCP établit une connexion et garantit la livraison ordonnée des données, tandis qu'UDP privilégie la rapidité sans garantie de fiabilité." }
  ],
  serie3: [
    { id: "s3q1", question: "Qu'est-ce que le phishing (hameçonnage) ?", options: ["Une technique frauduleuse visant à tromper une victime pour obtenir des informations sensibles", "Un type de pare-feu", "Un protocole de chiffrement", "Une mise à jour système"], answer: 0, explanation: "Le phishing utilise de faux messages ou sites pour inciter la victime à révéler des informations confidentielles." },
    { id: "s3q2", question: "Qu'est-ce qu'un malware ?", options: ["Un logiciel malveillant conçu pour endommager ou infiltrer un système", "Un antivirus", "Un pare-feu", "Un protocole réseau"], answer: 0, explanation: "Le terme malware désigne tout logiciel conçu pour nuire à un système informatique." },
    { id: "s3q3", question: "Comment se caractérise un virus informatique ?", options: ["Il s'attache à un programme hôte et se propage lorsque ce programme est exécuté", "Il se propage sans aucune intervention humaine", "Il chiffre uniquement les fichiers", "Il ne peut infecter qu'un seul type de fichier"], answer: 0, explanation: "Un virus nécessite un fichier hôte et une action de l'utilisateur (comme l'exécution du programme) pour se propager." },
    { id: "s3q4", question: "Qu'est-ce qui distingue un ver (worm) d'un virus ?", options: ["Le ver se propage de façon autonome sur un réseau sans nécessiter de programme hôte", "Le ver a besoin d'un programme hôte pour se propager", "Le ver ne peut pas se propager sur un réseau", "Le ver est identique à un virus"], answer: 0, explanation: "Contrairement au virus, le ver se réplique et se propage automatiquement à travers un réseau sans intervention humaine." },
    { id: "s3q5", question: "Qu'est-ce qu'un cheval de Troie ?", options: ["Un programme malveillant déguisé en logiciel légitime", "Un type de pare-feu", "Un protocole de sécurité réseau", "Une méthode de sauvegarde"], answer: 0, explanation: "Le cheval de Troie se fait passer pour un logiciel inoffensif afin de tromper l'utilisateur et infiltrer le système." },
    { id: "s3q6", question: "Que fait un ransomware ?", options: ["Il chiffre les données de la victime et exige une rançon pour les déverrouiller", "Il vole uniquement des mots de passe", "Il surveille le trafic réseau", "Il améliore les performances du système"], answer: 0, explanation: "Un ransomware rend les données inaccessibles (souvent par chiffrement) et demande une rançon pour leur restitution." },
    { id: "s3q7", question: "Que fait un logiciel espion (spyware) ?", options: ["Il collecte secrètement des informations sur l'utilisateur à son insu", "Il protège les données personnelles", "Il bloque les publicités", "Il chiffre les communications"], answer: 0, explanation: "Le spyware surveille et transmet discrètement des informations sur l'activité de l'utilisateur sans son consentement." },
    { id: "s3q8", question: "En quoi consiste une attaque par force brute ?", options: ["Tester systématiquement toutes les combinaisons possibles pour deviner un mot de passe", "Intercepter le trafic réseau", "Envoyer un email frauduleux", "Exploiter une faille logicielle connue"], answer: 0, explanation: "L'attaque par force brute essaie toutes les combinaisons possibles jusqu'à trouver le bon mot de passe ou la bonne clé." },
    { id: "s3q9", question: "Qu'est-ce qu'une attaque DDoS ?", options: ["Une attaque visant à rendre un service indisponible en le submergeant de requêtes", "Une attaque visant à voler des données", "Une technique de chiffrement", "Un type de sauvegarde"], answer: 0, explanation: "Le déni de service distribué (DDoS) surcharge un système avec un flot de trafic provenant de multiples sources afin de le rendre inaccessible." },
    { id: "s3q10", question: "Qu'est-ce que l'ingénierie sociale ?", options: ["La manipulation psychologique des personnes pour obtenir des informations confidentielles", "Une technique de programmation", "Un protocole de chiffrement réseau", "Un logiciel antivirus"], answer: 0, explanation: "L'ingénierie sociale exploite la confiance ou la naïveté humaine plutôt que des failles techniques pour obtenir des informations." }
  ],
  serie4: [
    { id: "s4q1", question: "Quelle est une caractéristique d'un mot de passe robuste ?", options: ["Il est long, complexe et unique pour chaque compte", "Il est court et facile à retenir", "Il est identique sur tous les comptes", "Il contient uniquement des chiffres"], answer: 0, explanation: "Un bon mot de passe combine longueur, complexité (majuscules, chiffres, symboles) et unicité pour chaque service." },
    { id: "s4q2", question: "Que signifie l'authentification multifacteur (MFA) ?", options: ["L'utilisation de plusieurs méthodes de vérification pour authentifier un utilisateur", "L'utilisation d'un seul mot de passe très long", "Le chiffrement des données au repos", "La sauvegarde automatique des fichiers"], answer: 0, explanation: "Le MFA combine au moins deux facteurs (mot de passe, code, biométrie...) pour renforcer la sécurité de l'authentification." },
    { id: "s4q3", question: "Pourquoi est-il important d'effectuer les mises à jour logicielles ?", options: ["Elles corrigent des failles de sécurité connues", "Elles ralentissent volontairement le système", "Elles ne concernent que le design de l'interface", "Elles ne sont pas nécessaires si l'antivirus est actif"], answer: 0, explanation: "Les mises à jour corrigent souvent des vulnérabilités exploitables par des attaquants ; il est essentiel de les appliquer rapidement." },
    { id: "s4q4", question: "Quel est le rôle d'un pare-feu (firewall) ?", options: ["Filtrer le trafic réseau entrant et sortant selon des règles de sécurité", "Stocker des mots de passe", "Accélérer la connexion Internet", "Sauvegarder des fichiers"], answer: 0, explanation: "Le pare-feu contrôle et filtre les flux de données entre réseaux selon des règles prédéfinies pour bloquer les accès non autorisés." },
    { id: "s4q5", question: "Quel est le rôle principal d'un antivirus ?", options: ["Détecter, bloquer et supprimer les logiciels malveillants", "Chiffrer les données sensibles", "Gérer les mots de passe", "Configurer le réseau"], answer: 0, explanation: "L'antivirus analyse le système à la recherche de logiciels malveillants et agit pour les neutraliser." },
    { id: "s4q6", question: "Pourquoi effectuer des sauvegardes régulières ?", options: ["Pour pouvoir restaurer les données en cas de perte, panne ou attaque (comme un ransomware)", "Pour accélérer l'ordinateur", "Pour éviter d'installer des mises à jour", "Pour remplacer l'antivirus"], answer: 0, explanation: "Les sauvegardes permettent de récupérer les données en cas d'incident, notamment lors d'une attaque par ransomware." },
    { id: "s4q7", question: "Que faut-il faire pour sécuriser un réseau Wi-Fi domestique ?", options: ["Utiliser un chiffrement fort (WPA2/WPA3) et un mot de passe robuste", "Laisser le réseau ouvert pour plus de simplicité", "Utiliser le protocole WEP", "Désactiver uniquement le pare-feu"], answer: 0, explanation: "WPA2 ou WPA3 associés à un mot de passe fort protègent efficacement un réseau Wi-Fi contre les accès non autorisés." },
    { id: "s4q8", question: "Que faire face à un email suspect demandant des informations personnelles ?", options: ["Ne pas cliquer sur les liens et vérifier l'expéditeur avant toute action", "Répondre immédiatement avec ses identifiants", "Transférer l'email à tous ses contacts", "Cliquer sur le lien pour vérifier"], answer: 0, explanation: "Il faut rester vigilant, vérifier l'authenticité de l'expéditeur et éviter de cliquer sur des liens ou pièces jointes suspects." },
    { id: "s4q9", question: "Que signifie le principe du moindre privilège ?", options: ["N'accorder à chaque utilisateur que les droits strictement nécessaires à ses tâches", "Donner tous les droits administrateur à tous les utilisateurs", "Ne jamais accorder de droits d'accès", "Partager un compte administrateur unique"], answer: 0, explanation: "Ce principe limite les risques en n'attribuant que les accès nécessaires à chaque utilisateur ou processus." },
    { id: "s4q10", question: "Laquelle des propositions suivantes est une bonne pratique de cybersécurité ?", options: ["Verrouiller sa session lorsqu'on s'absente de son poste de travail", "Utiliser le même mot de passe partout", "Désactiver les mises à jour automatiques", "Partager ses identifiants avec des collègues"], answer: 0, explanation: "Verrouiller sa session protège contre les accès non autorisés en cas d'absence, même brève." }
  ],
  serie5: [
    { id: "s5q1", question: "Qu'est-ce que le chiffrement ?", options: ["Une technique transformant des données lisibles en données illisibles sans la clé appropriée", "Une méthode de compression de fichiers", "Un protocole réseau", "Un type de sauvegarde"], answer: 0, explanation: "Le chiffrement protège la confidentialité des données en les rendant incompréhensibles sans la clé de déchiffrement." },
    { id: "s5q2", question: "À quoi sert une fonction de hachage ?", options: ["À produire une empreinte unique et irréversible d'une donnée pour vérifier son intégrité", "À chiffrer réversiblement des données", "À compresser des fichiers", "À router des paquets réseau"], answer: 0, explanation: "Le hachage génère une empreinte fixe à partir de données, utile pour vérifier leur intégrité sans pouvoir retrouver la donnée d'origine." },
    { id: "s5q3", question: "Que garantit le protocole HTTPS par rapport à HTTP ?", options: ["Il chiffre les communications entre le navigateur et le serveur", "Il accélère uniquement le chargement des pages", "Il bloque les publicités", "Il ne concerne que les images"], answer: 0, explanation: "HTTPS ajoute une couche de chiffrement (TLS/SSL) à HTTP pour sécuriser les échanges entre client et serveur." },
    { id: "s5q4", question: "À quoi sert un certificat numérique ?", options: ["À authentifier l'identité d'un site ou d'une entité et permettre le chiffrement des échanges", "À stocker des mots de passe", "À accélérer le réseau", "À sauvegarder des fichiers"], answer: 0, explanation: "Le certificat numérique, délivré par une autorité de certification, prouve l'identité d'un site et permet d'établir une connexion chiffrée." },
    { id: "s5q5", question: "Quel est le rôle du DNS ?", options: ["Traduire les noms de domaine en adresses IP", "Chiffrer les communications", "Filtrer les emails", "Gérer les mots de passe"], answer: 0, explanation: "Le DNS (Domain Name System) convertit les noms de domaine lisibles en adresses IP utilisées par les ordinateurs." },
    { id: "s5q6", question: "Que vérifie le processus d'authentification ?", options: ["L'identité déclarée d'un utilisateur ou d'un système", "Les droits d'accès accordés après connexion", "La vitesse de connexion réseau", "L'espace disque disponible"], answer: 0, explanation: "L'authentification consiste à vérifier qu'un utilisateur est bien celui qu'il prétend être, avant de lui accorder l'accès." },
    { id: "s5q7", question: "Quelle est la différence entre authentification et autorisation ?", options: ["L'authentification vérifie l'identité, l'autorisation détermine les droits d'accès accordés", "Les deux termes sont identiques", "L'autorisation vérifie l'identité et l'authentification donne les droits", "Aucune des deux n'est liée à la sécurité"], answer: 0, explanation: "Après authentification (qui êtes-vous), l'autorisation détermine ce que l'utilisateur est autorisé à faire." },
    { id: "s5q8", question: "À quoi servent les journaux (logs) dans un système ?", options: ["À enregistrer les événements pour permettre la détection d'incidents et l'audit", "À stocker des mots de passe en clair", "À accélérer le système", "À chiffrer les fichiers"], answer: 0, explanation: "Les logs tracent les activités d'un système et sont essentiels pour détecter des anomalies et enquêter après un incident." },
    { id: "s5q9", question: "Pourquoi la surveillance (monitoring) est-elle importante en cybersécurité ?", options: ["Elle permet de détecter rapidement des comportements suspects ou des incidents de sécurité", "Elle remplace le besoin de pare-feu", "Elle sert uniquement à mesurer la vitesse du réseau", "Elle n'a pas de lien avec la sécurité"], answer: 0, explanation: "La surveillance continue des systèmes et réseaux permet une détection précoce des menaces et une réaction rapide." },
    { id: "s5q10", question: "Qu'est-ce qu'une politique de sécurité de l'information ?", options: ["Un ensemble de règles et procédures définissant comment protéger les actifs informationnels d'une organisation", "Un logiciel antivirus", "Un type de pare-feu", "Un protocole de chiffrement"], answer: 0, explanation: "La politique de sécurité formalise les règles, responsabilités et procédures visant à protéger les informations et systèmes d'une organisation." }
  ]
};

const SERIES_META = {
  serie1: { title: "Série 1 · Bases de la cybersécurité", short: "Bases" },
  serie2: { title: "Série 2 · Réseaux et Internet", short: "Réseaux" },
  serie3: { title: "Série 3 · Menaces", short: "Menaces" },
  serie4: { title: "Série 4 · Protection", short: "Protection" },
  serie5: { title: "Série 5 · Fondamentaux techniques", short: "Fondamentaux" }
};
const SERIES_ORDER = ["serie1", "serie2", "serie3", "serie4", "serie5"];

/* ---------------------------------------------------------
   2. ÉTAT PERSISTANT (localStorage)
   --------------------------------------------------------- */
const STORAGE_KEY = "cyberbase_state_v1";

function defaultState() {
  const series = {};
  SERIES_ORDER.forEach(key => {
    series[key] = { completed: false, bestScore: 0, lastScore: 0, attempts: 0 };
  });
  return {
    theme: "dark",
    sound: true,
    timerEnabled: false,
    series,
    finalTest: { completed: false, bestScore: 0, attempts: 0 },
    wrongIds: [],           // ids des questions déjà ratées au moins une fois
    totalTimeSeconds: 0,
    certificateName: ""
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    // fusion défensive avec l'état par défaut (nouvelles séries éventuelles, etc.)
    const base = defaultState();
    return Object.assign(base, parsed, {
      series: Object.assign(base.series, parsed.series || {}),
      finalTest: Object.assign(base.finalTest, parsed.finalTest || {})
    });
  } catch (e) {
    console.warn("Impossible de lire la progression sauvegardée, réinitialisation.", e);
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Impossible d'enregistrer la progression.", e);
  }
}

let state = loadState();

/* ---------------------------------------------------------
   3. UTILITAIRES
   --------------------------------------------------------- */
function $(sel, scope) { return (scope || document).querySelector(sel); }
function $all(sel, scope) { return Array.from((scope || document).querySelectorAll(sel)); }

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function allQuestionsFlat() {
  return SERIES_ORDER.flatMap(key => QUESTION_BANK[key].map(q => Object.assign({ serie: key }, q)));
}

function findQuestionMeta(id) {
  for (const key of SERIES_ORDER) {
    const q = QUESTION_BANK[key].find(q => q.id === id);
    if (q) return Object.assign({ serie: key }, q);
  }
  return null;
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.hidden = true; }, 2800);
}

/* ---------------------------------------------------------
   4. SON (bips générés via Web Audio API — aucun fichier requis)
   --------------------------------------------------------- */
let audioCtx = null;
function playTone(freq, duration, type) {
  if (!state.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) { /* audio non disponible, on ignore silencieusement */ }
}
const sound = {
  correct: () => { playTone(660, 0.12); setTimeout(() => playTone(880, 0.16), 90); },
  incorrect: () => playTone(160, 0.28, "sawtooth"),
  click: () => playTone(440, 0.05),
  finish: () => { playTone(523, 0.12); setTimeout(() => playTone(659, 0.12), 110); setTimeout(() => playTone(784, 0.22), 220); }
};

/* ---------------------------------------------------------
   5. NAVIGATION ENTRE PAGES
   --------------------------------------------------------- */
function showPage(id) {
  $all(".page").forEach(p => p.classList.toggle("active", p.id === id));
  $all(".nav-link[data-target]").forEach(b => b.classList.toggle("is-active", b.dataset.target === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (id === "page-dashboard") renderDashboard();
  if (id === "page-revisions") renderRevisions();
  if (id === "page-home") renderHomeSeriesCards();
}

function wireNav() {
  $all("[data-target]").forEach(btn => {
    btn.addEventListener("click", () => { sound.click(); showPage(btn.dataset.target); closeMobileNav(); });
  });
  $all("[data-serie]").forEach(btn => {
    btn.addEventListener("click", () => { sound.click(); startSeriesQuiz(btn.dataset.serie); closeMobileNav(); });
  });

  const dropdown = $(".nav-dropdown");
  const toggle = $(".nav-dropdown-toggle");
  toggle.addEventListener("click", () => {
    const open = dropdown.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (e) => {
    if (dropdown && !dropdown.contains(e.target)) { dropdown.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  $("#btn-test-final").addEventListener("click", startFinalTest);
  $("#btn-test-final-mobile").addEventListener("click", () => { startFinalTest(); closeMobileNav(); });

  $("#btn-start").addEventListener("click", () => { sound.click(); goToNextStep(); });

  $("#btn-burger").addEventListener("click", () => {
    const nav = $("#mobile-nav");
    const isHidden = nav.hasAttribute("hidden");
    if (isHidden) nav.removeAttribute("hidden"); else nav.setAttribute("hidden", "");
    $("#btn-burger").setAttribute("aria-expanded", String(isHidden));
    $("#btn-burger").textContent = isHidden ? "✕" : "☰";
  });
}
function closeMobileNav() {
  $("#mobile-nav").setAttribute("hidden", "");
  $("#btn-burger").setAttribute("aria-expanded", "false");
  $("#btn-burger").textContent = "☰";
}

/* ---------------------------------------------------------
   6. THÈME SOMBRE / CLAIR + SON (persistés)
   --------------------------------------------------------- */
function applyTheme() {
  document.body.setAttribute("data-theme", state.theme);
  $("#btn-theme").textContent = state.theme === "dark" ? "🌙" : "☀️";
  $("#btn-theme").setAttribute("aria-pressed", String(state.theme === "light"));
}
function applySoundIcon() {
  $("#btn-sound").textContent = state.sound ? "🔊" : "🔇";
  $("#btn-sound").setAttribute("aria-pressed", String(state.sound));
}
function wireToggles() {
  $("#btn-theme").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme(); saveState();
  });
  $("#btn-sound").addEventListener("click", () => {
    state.sound = !state.sound;
    applySoundIcon(); saveState();
    if (state.sound) sound.click();
  });
  $("#timer-toggle").addEventListener("change", (e) => {
    state.timerEnabled = e.target.checked;
    saveState();
  });
}

/* ---------------------------------------------------------
   7. MOTEUR DE QUIZ (séries, test final, identique pour les deux)
   --------------------------------------------------------- */
const quiz = {
  mode: null,       // "serie" | "final"
  serieKey: null,
  questions: [],
  index: 0,
  score: 0,
  answers: [],      // { id, correct: bool }
  timerId: null,
  timeLeft: 0
};

// "Commencer" doit ouvrir la première série si l'apprenant n'a rien fait,
// ou reprendre à la première série non terminée s'il a déjà progressé.
function goToNextStep() {
  const nextSeries = SERIES_ORDER.find(key => !state.series[key].completed);
  if (nextSeries) {
    startSeriesQuiz(nextSeries);
  } else {
    // Les 5 séries sont terminées : le tableau de bord (et le test final) prennent le relais.
    showPage("page-dashboard");
  }
}

function startSeriesQuiz(serieKey) {
  quiz.mode = "serie";
  quiz.serieKey = serieKey;
  quiz.questions = QUESTION_BANK[serieKey].map(q => Object.assign({ serie: serieKey }, q));
  quiz.index = 0;
  quiz.score = 0;
  quiz.answers = [];
  $("#quiz-title").textContent = SERIES_META[serieKey].title;
  showPage("page-quiz");
  setupQuizTimerUI();
  renderQuestion();
}

function startFinalTest() {
  sound.click();
  const pool = shuffle(allQuestionsFlat());
  quiz.mode = "final";
  quiz.serieKey = null;
  quiz.questions = pool.slice(0, 20);
  quiz.index = 0;
  quiz.score = 0;
  quiz.answers = [];
  $("#quiz-title").textContent = "Test final (20 questions)";
  showPage("page-quiz");
  setupQuizTimerUI();
  renderQuestion();
}

function setupQuizTimerUI() {
  $("#timer-toggle").checked = state.timerEnabled;
  clearInterval(quiz.timerId);
  $("#quiz-timer").hidden = !state.timerEnabled;
}

function startQuestionTimer() {
  clearInterval(quiz.timerId);
  if (!state.timerEnabled) return;
  quiz.timeLeft = 45;
  const el = $("#quiz-timer-value");
  const wrap = $("#quiz-timer");
  wrap.hidden = false;
  wrap.classList.remove("is-low");
  el.textContent = "00:45";
  quiz.timerId = setInterval(() => {
    quiz.timeLeft--;
    const m = String(Math.floor(quiz.timeLeft / 60)).padStart(2, "0");
    const s = String(quiz.timeLeft % 60).padStart(2, "0");
    el.textContent = `${m}:${s}`;
    if (quiz.timeLeft <= 10) wrap.classList.add("is-low");
    if (quiz.timeLeft <= 0) {
      clearInterval(quiz.timerId);
      if (!$("#quiz-options").querySelector("button:disabled")) selectAnswer(-1); // temps écoulé = pas de réponse
    }
  }, 1000);
}

function renderQuestion() {
  const q = quiz.questions[quiz.index];
  $("#quiz-position").textContent = `Question ${quiz.index + 1} / ${quiz.questions.length}`;
  $("#quiz-score-live").textContent = `Score : ${quiz.score}`;
  $("#quiz-progressbar-fill").style.width = `${(quiz.index / quiz.questions.length) * 100}%`;
  $("#quiz-progressbar").setAttribute("aria-valuenow", String(Math.round((quiz.index / quiz.questions.length) * 100)));

  $("#quiz-question").textContent = q.question;

  // Mélange l'ordre d'affichage des options à chaque question pour que la
  // bonne réponse ne soit pas toujours en A : l'apprenant doit lire.
  const order = shuffle(q.options.map((_, i) => i));
  quiz.currentOrder = order;

  const optionsWrap = $("#quiz-options");
  optionsWrap.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  order.forEach((originalIndex, displayIndex) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.innerHTML = `<span class="quiz-option-letter">${letters[displayIndex]}</span><span>${q.options[originalIndex]}</span>`;
    btn.addEventListener("click", () => selectAnswer(displayIndex));
    optionsWrap.appendChild(btn);
  });

  $("#quiz-feedback").hidden = true;
  $("#quiz-feedback").className = "quiz-feedback";
  $("#btn-quiz-next").disabled = true;
  $("#btn-quiz-prev").disabled = quiz.index === 0;

  startQuestionTimer();
}

function selectAnswer(choiceIndex) {
  clearInterval(quiz.timerId);
  const q = quiz.questions[quiz.index];
  // q.answer est l'index dans les données d'origine ; on le retrouve dans
  // l'ordre mélangé affiché à l'écran pour savoir quel bouton est le bon.
  const correctDisplayIndex = quiz.currentOrder.indexOf(q.answer);
  const correct = choiceIndex === correctDisplayIndex;
  const buttons = $all(".quiz-option");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    btn.setAttribute("aria-checked", String(i === choiceIndex));
    if (i === correctDisplayIndex) btn.classList.add("correct");
    else if (i === choiceIndex) btn.classList.add("incorrect");
  });

  if (correct) { quiz.score++; sound.correct(); } else { sound.incorrect(); registerWrong(q.id); }
  quiz.answers.push({ id: q.id, correct });

  const feedback = $("#quiz-feedback");
  feedback.hidden = false;
  feedback.className = "quiz-feedback " + (correct ? "is-correct" : "is-incorrect");
  $("#quiz-feedback-title").textContent = correct ? "Bonne réponse !" : `Réponse attendue : ${q.options[q.answer]}`;
  $("#quiz-feedback-text").textContent = q.explanation;

  $("#quiz-score-live").textContent = `Score : ${quiz.score}`;
  $("#btn-quiz-next").disabled = false;
}

function registerWrong(id) {
  if (!state.wrongIds.includes(id)) state.wrongIds.push(id);
}
function clearWrongIfCorrectedTwice(id) {
  // une notion est retirée de "à revoir" seulement si l'utilisateur vient de la réussir
  state.wrongIds = state.wrongIds.filter(w => w !== id);
}

function nextQuestion() {
  sound.click();
  // si la question vient d'être répondue correctement, on la retire des notions à revoir
  const last = quiz.answers[quiz.answers.length - 1];
  if (last && last.correct) clearWrongIfCorrectedTwice(last.id);

  if (quiz.index < quiz.questions.length - 1) {
    quiz.index++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}
function prevQuestion() {
  if (quiz.index === 0) return;
  sound.click();
  quiz.index--;
  quiz.answers.pop();
  renderQuestion();
}

function finishQuiz() {
  clearInterval(quiz.timerId);
  sound.finish();
  const total = quiz.questions.length;
  const pct = Math.round((quiz.score / total) * 100);

  if (quiz.mode === "serie") {
    const s = state.series[quiz.serieKey];
    s.attempts++;
    s.lastScore = pct;
    s.bestScore = Math.max(s.bestScore, pct);
    s.completed = true;
  } else {
    const f = state.finalTest;
    f.attempts++;
    f.bestScore = Math.max(f.bestScore, pct);
    f.completed = true;
  }
  saveState();

  $("#results-title").textContent = quiz.mode === "serie" ? `${SERIES_META[quiz.serieKey].title} — terminée !` : "Test final terminé !";
  $("#results-score").textContent = `${quiz.score} / ${total} (${pct}%)`;
  $("#results-badge").textContent = pct >= 80 ? "🥇" : pct >= 50 ? "🥈" : "🥉";
  $("#results-message").textContent =
    pct >= 80 ? "Excellent ! Ces notions sont maîtrisées." :
    pct >= 50 ? "Bon travail, quelques révisions vous feront passer au niveau supérieur." :
    "Ce n'est qu'un début — direction la page Révisions pour consolider ces notions.";

  $("#btn-results-retry").onclick = () => {
    if (quiz.mode === "serie") startSeriesQuiz(quiz.serieKey); else startFinalTest();
  };
  showPage("page-results");

  if (quiz.mode === "final" && pct >= 80) {
    showToast("Score ≥ 80 % : votre certificat est disponible !");
  }
}

function quitQuiz() {
  clearInterval(quiz.timerId);
  showPage(quiz.mode === "final" ? "page-dashboard" : "page-home");
}

function wireQuizControls() {
  $("#btn-quiz-next").addEventListener("click", nextQuestion);
  $("#btn-quiz-prev").addEventListener("click", prevQuestion);
  $("#btn-quiz-quit").addEventListener("click", quitQuiz);
  $("#btn-results-dashboard").addEventListener("click", () => showPage("page-dashboard"));

  // navigation clavier : 1-4 pour choisir une option, flèche droite pour "suivant"
  document.addEventListener("keydown", (e) => {
    if (!$("#page-quiz").classList.contains("active")) return;
    if (["1", "2", "3", "4"].includes(e.key)) {
      const idx = Number(e.key) - 1;
      const btn = $all(".quiz-option")[idx];
      if (btn && !btn.disabled) btn.click();
    }
    if (e.key === "Enter" && !$("#btn-quiz-next").disabled) nextQuestion();
  });
}

/* ---------------------------------------------------------
   8. PAGE D'ACCUEIL — cartes de séries
   --------------------------------------------------------- */
function renderHomeSeriesCards() {
  const wrap = $("#home-series-cards");
  wrap.innerHTML = "";
  SERIES_ORDER.forEach((key, i) => {
    const s = state.series[key];
    const card = document.createElement("button");
    card.className = "series-card";
    card.setAttribute("aria-label", `Ouvrir ${SERIES_META[key].title}`);
    card.innerHTML = `
      <span class="series-card-index">0${i + 1}</span>
      <h3>${SERIES_META[key].title}</h3>
      <span class="series-card-status">${s.completed ? `Meilleur score : ${s.bestScore}%` : "Pas encore commencée"}</span>
      <div class="series-card-bar"><div class="series-card-bar-fill" style="width:${s.bestScore}%"></div></div>
    `;
    card.addEventListener("click", () => startSeriesQuiz(key));
    wrap.appendChild(card);
  });
}

/* ---------------------------------------------------------
   9. TABLEAU DE BORD
   --------------------------------------------------------- */
const RING_CIRCUMFERENCE = 2 * Math.PI * 52;

function computeGlobalProgress() {
  const seriesDone = SERIES_ORDER.filter(k => state.series[k].completed).length;
  const progressPct = Math.round((seriesDone / SERIES_ORDER.length) * 100);
  const scores = SERIES_ORDER.map(k => state.series[k].bestScore);
  const globalScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  return { seriesDone, progressPct, globalScore };
}

function renderDashboard() {
  const { seriesDone, progressPct, globalScore } = computeGlobalProgress();

  $("#stat-progress-pct").textContent = `${progressPct}%`;
  $("#stat-series-done").textContent = `${seriesDone} / ${SERIES_ORDER.length}`;
  $("#stat-global-score").textContent = `${globalScore}%`;
  const minutes = Math.round(state.totalTimeSeconds / 60);
  $("#stat-time-spent").textContent = `${minutes} min`;

  const ring = $("#ring-progress");
  ring.style.strokeDasharray = String(RING_CIRCUMFERENCE);
  ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE * (1 - progressPct / 100));

  $("#global-rail-fill").style.width = `${progressPct}%`;

  // Badges (basés sur le score global)
  const badges = [
    { icon: "🥉", label: "Débutant", threshold: 1 },
    { icon: "🥈", label: "Intermédiaire", threshold: 50 },
    { icon: "🥇", label: "Fondamentaux maîtrisés", threshold: 80 }
  ];
  $("#badges-row").innerHTML = badges.map(b => {
    const unlocked = seriesDone > 0 && globalScore >= b.threshold;
    return `<span class="badge-chip ${unlocked ? "" : "locked"}"><span class="badge-icon">${b.icon}</span>${b.label}</span>`;
  }).join("");

  // Notions à revoir
  const list = $("#notions-a-revoir");
  if (state.wrongIds.length === 0) {
    list.innerHTML = `<li class="empty-state">Rien à revoir pour l'instant — bravo !</li>`;
  } else {
    list.innerHTML = state.wrongIds.slice(0, 8).map(id => {
      const q = findQuestionMeta(id);
      return q ? `<li><strong>${SERIES_META[q.serie].short}</strong> — ${q.question}</li>` : "";
    }).join("");
  }

  // Détail par série
  $("#series-progress-list").innerHTML = SERIES_ORDER.map(key => {
    const s = state.series[key];
    return `
      <div class="series-progress-row">
        <span>${SERIES_META[key].short}</span>
        <div class="series-progress-bar"><div class="series-progress-bar-fill" style="width:${s.bestScore}%"></div></div>
        <span>${s.completed ? s.bestScore + "%" : "—"}</span>
      </div>`;
  }).join("");

  // Certificat
  $("#certificate-panel").hidden = !(state.finalTest.completed && state.finalTest.bestScore >= 80);
}

/* ---------------------------------------------------------
   10. RÉVISIONS (recherche + filtre + mode révision sans score)
   --------------------------------------------------------- */
function renderRevisions() {
  const search = $("#revisions-search").value.trim().toLowerCase();
  const filter = $("#revisions-filter").value;
  let items = allQuestionsFlat();

  if (filter === "wrong") items = items.filter(q => state.wrongIds.includes(q.id));
  else if (filter !== "all") items = items.filter(q => q.serie === filter);

  if (search) {
    items = items.filter(q =>
      q.question.toLowerCase().includes(search) ||
      q.explanation.toLowerCase().includes(search) ||
      q.options.some(o => o.toLowerCase().includes(search))
    );
  }

  const wrap = $("#revision-list");
  if (items.length === 0) {
    wrap.innerHTML = `<p class="empty-state">Aucune question ne correspond à votre recherche.</p>`;
    return;
  }
  wrap.innerHTML = items.map(q => `
    <details class="revision-item ${state.wrongIds.includes(q.id) ? "was-wrong" : ""}">
      <summary><span>${q.question}</span><span class="revision-item-tag">${SERIES_META[q.serie].short}</span></summary>
      <div class="revision-item-body">
        <p class="revision-item-answer">Réponse : ${q.options[q.answer]}</p>
        <p>${q.explanation}</p>
      </div>
    </details>
  `).join("");
}

function wireRevisions() {
  $("#revisions-search").addEventListener("input", renderRevisions);
  $("#revisions-filter").addEventListener("change", renderRevisions);
}

/* ---------------------------------------------------------
   11. CERTIFICAT
   --------------------------------------------------------- */
function renderCertificate() {
  const name = state.certificateName || "Votre nom";
  $("#certificate-name").textContent = name;
  $("#certificate-score").textContent = `${state.finalTest.bestScore}%`;
  $("#certificate-date").textContent = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
  $("#certificate-name-input").value = state.certificateName;
}
function wireCertificate() {
  $("#btn-view-certificate").addEventListener("click", () => { renderCertificate(); showPage("page-certificate"); });
  $("#certificate-name-input").addEventListener("input", (e) => {
    state.certificateName = e.target.value;
    saveState();
    renderCertificate();
  });
  $("#btn-print-certificate").addEventListener("click", () => window.print());
}

/* ---------------------------------------------------------
   12. MINUTAGE GLOBAL (temps passé sur le site)
   --------------------------------------------------------- */
function wireGlobalTimer() {
  setInterval(() => {
    if (document.visibilityState === "visible") {
      state.totalTimeSeconds += 5;
      saveState();
    }
  }, 5000);
}

/* ---------------------------------------------------------
   13. INITIALISATION
   --------------------------------------------------------- */
function init() {
  applyTheme();
  applySoundIcon();
  wireNav();
  wireToggles();
  wireQuizControls();
  wireRevisions();
  wireCertificate();
  wireGlobalTimer();
  renderHomeSeriesCards();
  showPage("page-home");
}

document.addEventListener("DOMContentLoaded", init);