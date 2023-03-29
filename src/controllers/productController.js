
const multer = require('multer');
const Dropbox = require('dropbox').Dropbox;
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/productModel');


const getALLProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}


const createProduct = async (req, res) => {
    try {
        const { name, inventory, price, description, ram, cpu, main, producer, category } = req.body;

        if (!name || !inventory || !price || !description || !producer || !category || !ram || !cpu || !main) {
            return res.status(400).json({ msg: "Vui lòng điền đầy đủ thông tin sản phẩm." });
        }

        const product = new Product({
            name, inventory, price, description, ram, cpu, main, producer, category,
            images: req.files.map(file => file.filename)
        });

        await product.save();

        res.json({ msg: "Tạo sản phẩm thành công", product });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}




const updateProduct = async (req, res) => {
    try{
        const { name, inventory, price, image, description, ram, cpu, main, producer, category } = req.body;
        if (!name || !inventory || !price || !description || !producer || !category || !ram || !cpu || !main) {
            return res.status(400).json({ msg: "Vui lòng điền đầy đủ thông tin sản phẩm." });
        }

        await Product.findOneAndUpdate({ _id: req.params.id }, {
            name, inventory, price, description, ram, cpu, main, producer, category,
            images: req.files.map(file => file.filename)
        });

        res.json({ msg: "Cập nhật sản phẩm thành công" });
    }

    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}


const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted a product" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = { getALLProducts, getProductById, createProduct, updateProduct, deleteProduct };
