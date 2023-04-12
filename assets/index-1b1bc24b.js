import n from"https://cdn.skypack.dev/openai@3.2.1?min";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const c="/assets/github-7a0dd11e.svg";document.querySelector("#app").innerHTML=`
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
          <img src="${c}" alt="GitHub Logo" class="github-logo" />
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
`;console.log(n);function l(){const o=document.getElementById("apiKeyPrompt");o.style.display="block"}function p(){const o=document.getElementById("apiKeyPrompt");o.style.display="none"}function d(){const o=localStorage.OPENAI_API_KEY;(!o||o==="null"||o.length===0)&&l()}document.getElementById("submitApiKey").addEventListener("click",async()=>{const o=async a=>{const e="https://api.openai.com/v1/engines";try{return(await fetch(e,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}})).status===200}catch(t){return console.error("Error while checking API key validity:",t),!1}},s=document.getElementById("apiKeyInput").value;await o(s)?(localStorage.OPENAI_API_KEY=s,p()):document.getElementById("api-key-error-message").classList.remove("hidden")});document.getElementById("logout").addEventListener("click",()=>{delete localStorage.OPENAI_API_KEY});d();
