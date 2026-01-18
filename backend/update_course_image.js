const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config({ path: './backend/.env' });

const updateCourseImage = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill');
        console.log('MongoDB Connected');

        // High quality data science image from Unsplash
        const imageUrl = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

        const course = await Course.findOneAndUpdate(
            { title: 'Data Science' },
            { image: imageUrl },
            { new: true }
        );

        if (course) {
            console.log('Course image updated for:', course.title);
            console.log('New Image URL:', course.image);
        } else {
            console.log('Course "Data Science" not found');
        }

        mongoose.disconnect();
    } catch (error) {
        console.error('Error updating course image:', error);
        mongoose.disconnect();
    }
};

updateCourseImage();
