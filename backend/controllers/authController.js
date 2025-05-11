const userModel = require("../models/user");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// id with payload to genrate token

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/*
1-register new user 
 */
const register = (req, res) => {
  const {
    username,
    firstName,
    lastName,
    country,
    age,
    email,
    password,
    role: roleName,
  } = req.body;
  Role.findOne({ name: roleName })
    .then((roleDoc) => {
      if (!roleDoc) {
        return res.status(400).json({
          success: false,
          message: "Role not found",
        });
      }

      //2- create new doc for new user

      const user = new userModel({
        username,
        firstName,
        lastName,
        age,
        country,
        email: email.toLowerCase(),
        password,
        role: roleDoc._id,
      });

      //3-save user into database

      return user.save();
    })
    .then((newUser) => {
      //4 - genrate token
      const token = generateToken(newUser._id);
         return res.status(201).json({
        success: true,
        message: "Account created successfully",
        token , user:{
          id: newUser._id,
          email : newUser.email,
          username: newUser.username
        }
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Email or username already exists",
        });
      }
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};
const login = (req, res) => {
  const { email, password } = req.body;

  userModel
    .findOne({ email: email.toLowerCase() })

    .populate("role", "name permissions -_id")

    .then((user) => {
      // 1) if there is no user
      if (!user) {
        return res.status(403).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      // 2) check using compare "password"
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(403).json({
            success: false,
            message: "Invalid email or password",
          });
        }
        // 3) genrate token
        const token = generateToken(user._id);
       return res.json({
          success: true,
          message: "Logged in successfully",
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            role: user.role.name,
            permissions: user.role.permissions,
          },
        });
      });
    })
    // 4) any erorr Un Excpected
    .catch((err) => {
     return res
        .status(500)
        .json({ success: false, message: "Server Error", error: err.message });
    });
};
const getMe = (req, res) => {
  userModel
    .findById(req.user.id)
    .populate("role", "name permissions -_id")
    .select("-password")
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          role: user.role.name,
          permissions: user.role.permissions,
        },
      });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: "Server Error", error: err.message })
    );
};

module.exports = { register, login,getMe };