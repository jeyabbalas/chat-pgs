const r = async (e) => {
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
}, n = (e) => {
  localStorage.OPENAI_API_KEY = e;
}, a = () => localStorage.OPENAI_API_KEY, s = () => {
  delete localStorage.OPENAI_API_KEY;
};
export {
  r as checkAPIKeyValidity,
  s as deleteOpenAiApiKey,
  a as getOpenAiApiKey,
  n as setOpenAiApiKey
};
//# sourceMappingURL=chat-pgs.js.map
