// Import the Google Services API logic
import { fetchElectionData } from './gemini.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');

    // SECURITY: Prompt for API key dynamically. Never hardcode. Store only in memory/session.
    let apiKey = sessionStorage.getItem('gemini_api_key');
    if (!apiKey) {
        apiKey = prompt("Welcome to the Indian Election Assistant! Please enter your Gemini API Key to continue (It will be cleared when you close the tab):");
        if (apiKey) {
            sessionStorage.setItem('gemini_api_key', apiKey);
        } else {
            appendMessage("System: An API Key is required for the assistant to function. Please refresh and try again.", "bot");
            userInput.disabled = true;
        }
    }

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop page from refreshing

        const message = userInput.value.trim();
        if (!message || !apiKey) return;

        // 1. Display User's Message
        appendMessage(message, 'user');
        userInput.value = ''; // Clear input field

        // 2. Display Loading State (UX enhancement)
        const loadingId = appendMessage("Checking the latest Election Commission guidelines...", 'bot', true);

        // 3. Fetch Data from Gemini
        const response = await fetchElectionData(message, apiKey);

        // 4. Remove Loading & Display AI Response
        removeMessage(loadingId);
        appendMessage(response, 'bot');
    });

    /**
     * Appends a message to the chat window.
     * SECURITY: We use textContent instead of innerHTML to completely block XSS attacks.
     */
    function appendMessage(text, sender, isLoading = false) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', `${sender}-message`);

        // Handle basic formatting for readability
        msgDiv.textContent = text;

        if (isLoading) {
            msgDiv.id = 'loading-msg';
            // Accessibility: Hide loading text from screen readers to prevent spam
            msgDiv.setAttribute('aria-hidden', 'true');
        }

        chatWindow.appendChild(msgDiv);

        // Auto-scroll to the newest message
        chatWindow.scrollTop = chatWindow.scrollHeight;

        return msgDiv.id;
    }

    function removeMessage(id) {
        if (!id) return;
        const el = document.getElementById(id);
        if (el) el.remove();
    }
});