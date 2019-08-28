import dotenv from 'dotenv';
import app from './express';

dotenv.config();

let port;
if (process.env.NODE_ENV === 'development') {
    port = process.env.PORT || 4000;
} else if (process.env.NODE_ENV === 'production') {
    port = 80;
} else {
    port = 4000;
}
const handleListen = () => {
    console.log(`Listening On : http://localhost:${port}`);
};

app.listen(port, handleListen);
