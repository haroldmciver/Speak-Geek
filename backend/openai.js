const open_api_key = import.meta.env.VITE_OPENAI_API_KEY;
// const open_api_key = "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"
const url = "https://api.openai.com/v1/chat/completions";  // Adjust the URL to the correct endpoint if needed

const question = 'Tell me a time where you had problem in a group setting.';

const getFeedback = async (prompt) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${open_api_key}`
            },
            body: JSON.stringify({
                'model': 'gpt-3.5-turbo',
                'messages': [{ "role": "user", "content": prompt + ". Your response should be less than or equal to 100 words."}]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices && data.choices[0] ? data.choices[0].message.content.trim() : null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};  


export { getFeedback };
