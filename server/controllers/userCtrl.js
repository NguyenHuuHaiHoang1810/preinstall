const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payments = require("../models/paymentModel");

const userCtrl = {
  register: async (req, res) => {
    //?async bất đồng bộ
    try {
      const { name, email, password } = req.body; //*Khai báo các biến cho lớp body

      const user = await Users.findOne({ email });

      if (user) return res.status(400).json({ msg: "Email đã tồn tại!!" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Mật khẩu phải chứa ít nhất 6 ký tự!!" });

      //todo Password encryptalize (Mã hóa mật khẩu)
      const passwordhash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordhash,
      });

      //? Lưu thông tin người dùng vào database user
      await newUser.save();

      //? Tạo phương thức xác thực bằng jsonwebtoken
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //!7d
      });

      res.json({ accesstoken });
      res.json({ msg: "Bạn đã đăng ký thành công tài khoản mua sắm!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "Tên đăng nhập không tồn tại!" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Sai mật khẩu!" });

      //!Néu như đăng nhập thành công thì tạo accesstoken (vé vào cửa) và refreshtoken
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // !7d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Đăng xuất thành công!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Hãy đăng nhập hoặc đăng ký!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Hãy đăng nhập hoặc đăng ký!" });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user)
        return res.status(400).json({ msg: "Người dùng không tồn tại!" });

      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: err.msg });
    }
  },

  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res.status(400).json({ msg: "Người dùng không tồn tại!" });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  },

  history: async (req, res) => {
    try {
      const history = await Payments.find({ user_id: req.user.id });
      res.josn(history);
    } catch (error) {
      res.status(400).json({ msg: error.msg });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
