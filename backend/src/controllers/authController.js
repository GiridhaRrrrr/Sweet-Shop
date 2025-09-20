import User from "../models/User.js";
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  
  const user = await User.create({
      username,
      password,
  });

  if(user){
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d',});
    res.status(201).json({_id: user._id, username: user.username, role: user.role, token: token});
  }else {
    res.status(400).json({ message: 'Invalid user data' });
  }  
  
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({username});

  if(user && (await user.matchPassword(password))){
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d',});

    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: token,
    });
  } else{
    res.status(401).json({message : "Invalid username or password"});
  }
};
