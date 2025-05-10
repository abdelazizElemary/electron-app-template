# 🖥️ Electron Desktop Monitor App (Node.js + React + Pusher)

A real-time **desktop monitoring application** built with:

- 🧠 **Node.js + Express** backend (Dockerized)
- ⚛️ **React + Electron** frontend (.exe-ready)
- 🔔 **Pusher Channels** for real-time socket communication
- 🐳 **Docker Compose** setup with MongoDB, Redis, and API
- ♻️ **Redis + BullMQ** for job queuing and background task handling

---

## 💡 Purpose

Designed for internal monitoring, booking screens, or simulator control panels. The app broadcasts real-time backend data to desktop clients using Pusher sockets.

---

## 📦 Tech Stack

| Layer      | Tech                                                             |
| ---------- | ---------------------------------------------------------------- |
| Frontend   | React, Electron                                                  |
| Backend    | Node.js, Express                                                 |
| Realtime   | [Pusher Channels](https://pusher.com/docs/channels) (WebSockets) |
| Background | Redis + BullMQ (for job queues)                                  |
| DB         | MongoDB                                                          |
| DevOps     | Docker & Docker Compose                                          |

---

## ⚙️ Features

- ✅ Real-time communication with frontend (Pusher)
- ✅ Cross-platform desktop build (.exe via Electron)
- ✅ Redis used as a message broker for background jobs
- ✅ Background processing with BullMQ and Cron Jobs
- ✅ Backend fully Dockerized (Mongo, Redis, Node.js API)
- ✅ Structured and extensible codebase

---

## 🧰 Background Jobs with Redis & BullMQ

- Redis powers background job queues via [**BullMQ**](https://docs.bullmq.io/)
- Cron jobs or triggers enqueue background tasks
- Jobs can handle data syncing, simulation updates, and push notifications

---

## 🐳 Dockerized Architecture

We use **Docker Compose** to spin up:

- `api`: Node.js app
- `mongo`: MongoDB database
- `redis`: Redis server (used for BullMQ)

### 🐳 To start all services:

```bash
docker-compose up --build
```

Make sure to set your `.env` file for Mongo and Redis credentials.

---

## 📁 Project Structure

```
electron-monitor-app/
├── api/                       # Node.js backend
│   ├── use-cases/             # Business logic (e.g., save-booking.js)
│   ├── workers/               # BullMQ workers
│   ├── queues/                # Job queue definitions
│   ├── connection.js          # Redis/Mongo connection utils
│   ├── routes/                # Express routes
│   ├── jobs/                  # Scheduled jobs (cron)
│   ├── index.js               # Server entry point
├── packages/
│   ├── app/                   # React + Electron frontend
│   │   └── src/
│   └── shared/                # Shared utils (if any)
├── docker-compose.yml         # Docker orchestration
├── Dockerfile                 # Backend Dockerfile
├── .env.example               # Sample environment vars
```

---

## 🛠️ Local Development

### 1. Clone & install dependencies

```bash
git clone https://github.com/yourusername/electron-monitor-app.git
cd electron-monitor-app
npm install
cd packages/app
npm install
```

### 2. Run backend (non-Docker)

```bash
cd api
node index.js
```

### 3. Start frontend in dev mode

```bash
cd packages/app
npm run electron
```

### 4. Build Electron `.exe` app from a windows machine

```bash
npm run dist
```

---

## 🔐 Environment Variables

See `.env.example` for required values:

- `MONGO_URI`
- `REDIS_HOST`
- `PUSHER_APP_ID`, `PUSHER_KEY`, etc.

---

## 🙌 Contribution

Fork the repo, raise issues, or submit PRs. Your feedback is welcome!

---

## 🧠 Notes from the Author

This app was part of a real-world simulation project. I open-sourced it to help others working with **Electron**, **Node.js**, **Redis**, and **Pusher** in real-time desktop environments.
