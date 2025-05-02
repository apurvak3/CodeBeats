const axios = require('axios');
require('dotenv').config();

// 🔁 Step 1: Convert user prompt to genre using GPT
async function getGenreFromPrompt(prompt) {
    const gptResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You're a helpful assistant that converts music moods or coding vibes into music genres."
                },
                {
                    role: "user",
                    content: `Convert this into a Spotify genre or mood tag: "${prompt}"`
                }
            ],
            temperature: 0.7,
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            }
        }
    );

    const genre = gptResponse.data.choices[0].message.content.trim();
    return genre;
}

