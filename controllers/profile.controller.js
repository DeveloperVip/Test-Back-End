const express = require("express");
const profileRouter = express.Router();
const {
  createProfile,
  getPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
} = require("../services/profile.service");
//get
profileRouter.get("/", async (req, res) => {
  const profile = await getPersonalInfo();
  res.send(profile);
});
//create
profileRouter.post("/create-profile", async (req, res) => {
  const newProfile = await createProfile(req.body);
  res.json(newProfile);
});
//update
profileRouter.put("/update-profile/:id", async (req, res) => {
  const id = req.params.id;
  const updateProfile = await updatePersonalInfo(id, req.body);
  res.send(updateProfile);
});
//delete
profileRouter.delete("/delete-profile/:id", async (req, res) => {
  const id = req.params.id;
  const deleteProfile = await deletePersonalInfo(id);
  res.send(deleteProfile);
});
module.exports = { profileRouter };
