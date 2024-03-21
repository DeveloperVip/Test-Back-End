//create profile
const createProfile = async (data) => {
  const { personalSkills, interests, personalGoals } = data;
  const personalInfo = await Profile.create({
    personalSkills: personalSkills,
    interests: interests,
    personalGoals: personalGoals,
  });
  return personalInfo;
};
//get profile
const getPersonalInfo = async () => {
  const personalInfo = await PersonalInfo.find().lean();
  return personalInfo;
};
//update profile
const updatePersonalInfo = async (personalInfoId, updatedData) => {
  const { personalSkills, interests, personalGoals } = updatedData;
  const updatedPersonalInfo = await PersonalInfo.findByIdAndUpdate(
    personalInfoId,
    {
      personalSkills,
      interests,
      personalGoals,
    },
    { new: true }
  );
  return updatedPersonalInfo;
};
//delete profile
const deletePersonalInfo= async (personalInfoId)=>{
    const deletedPersonalInfo = await PersonalInfo.findByIdAndDelete(personalInfoId);
    return deletedPersonalInfo;
}

module.exports={
    createProfile,
    getPersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo
}