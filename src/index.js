import dotenv from 'dotenv';
import app from './express';

dotenv.config();

let url;
let port;
if (process.env.NODE_ENV === 'development') {
    url = process.env.URL || 'localhost';
    port = process.env.PORT || 4000;
} else if (process.env.NODE_ENV === 'deployment') {
    url = process.env.URL;
    port = 8000;
} else {
    port = 4000;
}
const handleListen = () => {
    console.log(`Listening On : http://localhost:${port}`);
};

app.listen(port, handleListen);
