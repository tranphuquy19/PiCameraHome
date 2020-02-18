var express = require("express");
var router = express.Router();
var path = require("path");
var { storePath } = require("../config");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/imgs/:filename", (req, res, next) => {
  const { filename } = req.params;
  res.sendfile(path.join(storePath, filename));
});

module.exports = router;
