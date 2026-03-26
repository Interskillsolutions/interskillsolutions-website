const DualDegree = require('../models/DualDegree');

exports.getDualDegrees = async (req, res) => {
    try {
        const programs = await DualDegree.find({ isActive: true });
        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDualDegreeById = async (req, res) => {
    try {
        const program = await DualDegree.findById(req.params.id);
        if (program) {
            res.json(program);
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDualDegree = async (req, res) => {
    try {
        const programData = req.body;
        
        // Handle brochure upload if provided in a later step
        if (req.file) {
            programData.brochure = `/uploads/dual-degree/${req.file.filename}`;
        }

        const program = new DualDegree(programData);
        const createdProgram = await program.save();
        res.status(201).json(createdProgram);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateDualDegree = async (req, res) => {
    try {
        const program = await DualDegree.findById(req.params.id);
        if (program) {
            Object.assign(program, req.body);
            const updatedProgram = await program.save();
            res.json(updatedProgram);
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDualDegree = async (req, res) => {
    try {
        const program = await DualDegree.findById(req.params.id);
        if (program) {
            await program.deleteOne();
            res.json({ message: 'Program removed' });
        } else {
            res.status(404).json({ message: 'Program not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
