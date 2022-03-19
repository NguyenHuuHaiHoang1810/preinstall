const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      //res.json({ msg: "Bạn đã đăng ký thành công tài khoản mua sắm!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: (req, res) => {
    const rf_token = req.cookies.refreshtoken;
    res.json({ rf_token });
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
