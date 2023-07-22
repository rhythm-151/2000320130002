const express = require("express");
const { registerCompany, getAuthorizationToken } = require("../controller/companyRegistration");
const router = express.Router();

router.route("/register").post(registerCompany);
router.route("/auth").post(getAuthorizationToken)
module.exports = router;
