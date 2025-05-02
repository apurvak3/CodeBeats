const express = require('express');
const router = express.Router();
const { generatePlaylistFromPrompt } = require('../controllers/playlistController');

router.post('/', async (req, res) => {
    const { prompt } = req.body;
    try {
        const tracks = await generatePlaylistFromPrompt(prompt);
        res.json({ tracks });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong." });
    }
});

module.exports = router;
