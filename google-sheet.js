const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();
let doc;
class GoogleSheet {
  constructor(sheetId) {
    doc = new GoogleSpreadsheet(sheetId);
  }

  async connect() {
    await doc.useServiceAccountAuth({
      client_email: "demo-341@config-database-cddaa.iam.gserviceaccount.com",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDFlwRM+9rxrAPx\nHw+ll/WibYcSsnzLW5y4PpzKstAnNi01us0h2yjs8nwaz5KPfQt9n7dHWh1IzhLj\nOs0MpQ9wA7A+Sn+OkjebGw6kkTI177ypxM67oQXPJyNsyHTtTDdgqSQ+CnF3/eUu\nLAzP3fr+7LHMr6YqCOWR2dLlyBZTBbTfIua6vSU/Ex7LKDNANp+uX4dHgs1JOpqJ\nQVdH4/uFur+wbNgp3mNTU8F6273SrPIpwyqiHbyH5ijVQBshmV0s8MkYc6gEfMPz\nubZMaFzdLDhtJzKEVdPBYqKQEIJNlNQfZ3gSUdbhzs1wDAhnqjYDtJM6Q2Z9L9UI\nbtgAZ1s/AgMBAAECggEACiqXAg8DWOPs3/8lIvQKo2zXQlMEsMHp8mDmWFeS9jGH\nafhOjatlE6v2TrrXY6KfcLtDBtzQHOrddeuUmU302WKXMt1Kat+DFOvzeOwvlS7c\nmi+SI31JezscS4CU45DEWKjbQIXxCKd7n0CM+DUHsQ4kp89x0T/b8AExJLmCzIqr\nc93xnXqxwhMO9rWK6TQ7MarW6zEPRHLcNAm+QUjMnjoyieKR4vD38snl8rzYOFnI\net/srHshQDyjo7Da4zt4f+QkAN88wQsCujTEsHCFcpkl6jmPqUaT1M8uUrNzReAe\ngjKiCFYUpqGNlUEOW9dZMkxc56SjSCc4fqTIWbwIYQKBgQDsGvG957fSlmpkbneo\ncLpNxSi86konrcS6SVuGYsg5TJkEVzt93Gd6489jXP2O45P/F5wLodJ6AHNA4Zhw\nQyeWSHVhVkg8HTFKwJ4LA/AbEaUM6rtnwr0+nK3B3KrqPEViRZLviEz2Bo6CBH8h\nJbO/g/lzYtpRdDdgQxKE6j4ORQKBgQDWPUDWklBjmzw8gWVpMoywNePXkl3QAfEe\nlkxI69xzCYtaeBVuiMS70D/7+wlid+djE/G1Smf6TU2QKfnErMQYBdaEOi4H+O0M\nFkwJopHtIso+YpMge0bPMTt5AQDtTOCSxpyjpQmpiHvMktP+RN6ygIYKlWU3Sl/1\n/vZdhjBtswKBgQCQUjgKmSWoOAF4un2yHJYFC8tHDv+dGX7zT/v+PUuems+984SN\n/rfSSoZuel0ThtDkUQ41ngkGQlgxBLUliiccmdYGVbN5625B/1Ob8CBIq5R0PNep\nKUR8jVE4+yYOYCEZXOXgPTSt/nwFxbHgFSe2nXlRqs9AkwV2dglP7c9Y8QKBgQCV\n72RzRw7vxvLPPZflmbUQlYaRliQFsXY4e+ODnV45PFLEzAnjw+A7uTEufrBAs73C\nf3DH+fzvFi7UWCwvUuIiFePdwoH4nmP385rfm2EZXyG/q2lgcCZMVx5SPzuQ2B7L\nWijB9nzeo2BQ+elXqIda0cv9mDSwD2M9XGS7a3B1NQKBgQDo4x6gmZpmvclqhLvu\nU7cnxP9lEcansyCUer93sjLuROqn4z2UzCzXjf+5SjoY3L7v5n3wfAW6yknupmm4\nD1BIReOSEcFCt/fTuGPc+e+lszo2Olp1catIq9xC0eKQQmDMdSsy/n+1vkWSWWRs\nBIt+v+oNTAuPYie3DR6Fw7kReA==\n-----END PRIVATE KEY-----\n",
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
      res.send("T???o d??? li???u th??nh c??ng!");
    } catch (e) {
      res.send("kh??ng t???o ???????c d??? li???u");
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
      res.json("kh??ng xem ???????c d??? li???u");
    }
  }
}

module.exports = GoogleSheet;
