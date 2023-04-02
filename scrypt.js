let game = {                
  tokens:           0,
  tokenGrowth:      7.740,   //5650 / 30.4 / 24 =  tokens в час 
  tokensUpgLevel:   1,
  crystals:         0, 
  crystalGrowth:    0.01,   //колличество майнинга карбо в месяц / 30.4 дней / 24 часа = crystal в час 
  crystalsUpgLevel: 0,
  energy:           5690,
  energyGrowth:     3.540296052631579,   //2583(денег на еду в месяц) / 30.4 / 24	

  water:            0,     
  waterGrowth:      0.180,
  waterUpgLevel:    1,

	rawChicken:				0,
	friedChicken:			0,
				
  dieselFuel:       0,  
  scrapMetal:       0,
}

//арена
// Определяем переменные для игрока и моба
let playerHealth = 100;
let playerDamage = 4;
let playerDamageGranate = 20;

let enemyHealth = 25;
let enemyDamage = 5;

let secondsToWait = 10;
let canRun = true;

// Установить исходные значения переменных
function resetGame() {
  playerHealth = 100;
  enemyHealth = 25;
  canRun = true;
}

// Функция для атаки моба коротким оружием
function attack() {
  if (!canRun) {
    if (confirm("Вы не можете выполнить это действие слишком часто! Подтвердите, что хотите продолжить.")) {
      attack(); // рекурсивный вызов функции
    } else {
      alert("Вы отменили выполнение действия.");
    }
    return;
  }
  canRun = false;
  setTimeout(function() {
    canRun = true;
  }, secondsToWait * 200);

  // Игрок наносит урон мобу
  enemyHealth = enemyHealth - Math.floor(Math.random() * playerDamage) + 1;
  
  // // Если моб умер, добавляем к переменной crystals, выводим сообщение об этом и останавливаем бой
	if (enemyHealth <= 0) {
		game.rawChicken += Math.floor(Math.random() * 2) + 1; 
		game.energy -= 1
		updateUI();; // обновить отображение кристаллов на странице
		updateUI();; // обновить отображение енергии на странице
		document.getElementById("resultBattle").innerHTML = "Вы победили"
		resetGame()
		
		// установить задержку в 2 секунды перед сбросом и удалением сообщения
		setTimeout(function() {
			resetGame();
			document.getElementById("resultBattle").innerHTML = "";
		}, 2000);
  
		return;
	}
  
  // Моб наносит урон игроку
  playerHealth =  playerHealth -  Math.floor(Math.random() * enemyDamage) + 1;
  
  // Если игрок умер, выводим сообщение об этом и останавливаем бой
  if (playerHealth <= 0) {
    alert("Вы проиграли!");
		resetGame(); // обнулить переменные
    return;
  }
  
  // Обновляем статистику здоровья игрока и моба на странице
  document.getElementById("player-health").innerHTML = playerHealth;
  document.getElementById("enemy-health").innerHTML = enemyHealth;
}

// Функция для атаки моба гранатой
function attackGranate() {
  if (!canRun) {
    if (confirm("Вы не можете выполнить это действие слишком часто! Подтвердите, что хотите продолжить.")) {
      attackGranate(); // рекурсивный вызов функции
    } else {
      alert("Вы отменили выполнение действия.");
    }
    return;
  }
  canRun = false;
  setTimeout(function() {
    canRun = true;
  }, secondsToWait * 200);
	
  // Игрок наносит урон мобу
  enemyHealth = enemyHealth - Math.floor(Math.random() * playerDamageGranate) + 1;

   // // Если моб умер, добавляем  к переменной crystals, выводим сообщение об этом и останавливаем бой
	 if (enemyHealth <= 0) {
		game.rawChicken += Math.floor(Math.random() * 2) + 1;  
		game.energy -= 1
		updateUI();; // обновить отображение кристаллов на странице
		updateUI();; // обновить отображение енергии на странице
		document.getElementById("resultBattle").innerHTML = "Вы победили"
	
		resetGame()
		
		// установить задержку в 3 секунды перед сбросом и удалением сообщения
		setTimeout(function() {
			resetGame();
			document.getElementById("resultBattle").innerHTML = "";
		}, 2000);
  
		return;
	}
  
  // Моб наносит урон игроку
  playerHealth =  playerHealth -  Math.floor(Math.random() * enemyDamage) + 1;
  
  // Если игрок умер, выводим сообщение об этом и останавливаем бой
  if (playerHealth <= 0) {
    alert("Вы проиграли!");
		resetGame()
    return;
  }
  
  // Обновляем статистику здоровья игрока и моба на странице
  document.getElementById("player-health").innerHTML = playerHealth;
  document.getElementById("enemy-health").innerHTML = enemyHealth;
}

///////////////////////////////////////////////////
let crystalMineBasePriceTokens = 5690 * 12 * 12  //стоимость постройки кристальной фермы(5690 - необходимый доход в месяц*мес*года за сколько реальнасобирать на жилье)

myTimer = setInterval(endOfTurnCalc, 3600000)     // обновление игрових единиц (таймер) обновляется каждый час

const ChangingTheStateOfAnObject = 1

const costTokenBuyCrystal = 0.001
const costCrystalByToken = 279 

const costWaterBuyEnergy = 0.016164  //(стоимость 1 куб воды  / 1000)
const costEnergyBuyWater = 1

