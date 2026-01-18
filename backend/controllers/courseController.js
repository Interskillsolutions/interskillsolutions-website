const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const courseData = req.body;

        // Handle file upload
        if (req.file) {
            courseData.brochure = `/uploads/courses/${req.file.filename}`;
        }

        // Parse JSON strings if coming from FormData
        if (typeof courseData.syllabus === 'string') courseData.syllabus = JSON.parse(courseData.syllabus);
        if (typeof courseData.highlights === 'string') courseData.highlights = JSON.parse(courseData.highlights);
        if (typeof courseData.tools === 'string') courseData.tools = JSON.parse(courseData.tools);
        if (typeof courseData.tags === 'string') courseData.tags = JSON.parse(courseData.tags);

        const course = new Course(courseData);
        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            Object.assign(course, req.body);
            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            await course.deleteOne();
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
