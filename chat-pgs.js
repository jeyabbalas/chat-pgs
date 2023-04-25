const manageOpenAiApiKey = {
    async checkValidity(apiKey) {
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
    },

    setKey(apiKey) {
        localStorage.OPENAI_API_KEY = apiKey;
    },

    getKey() {
        return localStorage.OPENAI_API_KEY;
    },

    deleteKey() {
        delete localStorage.OPENAI_API_KEY;
    }
}

const manageConversations = {

}

const createChatCompletion = async (prompt, chatContext, apiKey) => {
    const chatCompletionURL = 'https://api.openai.com/v1/chat/completions';

    chatContext.push({ role: 'user', content: prompt });

    try {
        const response = await fetch(chatCompletionURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: chatContext,
            })
        });

        const data = await response.json();
        const message = data.choices[0].message.content;

        chatContext.push({ role: 'assistant', content: message });

        return message;
    } catch (error) {
        console.error('Error while creating chat completion:', error);
    }
}

const managePgsDatabase = {

}

export {
    manageOpenAiApiKey, createChatCompletion
};
