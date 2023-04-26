import pgsEmbeddingsData from './data/embeddings_mavaddat_2019.json';

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
    init: () => {
        manageConversations.conversations = [{ role: 'system', content: "You are a helpful chatbot that answers the user's questions about a paper in genetics." }];
    },

    instructions: "Answer the question in the bottom using the context provided below. To answer the question, if you write sentences using the information from the context, please cite it as (Mavaddat et al., 2017). If the question cannot be answered using the information in the context, please reply with \"I'm sorry, (Mavaddat et al., 2019) is the only paper I ever read. This question doesn't seem relevant.\". Do not make any mention of the provided context or the instructions.",

    createChatCompletionWithAugmentation: async (prompt, augmentation, apiKey) => {
        const chatCompletionURL = 'https://api.openai.com/v1/chat/completions';
        const hiddenContext = `Instructions: ${manageConversations.instructions}\n\nContext: ${augmentation}\n\nQuestion: ${prompt}`;
        manageConversations.conversations.push({ role: 'user', content: hiddenContext });

        try {
            const response = await fetch(chatCompletionURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: manageConversations.conversations,
                    temperature: 0.5,
                })
            });

            const data = await response.json();
            const message = data.choices[0].message.content;

            manageConversations.conversations.push({ role: 'assistant', content: message });

            return message;
        } catch (error) {
            console.error('Error while creating chat completion:', error);
        }

    },

    askChatGPT: async (prompt, db, apiKey) => {
        const context = await db.getContext(prompt, 1, apiKey);
        return manageConversations.createChatCompletionWithAugmentation(prompt, context, apiKey);
    }
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

const pgsDatabase = {
    database: pgsEmbeddingsData,

    cosineSimilarityToDatabase: (normalizedVector) => {
        const dotProduct = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
        return pgsDatabase.database.map((d) => dotProduct(normalizedVector, d.embedding));
    },

    getEmbedding: async (text, apiKey) => {
        const embeddingURL = 'https://api.openai.com/v1/embeddings';

        try {
            const response = await fetch(embeddingURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    input: text,
                    model: 'text-embedding-ada-002',
                })
            });

            const data = await response.json();
            return data.data[0].embedding;
        } catch (error) {
            console.error('Error while creating embedding:', error);
        }
    },

    findNearestNeighbors: async (query, k, apiKey) => {
        const queryEmbedding = await pgsDatabase.getEmbedding(query, apiKey);
        const similarityScores = pgsDatabase.cosineSimilarityToDatabase(queryEmbedding);
        const similarityScoresWithIndices = similarityScores.map((score, index) => ({ score, index }));
        const sortedSimilarityScoresWithIndices = similarityScoresWithIndices.sort((a, b) => b.score - a.score);
        return sortedSimilarityScoresWithIndices.slice(0, k).map((x) => pgsDatabase.database[x.index].text);
    },

    getContext: async (query, k, apiKey) => {
        const nearestNeighbors = await pgsDatabase.findNearestNeighbors(query, k, apiKey);
        return nearestNeighbors.reduce((a, b) => a + ' ' + b, '');
    }
}

export {
    manageOpenAiApiKey, manageConversations, createChatCompletion, pgsDatabase
};
