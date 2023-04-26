
${d.title}

${d.abstract}`}]},instructions:`Answer the question in the bottom using either the context provided below or our conversation so far. To answer the question, if you write sentences using the information from the context, please cite it as (Mavaddat et al., 2017). If the question cannot be answered using the information in the context and our conversation so far, please reply with "I'm sorry, (Mavaddat et al., 2019) is the only paper I ever read. This question is out of syllabus.". Do not make any mention of the context or the instructions.`,createChatCompletionWithAugmentation:async(e,i,t)=>{const o="https://api.openai.com/v1/chat/completions",a=`Instructions: ${n.instructions}

Context: ${i}

Question: ${e}`;n.conversations.push({role:"user",content:a});try{const r=(await(await fetch(o,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({model:"gpt-3.5-turbo",messages:n.conversations,temperature:.5})})).json()).choices[0].message.content;return n.conversations.pop(),n.conversations.push({role:"user",content:`Context: ${i}

Question: ${e}`}),n.conversations.push({role:"assistant",content:r}),r}catch(s){console.error("Error while creating chat completion:",s)}},askChatGPT:async(e,i)=>{const t=await d.getContext(e,1,i);return n.createChatCompletionWithAugmentation(e,t,i)}},d={database:f,title:f[0].text,abstract:f[4].text,cosineSimilarityToDatabase:e=>{const i=(t,o)=>t.map((a,s)=>t[s]*o[s]).reduce((a,s)=>a+s);return d.database.map(t=>i(e,t.embedding))},getEmbedding:async(e,i)=>{const t="https://api.openai.com/v1/embeddings";try{return(await(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({input:e,model:"text-embedding-ada-002"})})).json()).data[0].embedding}catch(o){console.error("Error while creating embedding:",o)}},findNearestNeighbors:async(e,i,t)=>{const o=await d.getEmbedding(e,t);return d.cosineSimilarityToDatabase(o).map((r,h)=>({score:r,index:h})).sort((r,h)=>h.score-r.score).slice(0,i).map(r=>d.database[r.index].text)},getContext:async(e,i,t)=>(await d.findNearestNeighbors(e,i,t)).reduce((a,s)=>a+" "+s,"")};document.querySelector("#app").innerHTML=`
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
          <img src="${v}" alt="GitHub Logo" class="github-logo" />
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
`;const p=document.getElementById("query"),m=document.getElementById("messages");function b(){const e=document.getElementById("apiKeyPrompt");e.style.display="block"}function y(){const e=document.getElementById("apiKeyPrompt");e.style.display="none"}const g=async()=>{const e=c.getKey();(!e||e==="null"||e.length===0||!await c.checkValidity(e))&&b()};document.getElementById("submitApiKey").addEventListener("click",async()=>{const i=document.getElementById("apiKeyInput").value;await c.checkValidity(i)?(c.setKey(i),y()):document.getElementById("api-key-error-message").classList.remove("hidden")});document.getElementById("logout").addEventListener("click",async()=>{c.deleteKey(),await g()});g().then(()=>{});document.getElementById("query").addEventListener("keyup",function(e){e.key==="Enter"&&e.target.value.length>0&&document.getElementById("submit").click()});const u=(e,i)=>{const t=document.createElement("div");return t.classList.add("message-bubble"),t.classList.add(i?"user-message":"chatgpt-message"),t.textContent=e,t};n.init();document.getElementById("submit").addEventListener("click",async()=>{const e=p.value;p.value="";const i=u(e,!0);m.appendChild(i);const t=await n.askChatGPT(e,c.getKey()),o=u(t,!1);m.appendChild(o)});