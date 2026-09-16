/* =========================================================
   CYBERBASE — service-worker.js
   Mise en cache des fichiers du site pour un fonctionnement
   hors-ligne une fois l'application installée sur le téléphone.
   ========================================================= */
const CACHE_NAME = "cyberbase-cache-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./favicon.svg",
  "./favicon.ico",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png"
];

// Installation : on met en cache tous les fichiers du site.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activation : on supprime les anciens caches si le site a été mis à jour.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Requêtes : on sert le cache en priorité, et on va chercher le réseau
// seulement si le fichier n'est pas encore en cache (site 100% hors-ligne
// après la première visite, puisqu'il n'y a aucun appel serveur de toute façon).
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});