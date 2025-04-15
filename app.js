const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const usernameDisplay = document.getElementById('username');

fetch('/username')
    .then(res => res.json())
    .then(data => {
        usernameDisplay.textContent = data.username;
    });

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', {
            username: usernameDisplay.textContent,
            message: input.value
        });
        input.value = '';
    }
});

socket.on('chat message', function (data) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
});
