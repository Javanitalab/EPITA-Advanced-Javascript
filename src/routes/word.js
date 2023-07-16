const express = require('express');
const Router = express.Router();

const WordModel = require('../models/word');

Router.post('/', async (request, response) => {
    const { word } = request.body;

    const wordModel = new WordModel({ 
        name: word
    });

    try {

        await wordModel.save();

        return response.status(200).json({
            "msg": word
        });

    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
});

// Get all words
Router.get('/', async (request, response) => {
    try {
      const words = await WordModel.find();
      return response.json(words);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  });
  

module.exports = Router;