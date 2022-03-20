const Users = require("../models/userModel")

const authAdmin = async(req,res,next) => {
    try {
        //?Xem thông tin người dùng bằng Id
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.role===0)
            return res.status(400).json({msg:"Bạn không có quyền truy cập!!"})
        next()
    } catch (err) {
        return res.status(500).json({msg:err.msg})
    }
}

module.exports = authAdmin