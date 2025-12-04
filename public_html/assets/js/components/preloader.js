// components/preloader.js

export function showPreloader() {
  const preloader = document.getElementById("preloader");
  preloader.classList.remove("hidden");
}

export function hidePreloader() {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hidden");
}
