const Products = require ('../models/productModel')

const productCtrl = {
    getProducts : async(req,res) =>{
        try{
            const products = await Products.find()

            res.json(products)
        }catch (err){
            return res.status(500).json({msg:err.message})
        }
    },
    createProduct :async (req,res)=>{
        try{
                const {product_id, title,price,description,content, images, category} = req.body;
                if (!images) return res.status(400).json({msg:"không có ảnh nào được upload"})

                const product = await Products.findOne({product_id})
                if (product)
                    return res.status(400).json({msg:"sản phẩm này đã tồn tại"})

                const newProduct = new Products({
                    product_id,title:title.toLowerCase(),price,description,content,images,category
                })
                await newProduct.save()
                res.json({msg:"đã tạo 1 sản phẩm"})


        }catch (err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteProduct :async (req,res)=>{
        try{
            await Products.findByIdAndDelete(req.pấm.id)
            res.json({msg:"sản phẫn đã được xóa"})
        }catch (err){
            return res.status(500).json({msg:err.message})
        }
    },
    uploadProduct :async (req,res)=>{
        try{
            const {title,price,description,content, images, category} = req.body;
            if (!images) return res.status(400).json({msg:"không có ảnh nào được upload"})
            await Products.findOneAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),price,description,content,images,category
            })

            res,json({msg:"san pham da duoc upload"})
        
        }catch (err){
            return res.status(500).json({msg:err.message})
        }
    },

}

module.exports = productCtrl
