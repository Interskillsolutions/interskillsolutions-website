const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config({ path: './backend/.env' });

const dataScienceData = {
    highlights: [
        "Expert-Led Sessions",
        "Hands-On Learning with Real Datasets",
        "Personalized Mentorship",
        "100% Placement Assistance",
        "Comprehensive Curriculum",
        "Flexible Learning Options"
    ],
    tools: ["Python", "R", "SQL", "Tableau", "Power BI", "Excel", "TensorFlow"],
    syllabus: [
        {
            title: "Module 1: Foundations & Statistics",
            topics: [
                "Business Statistics",
                "Probability Distributions",
                "Hypothesis Testing",
                "ANOVA & Chi-square",
                "Descriptive & Diagnostic Analytics"
            ]
        },
        {
            title: "Module 2: Data Analysis & Visualization",
            topics: [
                "Data Cleaning & Imputation",
                "Data Visualization (Java, CSS)",
                "Excel: Pivot Tables, Data Validation",
                "Tableau: Advanced Visualizations",
                "Power BI: Dashboards & DAX"
            ]
        },
        {
            title: "Module 3: Programming for Data Science",
            topics: [
                "Python: Data Structures, File Ops",
                "R Programming: Loop Functions, Simulation",
                "SQL: Joins, Sub-queries, Retrieval"
            ]
        },
        {
            title: "Module 4: Machine Learning & AI",
            topics: [
                "Supervised & Unsupervised Learning",
                "Regression & Classification",
                "Decision Trees, SVM, Naive Bayes",
                "Convolutional Neural Networks (CNN)",
                "Natural Language Processing (NLP)"
            ]
        },
        {
            title: "Module 5: Advanced Topics & Projects",
            topics: [
                "Computer Vision & Object Detection",
                "Ethics in AI & Future Trends",
                "5 Industry-Specific Projects",
                "Final Project & Internship"
            ]
        }
    ]
};

const updateCourse = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Find Data Science course (case-insensitive title match)
        const course = await Course.findOne({ title: { $regex: /Data Science/i } });

        if (course) {
            course.highlights = dataScienceData.highlights;
            course.tools = dataScienceData.tools;
            course.syllabus = dataScienceData.syllabus;
            // Also update main curriculum for backward compatibility if needed, or leave as is

            await course.save();
            console.log('Data Science Course Updated Successfully');
        } else {
            console.log('Data Science Course Not Found. Creating one...');
            await Course.create({
                title: "Data Science & Analytics",
                description: "Master Data Analytics to Unlock Business Insights. Learn from experts and work on real-time projects.",
                duration: "6 Months",
                mode: "Online / Offline",
                fees: "₹ 45,000",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
                category: "IT",
                tags: ["Trending", "High Salary"],
                ...dataScienceData
            });
            console.log('Data Science Course Created Successfully');
        }

        mongoose.disconnect();
    } catch (error) {
        console.error('Error updating course:', error);
        mongoose.disconnect();
    }
};

updateCourse();
