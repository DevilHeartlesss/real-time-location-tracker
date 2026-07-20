# Real-Time Location Tracker

A real-time multi-user location tracking web application built using **Node.js**, **Express.js**, **Socket.IO**, and **Leaflet.js**. The application enables multiple users to share their live location on an interactive map with real-time synchronization.

---

# Features

* Real-time location tracking
* Multi-user support
* Live location updates using Socket.IO
* Interactive maps powered by Leaflet.js
* User identification by name
* Automatic marker updates
* Automatic removal of disconnected users
* Responsive user interface
* Browser Geolocation API integration

---

# Technology Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Leaflet.js

## Backend

* Node.js
* Express.js
* Socket.IO

## APIs

* Browser Geolocation API
* OpenStreetMap

---

# Project Structure

```text
Real-Time-Location-Tracker/
│
├── public/
│   ├── script.js
│   └── style.css
│
├── views/
│   └── index.ejs
│
├── server.js
├── package.json
├── README.md
└── .gitignore
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/DevilHeartlesss/real-time-location-tracker
```

## Navigate to the project directory

```bash
cd Real-Time-Location-Tracker
```

## Install dependencies

```bash
npm install
```

## Start the application

```bash
node server.js
```

or

```bash
npm start
```

## Open the application

```
http://localhost:3000
```

---

# Usage

1. Launch the application.
2. Enter your name.
3. Click **Join Tracking**.
4. Grant location permission when prompted.
5. View your location on the map.
6. Connected users will appear on the map with their names.
7. User locations update automatically in real time.
8. Disconnected users are automatically removed.

---

# How It Works

1. The browser obtains the user's current location using the Geolocation API.
2. The client sends location updates to the server through Socket.IO.
3. The server broadcasts the updated location to all connected clients.
4. Leaflet.js updates the corresponding marker on the map.
5. When a user disconnects, the server notifies all clients to remove that user's marker.

---

# Technologies Used

| Technology      | Purpose                   |
| --------------- | ------------------------- |
| Node.js         | JavaScript runtime        |
| Express.js      | Web application framework |
| Socket.IO       | Real-time communication   |
| Leaflet.js      | Interactive maps          |
| HTML5           | User interface            |
| CSS3            | Styling                   |
| JavaScript      | Client-side logic         |
| Geolocation API | Live location access      |
| OpenStreetMap   | Map tiles                 |

---

# Future Improvements

* User authentication
* Route history
* User profile images
* MongoDB integration
* Distance calculation between users
* Mobile application
* Docker support
* Cloud deployment

---

# Learning Outcomes

This project demonstrates practical knowledge of:

* Real-time web applications
* Event-driven programming
* Client-server communication
* WebSocket communication using Socket.IO
* Express.js application development
* Interactive mapping with Leaflet.js
* Browser Geolocation API

---

# License

This project is licensed under the MIT License.

---

# Author

**Aayush Singh**
