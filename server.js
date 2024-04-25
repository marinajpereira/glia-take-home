import { listen } from './app.js'

const PORT = 3000

// Start the server
const server = listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
