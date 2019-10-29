import Server from './expressApp';

const port = process.env.PORT || 8383;

const handleListen = () => {
    console.log(`Listening On : http://localhost:${port}`);
};

Server.listen(port, handleListen);