const costFriedChickenBuyEnergy = 199 //цена жареной курятины
const costEnergyBuyFriedChicken = 1

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

function drinkWater() {
  if (game.energy >= costWaterBuyEnergy && game.water >= costEnergyBuyWater) {
    game.energy += costWaterBuyEnergy;
    game.water -= costEnergyBuyWater;
    updateUI();
  }
}

function toFryMeat() {  //жарка куриного мяса
	if (game.rawChicken >= 1 && game.rawChicken >= 1) {
		game.friedChicken += 1;
		game.rawChicken -= 1;
		updateUI();
	}
}

function eatFriedChicken() { //з'їсти м'ясо
	if (game.energy >= costFriedChickenBuyEnergy && game.friedChicken >= costEnergyBuyFriedChicken) {
		game.energy += costFriedChickenBuyEnergy;
		game.friedChicken -= costEnergyBuyFriedChicken;
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
  return game.tokensUpgLevel * 5690     //улучшить квалификацию
  }

function crystalsUpgCost() {
  return game.crystalsUpgLevel * 1500  // улучшить кристальную ферму (бюджет криптовалюты)
}

function waterUpgCost() {              // улучшить собиратель води
  return game.waterUpgLevel * 1387     //стоимость бочки для хранения воды
}

function upgTokenMine() {                           // если токенов больше либо равно, чем стоимость улучшения, то вычитаются токены с баланса и увеличивается уровень
  if (game.tokens >= tokensUpgCost()) {
    game.tokens = game.tokens - tokensUpgCost()
    game.tokensUpgLevel = game.tokensUpgLevel + 1
    updateUITokens()
  }
}

function upgCrystalMine() {
  if (game.crystalsUpgLevel === 0) {
    if (game.tokens >= crystalMineBasePriceTokens) {
      game.tokens = game.tokens - crystalMineBasePriceTokens
      game.crystalsUpgLevel = 1
      updateUICrystals()
    }
  } else {
      if (game.crystals >= crystalsUpgCost()) {
        game.crystals = game.crystals - crystalsUpgCost();
        game.crystalsUpgLevel =  game.crystalsUpgLevel + 1
        updateUICrystals()
      }
  }
}

function upgWaterMine() {                           // если токенов больше либо равно, чем стоимость улучшения, то вычитаются токены с баланса и увеличивается уровень
  if (game.tokens >= waterUpgCost()) {
    game.tokens = game.tokens - waterUpgCost()
    game.waterUpgLevel = game.waterUpgLevel + 1
    updateUIWater()
  }
}

function updateUI() {
  updateUITokens();
  updateUICrystals();
  updateUIWater();
  updateUIEnergy();
	updateUIRawChicken();
	updateUIFriedChicken();
}

function updateUITokens() {
  document.getElementById("spnTokensValue").innerHTML = game.tokens.toFixed(0);
  document.getElementById("btnUpgTokenMine").innerHTML = "Покращити, ";
  document.getElementById("btnUpgTokenMine").innerHTML += tokensUpgCost().toString();
  document.getElementById("btnUpgTokenMine").innerHTML += "жетонів";
  document.getElementById("spnTokensRate").innerHTML = game.tokenGrowth * game.tokensUpgLevel;
}

function updateUICrystals() {
  document.getElementById("spnCrystalsValue").innerHTML = game.crystals.toFixed(3);
	document.getElementById("spnCrystalsRate").innerHTML = game.crystalGrowth * game.crystalsUpgLevel;
  if (game.crystalsUpgLevel === 0) {
    document.getElementById("btnUpgCrystalMine").innerHTML = "Побудувати кристальну ферму, ";
    document.getElementById("btnUpgCrystalMine").innerHTML += crystalMineBasePriceTokens.toString();
    document.getElementById("btnUpgCrystalMine").innerHTML += "жетонів";
  } else {
    document.getElementById("btnUpgCrystalMine").innerHTML = "Покращити кристальну ферму, ";
    document.getElementById("btnUpgCrystalMine").innerHTML += crystalsUpgCost().toString();
    document.getElementById("btnUpgCrystalMine").innerHTML += "кристалів";
  }
}

function updateUIWater() {
  document.getElementById("spnWaterValue").innerHTML = game.water.toFixed(3);
  document.getElementById("btnUpgWaterMine").innerHTML = "Покращити збірник води, ";
  document.getElementById("btnUpgWaterMine").innerHTML += waterUpgCost().toString();
  document.getElementById("btnUpgWaterMine").innerHTML += "жетонів";
	document.getElementById("spnWaterRate").innerHTML = game.waterGrowth * game.waterUpgLevel;
}

function updateUIEnergy() {
  document.getElementById("spnEnergyValue").innerHTML = game.energy.toFixed(2);
}

function updateUIRawChicken() {
	document.getElementById("spnRawChickenValue").innerHTML = game.rawChicken.toFixed(0);
}

function updateUIFriedChicken() {
	document.getElementById("spnFriedChickenValue").innerHTML = game.friedChicken.toFixed(0);
}

function saveGame() {
  localStorage.setItem('gameTutorial', JSON.stringify(game));
}


function loadGame() {
  let gameTemp = JSON.parse(localStorage.getItem('gameTutorial'));

	for (var propertyName in gameTemp) { 
		game[propertyName] = gameTemp[propertyName];
	 }
  updateUI();
}

window.addEventListener("load", function() {
  loadGame();
  setInterval(function() {
    saveGame();
  }, 1000);
});
