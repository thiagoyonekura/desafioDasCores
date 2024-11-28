const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray'];

const cores = ['VERMELHO', 'AZUL', 'VERDE', 'AMARELO', 'ROXO', 'LARANJA', 'ROSA', 'MARROM', 'CINZA'];

let level = 1;
let score = 0; 
let targetColor; // alvo
let targetWord;
let buttons; 
let timer;

/*A função shuffle é uma função auxiliar para embaralhar um array. Ela utiliza o algoritmo Fisher-Yates para realizar o embaralhamento. */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    nome: params.get('nome'),
    email: params.get('email'),
    genero: params.get('genero'),
    interesses: params.getAll('interesses')
  };
}

function displayUserInfo(userData) {
  document.getElementById('user-name').textContent = `Nome: ${userData.nome}`;
  document.getElementById('user-email').textContent = `E-mail: ${userData.email}`;
  document.getElementById('user-genero').textContent = `Gênero: ${userData.genero}`;
  document.getElementById('user-interesses').textContent = `Interesses: ${userData.interesses.join(', ')}`;
}

function startGame() {
  score = 0; 
  level = 1; 
  updateLevel();
  updateScore();
  generateTarget(); // Gera a cor alvo e a palavra alvo
  generateButtons();
  showMessage(''); // Limpa
  resetButtonEvents();
  startTimer(3000);
  document.getElementById('user-info-section').style.display = 'none';
}

function updateLevel() {
  document.getElementById('level').textContent = `Nível: ${level}`;
}

function updateScore() {
  document.getElementById('score').textContent = `Pontuação: ${score}`;
}

function showMessage(message) {
  document.getElementById('message').textContent = message;
}

/* Função para selecionar aleatoriamente o alvo (cor e palavra) */
function generateTarget() {
  const colorIndex = Math.floor(Math.random() * colors.length);
  const wordIndex = Math.floor(Math.random() * cores.length);
  targetColor = colors[colorIndex];
  targetWord = cores[wordIndex];
  document.getElementById('target').textContent = targetWord;
  document.getElementById('target').style.color = targetColor;
}

function generateButtons() {
  buttons = shuffle(colors.slice()); //slice cria uma cópia do array colors
  const colorButtons = document.querySelectorAll('#buttons button:not(.ignore-button)');
  for (let i = 0; i < colorButtons.length; i++) {
    const button = colorButtons[i];
    button.style.backgroundColor = buttons[i];
    button.disabled = false; // Habilita os botões
  }
}

function resetButtonEvents() {
  const colorButtons = document.querySelectorAll('#buttons button:not(.ignore-button)');
  // biome-ignore lint/complexity/noForEach: <explanation>
  colorButtons.forEach(button => {
    button.removeEventListener('click', checkAnswer);
    button.addEventListener('click', checkAnswer);
  });
}


function checkAnswer(event) {
  clearTimeout(timer);
  const selectedColor = event.target.style.backgroundColor;
  if (selectedColor === targetColor) {
    score++; 
    updateScore(); 
    if (score % 10 === 0) { //Pontuação é um múltiplo de 10
      level++;
      updateLevel();
      if (level > 6) {
        showMessage('Parabéns! Você concluiu todos os níveis!');
        return;
      }
    }
    generateTarget(); // Gera um novo alvo
    generateButtons(); 
    showMessage(''); // Limpa
    let time = 3000;
    if (level === 2) {
      time = 2000; 
    } else if (level === 3) {
      time = 2000; 
      shuffle(buttons); 
      generateButtons();
    } else if (level === 4 || level === 5) {
      time = 2000 - (level - 3) * 300; // Tempo diminui em 300ms a cada nível a partir do nível 4
      shuffle(buttons); 
      generateButtons(); 
    } else if (level === 6) {
      time = 1000; 
      shuffle(buttons);
      generateButtons(); 
    }
    startTimer(time);
  } else {
    endGame(); 
  }
}

function startTimer(time) {
  let totalMilliseconds = time;
  let minutes = Math.floor(totalMilliseconds / 60000);
  let seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  let milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Tempo restante: ${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds)}`;

  timer = setInterval(() => {
    totalMilliseconds -= 10; // Decrementa 10 milissegundos
    minutes = Math.floor(totalMilliseconds / 60000);
    seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    timerElement.textContent = `${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds)}`;

    if (totalMilliseconds <= 0) { // Verifica se o tempo acabou
      clearInterval(timer);
      endGame(); 
    }
  }, 10);

  // A função formatTime é uma função auxiliar usada para formatar os números de minutos, segundos e milissegundos com dois dígitos.
  function formatTime(time) {
    return time.toString().padStart(2, '0');
  }
}

function endGame() {
  showMessage(`OOOOOOOPS! Você fez ${score} pontos.`);

  const userData = getUrlParams();
  displayUserInfo(userData);

  document.getElementById('user-info-section').style.display = 'block';

  // Desabilita os botões para impedir cliques adicionais
  const colorButtons = document.querySelectorAll('#buttons button:not(.ignore-button)');
  // biome-ignore lint/complexity/noForEach: <explanation>
  colorButtons.forEach(button => {
    button.disabled = true;
  });
}

document.getElementById("formCadastro").addEventListener("submit", (event) => {

  const checkboxes = document.querySelectorAll('input[name="interesses"]:checked');
  
  if (checkboxes.length === 0) {
    alert("Por favor, selecione pelo menos uma área de interesse.");
    event.preventDefault(); // Impede o envio do formulário
  }
});

document.addEventListener('DOMContentLoaded', () => {

document.querySelector('.start-button').addEventListener('click', startGame);
});