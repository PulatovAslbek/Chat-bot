const talk = document.querySelector('.talk');
const newChat = document.createElement('p');
const messageList = document.querySelector('.chatMessages');
const inputBox = document.querySelector('#inputBox');
const sendBtn = document.querySelector('#sendBtn');

const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();

inputBox.addEventListener('keypress', event => event.key === 'Enter' ? createNewMessage(event.target.value) : null );
sendBtn.addEventListener('click', event => (inputBox.value != '') ? createNewMessage(inputBox.value) : null );

recognition.onstart = ()=> {
    console.log('voice is activated.')
}

recognition.onspeechstart = () => {
    console.log('speech started')
}

recognition.onspeechend = () => {
    console.log('speech ended')
}

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    createNewMessage(transcript);
    readOutLoud(transcript);
}

const createNewMessage = (text) => {
    if(text == null) return;
    
    const newChatMessage = document.createElement('p');
    newChatMessage.classList.add('chat');
    newChatMessage.textContent = text;
    messageList.appendChild(newChatMessage);
    inputBox.value = '';
}

talk.addEventListener('click', () => {
    recognition.start();
})

function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text ="You Said: " + message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}