'use strict'

const { validateData, checkUpdate } = require('../utils/validate');
const Task = require('../models/task.model');

exports.addTask = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            title: params.title,
            description: params.description,
            priority: params.priority,
            complete: false
        }
        const noValidate = await validateData(data);
        if (noValidate) return res.status(400).send(noValidate);
        let task = new Task(data);
        await task.save();
        return res.send({ message: 'Task create successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error saving task' });
    }
}

exports.getTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findOne({ _id: taskId });

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }

        return res.send({ task });
    } catch (err) {
        console.error(err);
        res.status(500).send({ err, message: 'Error getting task' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.send({ tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send({ err, message: 'Error getting task' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const params = req.body;
        const validateUpdate = await checkUpdate(params);
        if (!validateUpdate) return res.status(400).send({ message: 'Empty params' });
        await Task.findOneAndUpdate({ _id: taskId }, params);
        return res.send({ message: 'Task updated successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error updating task' });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findOneAndRemove({ _id: taskId });
        return res.send({ message: 'Task deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error deleting task' });
    }
}