const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '6d02e5d81f8147568ec7d5ba86129ee3'
  });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('api unavailable'))
}
const handleImage = (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if(entries.length) {
            res.json(entries[0]);
        } else {
            res.status(400).json('not found')
        }
    })
    .catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}