
const Product = require('../models/productModel');


const  getALLProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

const  getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

const createProduct = async (req, res) => {
    try {
        const {name, inventory,price,img ,description,producer,category } = req.body;

        const product = new Product({
            name, inventory,price,img ,description,producer,category,date : Date.now()
        });

        await product.save();
        res.status(201).json({
            "status": 'success',
            "data": {
                "product" : product
            }
        });
    } catch (err) {
        return res.status(500).json({msg: err.message});

    }
}

const  updateProduct = async (req, res) => {
    try {
        const {title, price, description, content, images, category} = req.body;

        const product = await Product.findOneAndUpdate({_id: req.params.id}, {
            title: title.toLowerCase(), price, description, content, images, category
        });

        res.json({msg: "Updated a product"});
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}


const  deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({msg: "Deleted a product"});
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

module.exports = { getALLProducts, getProductById, createProduct, updateProduct, deleteProduct };
