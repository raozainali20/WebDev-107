// Mobile Menu Toggle Functionality

// Get elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navButtons = document.getElementById('navButtons');

// Toggle menu on hamburger click
hamburger.addEventListener('click', function() {
    // Toggle active class on hamburger (for animation)
    hamburger.classList.toggle('active');
    
    // Toggle active class on nav links and buttons
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Close menu when a nav link is clicked
const navLinkItems = navLinks.querySelectorAll('a');
navLinkItems.forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navButtons.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = hamburger.contains(event.target) || 
                              navLinks.contains(event.target) || 
                              navButtons.contains(event.target);
    
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navButtons.classList.remove('active');
    }
});

// ===== Modal Functionality =====

// Get modal elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const openLoginBtn = document.getElementById('openLoginBtn');
const openSignupBtn = document.getElementById('openSignupBtn');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');

// Open login modal
openLoginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.classList.add('active');
    // Close mobile menu if open
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    navButtons.classList.remove('active');
});

// Open signup modal
openSignupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    signupModal.classList.add('active');
    // Close mobile menu if open
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    navButtons.classList.remove('active');
});

// Switch between modals
switchToSignup.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.classList.remove('active');
    signupModal.classList.add('active');
});

switchToLogin.addEventListener('click', function(e) {
    e.preventDefault();
    signupModal.classList.remove('active');
    loginModal.classList.add('active');
});

// Close modals when clicking overlay or close button
document.querySelectorAll('[data-close]').forEach(function(element) {
    element.addEventListener('click', function() {
        const modalId = this.getAttribute('data-close');
        document.getElementById(modalId).classList.remove('active');
    });
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        loginModal.classList.remove('active');
        signupModal.classList.remove('active');
    }
});

// ===== User Type Selection =====
const typeBtns = document.querySelectorAll('.type-btn');
const doctorFields = document.getElementById('doctorFields');
const userTypeInput = document.getElementById('userType');

typeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Remove active from all
        typeBtns.forEach(function(b) { b.classList.remove('active'); });
        // Add active to clicked
        this.classList.add('active');
        
        // Update hidden input
        const type = this.getAttribute('data-type');
        userTypeInput.value = type;
        
        // Show/hide doctor fields
        if (type === 'doctor') {
            doctorFields.classList.add('active');
        } else {
            doctorFields.classList.remove('active');
        }
    });
});

// ===== Toggle Password Visibility =====
document.querySelectorAll('.toggle-password').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        if (input.type === 'password') {
            input.type = 'text';
            this.textContent = '🙈';
        } else {
            input.type = 'password';
            this.textContent = '👁️';
        }
    });
});

// ===== Password Strength Checker =====
const signupPassword = document.getElementById('signupPassword');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.querySelector('.strength-text');

signupPassword.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    // Remove old classes
    strengthBar.classList.remove('weak', 'medium', 'strong');
    strengthText.classList.remove('weak', 'medium', 'strong');
    
    if (password.length === 0) {
        strengthText.textContent = '';
    } else if (strength <= 1) {
        strengthBar.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak';
    } else if (strength <= 2) {
        strengthBar.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Medium';
    } else {
        strengthBar.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong';
    }
});

// ===== Form Validation =====

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone validation
function isValidPhone(phone) {
    return /^\d{10,15}$/.test(phone.replace(/[^0-9]/g, ''));
}

// Login form
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');
    
    let isValid = true;
    
    // Validate email
    if (!email.value || !isValidEmail(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Validate password
    if (!password.value || password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }
    
    if (isValid) {
        // Success - store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', email.value.split('@')[0]);
        alert('Login successful!');
        loginModal.classList.remove('active');
        loginForm.reset();
    }
});

