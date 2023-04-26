import './style.css'
import githubIcon from './github.svg'
import { manageOpenAiApiKey, manageConversations, pgsDatabase } from './chat-pgs.js';


document.querySelector('#app').innerHTML = `
<div id="apiKeyPrompt" class="modal">
  <div class="modal-content">
    <p>No OpenAI API key found, please generate one at <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">https://platform.openai.com/account/api-keys</a> and provide it here:</p>
    <p id="api-key-error-message" class="hidden error-message">ERROR: Incorrect OpenAI API key provided. Please try again.</p>
    <div class="modal-input">
      <input type="text" id="apiKeyInput" placeholder="Enter API key here" autocomplete="off"/>
      <button id="submitApiKey">Submit</button>
    </div>
  </div>
</div>
<div id="chatprs-app">
  <nav class="side-bar">
    <a class="button">+ New chat</a>
    <ul class="chat-history">
      <li>💬 Chat history</li>
    </ul>
    <div class="nav-footer">
      <a href="#" id="logout">🚪 Logout</a>
    </div>
  </nav>
  <div class="main">
    <div class="header">
      <div></div>
      <h1>ChatPGS</h1>
      <div class="header-icons">
        <div class="triangle"></div>
        <a href="https://github.com/jeyabbalas/chat-pgs" target="_blank" aria-label="GitHub link">
          <img src="${githubIcon}" alt="GitHub Logo" class="github-logo" />
        </a>
      </div>
    </div>
    <div id="messages"></div>
    <div class="input-footer">
      <div class="input-container">
        <input id="query" type="text" placeholder="Send a message..." autocomplete="off"/>
        <div id="submit">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="paperplane">
           <path d="M0 0h24v24H0z" fill="none" />
           <path d="M2 21l21-9-9-2-2-9z" />
         </svg>
        </div>
      </div>
      <p class="info">
        This is a demo that uses Chat GPT-3.5 to generate responses. Currently, it only has access to the PRS reported in <a href="https://pubmed.ncbi.nlm.nih.gov/30554720/">Mavaddat et al. (2019)</a>. ChatGPT may produce inaccurate information about people, places, or facts.
      </p>
    </div>
  </div>
</div>
`

const query = document.getElementById('query');
const messagesPanel = document.getElementById('messages');

function showApiKeyPrompt() {
    const apiKeyPrompt = document.getElementById('apiKeyPrompt');
    apiKeyPrompt.style.display = 'block';
}

function hideApiKeyPrompt() {
    const apiKeyPrompt = document.getElementById('apiKeyPrompt');
    apiKeyPrompt.style.display = 'none';
}

const promptForOpenAiApiKey = async () => {
    const apiKey = manageOpenAiApiKey.getKey();

    if (!apiKey || apiKey === 'null' || apiKey.length === 0 || !(await manageOpenAiApiKey.checkValidity(apiKey))) {
        showApiKeyPrompt();
    }
}

document.getElementById('submitApiKey').addEventListener('click', async () => {
    const apiKeyInput = document.getElementById('apiKeyInput');
    const apiKey = apiKeyInput.value;

    if (await manageOpenAiApiKey.checkValidity(apiKey)) {
        manageOpenAiApiKey.setKey(apiKey);
        hideApiKeyPrompt();
    } else {
        const apiKeyErrorMessage = document.getElementById('api-key-error-message');
        apiKeyErrorMessage.classList.remove('hidden');
    }
});

document.getElementById('logout').addEventListener('click', async () => {
    manageOpenAiApiKey.deleteKey();
    await promptForOpenAiApiKey();
});

promptForOpenAiApiKey().then(() => {});

document.getElementById('query').addEventListener('keyup', function (event) {
    if (event.key === 'Enter' && event.target.value.length > 0) {
        document.getElementById('submit').click();
    }
});

const createMessageBubble = (message, isUser) => {
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble');
    messageBubble.classList.add(isUser ? 'user-message' : 'chatgpt-message');
    messageBubble.textContent = message;
    return messageBubble;
}

manageConversations.init();

document.getElementById('submit').addEventListener('click', async () => {
    const userMessage = query.value;
    query.value = '';
    const userMessageBubble = createMessageBubble(userMessage, true);
    messagesPanel.appendChild(userMessageBubble);

    const message = await manageConversations.askChatGPT(userMessage, pgsDatabase, manageOpenAiApiKey.getKey());
    const chatgptMessageBubble = createMessageBubble(message, false);
    messagesPanel.appendChild(chatgptMessageBubble);
});