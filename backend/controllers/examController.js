const Exam = require('../models/Exam');
const ExamResult = require('../models/ExamResult');
const crypto = require('crypto');

// @desc    Create a new exam
// @route   POST /api/exams
// @access  Private (Admin)
exports.createExam = async (req, res) => {
    try {
        const { title, description, duration } = req.body;
        const linkId = crypto.randomBytes(4).toString('hex');

        const exam = new Exam({
            title,
            description,
            duration,
            linkId,
            createdBy: req.user.userId || req.user._id, // Depends on auth middleware
            questions: []
        });

        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).json({ message: 'Failed to create exam' });
    }
};

// @desc    Update an exam (including adding/editing questions)
// @route   PUT /api/exams/:id
// @access  Private (Admin)
exports.updateExam = async (req, res) => {
    try {
        const { title, description, duration, questions } = req.body;
        const exam = await Exam.findById(req.params.id);

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        // Check if the user is the creator (optional based on your needs)
        // if (exam.createdBy.toString() !== req.user.userId) {
        //     return res.status(403).json({ message: 'Not authorized' });
        // }

        exam.title = title || exam.title;
        exam.description = description !== undefined ? description : exam.description;
        exam.duration = duration || exam.duration;
        
        if (questions) {
            exam.questions = questions;
        }

        await exam.save(); // totalMarks is automatically recalculated in the pre-save hook
        res.json(exam);
    } catch (error) {
        console.error('Error updating exam:', error);
        res.status(500).json({ message: 'Failed to update exam' });
    }
};

// @desc    Get all exams (for Admin dashboard)
// @route   GET /api/exams
// @access  Private (Admin)
exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find().sort({ createdAt: -1 });
        res.json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Failed to fetch exams' });
    }
};

// @desc    Get a single exam by ID (for Admin editing)
// @route   GET /api/exams/:id
// @access  Private (Admin)
exports.getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json(exam);
    } catch (error) {
        console.error('Error fetching exam:', error);
        res.status(500).json({ message: 'Failed to fetch exam' });
    }
};

// @desc    Delete an exam
// @route   DELETE /api/exams/:id
// @access  Private (Admin)
exports.deleteExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        await Exam.findByIdAndDelete(req.params.id);
        // Optinally delete related ExamResults
        await ExamResult.deleteMany({ examId: req.params.id });

        res.json({ message: 'Exam removed' });
    } catch (error) {
        console.error('Error deleting exam:', error);
        res.status(500).json({ message: 'Failed to delete exam' });
    }
};

// @desc    Get exam by Link ID for Student to take
// @route   GET /api/exams/link/:linkId
// @access  Public
exports.getExamByLinkId = async (req, res) => {
    try {
        const exam = await Exam.findOne({ linkId: req.params.linkId });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found or link is invalid' });
        }

        // We MUST NOT send correct answers to the client
        const safeExam = exam.toObject();
        safeExam.questions.forEach(q => {
            delete q.correctOption;
        });

        res.json(safeExam);
    } catch (error) {
        console.error('Error fetching exam by link:', error);
        res.status(500).json({ message: 'Failed to fetch exam' });
    }
};

// @desc    Submit an exam
// @route   POST /api/exams/submit
// @access  Public
exports.submitExam = async (req, res) => {
    try {
        const { examId, studentName, submittedAnswers, tabSwitchedCount, cameraPermissionGranted } = req.body;

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        let totalScore = 0;
        const processedAnswers = [];

        // Grade MCQ questions
        for (const submittedAnswer of submittedAnswers) {
            const question = exam.questions.id(submittedAnswer.questionId);
            if (!question) continue;

            let marksAwarded = 0;
            let manualReviewNeeded = false;

            if (question.type === 'MCQ') {
                // Auto-grade MCQ
                // submittedAnswer.answerText should be the index as string
                if (parseInt(submittedAnswer.answerText) === question.correctOption) {
                    marksAwarded = question.marks;
                }
            } else {
                // Short, Long, or Coding need manual review
                manualReviewNeeded = true;
            }

            totalScore += marksAwarded;

            processedAnswers.push({
                questionId: question._id,
                answerText: submittedAnswer.answerText,
                marksAwarded,
                manualReviewNeeded
            });
        }

        const result = new ExamResult({
            examId,
            studentName,
            score: totalScore,
            totalMarks: exam.totalMarks,
            answers: processedAnswers,
            tabSwitchedCount,
            cameraPermissionGranted
        });

        await result.save();
        res.status(201).json({ message: 'Exam submitted successfully', resultId: result._id });
    } catch (error) {
        console.error('Error submitting exam:', error);
        res.status(500).json({ message: 'Failed to submit exam' });
    }
};

// @desc    Get results for an exam
// @route   GET /api/exams/:id/results
// @access  Private (Admin)
exports.getExamResults = async (req, res) => {
    try {
        const results = await ExamResult.find({ examId: req.params.id }).sort({ submittedAt: -1 });
        res.json(results);
    } catch (error) {
        console.error('Error fetching exam results:', error);
        res.status(500).json({ message: 'Failed to fetch results' });
    }
};
