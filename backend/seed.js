const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Statistic = require('./models/Statistic');
const Course = require('./models/Course');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill')
    .then(async () => {
        console.log('MongoDB Connected');

        // Seed Admin
        /*
        const adminExists = await Admin.findOne({ username: 'admin' });
        if (!adminExists) {
            const admin = new Admin({ username: 'admin', password: 'password123' });
            await admin.save();
            console.log('Admin created: admin / password123');
        } else {
            console.log('Admin already exists');
        }
        */

        // Seed Stats
        const stats = [
            { label: 'Placed Students', value: '1000+' },
            { label: 'Alumni Network', value: '1000+' },
            { label: 'Industry Trainers', value: '10+' },
            { label: 'Years Experience', value: '5+' },
        ];

        for (const stat of stats) {
            const exists = await Statistic.findOne({ label: stat.label });
            if (!exists) {
                await Statistic.create(stat);
            }
        }
        console.log('Stats seeded');

        // Seed Courses
        const courses = [
            {
                title: 'Full Stack Development',
                description: 'Become a complete web developer with expertise in MERN stack (MongoDB, Express, React, Node.js). Build real-world applications.',
                duration: '6 Months',
                mode: 'Online / Offline',
                fees: '₹ 45,000',
                category: 'IT',
                tags: ['Bestseller', 'Trending'],
                curriculum: [
                    'HTML5, CSS3, JavaScript (ES6+)',
                    'React.js & Redux',
                    'Node.js & Express.js',
                    'MongoDB & Mongoose',
                    'RESTful APIs',
                    'Deployment & DevOps Basics'
                ]
            },
            {
                title: 'Data Science',
                description: 'Master the art of data analysis, visualization, and machine learning using Python. Launch your career as a Data Scientist.',
                duration: '6 Months',
                mode: 'Online / Offline',
                fees: '₹ 50,000',
                category: 'IT',
                tags: ['Bestseller', 'High Salary'],
                curriculum: [
                    'Python Programming',
                    'Data Analysis with Pandas & NumPy',
                    'Data Visualization (Matplotlib, Seaborn)',
                    'Machine Learning Algorithms',
                    'Deep Learning Basics',
                    'Power BI & SQL'
                ]
            }
        ];

        for (const course of courses) {
            const exists = await Course.findOne({ title: course.title });
            if (!exists) {
                await Course.create(course);
            }
        }
        console.log('Courses seeded');

        process.exit();
    })
    .catch(err => {
        console.error('Seed Error:', err);
        process.exit(1);
    });
