/* 👉 Replace with YOUR photos */
const images = [
  "p7.jpg",
  "p2.jpg",
  "p3.jpg",
  "p4.jpg",
  "p5.jpg",
  "p8.jpg"
];

let cards = [...images, ...images];
let flipped = [];
let matched = 0;
let time = 90; // 1 min 30 sec
let timerInterval;

/* Shuffle */
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

/* Create Card */
function createCard(src) {
  const card = document.createElement("div");
  card.className = "card w-[clamp(4rem,20vw,6rem)] aspect-square relative cursor-pointer";

  card.innerHTML = `
    <div class="front absolute w-full h-full bg-white rounded-xl flex items-center justify-center text-xl shadow">💖</div>
    <div class="back absolute w-full h-full rounded-xl overflow-hidden shadow">
      <img src="${src}" class="w-full h-full object-cover"/>
    </div>
  `;

  card.addEventListener("click", () => flipCard(card, src));
  return card;
}

/* Flip */
function flipCard(card, src) {
  if (time <= 0) return; // ⛔ stop if time over

  if (flipped.length < 2 && !card.classList.contains("flip")) {
    card.classList.add("flip");
    flipped.push({card, src});

    if (flipped.length === 2) {
      setTimeout(checkMatch, 700);
    }
  }
}

/* Check Match */
function checkMatch() {
  const [a, b] = flipped;

  if (a.src === b.src) {
    matched += 2;
    if (matched === cards.length) {
      clearInterval(timerInterval);
      // makeHearts();
      // triggerFireworks();
      const modal = document.getElementById("loveModal");
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  } else {
    a.card.classList.remove("flip");
    b.card.classList.remove("flip");
  }

  flipped = [];
}

/* Timer */
function startTimer() {
  clearInterval(timerInterval);
  time = 15;

  timerInterval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    document.getElementById("timer").innerText =
      `⏱ Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    time--;

    if (time < 0) {
      clearInterval(timerInterval);

      // Disable clicking
      document.querySelectorAll(".card").forEach(card => {
        card.style.pointerEvents = "none";
      });

      setTimeout(() => {
        showKissModal(); // ပထမဆုံး Kiss Modal ပြမည်
      }, 300);
    }
  }, 1000);
}

/* Kiss Modal ပွင့်မည့် Function */
function showKissModal() {
  const modal = document.getElementById("kissModal");
  // static image သို့ အရင်ပြင်ထားမည်
  document.getElementById("kissImg").src = "panda-dudu.gif";
  document.getElementById("kissBtn").disabled = false;
  
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

/* အာဘွားပေးလိုက်သည့်အခါ အလုပ်လုပ်မည့် Function */
function giveKiss() {
      const form = document.getElementById('hidden-form');
    
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log("Notification email sent successfully!");
        }
    }).catch(error => {
        console.error("Error sending email:", error);
    });
  const kissImg = document.getElementById("kissImg");
  const kissBtn = document.getElementById("kissBtn");
  
  // GIF သို့ပြောင်းပြီး Animation စတင်မည်
  kissImg.src = "kissing.gif";
  kissBtn.disabled = true; // အကြိမ်ကြိမ် နှိပ်၍မရအောင် ပိတ်ထားမည်

  // 1.5 စက္ကန့်အကြာတွင် Kiss Modal ပိတ်ပြီး GameOver Modal ကိုပြမည်
  setTimeout(() => {
    const kissModal = document.getElementById("kissModal");
    kissModal.classList.add("hidden");
    kissModal.classList.remove("flex");

    showGameOverModal();
  }, 2500);
}

/* Start Game */
function startGame() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";
  flipped = [];
  matched = 0;

  shuffle(cards).forEach(img => {
    board.appendChild(createCard(img));
  });

  startTimer(); // ✅ restart timer
}

/* Modal */
function closeModal() {
  document.getElementById("loveModal").classList.add("hidden");
  const modal = document.getElementById("kissModal"); // Assuming you want to close the kiss modal
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// startGame();

function startGame() {
  // hide start screen
  document.getElementById("startScreen").style.display = "none";

  const board = document.getElementById("gameBoard");
  board.innerHTML = "";
  flipped = [];
  matched = 0;

  shuffle(cards).forEach(img => {
    board.appendChild(createCard(img));
  });

  startTimer();

  // 🎵 start music (works because user clicked button)
  const music = document.getElementById("bgMusic");
  music.volume = 0.4;
  music.play().catch(() => {});
}


function showGameOverModal() {
  const modal = document.getElementById("gameOverModal");
  const box = document.getElementById("gameOverBox");

  modal.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.add("flex");
    box.classList.remove("scale-75", "opacity-0");
    box.classList.add("scale-100", "opacity-100");
  }, 50);
}

function restartGame() {
  const modal = document.getElementById("gameOverModal");
  const box = document.getElementById("gameOverBox");

  box.classList.add("scale-75", "opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    startGame();
  }, 300);
}


const music = document.getElementById("bgMusic");

function enableMusic() {
  music.play().catch(() => {});
  document.removeEventListener("click", enableMusic);
}

// play music on first user interaction
document.addEventListener("click", enableMusic);

// function makeHearts() {
//   for (let i = 0; i < 40; i++) {
//     const heart = document.createElement("div");

//     heart.className = "heart";
//     heart.textContent = "💗";
//     heart.style.left = Math.random() * 100 + "vw";
//     heart.style.fontSize = Math.random() * 20 + 15 + "px";
//     heart.style.animationDuration = Math.random() * 2 + 3 + "s";
//     heart.style.animationDelay = Math.random() * 2 + "s";

//     document.body.appendChild(heart);

//     setTimeout(() => {
//       heart.remove();
//     }, 6000);
//   }
// }

// function triggerFireworks() {
//       // မီးပန်း ပစ်ထုတ်မည့် ကြာချိန် (3 စက္ကန့်)
//       const duration = 3 * 1000;
//       const animationEnd = Date.now() + duration;

//       const interval = setInterval(function() {
//         const timeLeft = animationEnd - Date.now();

//         if (timeLeft <= 0) {
//           return clearInterval(interval);
//         }

//         const particleCount = 50 * (timeLeft / duration);

//         // ဘယ်ဘက်အောက်ထောင့်မှ မီးပန်းပစ်ရန်
//         confetti({
//           particleCount: particleCount,
//           spread: 70,
//           origin: { x: 0.1, y: 0.8 }
//         });

//         // ညာဘက်အောက်ထောင့်မှ မီးပန်းပစ်ရန်
//         confetti({
//           particleCount: particleCount,
//           spread: 70,
//           origin: { x: 0.9, y: 0.8 }
//         });
//       }, 250);
//     }