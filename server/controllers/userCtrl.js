const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const userCtrl = {
  register: async (req, res) => {
    //?async bất đồng bộ
    try {
      const { name, email, password } = req.body;  //*Khai báo các biến cho lớp body

        const user = await Users.findOne({email})
        
        if(user) return res.status(400).json({msg:"Email đã tồn tại!!"})

        if(password.length < 6)
            return res.status(400).json({msg:"Mật khẩu phải chứa ít nhất 6 ký tự!!"})

        //Password encryptalize (Mã hóa mật khẩu)
        const passwordhash = await bcrypt.hash(password,10)
        const newUser = new Users({
            name,email,password:passwordhash
        })
        
        res.json({msg:"Bạn đã đăng ký thành công tài khoản!"})

    } catch (error) {    //!Nếu nhập lỗi thì thể hiện lỗi
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
