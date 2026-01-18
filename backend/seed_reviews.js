const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('./models/Review');

dotenv.config({ path: './backend/.env' });

const reviews = [
    {
        name: "Diwate Yash",
        role: "Full Stack Developer",
        review: "I joined Interskills Solution for their Full Stack Web Development course, and it exceeded my expectations. Vishakha Ma’am helped me upskill effectively and taught me new techniques, while Priya Ma’am was incredibly supportive throughout the journey, always encouraging me to reach my potential. I learned a lot and highly recommend Interskills Solution to anyone looking to grow in web development or tech.",
        rating: 5,
        image: ""
    },
    {
        name: "Prajakta",
        role: "Full Stack Developer",
        review: "Interskills Solution was a great choice for Full Stack Web Development. Vishakha Ma’am’s practical insights and Priya Ma’am’s constant encouragement helped me grow and excel. The course was engaging and well-structured. Highly recommend it for skill enhancement!",
        rating: 5,
        image: ""
    },
    {
        name: "Yashasri Waykole",
        role: "Student",
        review: "I had an incredibly valuable experience taking this class. It's very easy to understand and practical. Every week I learned more, which helped improve my career a lot. The soft skill session by Priya mam was especially influential and essential for life goals.",
        rating: 5,
        image: ""
    },
    {
        name: "Sailee Acharekar",
        role: "Design Engineer",
        review: "Good place to learn software designing. I took courses like AutoCAD, Solid Works, Creo & Revit MEP, and got placed in a well-reputed company before completing it. Priya madam’s commitment to providing interviews until you land a job is outstanding.",
        rating: 5,
        image: ""
    },
    {
        name: "Mohini Thorat",
        role: "Data Science Intern",
        review: "The best institute in Mumbai, Maharashtra. And all thanks to Dr Priya mam for the best experience and support I got from her and Interskill solution, through their industry expert trainers who are having 10+ yrs, and hands on US UK projects which helped me to gain top quality industry relevant training. Thus, I got internship within 6 months of training in Data Science with AI, ML.",
        rating: 5,
        image: ""
    }
];

const seedReviews = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        await Review.deleteMany(); // Clear existing generic reviews if any
        console.log('Existing reviews cleared');

        await Review.insertMany(reviews);
        console.log('5 Reviews Seeded Successfully');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding reviews:', error);
        mongoose.disconnect();
    }
};

seedReviews();
