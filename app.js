(function () {
  "use strict";

  // URL des 3 applications. Seul point à modifier si une URL change.
  var routes = {
    legislation: "https://ilemineur-prog.github.io/assistant-legislation/",
    jurisprudence: "https://ilemineur-prog.github.io/assistant-jurisprudence/",
    doctrine: "https://ilemineur-prog.github.io/assistant-doctrine/assistant-doctrine.html"
  };

  var titres = {
    legislation: "Assistant de référencement — Législation",
    jurisprudence: "Assistant de référencement — Jurisprudence",
    doctrine: "Assistant de référencement — Doctrine"
  };

  var vueAccueil = document.getElementById("vue-accueil");
  var vueApp = document.getElementById("vue-app");
  var cadre = document.getElementById("cadre-app");
  var pied = document.getElementById("pied");
  var boutonMenu = document.getElementById("bouton-menu");
  var menuPanel = document.getElementById("menu-panel");
  var liensMenu = menuPanel.querySelectorAll("a[data-route]");

  function fermerMenu() {
    menuPanel.hidden = true;
    boutonMenu.setAttribute("aria-expanded", "false");
    boutonMenu.classList.remove("ouvert");
  }

  function ouvrirMenu() {
    menuPanel.hidden = false;
    boutonMenu.setAttribute("aria-expanded", "true");
    boutonMenu.classList.add("ouvert");
  }

  function marquerLienActif(nom) {
    liensMenu.forEach(function (lien) {
      if (lien.getAttribute("data-route") === nom) {
        lien.classList.add("actif");
        lien.setAttribute("aria-current", "page");
      } else {
        lien.classList.remove("actif");
        lien.removeAttribute("aria-current");
      }
    });
  }

  function afficherVue(nom) {
    var url = routes[nom];

    if (url) {
      vueAccueil.hidden = true;
      vueApp.hidden = false;
      pied.hidden = true;

      if (cadre.getAttribute("data-actuel") !== nom) {
        cadre.src = url;
        cadre.setAttribute("data-actuel", nom);
        cadre.title = titres[nom];
      }
    } else {
      vueAccueil.hidden = false;
      vueApp.hidden = true;
      pied.hidden = false;
      nom = "accueil";
    }

    marquerLienActif(nom);
    fermerMenu();
  }

  function depuisHash() {
    var nom = (window.location.hash || "#accueil").slice(1);
    afficherVue(nom);
  }

  boutonMenu.addEventListener("click", function (evenement) {
    evenement.stopPropagation();
    if (menuPanel.hidden) {
      ouvrirMenu();
    } else {
      fermerMenu();
    }
  });

  document.addEventListener("click", function (evenement) {
    if (!menuPanel.hidden && !menuPanel.contains(evenement.target)) {
      fermerMenu();
    }
  });

  document.addEventListener("keydown", function (evenement) {
    if (evenement.key === "Escape") {
      fermerMenu();
      boutonMenu.focus();
    }
  });

  window.addEventListener("hashchange", depuisHash);
  window.addEventListener("DOMContentLoaded", depuisHash);
})();
