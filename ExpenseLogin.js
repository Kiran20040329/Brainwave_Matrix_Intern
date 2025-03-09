function validateCredentials() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const correctUsername = "Kiran";
    const correctPassword = "1234";

    if (username === correctUsername && password === correctPassword) {
        window.location.href = 'Tracker.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}
function history(){
    window.location.href ='Tracker.html#sec-2';
}