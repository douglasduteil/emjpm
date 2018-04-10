const express = require("express");

const router = express.Router();
const queries = require("../db/queries");

// var csv = require("csvjson");
// var fs = require("fs");

// router.post("/upload", function(req, res, next) {
//   const file = fs.readFileSync("./mandataire.csv", "utf8");
//   const dataObj = csv.toObject(file);
//   queries
//     .uploadAll(dataObj)
//     .then(() => {
//       console.log("Import data done!");
//     })
//     .catch(() => {
//       console.log("Import data failed");
//     });
// });

/* GET home page. */

// function loggedIn(req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     res.redirect("http://localhost:3000/login");
//   }
// }

// router.get("/loginIn", function(req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     res.redirect("http://localhost:3000/login");
//   }
// });

router.use("/mandataires", require("./mandataires"));
router.use("/mesures", require("./mesures"));

// router.post("/services", function(req, res, next) {
//   queries
//     .getAllServices(req.body)
//     .then(function(services) {
//       res.status(200).json(services);
//     })
//     .catch(function(error) {
//       next(error);
//     });
// });

router.get("/ping", function(req, res, next) {
  if (!req.user) {
    res.status(401).json({ success: false });
  } else {
    res.json({ success: true });
  }
});

router.get("/", function(req, res, next) {
  res.json({ title: "API eMJPM" });
});

module.exports = router;