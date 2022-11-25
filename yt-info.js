const ytch = require("yt-channel-info");

class Youtube {
  async getInfoByChannelId(req, res) {
    try {
      const { id } = req.params;
      const payload = {
        channelId: id, // Required
        channelIdType: 0,
      };
      let viewCount = 0;
      const { author, authorId, authorUrl, subscriberCount, alertMessage } =
        await ytch.getChannelInfo(payload);
      const getChannelHome = await ytch.getChannelHome(payload);
      if (alertMessage) {
        console.log("Channel could not be found.");
        // throw response.alertMessage
      }
      if (!getChannelHome.alertMessage) {
        getChannelHome.items.forEach((items) => {
          items.items.forEach((item) => {
            viewCount += item.viewCount;
          });
        });
      } else {
        res.send("Channel could not be found.");
        // throw response.alertMessage
      }
      res.json({
        author,
        authorId,
        authorUrl,
        subscriberCount,
        viewCount,
      });
    } catch (e) {
      console.log(
        "🚀 ~ file: yt-info.js ~ line 37 ~ Youtube ~ getInfoByChannelId ~ e",
        e
      );
      res.send("Sai channel Id hoặc không tìm thấu channel");
    }
  }
}

module.exports = new Youtube();
