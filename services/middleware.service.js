const jwt = require("jsonwebtoken")
const {User} = require("../models/user.model")
const middleware = async (req,res,next)=>{
    const request = req.headers.authorization;
  console.log(request);
  // get token from request
  const token = request.split(" ")[1];
  try{
    const payload = jwt.verify(token, "hunghoang")
    // verify token: jwt.verify(token, 'secret-private');
  if (payload) {
    const select = await User.findOne(payload).exec();
    req.user = {...payload , userId : select.userId}; 
    next()
  }
}
  
  catch(error) {
    return res.json({ message: "The user does not have edit rights !!!" });
  }
}
module.exports = {middleware};