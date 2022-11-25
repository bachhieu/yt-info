const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();
const doc = new GoogleSpreadsheet(
  "1yNq-8tSfU_oPtiODsmTJ_tRFDeRbJedvOOiFPQJ96dk"
);
class GoogleSheet {
  async connect() {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
  }
  async uploadData(req, res) {
    try {
      const { channel, cookie, role } = req.body;

      await doc.loadInfo();
      await doc.sheetsByIndex[0].addRow({
        channel,
        cookie,
        role,
      });
      res.send("Tạo dữ liệu thành công!");
    } catch (e) {
      console.log(
        "🚀 ~ file: google-sheet.js ~ line 28 ~ GoogleSheet ~ uploadData ~ e",
        e
      );
      res.json("không tạo được dữ liệu");
    }
  }
  async loadInfo(req, res) {
    try {
      await doc.loadInfo();
      const result = await doc.sheetsByIndex.map((sheet) => ({
        title: sheet.title,
        index: sheet.index,
      }));

      res.send(result);
    } catch (e) {
      res.json("không xem được dữ liệu");
    }
  }
}

module.exports = new GoogleSheet();
