const express = require("express");
const welcomeRouter = require("./routers/welcome-router");
const userRouter = require("./routers/users-router");
const authRouter = require("./auth/auth-router");
const server = express();
const cookieParser = require("cookie-parser");

server.use(express.json());
server.use(cookieParser());
server.use("/", welcomeRouter);
server.use("/users", userRouter);
server.use("/auth", authRouter);

server.use((err, req, res, next) => {
  res.status(500).json({
    message: "internal server error",
  });
});

module.exports = server;
