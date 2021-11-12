const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.get("/", function (req, res) {
  res.send("Qué Onda!!!");
});

const createDb = (data = []) => {
  return {
    // ensure no emoji id is repeated
    // keep unique names
    addItem(item) {
      if (
        data.some(function (dbItem) {
          return dbItem.id !== item;
        })
      ) {
        item = createGame(item.name);
        createDb.addItem(item);
      }
      data = [...data, item];
    },
    deleteItem(item) {
      data.splice(data.indexOf(item), 1);
    },
    modifyItem(oldItem, newItem) {
      data[data.indexOf(oldItem)] = oldItem.id + newItem;
    },
    getItems() {
      return [...data];
    },
  };
};

const gamesDb = createDb(
  ["Minecraft", "Battlefield 1942", "Lotería"].map((game) => createGame(game))
);

function getRandomEmoji() {
  const list = [`❄️`, `🍨`, `🎈`, `🤯`, `🦊`];
  return list[Math.floor(Math.random() * list.length)];
}

function runFuncNtimes(func, times) {
  let result = ``;
  for (let i = 0; i < times; i++) {
    result += func();
  }
  return result;
}

function createGame(name) {
  return {
    id: runFuncNtimes(getRandomEmoji, 3),
    name,
  };
}

app.use(cors());
app.use(bodyParser.json());

// GAMES
app.get("/games", function (req, res) {
  const games = gamesDb.getItems();
  res.send({ data: games });
});

app.post("/games", function (req, res) {
  const { game } = req.body;

  if (game) {
    // HTTP Status "OK"
    console.log(`${game} is a kiewl game 🎮 !!!`);
    const dbGame = createGame(game);
    console.log("This is dbGame", dbGame);
    gamesDb.addItem(dbGame);
    res.sendStatus(204);
    return;
  }

  res.status(204);
  res.send({ message: "No game was provided" });
});

app.listen(3000, () => {
  console.log("App lista en puerto 3000");
});