// Signup form
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('signupEmail');
    const phone = document.getElementById('phone');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');
    
    let isValid = true;
    
    // Validate first name
    if (!firstName.value.trim()) {
        document.getElementById('firstNameError').textContent = 'First name is required';
        isValid = false;
    } else {
        document.getElementById('firstNameError').textContent = '';
    }
    
    // Validate last name
    if (!lastName.value.trim()) {
        document.getElementById('lastNameError').textContent = 'Last name is required';
        isValid = false;
    } else {
        document.getElementById('lastNameError').textContent = '';
    }
    
    // Validate email
    if (!email.value || !isValidEmail(email.value)) {
        document.getElementById('signupEmailError').textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        document.getElementById('signupEmailError').textContent = '';
    }
    
    // Validate phone
    if (!phone.value || !isValidPhone(phone.value)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
        isValid = false;
    } else {
        document.getElementById('phoneError').textContent = '';
    }
    
    // Validate password
    if (!password.value || password.value.length < 8) {
        document.getElementById('signupPasswordError').textContent = 'Password must be at least 8 characters';
        isValid = false;
    } else {
        document.getElementById('signupPasswordError').textContent = '';
    }
    
    // Validate confirm password
    if (password.value !== confirmPassword.value) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').textContent = '';
    }
    
    // Validate terms
    if (!agreeTerms.checked) {
        alert('Please agree to the Terms and Privacy Policy');
        isValid = false;
    }
    
    if (isValid) {
        // Success
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', firstName.value);
        alert('Account created successfully!');
        signupModal.classList.remove('active');
        signupForm.reset();
    }
});

// ============================================================
// ===== AJAX CALLS - LEARNING & EXPERIMENTING SECTION =====
// ============================================================

/*
 * WHAT IS AJAX?
 * -------------
 * AJAX = Asynchronous JavaScript And XML
 * - Allows web pages to communicate with a server WITHOUT reloading
 * - Can send and receive data in the background
 * - Makes web apps feel faster and more responsive
 * 
 * TWO WAYS TO MAKE AJAX CALLS:
 * 1. XMLHttpRequest (Old way - more verbose)
 * 2. Fetch API (Modern way - cleaner syntax)
 */


// =====================================================
// METHOD 1: XMLHttpRequest (Traditional AJAX)
// =====================================================

/*
 * XMLHttpRequest is the original way to make AJAX calls.
 * It's more verbose but gives you more control.
 */

// Example 1: GET Request with XMLHttpRequest
function ajaxGetExample() {
    // Step 1: Create XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // Step 2: Configure the request (method, url, async)
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/1', true);
    
    // Step 3: Set up callback for when request completes
    xhr.onreadystatechange = function() {
        /*
         * readyState values:
         * 0 = UNSENT (request not initialized)
         * 1 = OPENED (connection established)
         * 2 = HEADERS_RECEIVED (request received)
         * 3 = LOADING (processing request)
         * 4 = DONE (request finished, response ready)
         */
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Success! Parse JSON response
                var data = JSON.parse(xhr.responseText);
                console.log('XMLHttpRequest GET Success:', data);
                console.log('User Name:', data.name);
                console.log('User Email:', data.email);
            } else {
                console.error('XMLHttpRequest Error:', xhr.status);
            }
        }
    };
    
    // Step 4: Send the request
    xhr.send();
}

// Example 2: POST Request with XMLHttpRequest
function ajaxPostExample() {
    var xhr = new XMLHttpRequest();
    
    // Configure POST request
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
    
    // Set request header for JSON data
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 201) {
            var response = JSON.parse(xhr.responseText);
            console.log('XMLHttpRequest POST Success:', response);
        }
    };
    
    // Prepare data to send
    var postData = JSON.stringify({
        title: 'My New Post',
        body: 'This is the post content',
        userId: 1
    });
    
    // Send with data
    xhr.send(postData);
}


// =====================================================
// METHOD 2: Fetch API (Modern AJAX)
// =====================================================

/*
 * Fetch API is the modern way to make HTTP requests.
 * It uses Promises which makes the code cleaner.
 * 
 * Basic syntax:
 * fetch(url, options)
 *   .then(response => response.json())
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 */

// Example 3: GET Request with Fetch
function fetchGetExample() {
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(function(response) {
            // Check if request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse JSON from response
            return response.json();
        })
        .then(function(data) {
            // Handle the data
            console.log('Fetch GET Success:', data);
            console.log('User Name:', data.name);
        })
        .catch(function(error) {
            // Handle errors
            console.error('Fetch Error:', error);
        });
}

// Example 4: POST Request with Fetch
function fetchPostExample() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'New Post Title',
            body: 'Post content goes here',
            userId: 1
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log('Fetch POST Success:', data);
    })
    .catch(function(error) {
        console.error('Fetch POST Error:', error);
    });
}

