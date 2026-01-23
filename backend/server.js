const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for troubleshooting
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interskill')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const leadRoutes = require('./routes/leadRoutes');
const statRoutes = require('./routes/statRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const requestRoutes = require('./routes/requestRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const http = require('http');
const { Server } = require("socket.io");
const Message = require('./models/Message');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_chat', () => {
        socket.join('team_connect'); // General Chat Room
        console.log(`User ${socket.id} joined General Chat`);
    });

    // Join Private Room (User ID)
    socket.on('join_user_room', (userId) => {
        socket.join(userId);
        console.log(`User ${socket.id} joined Private Room: ${userId}`);
    });

    socket.on('send_message', async (data) => {
        // Data: sender (id), senderName, content, recipient (optional)
        if (data.sender && data.content) {
            try {
                const newMessage = await Message.create({
                    sender: data.sender,
                    senderName: data.senderName,
                    content: data.content,
                    recipient: data.recipient || null
                });

                if (data.recipient) {
                    // Send to Recipient AND Sender (so it appears in their UI too)
                    io.to(data.recipient).emit('receive_message', newMessage);
                    io.to(data.sender).emit('receive_message', newMessage);
                } else {
                    // General Chat: Send to everyone in 'team_connect'
                    io.to('team_connect').emit('receive_message', newMessage);
                }
            } catch (err) {
                console.error('Error saving message:', err);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

// Make io accessible to routes if needed
app.set('socketio', io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
