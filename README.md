# CosmoGuide: Interactive Space Academy & AI Tutor 🚀🌌

An immersive, premium interactive educational web application about the Solar System and space sciences, built with an intelligent **AI Space Tutor (AstroTutor)** that guides, scrolls, and highlights content dynamically as you learn.

---

## 🌟 Key Features

*   **☀️ Interactive Sun Hotspots (Solar Core):** Click on visual nodes to discover facts and temperatures about the Sun's core, photosphere, and corona.
*   **🌍 Rocky Planets Explorer:** A comparison dashboard featuring Mercury, Venus, Earth, and Mars. The planetary spheres are rendered entirely in **pure CSS 2D/3D shadows and gradients**. Clicking any planet animates relative statistics (gravity, scale, distance) in real-time.
*   **🪐 Gas Giants Orbit Simulator:** A dynamic orbit model representing Jupiter, Saturn, Uranus, and Neptune. Select orbiting planets to view their atmospheric composition and moon counts.
*   **🧪 Interactive Space Quiz:** A multiple-choice quiz of 3 questions with instant feedback, visual progress, score tallies, and customized ending results.
*   **🤖 Smart AI Assistant (AstroTutor):**
    *   **Simulated Local Mode (Default):** Runs immediately offline using pre-programmed semantic responses in Arabic to answer curriculum questions and trigger navigation actions.
    *   **Gemini API Live Mode:** Enter your **Google Gemini API Key** inside the collapsible configuration panel, and AstroTutor turns into a generative AI model that parses questions, explains details, and appends `[NAV:...]` routing codes to automatically scroll and glow sections.

---

## 🛠️ Technology Stack

*   **Structure:** HTML5 (Semantic elements, responsive layout)
*   **Styling:** CSS3 (Variables, Custom scrollbars, pure-CSS spheres, Glassmorphism, animations)
*   **Logic:** Modular JavaScript (ES6)
*   **AI Engine:** Google Gemini API Integration (`gemini-1.5-flash`)

---

## 🚀 How to Run Locally

Since this project is built using purely client-side code, it doesn't require complex installation processes or dependencies like Node.js or Python.

### Quick Start
1. Clone or download this repository.
2. Double-click the `index.html` file to open it directly in any modern web browser.
3. Start talking to **AstroTutor** in the chat panel!

---

## 🌐 Deploying to GitHub Pages

To make this website public for your students or clients:
1. Go to your GitHub repository settings.
2. Navigate to **Pages** on the left menu.
3. Under **Build and deployment**, select the `main` branch and `/root` directory, then click Save.
4. GitHub will host the static website for free on `https://<your-username>.github.io/<repo-name>/`.
