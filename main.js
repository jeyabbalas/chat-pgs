import './style.css'
import githubIcon from './github.svg'
import openai from 'https://cdn.skypack.dev/openai@3.2.1?min';


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
      <li>💬 Blah blah blah!</li>
    </ul>
    <div class="nav-footer">
      <a href="#" id="logout">🚪 Logout</a>
    </div>
  </nav>
  <div class="main">
    <div class="header">
      <div></div>
      <h1>ChatPRS</h1>
      <div class="header-icons">
        <div class="triangle"></div>
        <a href="https://github.com/jeyabbalas/chat-pgs" target="_blank" aria-label="GitHub link">
          <img src="${githubIcon}" alt="GitHub Logo" class="github-logo" />
        </a>
      </div>
    </div>
    <ul class="messages"></ul>
    <div class="input-footer">
      <div class="input-container">
        <input type="text" placeholder="Send a message..." />
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

console.log(openai)

function showApiKeyPrompt() {
    const apiKeyPrompt = document.getElementById("apiKeyPrompt");
    apiKeyPrompt.style.display = "block";
}

function hideApiKeyPrompt() {
    const apiKeyPrompt = document.getElementById("apiKeyPrompt");
    apiKeyPrompt.style.display = "none";
}

function promptForOpenAiApiKey() {
    const apiKey = localStorage.OPENAI_API_KEY;

    if (!apiKey || apiKey === 'null' || apiKey.length === 0) {
        showApiKeyPrompt();
    }
}


document.getElementById("submitApiKey").addEventListener("click", async () => {
    const checkAPIKeyValidity = async (apiKey) => {
        const testURL = 'https://api.openai.com/v1/engines';

        try {
            const response = await fetch(testURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            });

            return response.status === 200;
        } catch (error) {
            console.error('Error while checking API key validity:', error);
            return false;
        }
    };
    const apiKeyInput = document.getElementById("apiKeyInput");
    const apiKey = apiKeyInput.value;

    if (await checkAPIKeyValidity(apiKey)) {
        localStorage.OPENAI_API_KEY = apiKey;
        hideApiKeyPrompt();
    } else {
        const apiKeyErrorMessage = document.getElementById("api-key-error-message");
        apiKeyErrorMessage.classList.remove("hidden");
    }
});

document.getElementById("logout").addEventListener("click", () => {
    delete localStorage.OPENAI_API_KEY;
});

promptForOpenAiApiKey();