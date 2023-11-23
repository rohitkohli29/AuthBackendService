const userModel = require("../model/user.model");
const SignupData = async (req, res) => {
  const data = req.body;
  try {
    if (!data.email.endsWith("@gmail.com")) {
      return res.json({
        message: "Email is not valid",
        success: false,
        status: 401,
      });
    }
    const valid = await userModel.findOne({ email: data.email });

    if (valid === null) {
      const newUser = await userModel({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      
      const token = await newUser.generateJwt();
      await newUser.save();


      // Set the JWT token as a cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        credentials : true,
      });
      
      res
        .status(200)
        .json({ message: "Sign in SuccessFully", success: true, token, username : newUser.username});
    } else {
      return res.json({
        message: "Email is Already Exists",
        success: false,
        status: 501,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "Internal Server Error", success: false });
  }
};


const checkLoginUser = async (req,res) => {
  const user = req.body;
  try{
    const findUser = await userModel.findOne({email : user.email, password : user.password})
    if(findUser !== null){
      const token = await findUser.generateJwt();
      res.json({message : 'SuccessFully Login !', success : true, status : 200, username : findUser.username, token : token});
    }else{
      console.log('not match');
      res.json({message : 'Invalid credentials !', success : false, status : 401});
    }
  }catch(err){
    res.status(501).json({message : 'Internal Server error !', succes : false});
  }
}


const about = (req,res) => {
    return res.status(200).json({message : 'User authanticated !', success : true});
}

module.exports = { SignupData , checkLoginUser, about};
