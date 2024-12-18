
const registerBtn = document.getElementById('register');
const container = document.getElementById('container');
const loginBtn = document.getElementById('login');
registerBtn.addEventListener('click',()=>{
    container.classList.add("active");
})
loginBtn.addEventListener('click',()=>{
    container.classList.remove("active");
})
document.addEventListener('DOMContentLoaded', () => {
  // Select forms and inputs
  const signUpForm = document.querySelector('.sign-up form');
  const signInForm = document.querySelector('.sign-in form');
  const nameInput = signUpForm.querySelector('input[placeholder="Name"]');
  const emailInputSignUp = signUpForm.querySelector('input[placeholder="Email"]');
  const passwordInputSignUp = signUpForm.querySelector('input[placeholder="Password"]');
  const emailInputSignIn = signInForm.querySelector('input[placeholder="Email"]');
  const passwordInputSignIn = signInForm.querySelector('input[placeholder="Password"]');

  // Sign Up Logic
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const name = nameInput.value.trim();
    const email = emailInputSignUp.value.trim();
    const password = passwordInputSignUp.value.trim();

    if (!name || !email || !password) {
      alert('Please fill in all the fields.');
      return;
    }

    // Save user data to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { name, email, password };

    // Check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      alert('This email is already registered. Please use a different email.');
      return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign Up successful! Redirecting to homepage...');
    window.location.href = 'home.html'; // Redirect to homepage
  });

  // Sign In Logic
  signInForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const email = emailInputSignIn.value.trim();
    const password = passwordInputSignIn.value.trim();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Admin Login Check
    if (email === 'admin@gmail.com' && password === 'admin123') {
      alert('Welcome, Admin! Redirecting to Admin Dashboard...');
      window.location.href = './admin/index.html'; // Redirect admin to admin dashboard
      return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matchingUser = users.find(user => user.email === email && user.password === password);

    if (matchingUser) {
      alert(`Welcome back, ${matchingUser.name}! Redirecting to homepage...`);
      window.location.href = 'home.html'; // Redirect to homepage
    } else {
      alert('Invalid email or password. Please try again.');
    }
  });
});
