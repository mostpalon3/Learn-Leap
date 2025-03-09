const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const admin = require('firebase-admin');
const {join} = require('node:path')
const axios = require('axios')

// Initialize Firebase Admin SDK
const serviceAccount = require('./keys/firebase-adminsdk.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const messagesCollection = db.collection('messages');

const app = express();
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});


/*
For authentication purposes, requests should be sent as:
POST http://auth-service.local/verify
Headers: { Authorization: Bearer <token> }
Response: { "valid": true, "user": { "id": "123", "name": "Alice" } }

//Auth Middleware
async function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    try {
        const response = await axios.post('http://auth-service.local/verify', {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.valid) {
            req.user = response.data.user; // Attach user data to request
            next();
        } else {
            res.status(401).json({ success: false, error: 'Invalid token' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Auth service error' });
    }
}

*/




// REST API Endpoints

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});


// Get all messages
app.get('/messages', async (req, res) => {
    try {
        const snapshot = await messagesCollection.orderBy('timestamp', 'desc').get();
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Post a new message
app.post('/messages', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ success: false, error: 'Message content is required' });
    }

    try {
        const docRef = await messagesCollection.add({
            content,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });

        res.json({ success: true, message: { id: docRef.id, content } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// WebSockets (Socket.io) Setup
io.on('connection', (socket) => {
    console.log('A user connected');

    // Notify users when someone joins
    io.emit('chat message', 'A user has connected', null);

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        io.emit('chat message', 'A user has disconnected', null);
    });
});

// Firestore Real-time Listener
messagesCollection.orderBy('timestamp').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            const newMessage = { id: change.doc.id, ...change.doc.data() };
            io.emit('chat message', newMessage.content, newMessage.id);
        }
    });
});

server.listen(3000, () => {
    console.log('API server running at http://localhost:3000');
});
