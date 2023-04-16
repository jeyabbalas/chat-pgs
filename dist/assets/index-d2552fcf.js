(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=a(e);fetch(e.href,i)}})();const l="/chat-pgs/assets/github-7a0dd11e.svg",n=async t=>{const o="https://api.openai.com/v1/engines";try{return(await fetch(o,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}})).status===200}catch(a){return console.error("Error while checking API key validity:",a),!1}},p=t=>{localStorage.OPENAI_API_KEY=t},d=()=>localStorage.OPENAI_API_KEY,u=()=>{delete localStorage.OPENAI_API_KEY};document.querySelector("#app").innerHTML=`
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
          <img src="${l}" alt="GitHub Logo" class="github-logo" />
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
`;function y(){const t=document.getElementById("apiKeyPrompt");t.style.display="block"}function h(){const t=document.getElementById("apiKeyPrompt");t.style.display="none"}function c(){const t=d();(!t||t==="null"||t.length===0||!n(t))&&y()}document.getElementById("submitApiKey").addEventListener("click",async()=>{const o=document.getElementById("apiKeyInput").value;await n(o)?(p(o),h()):document.getElementById("api-key-error-message").classList.remove("hidden")});document.getElementById("logout").addEventListener("click",()=>{u(),c()});c();
