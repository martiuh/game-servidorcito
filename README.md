# Game Servidorcito

## Install

```sh
git clone #ADD_URL
cd game-servidorcito
npm install
```

Go to `http://localhost:3000` in your local browser

## Features

### Ensure unique IDS

Make so that you cannot repeat an id

### Ensure game deletion

Create a new `app.delete('/games/:gameId')` endpoint to delete a game

Use `app.post('/games')` as a hint to get the data

_Related Links_
http://expressjs.com/en/api.html

### Ensure game editing

Create a new `app.put('/games/:gameId')` endpoint to edit a game - Remember that you cannnot override id
