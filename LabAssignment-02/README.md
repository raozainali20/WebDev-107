# Lab Assignment 02 - Express-Based Oladoc Landing Page

## 📁 Project Structure

```
LabAssignment-02/
├── server.js        # Express server (Backend)
├── package.json     # Node.js dependencies
├── index.html       # Main landing page (Frontend)
├── styles.css       # All CSS styles
├── script.js        # Client-side JavaScript with AJAX
└── README.md        # Documentation
```

---

## 🔄 How It Works (Architecture)

```
┌─────────────────┐     HTTP Request      ┌─────────────────┐
│                 │ ──────────────────►   │                 │
│  Browser        │                       │  Express Server │
│  (Frontend)     │ ◄──────────────────   │  (Backend)      │
│                 │     HTTP Response     │                 │
└─────────────────┘                       └─────────────────┘
     │                                           │
     ├── index.html                              ├── Serves static files
     ├── styles.css                              ├── API endpoints
     └── script.js (AJAX)                        └── Handles form data
```

---

## 📄 File-by-File Explanation

### 1. `server.js` (Backend - Express Server)

**Purpose:** Runs the web server and handles API requests.

**What's Inside:**

```javascript
// IMPORTS
const express = require('express');  // Web framework
const path = require('path');        // File path utilities

// SETUP
const app = express();               // Create Express app
const PORT = 3000;                   // Server port

// MIDDLEWARE (runs on every request)
app.use(express.static(__dirname));  // Serve static files (HTML, CSS, JS)
app.use(express.json());             // Parse JSON request bodies
app.use(express.urlencoded());       // Parse form data
```

**Routes Defined:**

| Route | Method | What it does |
|-------|--------|--------------|
| `/` | GET | Sends index.html to browser |
| `/api/doctors` | GET | Returns JSON array of doctors |
| `/api/hospitals` | GET | Returns JSON array of hospitals |
| `/api/labs` | GET | Returns JSON array of labs |
| `/api/login` | POST | Handles login form submission |
| `/api/signup` | POST | Handles signup form submission |
| `/api/contact` | POST | Handles contact form |

---

### 2. `index.html` (Frontend - Structure)

**Purpose:** Defines the page structure and content.

**Sections:**

| Section | HTML Elements Used |
|---------|-------------------|
| **Navbar** | `<nav>`, `<ul>`, `<li>`, `<a>`, `<button>` |
| **Hero** | `<section>`, `<h1>`, `<p>`, `<input>`, `<button>` |
| **Doctors** | `<section>`, `<div class="grid">`, cards |
| **Hospitals** | Same grid structure |
| **Labs** | Same grid structure |
| **Surgeries** | Same grid structure |
| **Blog** | Cards with images |
| **Services** | 5 service cards |
| **Reviews** | Customer testimonial cards |
| **Footer** | `<footer>`, links, copyright |
| **Modals** | Login/Signup popup forms |

**Key HTML Concepts Used:**
- Semantic HTML5 tags (`<nav>`, `<section>`, `<footer>`, `<main>`)
- Forms with inputs (`<input>`, `<select>`, `<button>`)
- Data attributes (`data-close`, `data-type`, `data-target`)
- Anchor links (`href="#doctors"` for smooth scrolling)

---

### 3. `styles.css` (Frontend - Styling)

**Purpose:** Makes the page look professional and responsive.

**CSS Concepts Used:**

