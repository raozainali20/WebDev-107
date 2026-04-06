// Express Server for Oladoc Landing Page

const express = require('express');
const path = require('path');

// Create Express app
const app = express();

// Set port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Serve static files from current directory
// HTML, CSS, and JS files are in the root folder
app.use(express.static(__dirname));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Routes =====

// Home route - serves the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API route example - Get all doctors
app.get('/api/doctors', (req, res) => {
    const doctors = [
        {
            id: 1,
            name: 'Dr. Ahmed Khan',
            specialty: 'Cardiologist',
            experience: '15 years',
            rating: 4.9,
            reviews: 120
        },
        {
            id: 2,
            name: 'Dr. Sarah Ali',
            specialty: 'Dermatologist',
            experience: '10 years',
            rating: 4.8,
            reviews: 95
        },
        {
            id: 3,
            name: 'Dr. Muhammad Hassan',
            specialty: 'Orthopedic',
            experience: '12 years',
            rating: 4.7,
            reviews: 80
        },
        {
            id: 4,
            name: 'Dr. Fatima Zahra',
            specialty: 'Pediatrician',
            experience: '8 years',
            rating: 4.9,
            reviews: 150
        }
    ];
    res.json(doctors);
});

// API route - Get hospitals
app.get('/api/hospitals', (req, res) => {
    const hospitals = [
        { id: 1, name: 'Shifa International Hospital', location: 'Islamabad', beds: 500 },
        { id: 2, name: 'Aga Khan University Hospital', location: 'Karachi', beds: 700 },
        { id: 3, name: 'Doctors Hospital', location: 'Lahore', beds: 400 },
        { id: 4, name: 'CMH', location: 'Rawalpindi', beds: 600 }
    ];
    res.json(hospitals);
});

// API route - Get labs
app.get('/api/labs', (req, res) => {
    const labs = [
        { id: 1, name: 'Chughtai Lab', services: ['Blood Tests', 'X-Ray', 'MRI'] },
        { id: 2, name: 'Excel Labs', services: ['Blood Tests', 'CT Scan', 'Ultrasound'] },
        { id: 3, name: 'Dr. Essa Lab', services: ['Blood Tests', 'PCR', 'Biopsy'] }
    ];
    res.json(labs);
});

// POST route - Handle contact form (example)
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // In a real app, you'd save this to a database
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you for contacting us! We will get back to you soon.' 
    });
});

// POST route - Handle login (example)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // In a real app, you'd validate against a database
    if (email && password) {
        res.json({ 
            success: true, 
            message: 'Login successful',
            user: { email, name: email.split('@')[0] }
        });
    } else {
        res.status(400).json({ 
            success: false, 
            message: 'Email and password are required' 
        });
    }
});

// POST route - Handle signup (example)
app.post('/api/signup', (req, res) => {
    const { firstName, lastName, email, phone, password, userType } = req.body;
    
    // In a real app, you'd save to a database
    if (firstName && lastName && email && password) {
        res.json({ 
            success: true, 
            message: 'Account created successfully',
            user: { firstName, lastName, email, userType }
        });
    } else {
        res.status(400).json({ 
            success: false, 
            message: 'All required fields must be filled' 
        });
    }
});

// 404 handler - for undefined routes
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1><p><a href="/">Go back home</a></p>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
