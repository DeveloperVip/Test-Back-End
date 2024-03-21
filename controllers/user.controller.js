const express = require("express");
const userRouter = express.Router();
const middleware = require("../services/middleware.service")
const {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../services/user.service");

//get method
userRouter.get("/", async (req, res) => {
  const user = await getAllUser();
  res.send(user);
});
//create
userRouter.post("/create-user", async (req, res) => {
  const newUser = await createUser(req.body);
  res.send(newUser);
});
//update
userRouter.put("/update-user/:id",middleware, async (req, res) => {
  const id = req.params.id;
  const update = await updateUser(id, req.body);
  res.send(update);
});
//delete
userRouter.delete("/delete-user/:id",middleware, async (req, res) => {
  const id = req.params.id;
  const deleted = await deleteUser(id);
  res.send(deleted);
});

module.exports={userRouter};
