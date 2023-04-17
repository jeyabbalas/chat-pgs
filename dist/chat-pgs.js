const a = {
  async checkApiKeyValidity(e) {
    const o = "https://api.openai.com/v1/engines";
    try {
      return (await fetch(o, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        }
      })).status === 200;
    } catch (t) {
      return console.error("Error while checking API key validity:", t), !1;
    }
  },
  setOpenAiApiKey(e) {
    localStorage.OPENAI_API_KEY = e;
  },
  getOpenAiApiKey() {
    return localStorage.OPENAI_API_KEY;
  },
  deleteOpenAiApiKey() {
    delete localStorage.OPENAI_API_KEY;
  }
}, s = async (e, o) => {
  const t = "https://api.openai.com/v1/chat/completions";
  try {
    return (await (await fetch(t, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: e }]
      })
    })).json()).choices[0].message.content;
  } catch (n) {
    console.error("Error while creating chat completion:", n);
  }
};
export {
  s as createChatCompletion,
  a as manageOpenAiApiKey
};
//# sourceMappingURL=chat-pgs.js.map
