const express = require('express')
const fetchUser = require('../middleware/fetchUser.js')
const Tasks = require('../models/Tasks.js')
const { body, validationResult } = require('express-validator');

const nrouter = express.Router();

// ROUT1: get all the tasks using GET:"api/tasks.js/fetchalltasks" - login required
nrouter.get('/fetchalltasks', fetchUser, async (req, res) => {
    try {
        const tasks = await Tasks.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(501).send({ error: err.message });
        // console.log(err.message);
    }
})

// ROUT2: add tasks using POST:"api/tasks.js/addtask" - login required
nrouter.post('/addtask', fetchUser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter the description of length atleast 5').isLength({ min: 5 })
], async (req, res) => {
    let { title, description, tag } = req.body;
    if(tag.trim()===""){
        tag='General'
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const tasks = new Tasks({
            title, description, tag, user: req.user.id
        })

        const saveTask = await tasks.save();
        res.json(saveTask);
    } catch (err) {
        res.status(501).json("something went wrong");
        // console.log(err.message);
    }
})

// ROUT3 : update an existing task using PUT "api/tasks.js/updatetask": login required
nrouter.put('/updatetask/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create newtask object
        const newTask = {};
        if (title) { newTask.title = title }
        if (description) { newTask.description = description }
        if (tag) { newTask.tag = tag }

        // find the task to be updated and update it
        let task = await Tasks.findById(req.params.id);
        if (!task) { return res.status(401).send("NOT FOUND") }
        if (task.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        task = await Tasks.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true });
        res.json({ task });
    } catch (err) {
        res.status(500).send("something went wrong");
        // console.log({err:err.message});
    }
})

// ROUT4 : delete tasks using DELETE "api/tasks.js/deletetask" : login required
nrouter.delete('/deletetask/:id', fetchUser, async (req, res) => {
    try{
        let task = await Tasks.findById(req.params.id);
    if (!task) { return res.status(401).send("Data not found to be deleted") }
    if (task.user.toString() != req.user.id) {
        return res.send(401).send("Not allowed");
    }

    task = await Tasks.findByIdAndDelete(req.params.id);
    // console.log("successfull deleted");
    res.json({ "success": "task has been deleted" });
    }catch(err){
        res.status(500).send("something went wrong");
        // console.log({error:err.message});
    }
})

module.exports = nrouter;