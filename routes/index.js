const express = require("express");
const router = express.Router();
const path = require("path");
const { storePath } = require("../config");
const { resize } = require("../libs/imageUtil");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/imgs/:filename", (req, res, next) => {
  const { filename } = req.params;
  const { w, q } = req.query;
  if (w || q) {
    resize(path.join(storePath, filename), Number(w), Number(q)).pipe(res);
  } else res.sendfile(path.join(storePath, filename));
});

module.exports = router;
