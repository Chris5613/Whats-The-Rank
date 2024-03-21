const express = require("express");
const {
  getAllUsers,
  createUser,
  AddPointByUsername,
  getOneUserByUuid,
  multiplayerWon,
  multiplayerLost,
} = require("../controllers/userControllers");

const router = express.Router();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
});

router.get("/allusers", limiter, getAllUsers);
router.post("/saveuser", limiter, createUser);
router.get("/user/:uuid", limiter, getOneUserByUuid);

router.put("/updatepoints", limiter, AddPointByUsername);
router.put("/multiplayerwon", limiter, multiplayerWon);
router.put("/multiplayerlost", limiter, multiplayerLost);

module.exports = router;
