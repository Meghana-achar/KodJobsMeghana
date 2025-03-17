const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Path to user.json
const USER_FILE = path.join(__dirname, 'src', 'user.json');

// Function to calculate age based on DOB
const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    return age;
};

// Endpoint to save user data (Register)
app.post('/api/register', (req, res) => {
    try {
        // Read existing users
        let users = [];
        if (fs.existsSync(USER_FILE)) {
            users = JSON.parse(fs.readFileSync(USER_FILE));
        }

        // Extract user data
        const { name, email, password, dateOfBirth } = req.body;

        if (!name || !email || !password || !dateOfBirth) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Calculate age from dateOfBirth
        const age = calculateAge(dateOfBirth);

        // Create new user object with age included
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            dateOfBirth,
            age, // Store calculated age
            registrationDate: new Date().toISOString()
        };

        // Add to users array
        users.push(newUser);

        // Save back to file
        fs.writeFileSync(USER_FILE, JSON.stringify(users, null, 2));

        console.log('New user registered:', newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login endpoint
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('👉 Login attempt with:', { email, password });

        // Read users from file
        const users = JSON.parse(fs.readFileSync(USER_FILE));
        console.log('📋 Available users in database:', users);

        // Find matching user
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            console.log('✅ Login successful for:', email);
            res.json({ success: true, user });
        } else {
            console.log('❌ Login failed - no matching user for:', email);
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log('🚀 Server running on port 5000');
});
