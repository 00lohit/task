import express from 'express';
import dotenv from 'dotenv';
import { sendOtp } from './otp';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.post('/send-otp', async (req, res) => {
    const { phoneNumber, otp } = req.body;
    const apiKey = req.headers['authorization'];

    if (!phoneNumber || !otp) {
        return res.status(400).json({ error: true, message: "Phone number and OTP are required" });
    }

    if (!apiKey) {
        return res.status(400).json({ error: true, message: "OTP_IDOOTA_API_KEY is required" });
    }

    try {
        const response = await sendOtp(phoneNumber, otp);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
