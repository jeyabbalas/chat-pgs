const manageOpenAiApiKey = {
    async checkApiKeyValidity(apiKey) {
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

    setOpenAiApiKey(apiKey) {
        localStorage.OPENAI_API_KEY = apiKey;
    },

    getOpenAiApiKey() {
        return localStorage.OPENAI_API_KEY;
    },

    deleteOpenAiApiKey() {
        delete localStorage.OPENAI_API_KEY;
    }
}

const manageConversations = {

}

const createChatCompletion = async (prompt, apiKey) => {
    const chatCompletionURL = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(chatCompletionURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: prompt}],
            })
        });

        const data = await response.json();

        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error while creating chat completion:', error);
    }
}

export {
    manageOpenAiApiKey, createChatCompletion
};
