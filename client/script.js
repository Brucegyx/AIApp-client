const form = document.querySelector('form');
const conversationContianer = document.querySelector('.conversation');

function loadText (element, text) {
  element.innerHTML = text;
}

function generateUId () {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  return `uid-${timestamp}-${randomNumber}`;
}

function createBlock (speaker, content, id) {
  return `
    <div class="msg-wrapper ${speaker ? 'ai' : 'user'}">
      <div class="msg-block">
        <div class="speaker">${speaker ? 'ai': 'user'}</div>
        <div class="message" id=${id}>${content}</div>
      </div>
    </div>
  `
}

async function handleSend (event) {
  event.preventDefault();
  const inputData = new FormData(form);
  conversationContianer.innerHTML += createBlock(false, inputData.get("user-input") );
  form.reset();

  const askAPI = "http://localhost:8080/api/textcompletion";
  const answer = await fetch(askAPI, {
    method: "POST", 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      prompt: inputData.get("user-input")
    })})

  if (answer.ok) {
    const result = await answer.json();
    const newUId = generateUId();
    conversationContianer.innerHTML += createBlock(true, result.text, newUId);
    conversationContianer.scrollTop = conversationContianer.scrollHeight;

  }
  else {
    const error = await answer.text();
    console.log("Error"+ error);
  }
  // msg block for AI
}

form.addEventListener("submit", (e) => handleSend(e));
form.addEventListener('keyup', (e) => {
  if (e.code === 13) {
    handleSend(e);
  }
});