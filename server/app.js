const express = require('express');

const http = require('http');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const cors = require('cors');
// const allowedOrigins = ["http://localhost:4200"];
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, origin);
//     } else {
//       callback(new Error("CORS not allowed"));
//     }
//   },
//   credentials: true
// }));

const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const stockSymbol = 'AAPL';
let stockPrice = 150;

io.on('connection', (socket) => {
  console.log('🔥 A new user connected:', socket.id);

  // Send the latest stock price immediately when a user connects
  socket.emit("stockPriceUpdate", { symbol: stockSymbol, stockPrice });

  socket.on("disconnect", () => {
    console.log('❌ A user has disconnected:', socket.id);
  });
});

// logic to generate dummy data for stock price
setInterval(() => {
  stockPrice = (Math.random() * (200 - 150) + 150).toFixed(2);
  console.log(`📢 Sending stockPriceUpdate (${stockPrice}) to ${io.engine.clientsCount} clients`);
  io.emit("stockPriceUpdate", { symbol: stockSymbol, stockPrice });
}, 5000);

const stockRoutes = require('./routes/stock');
app.use('/api/stock', stockRoutes);
const tradeRoutes = require('./routes/trade');
app.use('/api/trade', tradeRoutes);
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

const User = require('./models/User');
const bcrypt = require('bcryptjs');
const createDefaultUser = async () => {
  try {
    const existingUser = await User.findOne({ email: "admin@example.com" });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const newUser = new User({
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        balance: 10000,
        shares: 0,
      });

      await newUser.save();
      console.log("✅ Default user created: admin@example.com / password123");
    } else {
      console.log("ℹ️ Default user already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating default user:", error);
  }
};

app.use((req, res, next) => {
  console.log(`📩 Incoming request: ${req.method} ${req.url}`);
  console.log(`🔑 Headers:`, req.headers);
  next();
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected!');
    await createDefaultUser();
  })
  .catch((error) => {
    console.log('MongoDB connection error: ', error);
  });

module.exports = { app, server };
