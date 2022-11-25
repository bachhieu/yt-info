# How to run?


run : `npm i yt-info yt-channel-info@3.0.0`

### index.js
```
const run = require("info-yt");

async function main() {
  const input = {
    sheetId: "1yNq-8tSfU_oPtiODsmTJ_tRFDeRbJedvOOiFPQJ96dk",
  };
  await run(input);
  await new Promise(() => {});
}

main();


```
### output
`app listening on port 3000`
