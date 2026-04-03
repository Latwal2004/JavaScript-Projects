# 🪄 AI Image Generator

A browser-based AI image generator built with vanilla JavaScript that uses Hugging Face's Inference API to generate images from text prompts.

---

## 🚀 Features

- Generate images from text prompts using AI models
- Multiple aspect ratio options — Square (1:1), Landscape (16:9), Portrait (9:16)
- Generate 1–4 images at a time
- Download generated images directly
- Light / Dark theme toggle with local storage persistence
- Random prompt generator with typing animation
- Responsive gallery grid layout

---

## 📁 Project Structure

```
AI-Image-Generator/
├── index.html       # App layout and UI structure
├── styles.css       # All styling including dark theme
└── script.js        # Core logic — API calls, image generation, theme
```

---

## ⚙️ How It Works

1. User types a prompt (or uses the random prompt button)
2. Selects a model, image count, and aspect ratio
3. Clicks **Generate**
4. The app calls the Hugging Face Inference API
5. Generated images appear in the gallery with a download button

---

## 🔑 How to Get Your Hugging Face API Token

> You **must** have a Hugging Face account and API token to use this app.

**Step-by-step:**

1. Go to [huggingface.co](https://huggingface.co) and sign in (or create a free account)
2. Click your **profile picture** (top right)
3. Go to **Settings** → **Access Tokens**
4. Click **"New token"**
5. Give it a name (e.g. `image-gen-app`), set type to **Read**
6. Click **Generate token** and copy it
7. Open `script.js` and paste it here:

```javascript
const API_KEY = "hf_YOUR_TOKEN_HERE"; // ← Paste your token here
```

---

## ⚠️ Model Availability — IMPORTANT

> **Only Stable Diffusion XL is free.** All other models require a paid Hugging Face Pro account or nscale credits.

| Model | Free? | Notes |
|---|---|---|
| ✅ Stable Diffusion XL | **Free** | Works with any HF token |
| ✅ Stable Diffusion v1.5 | **Free** | Works with any HF token |
| ❌ FLUX.1-dev | Paid only | Requires HF Pro or nscale credits |
| ❌ FLUX.1-schnell | Paid only | Requires HF Pro or nscale credits |
| ❌ Stable Diffusion 3 | Paid only | Requires HF Pro account |

If you select a paid model with a free token, you will see a **401 Unauthorized** error in the console.

**Recommendation:** Use **Stable Diffusion XL** for the best free results.

---

## 🛠️ Setup & Run Locally

No build tools or npm required — it's pure HTML/CSS/JS.

```bash
# 1. Clone the repository
git clone https://github.com/Latwal2004/JavaScript-Projects.git

# 2. Open the project folder
cd JavaScript-Projects/AI-Image-Generator

# 3. Add your API key to script.js

# 4. Open index.html in your browser
#    (Use Live Server in VS Code for best results)
```

> ⚠️ Do **not** open `index.html` by double-clicking — some browsers block API requests from `file://` URLs. Use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code or any local server.

---

## 🧠 Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, dark mode, animations |
| Vanilla JavaScript (ES6+) | App logic, API calls |
| Hugging Face Inference API | AI image generation |
| Font Awesome 6 | Icons |
| Google Fonts (Inter) | Typography |

---

## 🔒 Security Note

> Your API key is visible in the browser's source code. **Do not share your project publicly with your real API key inside it.** For a production app, move API calls to a backend server and keep the key in environment variables.

---

## 📄 License

This project is open source and free to use for personal and educational purposes.