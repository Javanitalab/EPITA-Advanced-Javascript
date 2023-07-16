# How to run
install docker and run the dockerfile! 

# API for verify
since the question and the code already written wasn't specifying what is the request body, I designed my own request body.
it's like this:
POST:http://38.242.149.105:9000/game/verif
{
    "word":"",
    "game_id":"64b40bdd925a3014a030c9b6"
}


## The game ( Assignment )
The user can create a game, in which, he will search for a word.
You save each try and the result.

For example
your search for lions

the user sends lotor
you send 10x0x

Where x is not good
and 1 is good
and 0 is not at the right position

The response should be like this

```javascript
{
    "word": "lotor",
    "response": "10X0x"
    "game": {}
}
```

## Things to do

- Add vérification to the route already created
- Finished the verify route to send the response to the user
- Finished the CRUD of Word
