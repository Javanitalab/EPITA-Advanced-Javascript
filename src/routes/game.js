const express = require('express');
const WordModel = require('../models/word');
const GameModel = require("../models/game");

const Router = express.Router();

const isLogged = (request, response, next) => {
    if (request.session.user) {
        console.log('test');
        next();
    } else {
        next();
    }
}

Router.post('/', async (request, response) => {
    const word = await WordModel.aggregate([{
        $sample: {size: 1}
    }]);

    console.log(request.session)
    let game = new GameModel({
        word: word[0]._id,
        tries: [],
        user: request.session.user._id
    });

    try {
        await game.save();

        game = await GameModel.find({
            _id: game._id
        }).populate('user').populate('word')

        return response.status(200).json({
            "msg": game
        });
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
});

Router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        const game = await GameModel.findOne({_id: id});

        return response.status(200).json({
            "msg": game
        });
    } catch (error) {
        return response.status(500).json({
            "error": error.message
        });
    }
})

Router.post('/verif', isLogged, async (request, response) => {
    const userWord = request.body.word;
    const gameId = request.body.game_id; // Assuming the user provides the game ID
  
    try {
      // Fetch the game details from MongoDB using the provided gameId
      const game = await GameModel.findById(gameId).populate('word');
      
      if (!game) {
        return response.status(404).json({
          "error": "Game not found"
        });
      }
  
      const targetWord = game.word.name; // Get the target word from the game
  
      if (typeof userWord === 'undefined') {
        return response.status(400).json({
          "msg": "You have to send 'word' value"
        });
      }
  
      // Check if the user's word matches the target word
      if (userWord === targetWord) {
        // If the word is correct, set the game status to "completed" (you need to implement this)
        // For example: game.status = "completed"; await game.save();
  
        return response.status(200).json({
          "word": userWord,
          "response": "1".repeat(targetWord.length),
          "game": game // Provide the game object if needed
        });
      }
  
      // Generate the response string based on the matching characters and their positions
      let responseString = '';
      for (let i = 0; i < targetWord.length; i++) {
        if (userWord[i] === targetWord[i]) {
          responseString += "1";
        } else if (targetWord.includes(userWord[i])) {
          responseString += "0";
        } else {
          responseString += "x";
        }
      }
  
      return response.status(200).json({
        "word": userWord,
        "response": responseString,
        "game": game // Provide the game object if needed
      });
  
    } catch (error) {
      return response.status(500).json({
        "error": error.message
      });
    }
  })

module.exports = Router;