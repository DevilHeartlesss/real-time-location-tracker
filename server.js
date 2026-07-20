const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

// ==============================
// Express Configuration
// ==============================

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// ==============================
// Socket.IO
// ==============================

io.on("connection", (socket) => {

    console.log(`Client Connected: ${socket.id}`);

    socket.on("send-location", ({ username, latitude, longitude }) => {

        io.emit("receive-location", {
            id: socket.id,
            username,
            latitude,
            longitude,
        });

    });

    socket.on("disconnect", () => {

        console.log(`Client Disconnected: ${socket.id}`);

        io.emit("user-disconnected", socket.id);

    });

});

// ==============================
// Routes
// ==============================

app.get("/", (req, res) => {
    res.render("index");
});

// ==============================
// Server
// ==============================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});