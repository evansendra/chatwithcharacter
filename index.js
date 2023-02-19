// a express server, which will handle api requests coming in, and respond with a json object, it will use body parser as well as cors
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message, character } = req.body;
    const prompt = `Pretend you are ${character}.  Answer with content that's simlar to what ${character} would say.
        Person: ${message}
        ${character}:`;
    console.log(prompt);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 100,
        temperature: 0,
    });
    console.log(response.data);
    if (response.data) {
        if (response.data.choices[0].text) {
            res.json({message: response.data.choices[0].text});
        }
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});