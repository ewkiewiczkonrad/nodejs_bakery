const express = require("express");
const router = express.Router();
const checkAuth= require("../middleware/check-auth");


const toBakeController = require('../controllers/toBake');


router.get("/",checkAuth, toBakeController.toBake_get);

router.post("/", checkAuth, toBakeController.toBake_post);

router.get("/:toBakeId",checkAuth, toBakeController.toBake_get_id);

router.delete("/:toBakeId",checkAuth, toBakeController.toBake_delete);

module.exports = router;