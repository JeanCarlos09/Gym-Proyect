// src/assets/js/principal-scripts.js

export function toggleSidebar(sidebarOpen) {
    return !sidebarOpen;
  }
  
  export function navigateTo(url, router) {
    router.push(url);
  }
  