import User from "../models/user_model.js";
import auth from "../common/auth.js";
import { sendcookie } from "../utils/user_utils.js";

export const getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      itemsPerPage = 10,
      search = "",
      role, // Role parameter for filtering
    } = req.query;

    // Define the search query
    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    // Include role-based filtering if role parameter is provided
    if (role) {
      searchQuery.role = role;
    }

    // Calculate the number of documents to skip
    const skipItems = (page - 1) * itemsPerPage;

    // Find users based on search query, role filter, and pagination
    const users = await User.find(searchQuery)
      .skip(skipItems)
      .limit(parseInt(itemsPerPage));

    // Count total number of users for pagination
    const totalUsers = await User.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    res.status(200).json({
      success: true,
      users,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("inside login")

    console.log(req.body)
    const user = await User.findOne({ email },{_id:1,password:1,name:1,email:1});
    console.log("user: ",user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Register first",
      });
    }

    // const encrypted = await auth.hashcompare(password, user.password);
    const encrypted = await auth.hashcompare(password,user.password)
    if (!encrypted) {
      return res.status(404).json({
        success: false,
        message: "your password is incorrect",
      });
    }

    sendcookie(user, res, `welcome back,${user.name}`, 201);
  } catch (e) {
    throw next(e);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    // const hashedpassword = await bcrypt.hash(password, 10);
    const hashpassword = await auth.hashedPassword(password)
    user = await User.create({ name, email, password: hashpassword });

    sendcookie(user, res, "successfully registered", 201);
    
  } catch (e) {
    throw next(e);
  }
};

export const getMyprofile = async (req, res, next) => {
  try {
    // 2nd method by {Abhisekhsuru}
    // const { id } = req.query;
    // const user = await User.findById(id);
    //without authentication
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      message: `your profile is found ${req.user.name}`,
      user: user,
    });
  } catch (e) {
    throw next(e);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(0),
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully logout",
        user: req.user,
      });
  } catch (e) {
    throw next(e);
  }
};
