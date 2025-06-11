Buzznet Frontend Repo :
You can check out Buzznet Backend here : https://github.com/JashwanthSPoojary/buzznet_backend

Buzznet is real time communication platform . 
Focus was to build a discord / slack kinda application so i can improve or learn full stack development through building a clone of real world product . 
i have built these application in intial phase of development for learning . 

Features include :
-- real time chatting through group channel messaging or direct messaging to members of workspace
-- personalized ai chatbot assistant
-- peer to peer video calling

Challengs / Learning through the project : 
-- general websocket challenges 
-- webrtc challenges for video challenges . understanding and implementing the webrtc was tough . 
-- passport js oauth
-- i built this application on inital phase of development so knew nothing everthing was learning and a challenge

Tech stack used
Frontend : React, Vite, React Router v7, Tailwind, ShadcnUI, Framer Motion, Lucide React (icons), Zustand (state management)
next-themes (theme switching), Axios, PeerJS (WebRTC)
Backend : 
Node.js, Express.js, TypeScript, Prisma ORM, Passport.js with Google OAuth, JSON Web Token (JWT), Bcrypt (password hashing), Multer (file upload), 
Nodemailer (email service), WebSocket (ws), Peer (WebRTC signaling), Zod (runtime validation), dotenv
Database:
PostgresSQL

Startup :
Create your environment file

In the root directory, create a .env file.
Use .env.example as a reference and add your credentials to .env.
Setup the database

npx prisma migrate deploy
npx prisma generate
Run the development server

npm run dev
Open the app

Go to http://localhost:3000 in your browser.
