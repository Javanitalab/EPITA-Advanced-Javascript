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

  // Update a word by ID
Router.put('/:id', async (request, response) => {
    try {
      const updatedWord = await WordModel.findByIdAndUpdate(
        request.params.id,
        { name: request.body.word },
        { new: true }
      );
      if (!updatedWord) {
        return response.status(404).json({ error: 'Word not found' });
      }
      return response.json(updatedWord);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  });

  // Delete a word by ID
Router.delete('/:id', async (request, response) => {
    try {
      const deletedWord = await WordModel.findByIdAndRemove(request.params.id);
      if (!deletedWord) {
        return response.status(404).json({ error: 'Word not found' });
      }
      return response.json({ message: 'Word deleted successfully' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  });

  // Get a word by ID
Router.get('/:id', async (request, response) => {
    try {
      const word = await WordModel.findById(request.params.id);
      if (!word) {
        return response.status(404).json({ error: 'Word not found' });
      }
      return response.json(word);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  });
  
  
  
  

module.exports = Router;