
Context: ${i}

Question: ${e}`;r.conversations.push({role:"user",content:a});try{const n=(await(await fetch(o,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:r.conversations,temperature:.5})})).json()).choices[0].message.content;return r.conversations.push({role:"assistant",content:n}),n}catch(s){console.error("Error while creating chat completion:",s)}},askChatGPT:async(e,i,t)=>{const o=await i.getContext(e,1,t);return r.createChatCompletionWithAugmentation(e,o,t)}},d={database:v,cosineSimilarityToDatabase:e=>{const i=(t,o)=>t.map((a,s)=>t[s]*o[s]).reduce((a,s)=>a+s);return d.database.map(t=>i(e,t.embedding))},getEmbedding:async(e,i)=>{const t="https://api.openai.com/v1/embeddings";try{return(await(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({input:e,model:"text-embedding-ada-002"})})).json()).data[0].embedding}catch(o){console.error("Error while creating embedding:",o)}},findNearestNeighbors:async(e,i,t)=>{const o=await d.getEmbedding(e,t);return d.cosineSimilarityToDatabase(o).map((n,h)=>({score:n,index:h})).sort((n,h)=>h.score-n.score).slice(0,i).map(n=>d.database[n.index].text)},getContext:async(e,i,t)=>(await d.findNearestNeighbors(e,i,t)).reduce((a,s)=>a+" "+s,"")};document.querySelector("#app").innerHTML=`
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
          <img src="${g}" alt="GitHub Logo" class="github-logo" />
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
`;const f=document.getElementById("query"),p=document.getElementById("messages");function b(){const e=document.getElementById("apiKeyPrompt");e.style.display="block"}function y(){const e=document.getElementById("apiKeyPrompt");e.style.display="none"}const u=async()=>{const e=c.getKey();(!e||e==="null"||e.length===0||!await c.checkValidity(e))&&b()};document.getElementById("submitApiKey").addEventListener("click",async()=>{const i=document.getElementById("apiKeyInput").value;await c.checkValidity(i)?(c.setKey(i),y()):document.getElementById("api-key-error-message").classList.remove("hidden")});document.getElementById("logout").addEventListener("click",async()=>{c.deleteKey(),await u()});u().then(()=>{});document.getElementById("query").addEventListener("keyup",function(e){e.key==="Enter"&&e.target.value.length>0&&document.getElementById("submit").click()});const m=(e,i)=>{const t=document.createElement("div");return t.classList.add("message-bubble"),t.classList.add(i?"user-message":"chatgpt-message"),t.textContent=e,t};r.init();document.getElementById("submit").addEventListener("click",async()=>{const e=f.value;f.value="";const i=m(e,!0);p.appendChild(i);const t=await r.askChatGPT(e,d,c.getKey()),o=m(t,!1);p.appendChild(o)});