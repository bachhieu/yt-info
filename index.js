const express = require("express");
const GoogleSheet = require("./google-sheet");
const Youtube = require("./yt-info");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const port = 3000;
const run = async () => {
  GoogleSheet.connect();
  app.post("/sheet", GoogleSheet.uploadData);
  app.get("/sheet", GoogleSheet.loadInfo);
  app.get("/info/:id", Youtube.getInfoByChannelId);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

module.exports = run;
