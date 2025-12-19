// SÉLECTION DES ÉLÉMENTS DU DOM
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customTipInput = document.getElementById('custom-tip');
const tipButtons = document.querySelectorAll('.tip-btn');
const errorMsg = document.getElementById('error-msg');

const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const resetBtn = document.getElementById('reset-btn');

// VARIABLES D'ÉTAT
let billValue = 0.0;
let peopleValue = 1;
let tipPercentage = 0.0;

// FONCTION PRINCIPALE DE CALCUL
function calculate() {
  // 1. Validation : Si nb de personnes est 0 ou vide
  if (peopleValue <= 0) {
    // Ne rien calculer, l'affichage reste inchangé ou vide
    return;
  }

  // 2. Calculs Mathématiques
  let tipAmountPerPerson = (billValue * tipPercentage) / peopleValue;
  let totalPerPerson = (billValue / peopleValue) + tipAmountPerPerson;

  // 3. Affichage (arrondi à 2 décimales)
  tipAmountDisplay.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;

  // 4. Activer le bouton Reset
  resetBtn.removeAttribute('disabled');
}

// GESTION DES INPUTS
function handleBillInput() {
  billValue = parseFloat(billInput.value);
  if (isNaN(billValue)) billValue = 0; // Sécurité si vide
  calculate();
  checkResetState();
}

function handlePeopleInput() {
  peopleValue = parseFloat(peopleInput.value);
  
  // Gestion de l'erreur visuelle
  if (peopleValue === 0) {
    errorMsg.classList.remove('hidden');
    peopleInput.classList.add('error-border');
  } else {
    errorMsg.classList.add('hidden');
    peopleInput.classList.remove('error-border');
    
    if (isNaN(peopleValue)) peopleValue = 1; // Évite la division par NaN
    calculate();
  }
  checkResetState();
}

function handleTipClick(event) {
  // Retirer la classe active de tous les boutons
  tipButtons.forEach(btn => btn.classList.remove('active'));
  customTipInput.value = ''; // Vider le champ custom

  // Activer le bouton cliqué
  event.target.classList.add('active');

  // Récupérer la valeur (ex: value="10" -> 0.10)
  tipPercentage = parseFloat(event.target.value) / 100;
  
  calculate();
  checkResetState();
}

function handleCustomTip() {
  // Désactiver les boutons car on écrit dans custom
  tipButtons.forEach(btn => btn.classList.remove('active'));

  let val = parseFloat(customTipInput.value);
  if (isNaN(val)) {
    tipPercentage = 0;
  } else {
    tipPercentage = val / 100;
  }
  
  calculate();
  checkResetState();
}

// FONCTION RESET
function resetApp() {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  
  // Réinitialiser les états
  billValue = 0;
  peopleValue = 1;
  tipPercentage = 0;

  // Réinitialiser UI
  tipButtons.forEach(btn => btn.classList.remove('active'));
  errorMsg.classList.add('hidden');
  peopleInput.classList.remove('error-border');
  
  tipAmountDisplay.textContent = '$0.00';
  totalAmountDisplay.textContent = '$0.00';
  
  resetBtn.setAttribute('disabled', 'true');
}

// Vérifie si on doit activer le bouton reset (si au moins un champ est rempli)
function checkResetState() {
  if (billInput.value || peopleInput.value || customTipInput.value || document.querySelector('.tip-btn.active')) {
    resetBtn.removeAttribute('disabled');
  } else {
    resetBtn.setAttribute('disabled', 'true');
  }
}

// ÉCOUTEURS D'ÉVÉNEMENTS (Event Listeners)
billInput.addEventListener('input', handleBillInput);
peopleInput.addEventListener('input', handlePeopleInput);
customTipInput.addEventListener('input', handleCustomTip);
resetBtn.addEventListener('click', resetApp);

tipButtons.forEach(btn => {
  btn.addEventListener('click', handleTipClick);
});