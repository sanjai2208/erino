import User from "../models/User.js";
import jwt from "jsonwebtoken";

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
    });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const login =  async (req, res, next)=> {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({success : false, error : "please provide email and password"});
        }

        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch)
        {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        sendTokenResponse(user, 200, res);

        
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}
export const logout = async (req, res, next) => {
  res.cookie('token','none',{
    expires : new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  })
  res.status(200).json({
    success : true,
    data:{}
  })
}

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // <-- line 66 maybe
    res.status(200).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
