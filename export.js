const checkAPIKeyValidity = async (apiKey) => {
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
};

const setOpenAiApiKey = (apiKey) => {
    localStorage.OPENAI_API_KEY = apiKey;
}

const getOpenAiApiKey = () => {
    return localStorage.OPENAI_API_KEY;
}

const deleteOpenAiApiKey = () => {
    delete localStorage.OPENAI_API_KEY;
}

export {
    checkAPIKeyValidity,
    setOpenAiApiKey,
    getOpenAiApiKey,
    deleteOpenAiApiKey
};
