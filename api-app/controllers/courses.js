const Course = require('../models/course');
const resonseHandler = require('../lib/response_handler');



module.exports = {
    getAllCourses: async (req, res) => {
        const courses = await Course.find().populate('academy name');
        res.send({
            error: false,
            message: 'All courses from database',
            courses: courses,
        });
    },

    getIDCourse: async (req, res) => {
        const course = await Course.findById(req.params,id);
        res.send({
            error: false,
            message: `Course with id #${course._id}`,
            course: course
        });
    },

    create: async (req, res) => {
            const course = await Course.create(req.body);
            res.send({
              error: false,
              message: 'New course has been created',
              course: course
        });
    },

    patch: async (req, res) => {
        await Course.findByIdAndUpdate(req.params.id, req.body);
        const course = await Course.findById(req.params.id);
        res.send({
            error: false,
            message: `Course with id #${course._id} has been updated`,
            course: course
        });
    },

    delete: async (req, res) => {
        await Course.findByIdAndDelete(req.params.id);
        res.send({
            error: false,
            message: `Course with id #${req.params.id} has been deleted`
        });
    }
}