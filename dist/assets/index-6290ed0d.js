(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=a(t);fetch(t.href,i)}})();const u="/chat-pgs/assets/github-7a0dd11e.svg",r={async checkApiKeyValidity(e){const s="https://api.openai.com/v1/engines";try{return(await fetch(s,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}})).status===200}catch(a){return console.error("Error while checking API key validity:",a),!1}},setOpenAiApiKey(e){localStorage.OPENAI_API_KEY=e},getOpenAiApiKey(){return localStorage.OPENAI_API_KEY},deleteOpenAiApiKey(){delete localStorage.OPENAI_API_KEY}},m=async(e,s,a)=>{const o="https://api.openai.com/v1/chat/completions";s.push({role:"user",content:e});try{const n=(await(await fetch(o,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:s})})).json()).choices[0].message.content;return s.push({role:"assistant",content:n}),n}catch(t){console.error("Error while creating chat completion:",t)}};document.querySelector("#app").innerHTML=`
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
`;const c=document.getElementById("query"),l=document.getElementById("messages");function y(){const e=document.getElementById("apiKeyPrompt");e.style.display="block"}function h(){const e=document.getElementById("apiKeyPrompt");e.style.display="none"}const d=async()=>{const e=r.getOpenAiApiKey();(!e||e==="null"||e.length===0||!await r.checkApiKeyValidity(e))&&y()};document.getElementById("submitApiKey").addEventListener("click",async()=>{const s=document.getElementById("apiKeyInput").value;await r.checkApiKeyValidity(s)?(r.setOpenAiApiKey(s),h()):document.getElementById("api-key-error-message").classList.remove("hidden")});document.getElementById("logout").addEventListener("click",async()=>{r.deleteOpenAiApiKey(),await d()});d().then(()=>{});document.getElementById("query").addEventListener("keyup",function(e){e.key==="Enter"&&e.target.value.length>0&&document.getElementById("submit").click()});const p=(e,s)=>{const a=document.createElement("div");return a.classList.add("message-bubble"),a.classList.add(s?"user-message":"chatgpt-message"),a.textContent=e,a},g=[];document.getElementById("submit").addEventListener("click",async()=>{const e=c.value;c.value="";const s=p(e,!0);l.appendChild(s);const a=await m(e,g,r.getOpenAiApiKey()),o=p(a,!1);l.appendChild(o)});
