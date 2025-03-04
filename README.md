# Real-Time Stock Trading Application

## 📌 Project Overview
This is a full-stack real-time stock trading application that allows users to buy and sell stocks, track their balance and shares, and view real-time stock price updates.

### **Tech Stack**
- **Frontend:** React (Dockerized, running on port 8080 with Nginx as a reverse proxy)
- **Backend:** Node.js with Express.js and Socket.IO
- **Database:** MongoDB
- **Authentication:** JWT
- **State Management:** Context API
- **Testing:** Jest & React Testing Library
- **DevOps & CI/CD:** Docker & Docker Compose

---

## 🚀 Getting Started
### **1. Prerequisites**
Ensure you have the following installed on your machine:
- **Docker** & **Docker Compose**
- **Node.js v18+** (if running locally without Docker)
- **MongoDB** (if running locally without Docker)

### **2. Clone the Repository**
```sh
git clone https://github.com/gdmartinezsandino/stock-trading-example-app
cd stock-trading-example-app
```

### **3. Environment Variables**
Create a `.env` file in the root directory and add the following variables:
```env
# Server Configuration
MONGO_URI=mongodb://database:27017/stock-trading-example-app
JWT_SECRET=trading_secret
PORT=3000
```

For local development, adjust `MONGO_URI` to your local MongoDB instance.

### **4. Running the Project with Docker**
To start the application with **Docker Compose**, run:
```sh
docker-compose up --build
```
This will:
- Start the **backend** on port `3000`
- Start the **frontend** on port `8080`
- Start the **MongoDB** container

### Initial credentials
email: admin@example.com
password: password123

### **5. Running Locally Without Docker**
If you want to run the project locally:

#### **Start MongoDB** 
```sh
mongod --dbpath /path/to/db
```

#### **Start Backend**
```sh
cd server
npm install
npm start
```
The backend will run on `http://localhost:3000`

#### **Start Frontend**
```sh
cd webapp
npm install
npm start
```
The webapp will run on `http://localhost:8080`

---

## 📡 API Endpoints
### **Authentication**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| POST   | `/api/user/login` | User login |
| GET    | `/api/user/me` | Get user details (Auth required) |

### **Trading**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| POST   | `/api/trades` | Create a new trade (buy/sell) |
| GET    | `/api/trades` | Get all user trades |

### **WebSockets**
- **Subscribe to Stock Updates:** `ws://localhost/socket.io`
- **Events:**
  - `stock:update` → Receives real-time stock price changes
  - `trade:update` → Receives trade updates

---

## 🏗 Project Structure
```
stock-trading-example-app/
│── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── Dockerfile
│
│── webapp/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.js
│   ├── index.js
│   └── Dockerfile
│
│── docker-compose.yml
│── .env
│── README.md
```

---

## 🛠 Development & Debugging
### **Checking Logs**
To view logs from running containers:
```sh
docker-compose logs -f
```

### **Stopping the App**
```sh
docker-compose down
```

### **Running Backend Tests**
```sh
cd server
npm test
```

### **Running Frontend Tests**
```sh
cd webapp
npm test
```
