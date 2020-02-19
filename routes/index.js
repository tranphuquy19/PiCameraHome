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
  const { w, q, b } = req.query;
  let width = w ? Number(w) : 1000;
  let quality = q ? Number(q) : 80;
  let brightness = b ? Number(b) : 2;
  if (
    width < 0 ||
    width > 1000 ||
    quality < 1 ||
    quality > 100 ||
    brightness < 0 ||
    brightness > 5
  ) {
    resize(path.join(storePath, filename), 300, 70, 2).pipe(res);
  } else {
    console.log({ width, quality, brightness });
    resize(path.join(storePath, filename), width, quality, brightness).pipe(
      res
    );
  }
});

module.exports = router;
