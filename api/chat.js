import dotenv from 'dotenv';
dotenv.config();


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    try {
        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await openaiRes.json();
        res.status(200).json({ message: data.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error calling OpenAI API' });
    }
}
