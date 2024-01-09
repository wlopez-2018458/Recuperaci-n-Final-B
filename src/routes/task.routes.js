'use strict';

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/addTask', taskController.addTask);
router.get('/getTasks', taskController.getTasks);
router.get('/getTask/:id', taskController.getTask);
router.put('/updateTask/:id', taskController.updateTask);
router.delete('/deleteTask/:id', taskController.deleteTask);

module.exports = router;
