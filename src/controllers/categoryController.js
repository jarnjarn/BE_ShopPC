
const Categories = require('../models/categoryModel.js')

const createCategory = async (req, res) => {
    try {
        const { name , description } = req.body;
        const category = await Categories.findOne({name})
        if(category) return res.status(400).json({msg: "This category already exists."})

        const newCategory = new Categories({name, description})

        await newCategory.save()

        res.json({msg: "Created a category"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find()
        res.json(categories)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const updateCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        await Categories.findOneAndUpdate({_id: req.params.id}, {name, description})

        res.json({msg: "Updated a category"})
    }
    catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const deleteCategory = async (req, res) => {
    try {
        await Categories.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted a category"})
    }
    catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = { createCategory, getCategories, updateCategory, deleteCategory }
