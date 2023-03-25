const Producer = require('../models/producerModel');

const createProducer = async (req, res) => {
    try {
        const producer = await Producer.create(req.body);
        res.status(201).json({
            "status": 'success',
            "data": {
                "producer" : producer
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

const getAllProducers = async (req, res) => {
    try {
        const producers = await Producer.find();
        res.status(200).json({
            status: 'success',
            data: {
                producers
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

const getProducer = async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                producer
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

const updateProducer = async (req, res) => {
    try {
        const producer = await Producer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                producer
            }
        });

    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

const deleteProducer = async (req, res) => {
    try {
        await Producer.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

module.exports = { createProducer, getAllProducers, getProducer, updateProducer, deleteProducer };
