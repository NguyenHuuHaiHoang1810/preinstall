const Category = require("../models/categoryModel");
const Products = require("../models/productModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json( categories );
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  },

  createCategory: async (req, res) => {},

  deleteCategory: async (req, res) => {},

  updateCategory: async (req, res) => {},
};

module.exports = categoryCtrl;
