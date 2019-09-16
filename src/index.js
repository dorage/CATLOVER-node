import dotenv from 'dotenv';
import app from './express';

dotenv.config();

const url = process.env.URL || 'localhost';
const port = process.env.PORT || 4000;

const handleListen = () => {
    console.log(`Listening On : http://${url}:${port}`);
};

app.listen(port, handleListen);