| Concept | Where Used | Example |
|---------|------------|---------|
| **CSS Reset** | Top of file | `* { margin: 0; padding: 0; box-sizing: border-box; }` |
| **Flexbox** | Navbar, cards | `display: flex; justify-content: space-between;` |
| **CSS Grid** | Card layouts | `display: grid; grid-template-columns: repeat(4, 1fr);` |
| **Transitions** | Hover effects | `transition: transform 0.3s ease;` |
| **Transforms** | Hover scale | `transform: scale(1.05);` |
| **Box Shadow** | Cards | `box-shadow: 0 4px 15px rgba(0,0,0,0.1);` |
| **Border Radius** | Rounded corners | `border-radius: 12px;` |
| **Gradients** | Hero background | `background: linear-gradient(135deg, #667eea, #2c3e50);` |
| **Media Queries** | Responsiveness | `@media (max-width: 768px) { ... }` |
| **Pseudo-classes** | Hover states | `.btn:hover { background: #1565c0; }` |
| **Position** | Modals, hamburger | `position: fixed; position: absolute;` |
| **Z-index** | Modal overlay | `z-index: 1000;` |
| **Keyframes** | Modal animation | `@keyframes modalSlideIn { ... }` |

**Responsive Breakpoints:**
- `1024px` - Tablet
- `768px` - Mobile (hamburger menu appears)
- `480px` - Small mobile

---

### 4. `script.js` (Frontend - Interactivity + AJAX)

**Purpose:** Handles user interactions and communicates with server.

**JavaScript Concepts Used:**

| Concept | Where Used | Example |
|---------|------------|---------|
| **DOM Selection** | Getting elements | `document.getElementById('hamburger')` |
| **Event Listeners** | Click handling | `btn.addEventListener('click', function() {...})` |
| **classList** | Toggle classes | `element.classList.toggle('active')` |
| **forEach** | Loop over elements | `buttons.forEach(function(btn) {...})` |
| **Form Validation** | Check inputs | `if (!email.value) { showError(); }` |
| **Regular Expressions** | Email validation | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)` |
| **localStorage** | Store login state | `localStorage.setItem('isLoggedIn', 'true')` |
| **AJAX (fetch API)** | Server communication | `fetch('/api/login', {...})` |
| **Promises** | Handle async | `.then(response => response.json())` |
| **JSON** | Data format | `JSON.stringify({ email, password })` |

---

## 🔗 AJAX Calls (Where & How)

### What is AJAX?
AJAX = **A**synchronous **J**avaScript **A**nd **X**ML  
It lets the page communicate with the server **without reloading**.

### Where AJAX is Used:

#### 1. Login Form (Lines 188-238 in script.js)
```javascript
fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: email.value,
        password: password.value
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert('Login successful!');
    }
});
```

#### 2. Signup Form (Lines 240-330 in script.js)
```javascript
fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        firstName, lastName, email, phone, password, userType
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert('Account created!');
    }
});
```

### AJAX Flow Diagram:

```
User clicks "Login"
        │
        ▼
JavaScript validates form
        │
        ▼
fetch() sends POST request ──────► Express receives at /api/login
        │                                    │
        │                                    ▼
        │                          Server processes data
        │                                    │
        │                                    ▼
        │                          Returns JSON response
        │                                    │
        ◄────────────────────────────────────┘
        │
        ▼
.then() handles response
        │
        ▼
Show success/error message
```

---

## 📊 Summary Table

| File | Language | Purpose | Key Features |
|------|----------|---------|--------------|
| `server.js` | JavaScript (Node.js) | Backend server | Express, Routes, API |
| `index.html` | HTML5 | Page structure | Semantic tags, Forms, Modals |
| `styles.css` | CSS3 | Styling | Flexbox, Grid, Animations |
| `script.js` | JavaScript | Interactivity | DOM, Events, AJAX |
| `package.json` | JSON | Dependencies | Express package |

---

## 🚀 How to Run

```bash
# Step 1: Navigate to folder
cd LabAssignment-02

# Step 2: Install Express
npm install

# Step 3: Start server
npm start

# Step 4: Open browser
# Go to http://localhost:3000
```

---

## 🧪 Testing the AJAX Calls

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Click Login/Signup button
4. Watch for POST request to `/api/login` or `/api/signup`
5. Click on request to see:
   - **Request payload** (what was sent)
   - **Response** (what server returned)
