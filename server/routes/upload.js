const router = require ('express').Router()
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
        if (!req.files || Object.keys(req.files).length==0)
            return res.status(400).send("No files were uploaded.")

            const file = req.files;
            if(file.size>1024*1024) return res.status(400).json({msg: "Size too large"})
        res.json('test upload')
    }catch(err){
        res.status(500).json({msg: err.message})
    }

})

module.exports = router
