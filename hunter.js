// Определяем переменные для игрока и моба
let playerHealth = 100;
let playerDamage = 4;
let playerDamageGranate = 20;

let enemyHealth = 25;
let enemyDamage = 5;


let secondsToWait = 10;
let canRun = true;

// Функция для атаки моба коротким оружием
function attack() {
  if (canRun) {
    canRun = false;
    setTimeout(function() {
      canRun = true;
    }, secondsToWait * 200);
    
    // Ваш код здесь
  } else {
    alert("Вы не можете выполнить это действие слишком часто!");
  }


  // Игрок наносит урон мобу
  enemyHealth = enemyHealth - Math.floor(Math.random() * playerDamage) + 1;

  
  // Если моб умер, выводим сообщение об этом и останавливаем бой
  if (enemyHealth <= 0) {
    alert("Вы победили!");
    return;
  }
  
  // Моб наносит урон игроку
  playerHealth =  playerHealth -  Math.floor(Math.random() * enemyDamage) + 1;
  
  // Если игрок умер, выводим сообщение об этом и останавливаем бой
  if (playerHealth <= 0) {
    alert("Вы проиграли!");
    return;
  }
  
  // Обновляем статистику здоровья игрока и моба на странице
  document.getElementById("player-health").innerHTML = playerHealth;
  document.getElementById("enemy-health").innerHTML = enemyHealth;
}


// Функция для атаки моба гранатой
function attackGranate() {
  if (canRun) {
    canRun = false;
    setTimeout(function() {
      canRun = true;
    }, secondsToWait * 200);
    
    // Ваш код здесь
  } else {
    alert("Вы не можете выполнить это действие слишком часто!");
  }
  // Игрок наносит урон мобу
  enemyHealth = enemyHealth - Math.floor(Math.random() * playerDamageGranate) + 1;

  
  // Если моб умер, выводим сообщение об этом и останавливаем бой
  if (enemyHealth <= 0) {
    alert("Вы победили!");
    return;
  }
  
  // Моб наносит урон игроку
  playerHealth =  playerHealth -  Math.floor(Math.random() * enemyDamage) + 1;
  
  // Если игрок умер, выводим сообщение об этом и останавливаем бой
  if (playerHealth <= 0) {
    alert("Вы проиграли!");
    return;
  }
  
  // Обновляем статистику здоровья игрока и моба на странице
  document.getElementById("player-health").innerHTML = playerHealth;
  document.getElementById("enemy-health").innerHTML = enemyHealth;
}


