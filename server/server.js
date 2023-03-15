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
    // respond with the first respond choice from Davinci3 in JSON 
    res.status(200).send(response.data.choices[0]);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/codex', async (req, res, next) => {
  try {
    
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: req.body.prompt,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices);
    res.status(200).send(response.data.choices);
    
    //res.status(200).send({"result": "print(\"Hello World\!\")"})
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.post('/createimage', async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: req.body.size,
    });
    res.status(200).send(response.data.data[0].url);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.post('/chat-completion', async (req, res) => {
  try {
    if (!req.body.prompt) {throw Error("no request prompt")}
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: req.body.prompt}]
    });
    res.status(200).send(response.data.choices[0].message)
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
})


module.exports = router; 