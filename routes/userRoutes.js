const controller = require('../controllers/userControllers');

// User Controllers
let postData = controller.postData;
let addDataPage = controller.addDataPage;
let getData = controller.getData;
let homepage = controller.homepage;
let geteditdata = controller.geteditdata;
let putUpdateData = controller.putUpdateData;

const express = require("express");
let router = express.Router();

router
  .route("/postdata")
  .get(postData);

router
  .route("/adddata")
  .get(addDataPage);

router
  .route("/getdata")
  .get(getData);

router
  .route("/homepage")
  .get(homepage);

router
  .route("/editdata")
  .get(geteditdata);

router
  .route("/updatedata")
  .get(putUpdateData);


module.exports = router;