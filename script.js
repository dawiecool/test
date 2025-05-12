let questionIndex = 0;
let score = 0;

const questions = [
    "Apakah Anda sering merasa sakit kepala?",
    "Apakah Anda kehilangan nafsu makan?",
    "Apakah tidur Anda tidak nyenyak?",
    "Apakah Anda mudah merasa takut?",
    "Apakah Anda merasa cemas, tegang, atau khawatir?",
    "Apakah tangan Anda gemetar?",
    "Apakah Anda mengalami gangguan pencernaan?",
    "Apakah Anda merasa sulit berpikir jernih?",
    "Apakah Anda merasa tidak bahagia?",
    "Apakah Anda lebih sering menangis?",
    "Apakah Anda merasa sulit untuk menikmati aktivitas sehari-hari?",
    "Apakah Anda merasa kesulitan untuk mengambil keputusan?",
    "Apakah aktivitas/tugas sehari-hari Anda terbengkalai?",
    "Apakah Anda merasa tidak mampu berperan dalam kehidupan ini?",
    "Apakah Anda kehilangan minat terhadap banyak hal?",
    "Apakah Anda merasa tidak berharga?",
    "Apakah Anda mempunyai pikiran untuk mengakhiri hidup Anda?",
    "Apakah Anda merasa lelah sepanjang waktu?",
    "Apakah Anda merasa tidak enak di perut?",
    "Apakah Anda mudah lelah?"
];

function startQuestionnaire() {
  const container = document.querySelector('.container');
  container.classList.remove('initial');
  container.classList.add('questionnaire');
  document.getElementById('initial-form').style.display = 'none';
  loadQuestion();
}

function loadQuestion() {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div class="question-number">
      <h2>Pertanyaan ${questionIndex + 1} dari ${questions.length}</h2>
    </div>
    <div class="question-wrapper">
      <div class="question">${questions[questionIndex]}</div>
    </div>
    <div class="options">
      <button onclick="answerQuestion(0)">Ya</button>
      <button onclick="answerQuestion(1)">Tidak</button>
    </div>
  `;
}

function answerQuestion(answer) {
  if (answer === 0) { // Assuming "Ya" adds to the score
    score++;
  }

  questionIndex++;

  if (questionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const container = document.querySelector('.container');
  let resultText = "Tidak masalah";
  if (score > 6) {
    resultText = "Ada masalah";
  }

  container.innerHTML = `
    <h2>Hasil</h2>
    <p>Skor Anda: ${score}</p>
    <p>${resultText}</p>
  `;
}

// alert

function validateAndStart() {
  const form = document.getElementById('initial-form');
  let isFormValid = true;

  form.querySelectorAll('input, select').forEach(input => {
    // Remove any existing validation classes
    input.classList.remove('invalid', 'valid');

    // Perform custom validation
    if (!input.value || (input.type === 'tel' && !input.value.match(/^[0-9]+$/))) {
      isFormValid = false;
      input.classList.add('invalid'); // Add invalid class if not valid
    } else {
      input.classList.add('valid'); // Add valid class if valid
    }
  });

  // Proceed only if the form is valid
  if (isFormValid) {
    startQuestionnaire(); // Implement your function here
  }
}

// Listening for input events to dynamically update validation
document.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('input', () => {
    if(input.value) {
       input.classList.remove('invalid'); // Remove invalid state as user types if input is not empty
    }
  });
});
