const Twitter = require("twitter");
const Sheet = require("./sheet");

(async function () {
  // Connect to twitter via api
  const client = new Twitter({
    consumer_key: "4HSNQ5raqsiLhGxKtZAD8j6bl",
    consumer_secret: "whOxuJp22AVUDw5y3rG9oXQohqnRUqgoSzVx4dhLMCChfNX6Gh",
    access_token_key: "1309128019353759752-iN8RIPIFwWY0I5zgD9XehdllxKox48",
    access_token_secret: "clSK1BSiJmGPDdR7xfygvXLhuBEKifJPz8BD4w4rGWiIP",
  });

  // Pull next tweet from sheet
  const sheet = new Sheet();
  await sheet.load();
  const quotes = await sheet.getRows();
  const status = quotes[0].quote;

  // send tweet
  client.post("statuses/update", { status }, function (error, tweet, response) {
    if (error) throw error;
    console.log(tweet); // Tweet body.
    console.log(response); // Raw response object.
  });

  // remove tweet from sheet
  await quotes[0].delete();

  console.log("tweeted", quotes[0].quote);
})();
