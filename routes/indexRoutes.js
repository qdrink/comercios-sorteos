const express = require("express");
const router = express.Router();

//User Route
const userRoutes = require("./userRoutes");
const commerceRoutes = require("./commerceRoutes");
router.use("/v1/user", userRoutes);
router.use("/commerce", commerceRoutes)

module.exports = router;
