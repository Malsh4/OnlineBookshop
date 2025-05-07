import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
    'http://localhost:5173'
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS']
}))

//API Endpoints
app.get('/', (req, res) => res.send("Backend is calling!"));

//Authentication API endpoint
app.use('/api/auth', authRoutes);

//User Data update API endpoint
app.use('/api/user', userRoutes);

//Shopping cart API endpoint
app.use('/api/cart', cartRoutes);

//Order processing API endpoint
app.use('/api/orders', orderRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));