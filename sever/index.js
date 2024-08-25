import express from "express";
import cors from 'cors';

import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import jwt from 'jsonwebtoken';

import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express()


app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth', adminRouter)
app.use('/employee', EmployeeRouter)


app.use(express.static('Public'))

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, "myemployee_secret_key", (err, decoded) => {
            if (err) return res.json({ Status: false, Error: "Wrong Token" })
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        return res.json({ Status: false, Error: "Not authenticated" })
    }
}
app.get('/verify', verifyUser, (req, res) => {

    return res.json({ Status: true, role: req.role, id: req.id })
})
const port = process.env.PORT || 3000; // Use the port from environment variable or default to 3000

app.listen(port, () => {
    console.log("server is running")
})