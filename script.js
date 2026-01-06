/* ---------------- Memory Match Game ---------------- */
const emojis = ["❤️","❤️","💖","💖","😍","😍","💞","💞"];
const board = document.getElementById("gameBoard");
const message = document.getElementById("gameMessage");
let firstCard = null, secondCard = null, lockBoard=false, matchedCount=0;

// Shuffle
emojis.sort(()=>0.5-Math.random());
emojis.forEach(emoji=>{
  const card=document.createElement("div");
  card.classList.add("card"); card.innerText=emoji;
  card.addEventListener("click", ()=>{
    if(lockBoard || card.classList.contains("flip") || card.classList.contains("matched")) return;
    card.classList.add("flip");
    if(!firstCard) firstCard=card;
    else{
      secondCard=card; lockBoard=true;
      if(firstCard.innerText===secondCard.innerText){
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount++; createHeart();
        resetTurn();
        if(matchedCount===emojis.length/2){
          message.innerText="💖 You matched all! Click to unlock surprises 💖";
          message.classList.add("win");
          unlockLetter(); unlockGallery();
        }
      }else{
        setTimeout(()=>{ firstCard.classList.remove("flip"); secondCard.classList.remove("flip"); resetTurn(); },800);
      }
    }
  });
  board.appendChild(card);
});
function resetTurn(){ firstCard=null; secondCard=null; lockBoard=false; }

/* Floating Hearts */
function createHeart(){
  const heart=document.createElement("div"); heart.className="heart"; heart.innerText="💖";
  heart.style.left=Math.random()*100+"vw"; document.body.appendChild(heart);
  setTimeout(()=>heart.remove(),3000);
}

/* ---------------- Secret Love Letter ---------------- */
const secretLetter = document.getElementById("secretLetter");
const letterText = document.getElementById("letterText");
const fullText = letterText.innerText;
letterText.innerText="";
function unlockLetter(){ secretLetter.classList.add("unlock"); typeLetter(); }
let index=0;
function typeLetter(){
  if(index<fullText.length){ letterText.innerText+=fullText.charAt(index); index++; setTimeout(typeLetter,40);}
}

/* ---------------- Photo Gallery ---------------- */
const gallery=document.getElementById("photoGallery");
function unlockGallery(){ gallery.classList.add("unlock"); }

/* ---------------- Background Music ---------------- */
const music=document.getElementById("bgMusic");
const musicBtn=document.getElementById("musicBtn");
musicBtn.addEventListener("click", ()=>{
  if(music.paused){ music.play(); musicBtn.innerText="⏸ Pause Music"; }
  else{ music.pause(); musicBtn.innerText="▶ Play Music"; }
});

/* ---------------- Relationship Counter ---------------- */
const daysCount=document.getElementById("daysCount");
const startDate=new Date("2023-03-06"); // Change to your first date
setInterval(()=>{
  const now=new Date();
  const diff=Math.floor((now-startDate)/(1000*60*60*24));
  daysCount.innerText=diff;
},1000);

/* ---------------- Fake Chat ---------------- */
const chatMessages=document.getElementById("chatMessages");
const chatInput=document.getElementById("chatInput");
const chatSend=document.getElementById("chatSend");
chatSend.addEventListener("click",()=>{
  const userMsg=document.createElement("div"); userMsg.innerText="You: "+chatInput.value;
  chatMessages.appendChild(userMsg); chatInput.value="";
  const reply=document.createElement("div"); reply.innerText="Me: 😘 I love your message!"; chatMessages.appendChild(reply);
  chatMessages.scrollTop=chatMessages.scrollHeight;
});

/* ---------------- Blind Box ---------------- */
const boxBtn=document.getElementById("openBox");
const boxMsg=document.getElementById("boxMessage");
const surprises=["💖 I love you!","🌹 You are my world","😍 Forever together","💌 You make me happy"];
boxBtn.addEventListener("click",()=>{
  const rand=surprises[Math.floor(Math.random()*surprises.length)];
  boxMsg.innerText=rand;
});

/* ---------------- Love Quiz ---------------- */
const quizQ=document.getElementById("quizQuestion");
const quizA=document.getElementById("quizAnswer");
const quizBtn=document.getElementById("submitQuiz");
const quizResult=document.getElementById("quizResult");
const correctAnswer="red"; // Change your answer
quizBtn.addEventListener("click",()=>{
  if(quizA.value.toLowerCase()===correctAnswer.toLowerCase()){ quizResult.innerText="Correct! 😍"; } 
  else{ quizResult.innerText="Oops! Try again 💖"; }
});
/* ---------------- Multi-Question Love Quiz ---------------- */

