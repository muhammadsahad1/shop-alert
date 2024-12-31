import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import connectDB from './config/mongoDB.js'
import createServer from './config/socket.js'
import http from "http"
import productRouter from './routes/productRoute.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
connectDB()

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello aliens');
});

app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.originalUrl}`);
    next();
});

const server = http.createServer(app)
const io = createServer(server)

app.use('/api/auth', userRoute)
app.use('/api/users', userRoute)
app.use('/api/product', productRouter)

server.listen(PORT, () => console.log(`server is running: => http://localhost:${PORT}`))