// Example 5: Fetch with async/await (Cleanest syntax)
async function fetchAsyncExample() {
    try {
        // await pauses until the Promise resolves
        var response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        if (!response.ok) {
            throw new Error('Request failed');
        }
        
        var data = await response.json();
        console.log('Async/Await Success:', data);
        return data;
        
    } catch (error) {
        console.error('Async/Await Error:', error);
    }
}

/*
// =====================================================
// PRACTICAL EXAMPLES FOR THIS PROJECT
// =====================================================

// Example 6: Fetch Doctors from API
function fetchDoctors() {
    console.log('Fetching doctors...');
    
    // This would work with a real backend server
    // For demo, using a fake API
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(function(response) {
            return response.json();
        })
        .then(function(users) {
            console.log('=== Doctors List ===');
            users.forEach(function(user, index) {
                console.log((index + 1) + '. Dr. ' + user.name);
            });
        })
        .catch(function(error) {
            console.error('Error fetching doctors:', error);
        });
}

// Example 7: Simulate Login with AJAX
function simulateLogin(email, password) {
    console.log('Attempting login...');
    
    // Simulate API call
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(function(response) {
            return response.json();
        })
        .then(function(user) {
            // Simulating authentication
            console.log('Login Response:', {
                success: true,
                message: 'Welcome back, ' + user.name + '!',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        })
        .catch(function(error) {
            console.error('Login failed:', error);
        });
}

// Example 8: Fetch Multiple Resources
function fetchMultipleResources() {
    console.log('Fetching multiple resources...');
    
    // Promise.all - wait for all requests to complete
    Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/comments/1').then(r => r.json())
    ])
    .then(function(results) {
        var user = results[0];
        var post = results[1];
        var comment = results[2];
        
        console.log('=== All Data Loaded ===');
        console.log('User:', user.name);
        console.log('Post:', post.title);
        console.log('Comment:', comment.body);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}


// =====================================================
// AJAX WITH LOADING STATES (User Experience)
// =====================================================

// Example 9: Show loading indicator during AJAX
function fetchWithLoading() {
    // Show loading message
    console.log('⏳ Loading...');
    
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function(response) {
            return response.json();
        })
        .then(function(posts) {
            // Hide loading, show data
            console.log('✅ Loaded ' + posts.length + ' posts!');
            console.log('First post:', posts[0].title);
        })
        .catch(function(error) {
            // Hide loading, show error
            console.log('❌ Error loading posts');
            console.error(error);
        });
}


// =====================================================
// ERROR HANDLING EXAMPLES
// =====================================================

// Example 10: Proper Error Handling
function fetchWithErrorHandling() {
    fetch('https://jsonplaceholder.typicode.com/users/999')  // Non-existent user
        .then(function(response) {
            // Check HTTP status
            if (response.status === 404) {
                throw new Error('User not found (404)');
            }
            if (!response.ok) {
                throw new Error('HTTP Error: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            console.log('User found:', data);
        })
        .catch(function(error) {
            console.error('Error caught:', error.message);
            // Show user-friendly message
            alert('Sorry, we could not find that user.');
        });
}


// =====================================================
// HOW TO TEST THESE FUNCTIONS
// =====================================================

/*
 * Open browser console (F12) and type any of these:
 * 
 * ajaxGetExample()        - XMLHttpRequest GET
 * ajaxPostExample()       - XMLHttpRequest POST
 * fetchGetExample()       - Fetch GET
 * fetchPostExample()      - Fetch POST
 * fetchAsyncExample()     - Fetch with async/await
 * fetchDoctors()          - Fetch list of doctors
 * simulateLogin()         - Simulate login
 * fetchMultipleResources()- Fetch multiple at once
 * fetchWithLoading()      - With loading indicator
 * fetchWithErrorHandling()- Error handling demo
 */

// Auto-run demo on page load (comment out if not needed)
/*
console.log('==============================================');
console.log('AJAX Learning Examples Loaded!');
console.log('==============================================');
console.log('Try these functions in the console:');
console.log('- fetchDoctors()');
console.log('- fetchGetExample()');
console.log('- fetchPostExample()');
console.log('- fetchWithLoading()');
console.log('==============================================');

*/
