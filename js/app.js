let app = {
  styles: ["plain", "empty", "light", "highlight"],

  customColor: null,
  selectedStyle: "plain",

  init: function () {
    app.generateForm(); // Génère le formulaire pour configurer la grille
    app.generatePanelColor(); // Génère le panel color

    document
      .getElementById("custom-color")
      .addEventListener("change", function (event) {
        app.customColor = event.target.value;
      });// Écouteur d'événement pour le color picker

    app.createGrid(8, 50); // Crée une grille initiale de 8x8 cellules avec une taille de 50 pixels
  },

  // Génère le formulaire de configuration de la grille
generateForm: function () { // Génère le formulaire de configuration de la grille
    const form = document.querySelector(".configuration"); // Sélectionne le formulaire

    const gridSizeInput = document.createElement("input"); // Ajout des champs de saisie pour la taille de la grille et la taille des pixels
    gridSizeInput.setAttribute("type", "number"); 
    gridSizeInput.setAttribute("name", "gridSizeInput"); 
    gridSizeInput.setAttribute("placeholder", "Taille de la grille"); 
    gridSizeInput.required = true;
    gridSizeInput.id = "gridSize";

    form.appendChild(gridSizeInput);

    const cellSizeInput = document.createElement("input");
    cellSizeInput.setAttribute("type", "number");
    cellSizeInput.setAttribute("name", "cellSizeInput");
    cellSizeInput.setAttribute("placeholder", "Taille des pixels");
    cellSizeInput.required = true;
    cellSizeInput.id = "cellSize";

    form.appendChild(cellSizeInput);

    const submitButton = document.createElement("button");  // Bouton de validation du formulaire
    submitButton.setAttribute("type", "submit");
    submitButton.classList.add("submit-form");
    submitButton.textContent = "Valider";
    form.appendChild(submitButton);

    const eventType = "submit";

    form.addEventListener(eventType, function (event) { // Écouteur d'événement pour le formulaire
      event.preventDefault();

      const gridSizeInputEl = document.getElementById("gridSize"); // Récupère la taille de la grille saisie par l'utilisateur
      const cellSizeInputEl = document.getElementById("cellSize"); // Récupère la taille des pixels saisie par l'utilisateur

      app.createGrid(gridSizeInputEl.value, cellSizeInputEl.value); // Crée une nouvelle grille avec les valeurs saisies
    });
  },

  generatePanelColor: function () {
    // création de la fonction qui génére le panel color

    const panelColor = document.getElementById("panel-color"); // on récupère l'élément panelColor

    app.styles.forEach(function (style) {
      // forEach avec l'app et la propriété style pour parcourir le tableau de styles

      const styleCell = document.createElement("div"); // on créer un div à chaque itération
      styleCell.classList.add("selector-style"); // on ajoute la classe

      styleCell.setAttribute("style-name", style); // on attribut  le bon style en le récupérant dans le css

      styleCell.addEventListener("click", app.selectStyle); // on ajoute un écouteur d'event pour que à chaque clic, on select le style dans l'app

      panelColor.appendChild(styleCell); // on insère les div dans l'élément palette
    });

    const resetButton = document.createElement("div");
    resetButton.classList.add("selector-style");
    resetButton.classList.add("reset-button");
    resetButton.addEventListener("click", app.resetColors);
    panelColor.appendChild(resetButton);
  },

  selectStyle: function (event) {
    // fonction qui permet de sélectionner les styles

    let selectorItem = event.target; //  constante qui nous permettra de cibler l'item à sélection

    app.selectedStyle = selectorItem.getAttribute("style-name"); // on récupère l'attribut style-name

    app.customColor = null; // on rappelle la valeur null à customColor
  },

  changeCellColor: function (event) {
    const cell = event.target;

    // Vérifie si custom color est utilisé
    if (app.customColor) {
      console.log("custom", app.customColor);

      // Vérifie si la cellule a déjà la couleur personnalisée
      const hasCustomColor = cell.classList.contains("custom-color");

      // Applique la couleur personnalisée si elle n'est pas déjà appliquée, sinon revient à la couleur par défaut
      if (!hasCustomColor) {
        cell.style.backgroundColor = app.customColor;
        cell.classList.add("custom-color");
      } else {
        cell.style.removeProperty("background-color");
        cell.classList.remove("custom-color");
      }
    } else {
      console.log("style", app.selectedStyle);

      // Vérifie si la cellule a déjà le style sélectionné
      const hasSelectedStyle =
        cell.getAttribute("style-name") === app.selectedStyle;

      // Applique le style sélectionné si ce n'est pas déjà appliqué, sinon revient à la couleur par défaut
      if (!hasSelectedStyle) {
        cell.setAttribute("style-name", app.selectedStyle);
      } else {
        cell.removeAttribute("style-name");
      }

      // Supprime la couleur personnalisée pour éviter les conflits
      cell.style.removeProperty("background-color");
      cell.classList.remove("custom-color");
    }
  },

  createGrid: function (gridSize, cellSize) { // Crée une grille avec la taille et la taille des pixels spécifiées
    
    const grid = document.getElementById("invader"); // Sélectionne la grille
    grid.textContent = ""; // Efface le contenu précédent de la grille
    grid.style.width = gridSize * cellSize + "px"; // on initialise la taille de la grille grâce aux imputs renseigné

    for (let i = 0; i < gridSize * gridSize; i++) {  // Crée les cellules de la grille
      
      const cellSizeDiv = document.createElement("div"); 
      cellSizeDiv.classList.add("cell");
      cellSizeDiv.style.width = cellSize + "px";
      cellSizeDiv.style.height = cellSize + "px";

      const eventType = "click";
      grid.appendChild(cellSizeDiv);
      cellSizeDiv.addEventListener(eventType, app.changeCellColor); // Écouteur d'événement pour changer la couleur de la cellule
    }
  },

  resetColors: function () { // Réinitialise toutes les couleurs des cellules à la couleur par défaut
    const cells = document.querySelectorAll(".cell");
    cells.forEach(function (cell) {
      cell.style.removeProperty("background-color");
      cell.removeAttribute("style-name");
    });
  },
};

document.addEventListener("DOMContentLoaded", app.init());
