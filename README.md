# 🇮🇳 Election Process Educator (2026)

An ultra-lightweight, highly secure, and accessible interactive assistant designed to educate users on the Indian Election Process, timelines, and voting steps. 

Built exclusively for the 2026 National Level Hackathon.

## 🎯 Chosen Vertical
**Election Process Education**

## 🧠 Approach & Logic
To maximize efficiency and respect the strict **10 MB repository limit**, this application is built using a **Zero-Bloat Architecture** (Vanilla JavaScript, Semantic HTML5, and Modern CSS). 

Instead of relying on heavy frameworks, the application leverages the native browser API (`fetch`) to communicate directly with **Google Gemini 3.1 Flash**. The AI is heavily constrained using strict System Instructions to ensure it acts purely as an educational bot, filtering out hallucinations and off-topic queries. 

A pre-validation layer checks user inputs locally *before* making network requests, dramatically optimizing API rate limits and execution speed.

## ⚙️ How the Solution Works
1. **Secure Initialization:** Upon launch, the app dynamically requests an API key from the user/judge. This is stored temporarily in `sessionStorage` and destroyed when the tab is closed.
2. **Local Validation:** When a user asks a question, the `electionData.js` module scans the query for relevant keywords. 
3. **Contextual Processing:** Valid queries are sent to the Gemini API, packaged with a system prompt that enforces formatting (bullet points, conciseness) and domain accuracy (Election Commission of India rules).
4. **Accessible Rendering:** The response is streamed securely into an `aria-live` chat region, instantly readable by screen readers.

## 🏆 Evaluation Focus Areas (How this project meets the criteria)

*   **Code Quality:** Strict separation of concerns (HTML for structure, CSS for presentation, modular JS for logic). ES6 `import/export` syntax is used throughout.
*   **Security:** **No hardcoded API keys.** Keys are kept in session memory. DOM updates strictly use `textContent` instead of `innerHTML` to guarantee zero Cross-Site Scripting (XSS) vulnerabilities.
*   **Efficiency:** The entire repository is kilobytes in size, far below the 10MB limit. Native APIs replace heavy NPM packages.
*   **Testing:** Features a custom, zero-dependency unit testing suite (`tests/logic.test.js`) that runs seamlessly in the browser console to validate core logic without bloating the codebase.
*   **Accessibility:** Achieves perfect a11y standards using Semantic HTML (`role="main"`, `role="banner"`), `aria-live` dynamic regions, high-contrast CSS variables, and explicit keyboard focus states (`:focus-visible`).
*   **Google Services:** Deep integration with **Google Gemini 3.1 Flash API** for dynamic, logic-driven conversational context.

## 📌 Assumptions Made
*   Users/Judges possess a valid Google Gemini API key to test the application securely.
*   Users have modern browsers capable of running ES6 JavaScript modules and native `fetch` requests.