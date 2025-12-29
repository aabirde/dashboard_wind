const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { sequelize } = require('./models');
const { connectDB } = require('./config/db');

const { ErrorHandler } = require('./middleware/errorhandler');
const requestLogger = require('./middleware/requestlogger');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const turbineRoutes = require('./routes/turbineRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');

dotenv.config();


// 2. CALL IT HERE (Top-level)
// This ensures it runs regardless of whether app.listen is called

const app = express();
///const corsOptions = {
///  origin: ['http://localhost:5173', 'https://dashboard-wind-finale.vercel.app', 'https://dashboardwind.vercel.app', 'https://dashboardwind-f58u1zrgf-aabir-des-projects.vercel.app'], 
 /// credentials:true,
 /// methods: ['GET', 'POST', 'PUT', 'DELETE'],
///  allowedHeaders: ['Content-Type', 'Authorization'],
///};

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://dashboard-wind-finale.vercel.app',
      'https://dashboardwind.vercel.app'
    ];
    
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

  ///  callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization','Accept'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 3002;

async function initializeApp() {
  try {
    await connectDB();
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true, force: false });
      console.log('Database synchronized');
    }
  } catch (err) {
    console.error('Initialization Error:', err);
  }
}
initializeApp();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);

app.get('/health', (req, res) => {
  console.log('GET /health route hit');
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  console.log('GET / route hit');
  res.status(200).json({
    status: 'OK',
    message: 'API Root. Try /health or /api/ routes.'
  });
});
app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API root — try /users, /reports, etc.'
  });
});

const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/reports', reportRoutes);
apiRouter.use('/turbines', turbineRoutes);
apiRouter.use('/manufacturer', manufacturerRoutes);
app.use('/api', apiRouter);

// 404 handler - must be after all routes
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler - must be last
app.use(ErrorHandler);

const gracefulShutdown = async () => {
  console.log('Received shutdown signal, closing server gracefully...');
  try {
    await sequelize.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

app.listen(PORT, async () => {
  try {
    await connectDB();
    
    await sequelize.sync({
      alter: process.env.NODE_ENV === 'development',
      force: false
    });
    
    console.log('Database synchronized successfully');
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('Available routes:');
    console.log('GET  /health');
    console.log('GET  /');
    console.log('POST /auth/*');
    console.log('GET  /users/*');
    console.log('GET  /reports/*');
    console.log('GET  /turbines/*');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  gracefulShutdown();
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  gracefulShutdown();
});

module.exports = app;