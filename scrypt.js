let game = {                
  tokens:           0,
  tokenGrowth:      7.740,   //5650 / 30.4 / 24 =  tokens в час 
  tokensUpgLevel:   1,
  crystals:         0, 
  crystalGrowth:    0.004,   //колличество майнинга карбо в месяц / 30.4 дней / 24 часа = crystal в час 
  crystalsUpgLevel: 0,
  energy:           5650,
  energyGrowth:     2.769,   //2020(денег на еду в месяц) / 30.4 / 24
  
  water:            0,     //
  waterGrowth:      0.180,
  waterUpgLevel:    1,

  dieselFuel:       0,  
  scrapMetal:       0,
}

let crystalMineBasePriceTokens = 5650 * 12 * 12  //стоимость постройки кристальной фермы(5650 - необходимый доход в месяц*мес*года за сколько реальнасобирать на жилье)

myTimer = setInterval(endOfTurnCalc, 3600000)     // обновление игрових единиц (таймер) обновляется каждый час

const costTokenBuyCrystal = 0.001                 
const costCrystalByToken = 170                  

function buyCrystal() {                           //купить кристалы                                             
  if (game.tokens >= costCrystalByToken) {
      game.tokens -= costCrystalByToken
      game.crystals += costTokenBuyCrystal
      updateUI()   
  }   
} 

function buyTokens() {                             //купить токены
  if (game.crystals >= costTokenBuyCrystal ) {
      game.crystals -= costTokenBuyCrystal 
      game.tokens += costCrystalByToken 
      updateUI();      
  }
}   

function endOfTurnCalc() {
  if (game.energy >= 2.796) {       //если енергии меньше 0 то таймер перестает работать                       
    game.tokens = game.tokens + game.tokenGrowth * game.tokensUpgLevel;
    game.crystals = game.crystals + game.crystalGrowth * game.crystalsUpgLevel;
    game.energy = game.energy - game.energyGrowth
    game.water = game.water + game.waterGrowth * game.waterUpgLevel;
    updateUI();  
  } 
}

function tokensUpgCost() {
  return game.tokensUpgLevel * 5650     //улучшить квалификацию
  }

function crystalsUpgCost() {
  return game.crystalsUpgLevel * 900  // улучшить кристальную ферму (бюджет криптовалюты)
}

function waterUpgCost() {              // улучшить собиратель води
  return game.waterUpgLevel * 3225
}

function upgTokenMine() {                           // если токенов больше либо равно, чем стоимость улучшения, то вычитаются токены с баланса и увеличивается уровень
  if (game.tokens >= tokensUpgCost()) {
    game.tokens = game.tokens - tokensUpgCost()
    game.tokensUpgLevel = game.tokensUpgLevel + 1
    updateUI()
  }
}

function upgCrystalMine() {
  if (game.crystalsUpgLevel === 0) {
    if (game.tokens >= crystalMineBasePriceTokens) {
      game.tokens = game.tokens - crystalMineBasePriceTokens
      game.crystalsUpgLevel = 1
      updateUI()
    }
  } else {
      if (game.crystals >= crystalsUpgCost()) {
        game.crystals = game.crystals - crystalsUpgCost();
        game.crystalsUpgLevel =  game.crystalsUpgLevel + 1
        updateUI()
      }
  }
}

function upgWaterMine() {                           // если токенов больше либо равно, чем стоимость улучшения, то вычитаются токены с баланса и увеличивается уровень
  if (game.tokens >= waterUpgCost()) {
    game.tokens = game.tokens - waterUpgCost()
    game.waterUpgLevel = game.waterUpgLevel + 1
    updateUI()
  }
}

function updateUI() {
  document.getElementById("spnTokensValue").innerHTML   = game.tokens;
  document.getElementById("btnUpgTokenMine").innerHTML  = "Покращити, ";
  document.getElementById("btnUpgTokenMine").innerHTML += tokensUpgCost().toString();
  document.getElementById("btnUpgTokenMine").innerHTML += " жетонів";
  document.getElementById("spnTokensRate").innerHTML    = game.tokenGrowth * game.tokensUpgLevel;
   
  document.getElementById("spnEnergyValue").innerHTML   = game.energy;
  
  document.getElementById("spnCrystalsValue").innerHTML = game.crystals; 
    if (game.crystalsUpgLevel === 0) {
      document.getElementById("btnUpgCrystalMine").innerHTML  = "Побудувати, ";
      document.getElementById("btnUpgCrystalMine").innerHTML += crystalMineBasePriceTokens.toString();
      document.getElementById("btnUpgCrystalMine").innerHTML += " жетонів";
    } else {
        document.getElementById("btnUpgCrystalMine").innerHTML  = "Модернізувати, ";
        document.getElementById("btnUpgCrystalMine").innerHTML += crystalsUpgCost().toString();
        document.getElementById("btnUpgCrystalMine").innerHTML += " кристалів";
      }    
  document.getElementById("spnCrystalsRate").innerHTML = game.crystalGrowth * game.crystalsUpgLevel;    
  
  document.getElementById("spnWaterValue").innerHTML = game.water; 
  document.getElementById("btnUpgWaterMine").innerHTML  = "Модернізувати, ";
  document.getElementById("btnUpgWaterMine").innerHTML += waterUpgCost().toString();
  document.getElementById("btnUpgWaterMine").innerHTML += " жетонів";
  document.getElementById("spnWaterRate").innerHTML    = game.waterGrowth * game.waterUpgLevel;  

  document.getElementById("spnDieselFuelValue").innerHTML   = game.dieselFuel;
  document.getElementById("spnScrapMetalValue").innerHTML   = game.scrapMetal;
}  

function saveGame() {
  localStorage.setItem('gameTutorial', JSON.stringify(game));
}

function loadGame() {
  let gameTemp = JSON.parse(localStorage.getItem('gameTutorial'));
  for (var propertyName in gameTemp) { game[propertyName] = gameTemp[propertyName]; }
  updateUI();
}

window.addEventListener("load", function() {
  loadGame();
  setInterval(function() {
    saveGame();
  }, 1000);
});
