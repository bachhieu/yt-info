const express = require("express");
const GoogleSheet = require("./google-sheet");
const Youtube = require("./yt-info");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const port = 3000;
const run = async ({ sheetId }) => {
  const googleSheet = new GoogleSheet(sheetId);
  googleSheet.connect();
  app.post("/sheet", googleSheet.uploadData);
  app.get("/sheet", googleSheet.loadInfo);
  app.get("/info/:id", Youtube.getInfoByChannelId);

  app.listen(port, () => {
    console.log(` app listening on port ${port}`);
  });
};

module.exports = run;