// Quiz Questions Array
const quizData = [
  { q: "What is my favorite color?", a: "red" },
  { q: "Which city did we meet first?", a: "paris" },
  { q: "What is my favorite food?", a: "sushi" },
  { q: "What is my favorite movie?", a: "titanic" },
  { q: "What is my lucky number?", a: "7" }
];

let currentQ = 0;

function loadQuestion() {
  if(currentQ < quizData.length){
    quizQ.innerText = quizData[currentQ].q;
    quizA.value = "";
    quizResult.innerText = "";
  } else {
    quizQ.innerText = "🎉 All questions completed! I love you 💖";
    quizA.style.display = "none";
    quizBtn.style.display = "none";
    quizResult.innerText = "";
  }
}

quizBtn.addEventListener("click", () => {
  const answer = quizA.value.trim().toLowerCase();
  const correct = quizData[currentQ].a.toLowerCase();
  if(answer === correct){
    quizResult.innerText = "Correct! 😍";
  } else {
    quizResult.innerText = `Oops! The correct answer is "${quizData[currentQ].a}" 💖`;
  }
  currentQ++;
  setTimeout(loadQuestion, 1500); // 1.5s delay to show result
});

// Initialize first question
loadQuestion();


/* ---------------- Hug / Kiss ---------------- */
const hugBtn=document.getElementById("hugBtn");
const kissBtn=document.getElementById("kissBtn");
const hugKissMessage=document.getElementById("hugKissMessage");
hugBtn.addEventListener("click",()=>{ hugKissMessage.innerText="🤗 HUGGED! I miss you!"; });
kissBtn.addEventListener("click",()=>{ hugKissMessage.innerText="💋 Kissed! Love you!"; });

/* ---------------- Video Message ---------------- */
const loveVideo=document.getElementById("loveVideo");
// Already in HTML, user can play

/* ---------------- Editable Love Letter ---------------- */
const editable=document.getElementById("editableLetter");
const saveBtn=document.getElementById("saveLetter");
const savedMsg=document.getElementById("savedMessage");
saveBtn.addEventListener("click",()=>{
  localStorage.setItem("loveLetter", editable.value);
  savedMsg.innerText="Saved! 💌";
});
// Load saved letter
if(localStorage.getItem("loveLetter")) editable.value=localStorage.getItem("loveLetter");

/* ---------------- Cute PIN Lock FULL ---------------- */
const correctPIN = "1402"; // Change this
let enteredPIN = "";
const pinText = document.getElementById("pinText");
const pinMessage = document.getElementById("pinMessage");
const lockScreen = document.getElementById("lockScreen");
const keys = document.querySelectorAll(".key");
const lockBox = document.querySelector(".lock-box");

function updateDisplay() {
  pinText.innerText = "•".repeat(enteredPIN.length);
}

keys.forEach(key => {
  key.addEventListener("click", () => {
    const value = key.innerText;

    if(value === "C"){
      enteredPIN="";
      pinMessage.innerText="";
      updateDisplay();
      return;
    }

    if(value === "OK"){
      if(enteredPIN===correctPIN){
        pinMessage.innerText="💖 Welcome my love!";
        lockBox.classList.add("heart-beat");
        setTimeout(()=>{
          lockScreen.style.opacity="0";
          setTimeout(()=> lockScreen.style.display="none",500);
        },800);
      } else {
        pinMessage.innerText="❌ Wrong PIN!";
        enteredPIN="";
        updateDisplay();
        lockBox.classList.add("shake");
        setTimeout(()=> lockBox.classList.remove("shake"),500);
      }
      return;
    }

    if(enteredPIN.length<4){
      enteredPIN+=value;
      updateDisplay();
    }
  });
});

// Init
updateDisplay();
// Smooth scroll for nav links
document.querySelectorAll('.navbar a').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
// Append hearts randomly
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "💖";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.fontSize = (20 + Math.random()*20) + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 500); // every 0.5s
const loveBox = document.querySelector(".love-reason-box");

loveBox.addEventListener("mouseenter", () => {
  loveBox.style.transform = "scale(1.02)";
});

loveBox.addEventListener("mouseleave", () => {
  loveBox.style.transform = "scale(1)";
});
const hugImg = document.getElementById("hugImg");
const kissImg = document.getElementById("kissImg");

hugBtn.addEventListener("click", () => {
  kissImg.className = "";
  hugImg.className = "show-hug";
});

kissBtn.addEventListener("click", () => {
  hugImg.className = "";
  kissImg.className = "show-kiss";
});

