const i = {
  async checkApiKeyValidity(e) {
    const t = "https://api.openai.com/v1/engines";
    try {
      return (await fetch(t, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e}`
        }
      })).status === 200;
    } catch (o) {
      return console.error("Error while checking API key validity:", o), !1;
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
}, c = async (e, t, o) => {
  const a = "https://api.openai.com/v1/chat/completions";
  t.push({ role: "user", content: e });
  try {
    const r = (await (await fetch(a, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${o}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: t
      })
    })).json()).choices[0].message.content;
    return t.push({ role: "assistant", content: r }), r;
  } catch (n) {
    console.error("Error while creating chat completion:", n);
  }
};
export {
  c as createChatCompletion,
  i as manageOpenAiApiKey
};
//# sourceMappingURL=chat-pgs.js.map
