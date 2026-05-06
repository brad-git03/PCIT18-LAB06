const express = require('express');
const router = express.Router();

const Student = require('../models/Student');

//CREATE
router.post('/', async (req,res)=> {
    const { firstname, lastname, course, year_level, section, gender } = req.body;
    const student = new Student({ firstname, lastname, course, year_level, section, gender});
    await student.save();
    res.status(201).json(student);
});

// GET ALL (with Filtering)
router.get('/', async (req, res, next) => {
    try {
        const { course, year_level, gender, section } = req.query;

        const filter = {};
        if (course) filter.course = course;
        if (year_level) filter.year_level = year_level;
        if (gender) filter.gender = gender;
        if (section) filter.section = section;

        const students = await Student.find(filter);
        res.json(students);
    } catch (error) {
        next(error);
    }
});

//DELETE
router.delete('/:id', async(req, res, next) =>{
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if(!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        next(error);
    }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
    try {
        const { firstname, lastname, course, year_level, section, gender } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            { firstname, lastname, course, year_level, section, gender },
            { new: true, runValidators: true } 
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Return a success message along with the updated student object
        res.json({ 
            message: "Student updated successfully", 
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;