const router = require ('express').Router
const cloudinary = require ('cloudinary')
const auth = require ('../middleware/authAdmin')

//we will upload image on cloudinary

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

//upload image

router.post('/upload',(rep,res)=>{
    try{
        console.log(req.files)
    }catch(err){
        res.status(500).json({msg: err.message})
    }

})

module.exports = router
