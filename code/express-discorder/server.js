require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 3000;

const proGamerGif = "https://media.giphy.com/media/y0NFayaBeiWEU/giphy.gif"

app.use(express.json());

app.get("/", (req, res) => res.send(`
  <html>
    <head><title>Success!</title></head>
    <body>
      <h1>You did it!</h1>
      <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
    </body>
  </html>
`));

app.post("/github", (req, res) => {
  const content = `Github user '${req.body.sender.login} just starred your repository: ${req.body.repository.name}.  What a fag!:moyai::moyai::moyai::moyai:`;
  const avatarUrl = req.body.sender.avatar_url;
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    })
    .then((discordResponse) => {
      console.log("Success!");
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to Discord: ${err}`));
});

app.post("/steam", (req, res) => {
  const playtime = +(req.body.playtime_forever / 60).toFixed(2);
  const game = req.body.name
  const content = `Alex just got done playing ${game}!  His playtime is now at: ${playtime} hours.  What a faggot!`;
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: proGamerGif,
          },
        },
      ],
    })
    .then((discordResponse) => {
      console.log(discordResponse);
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to Discord: ${err}`));
});

app.use((error, req, res, next) => {
  res.status(500)
  res.send({error: error})
  console.error(error.stack)
  next(error)
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
