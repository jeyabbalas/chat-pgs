(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const u="/chat-pgs/assets/github-7a0dd11e.svg",n={async checkApiKeyValidity(e){const a="https://api.openai.com/v1/engines";try{return(await fetch(a,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}})).status===200}catch(s){return console.error("Error while checking API key validity:",s),!1}},setOpenAiApiKey(e){localStorage.OPENAI_API_KEY=e},getOpenAiApiKey(){return localStorage.OPENAI_API_KEY},deleteOpenAiApiKey(){delete localStorage.OPENAI_API_KEY}},m=async(e,a)=>{const s="https://api.openai.com/v1/chat/completions";try{return(await(await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[{role:"user",content:e}]})})).json()).choices[0].message.content}catch(o){console.error("Error while creating chat completion:",o)}};document.querySelector("#app").innerHTML=`
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
      <h1>ChatPGS</h1>
      <div class="header-icons">
        <div class="triangle"></div>
        <a href="https://github.com/jeyabbalas/chat-pgs" target="_blank" aria-label="GitHub link">
          <img src="${u}" alt="GitHub Logo" class="github-logo" />
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
`;const c=document.getElementById("query"),l=document.getElementById("messages");function y(){const e=document.getElementById("apiKeyPrompt");e.style.display="block"}function h(){const e=document.getElementById("apiKeyPrompt");e.style.display="none"}const d=async()=>{const e=n.getOpenAiApiKey();(!e||e==="null"||e.length===0||!await n.checkApiKeyValidity(e))&&y()};document.getElementById("submitApiKey").addEventListener("click",async()=>{const a=document.getElementById("apiKeyInput").value;await n.checkApiKeyValidity(a)?(n.setOpenAiApiKey(a),h()):document.getElementById("api-key-error-message").classList.remove("hidden")});document.getElementById("logout").addEventListener("click",async()=>{n.deleteOpenAiApiKey(),await d()});d().then(()=>{});document.getElementById("query").addEventListener("keyup",function(e){e.key==="Enter"&&e.target.value.length>0&&document.getElementById("submit").click()});const p=(e,a)=>{const s=document.createElement("div");return s.classList.add("message-bubble"),s.classList.add(a?"user-message":"chatgpt-message"),s.textContent=e,s};document.getElementById("submit").addEventListener("click",async()=>{const e=c.value;c.value="";const a=p(e,!0);l.appendChild(a);const s=await m(e,n.getOpenAiApiKey()),o=p(s,!1);l.appendChild(o)});
