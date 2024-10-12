// Toggle between dark and light mode
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");

    themeToggle.textContent = body.classList.contains("dark-mode") ? "🌙" : "☀️";
});

// Handle form submission for both file upload and text
const form = document.getElementById("message-form");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const fileInput = document.getElementById("file-upload");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // If file is uploaded, show as a message
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        addMessage(`File uploaded: ${fileName}`, "user");
        fileInput.value = ""; // Reset the file input
    }

    // If there's a text message, show it as a message
    if (userInput.value.trim()) {
        addMessage(userInput.value, "user");
        userInput.value = ""; // Reset the text input
    }
});

// Add a message to the chat box
function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
