// ===== Authentication JavaScript =====

// ===== Login Form Handling =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.textContent = type === 'password' ? '👁️' : '🙈';
    });
    
    // Email validation
    emailInput.addEventListener('blur', function() {
        validateEmail(this);
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate email
        if (!validateEmail(emailInput)) {
            isValid = false;
        }
        
        // Validate password
        if (!validatePassword(passwordInput, 'passwordError')) {
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate login (replace with actual API call)
            setTimeout(function() {
                // Store login state
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', emailInput.value);
                
                // Show success and redirect
                alert('Login successful! Welcome back.');
                window.location.href = 'index.html';
            }, 1500);
        }
    });
}

// ===== Signup Form Handling =====
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const signupEmailInput = document.getElementById('signupEmail');
    const phoneInput = document.getElementById('phone');
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const userTypeInput = document.getElementById('userType');
    const doctorFields = document.getElementById('doctorFields');
    const typeBtns = document.querySelectorAll('.type-btn');
    
    // Toggle password visibility
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    toggleSignupPassword.addEventListener('click', function() {
        const type = signupPasswordInput.type === 'password' ? 'text' : 'password';
        signupPasswordInput.type = type;
        this.textContent = type === 'password' ? '👁️' : '🙈';
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
        confirmPasswordInput.type = type;
        this.textContent = type === 'password' ? '👁️' : '🙈';
    });
    
    // User type selection
    typeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Remove active from all
            typeBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            
            // Add active to clicked
            this.classList.add('active');
            
            // Update hidden input
            const userType = this.getAttribute('data-type');
            userTypeInput.value = userType;
            
            // Show/hide doctor fields
            if (userType === 'doctor') {
                doctorFields.style.display = 'block';
            } else {
                doctorFields.style.display = 'none';
            }
        });
    });
    
    // Real-time validation
    firstNameInput.addEventListener('blur', function() {
        validateRequired(this, 'firstNameError', 'First name is required');
    });
    
    lastNameInput.addEventListener('blur', function() {
        validateRequired(this, 'lastNameError', 'Last name is required');
    });
    
    signupEmailInput.addEventListener('blur', function() {
        validateEmail(this, 'signupEmailError');
    });
    
    phoneInput.addEventListener('blur', function() {
        validatePhone(this);
    });
    
    // Password strength checker
    signupPasswordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
    });
    
    signupPasswordInput.addEventListener('blur', function() {
        validatePassword(this, 'signupPasswordError');
    });
    
    confirmPasswordInput.addEventListener('blur', function() {
        validateConfirmPassword();
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        if (!validateRequired(firstNameInput, 'firstNameError', 'First name is required')) {
            isValid = false;
        }
        
        if (!validateRequired(lastNameInput, 'lastNameError', 'Last name is required')) {
            isValid = false;
        }
        
        if (!validateEmail(signupEmailInput, 'signupEmailError')) {
            isValid = false;
        }
        
        if (!validatePhone(phoneInput)) {
            isValid = false;
        }
        
        if (!validatePassword(signupPasswordInput, 'signupPasswordError')) {
            isValid = false;
        }
        
        if (!validateConfirmPassword()) {
            isValid = false;
        }
        
        // Validate doctor fields if doctor is selected
        if (userTypeInput.value === 'doctor') {
            const specializationInput = document.getElementById('specialization');
            const licenseInput = document.getElementById('licenseNumber');
            
            if (!specializationInput.value) {
                document.getElementById('specializationError').textContent = 'Please select a specialization';
                isValid = false;
            }
            
            if (!licenseInput.value) {
                document.getElementById('licenseNumberError').textContent = 'License number is required';
                isValid = false;
            }
        }
        
        // Check terms agreement
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms.checked) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                email: signupEmailInput.value,
                phone: phoneInput.value,
                userType: userTypeInput.value,
                password: signupPasswordInput.value
            };
            
            if (userTypeInput.value === 'doctor') {
                formData.specialization = document.getElementById('specialization').value;
                formData.licenseNumber = document.getElementById('licenseNumber').value;
            }
            
            // Simulate signup (replace with actual API call)
            setTimeout(function() {
                // Store user data
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(formData));
                
                // Show success and redirect
                alert('Account created successfully! Welcome to Oladoc.');
                window.location.href = 'index.html';
            }, 1500);
        }
    });
}

// ===== Validation Functions =====

function validateRequired(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    
    if (!input.value.trim()) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
        return false;
    } else {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        return true;
    }
}

function validateEmail(input, errorId) {
    errorId = errorId || 'emailError';
    const errorElement = document.getElementById(errorId);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!input.value.trim()) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(input.value)) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = 'Please enter a valid email address';
        return false;
    } else {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        return true;
    }
}

function validatePhone(input) {
    const errorElement = document.getElementById('phoneError');
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    
    if (!input.value.trim()) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = 'Phone number is required';
        return false;
    } else if (!phoneRegex.test(input.value)) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = 'Please enter a valid phone number';
        return false;
    } else {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        return true;
    }
}

function validatePassword(input, errorId) {
    const errorElement = document.getElementById(errorId);
    
    if (!input.value) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = 'Password is required';
        return false;
    } else if (input.value.length < 8) {
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = 'Password must be at least 8 characters';
        return false;
    } else {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        return true;
    }
}

function validateConfirmPassword() {
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorElement = document.getElementById('confirmPasswordError');
    
    if (!confirmPasswordInput.value) {
        confirmPasswordInput.classList.add('error');
        confirmPasswordInput.classList.remove('success');
        errorElement.textContent = 'Please confirm your password';
        return false;
    } else if (confirmPasswordInput.value !== signupPasswordInput.value) {
        confirmPasswordInput.classList.add('error');
        confirmPasswordInput.classList.remove('success');
        errorElement.textContent = 'Passwords do not match';
        return false;
    } else {
        confirmPasswordInput.classList.remove('error');
        confirmPasswordInput.classList.add('success');
        errorElement.textContent = '';
        return true;
    }
}

function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;
    
    // Remove previous classes
    strengthBar.classList.remove('weak', 'medium', 'strong');
    strengthText.classList.remove('weak', 'medium', 'strong');
    
    if (password.length === 0) {
        strengthText.textContent = '';
        return;
    }
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) {
        strengthBar.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak';
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Medium';
    } else {
        strengthBar.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong';
    }
}

// ===== Check Login State on Page Load =====
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        // Update navbar for logged-in users
        const navButtons = document.getElementById('navButtons');
        if (navButtons) {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const userName = userData.firstName || 'User';
            
            navButtons.innerHTML = `
                <span class="user-greeting">Hi, ${userName}</span>
                <a href="#" class="btn btn-orange" id="logoutBtn">Logout</a>
            `;
            
            // Add logout functionality
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userData');
                localStorage.removeItem('userEmail');
                alert('Logged out successfully!');
                window.location.href = 'index.html';
            });
        }
    }
});
