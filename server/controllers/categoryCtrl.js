const Category = require("../models/categoryModel");
const Products = require("../models/productModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  },

  createCategory: async (req, res) => {
    try {
      //todo Nếu như role = 1 thì sẽ là admin có quyền tạo sản phẩm
      //? Chỉ có admin ms có quyền
      const { name } = req.body;

      const category = await Category.findOne({ name });

      if (category)
        return res.status(400).json({ msg: "Danh mục này đã tồn tại!" });

      const newCategory = new Category({ name });

      //todo Lưu danh mục vào database
      await newCategory.save();
      res.json({ msg: "Đã tạo danh mục thành công!" });
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  },

  deleteCategory: async (req, res) => {},

  updateCategory: async (req, res) => {},
};

module.exports = categoryCtrl;
