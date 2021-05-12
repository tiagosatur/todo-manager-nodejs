const app = require("./");

app.listen(3333, function () {
  console.log("Server listening on port", this.address().port);
});
