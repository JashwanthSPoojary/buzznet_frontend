# Buzznet Frontend

Buzznet is a real-time communication platform inspired by Discord and Slack. The goal of this project was to improve and learn full stack development by building a clone of a real-world product. This application was developed in the initial phase of my journey, and almost everything was a new challenge and learning opportunity.

> You can also check out the [Buzznet Backend repository here](https://github.com/JashwanthSPoojary/buzznet_backend).

---

## Features

- **Real-time Chatting**  
  Group channel messaging and direct messaging within a workspace.
- **Personalized AI Chatbot Assistant**  
  Get help and answers from an AI assistant within the workspace.
- **Peer-to-Peer Video Calling**  
  Video calls powered by WebRTC and PeerJS.

---

## Challenges & Learnings

- **General WebSocket Challenges**  
  Handling real-time communication and state across clients.
- **WebRTC Video Call Implementation**  
  Learning and implementing WebRTC for peer-to-peer video calls was tough but rewarding.
- **OAuth with Passport.js**  
  Integrated Google OAuth for authentication.
- **Learning by Building**  
  This project was built at the very start of my development journey, so every feature was a new challenge and a learning experience.

---

## Tech Stack

### Frontend

- React
- Vite
- React Router v7
- Tailwind CSS
- ShadcnUI
- Framer Motion
- Lucide React (icons)
- Zustand (state management)
- next-themes (theme switching)
- Axios
- PeerJS (WebRTC)

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- Passport.js (Google OAuth)
- JSON Web Token (JWT)
- Bcrypt (password hashing)
- Multer (file upload)
- Nodemailer (email service)
- WebSocket (`ws`)
- Peer (WebRTC signaling)
- Zod (runtime validation)
- dotenv

### Database

- PostgreSQL

---

## Getting Started
### 1. Clone the repository**  
   ```bash
   git clone https://github.com/JashwanthSPoojary/Ai-Interview-simulation.git
   cd Ai-Interview-simulation
   ```
### 2. Create your environment file

In the root directory, create a `.env` file.  
Use `.env.example` as a reference and add your credentials to `.env`.

### 3. Setup the database

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open the app

Go to [http://localhost:3000](http://localhost:3000) in your browser.

---

This project was built for learning purposes and reflects the challenges and growth throughout the development process.
