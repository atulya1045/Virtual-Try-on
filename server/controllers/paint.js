import Paint from "../models/Paint.js";
import axios from "axios";
import shuffle from "../helpers/shuffle.js";
import fs from "fs";

const paintWall = async (req, res) => {
    try {
        const { filename, color="#FFFF00" } = req.body;
        console.log(req.body)
        
        const response = await axios.post("http://127.0.0.1:5000/generate_color", { filename, color });
        console.log(response.data)
        return res.status(200).json({ message: response.data })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message });
    }
}

const getPaints = async (req, res) => {
    try {
        const { brand = null } = req.query;

        let response;
        if(brand) response = await Paint.find({ brand });
        else response = await Paint.find();

        const shuffleData = shuffle(response);
        return res.status(200).json(shuffleData);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message });
    }
}

const getPaint = async (req, res) => {
    const { id } = req.params;

    try {
        const paint = await Paint.findById(id);
        return res.status(200).json(paint);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message });
    }
}

const addPaints = async (req, res) => {
    const bufferData = fs.readFileSync('./data/data.json');
    const data = JSON.parse(bufferData.toString());

    try {
        const response = await Paint.insertMany(data);
        return res.status(201).json({message: 'Paints added Successfully!'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message });
    }
}

export { paintWall, getPaints, getPaint, addPaints };