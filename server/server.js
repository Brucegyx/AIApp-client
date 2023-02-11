const router = require('express').Router();
const { Configuration, OpenAIApi } = require('openai');

const apiConfig = new Configuration ({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(apiConfig);

router.get('/models', async (req, res) => {
  try{
    const engineList = await openai.listModels();
    res.status(200).send(engineList);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
})

router.post('/textcompletion', async(req, res, next) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    console.log(response.data.choices);
    res.status(200).send(response.data.choices[0]);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router; 