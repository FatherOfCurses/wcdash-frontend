var express = require("express");
var app = express();
app.use(express.static('/src/app/app.module.ts')); // myApp will be the same folder name.

app.get("/", function (req, res,next) {
 res.redirect("/");
});

app.listen(port, () => {
  console.log('RPA Dash frontend server started on: ' + port);
});
