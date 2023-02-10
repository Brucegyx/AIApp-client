const router = require('express').Router();

router.post('/ask', (req, res, next) => {
  res.status(200).send({"message": "Answer!"});
});

module.exports = router;