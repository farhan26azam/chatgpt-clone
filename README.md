# 🧠 ChatGPT Clone (Next.js + GPT-4 + MongoDB)

A full-featured ChatGPT-style AI assistant built with **Next.js App Router**, powered by **OpenAI GPT-4**, featuring real-time streaming responses, image generation, persistent MongoDB chat history, and a clean modern UI with animations and markdown rendering.

---

## ⚙️ Tech Stack

- **Next.js (App Router)** — Fullstack React framework
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **OpenAI API** — GPT-4 + Image generation
- **MongoDB + Mongoose** — Persistent message storage
- **Framer Motion** — Smooth UI animations
- **Lucide Icons** — Icon set for UI polish
- **react-markdown + remark-gfm** — Markdown rendering (code, tables, etc.)

---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/your-repo-name.git  
cd your-repo-name

### 2. Install dependencies

npm install

### 3. Add environment variables

Create a `.env.local` file in the root:

OPENAI_API_KEY=sk-...  
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/chatgpt_clone

### 4. Run the development server

npm run dev

Open your browser at http://localhost:3000

---

## ✨ Features

- ✅ GPT-4 support via OpenAI
- ✅ Streaming responses (like ChatGPT)
- ✅ Image generation via prompt
- ✅ Markdown support with:
  - Code blocks
  - Tables
  - Headings, lists, and formatting
- ✅ MongoDB integration for chat history
- ✅ Dark mode with auto support
- ✅ Responsive layout + clean UI
- ✅ Scroll to bottom on new messages
- ✅ Input handling with Enter/send
- ✅ Icons and animations with Framer Motion and Lucide

---

## 🗂️ Folder Structure

src/  
├── app/  
│   ├── api/  
│   │   ├── chat/       → Chat handler (stream + image)  
│   │   ├── save/       → Save assistant messages to MongoDB  
│   │   └── history/    → Load chat history  
│   └── page.tsx        → Main entry (uses ChatBox)  
├── components/  
│   └── ChatBox.tsx     → Chat UI and logic  
├── lib/  
│   └── mongodb.ts      → MongoDB connection helper  
├── models/  
│   └── message.ts      → Mongoose schema  
├── styles/  
│   └── global.css      → Tailwind + custom CSS

---

## 🧠 How It Works

- User sends a message  
- App checks if it's a text or image request  
- GPT-4 handles response via streaming  
- Assistant messages are saved to MongoDB  
- Markdown is rendered beautifully with code/tables  
- Auto scrolls and shows typing animations

---

## 🧪 Ideas for Extensions

- [ ] Add authentication  
- [ ] Multi-chat sessions or history  
- [ ] Export conversation as Markdown or PDF  
- [ ] Mobile-optimized layout  
- [ ] Toggle for image-only / text-only replies

---

## 📦 Deployment

### Deploy on Vercel

1. Push to GitHub  
2. Go to https://vercel.com/new  
3. Import your repo  
4. Set your environment variables (OPENAI_API_KEY, MONGODB_URI)  
5. Deploy and go!

---

## ❤️ Credits

- Next.js  
- OpenAI API  
- Tailwind CSS  
- MongoDB  
- Framer Motion  
- Lucide Icons  
- react-markdown  

---

## 🧞 License

This project is open source and free to use under the MIT License.
