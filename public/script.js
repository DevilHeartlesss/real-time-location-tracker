const socket = io();

// =====================
// Initialize Map
// =====================
const map = L.map("map").setView([0, 0], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// =====================
// Global Variables
// =====================
const markers = {};

let myId = "";
let username = "";
let joined = false;
let mapCentered = false;

// =====================
// Socket Connection
// =====================
socket.on("connect", () => {
    myId = socket.id;
    console.log(`Connected: ${myId}`);
});

// =====================
// Join Tracking
// =====================
const usernameInput = document.getElementById("username");
const joinButton = document.getElementById("joinBtn");
const joinBox = document.getElementById("join-box");

joinButton.addEventListener("click", joinTracking);

usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        joinTracking();
    }
});

function joinTracking() {

    username = usernameInput.value.trim();

    if (username.length < 2) {
        alert("Please enter a valid name.");
        usernameInput.focus();
        return;
    }

    joined = true;

    joinBox.style.display = "none";
}

// =====================
// Live Location
// =====================
if (navigator.geolocation) {

    navigator.geolocation.watchPosition(

        (position) => {

            if (!joined) return;

            const { latitude, longitude } = position.coords;

            if (!mapCentered) {
                map.setView([latitude, longitude], 16);
                mapCentered = true;
            }

            socket.emit("send-location", {
                username,
                latitude,
                longitude,
            });

        },

        (error) => {
            console.error("Geolocation Error:", error);
        },

        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }

    );

} else {

    alert("Geolocation is not supported by your browser.");

}

// =====================
// Receive Live Locations
// =====================
socket.on("receive-location", ({ id, username, latitude, longitude }) => {

    const isCurrentUser = id === myId;

    const markerColor = isCurrentUser ? "#198754" : "#0d6efd";

    const markerLabel = isCurrentUser
        ? "You"
        : (username || "User");

    const icon = L.divIcon({

        className: "custom-marker",

        html: `
            <div class="marker-container">

                <div class="marker-label">
                    ${markerLabel}
                </div>

                <div
                    class="marker-dot"
                    style="background:${markerColor};">
                </div>

            </div>
        `,

        iconSize: [110, 40],
        iconAnchor: [55, 40],

    });

    if (markers[id]) {

        markers[id].setLatLng([latitude, longitude]);
        markers[id].setIcon(icon);

    } else {

        markers[id] = L.marker([latitude, longitude], {
            icon,
        }).addTo(map);

    }

});

// =====================
// User Disconnected
// =====================
socket.on("user-disconnected", (id) => {

    if (!markers[id]) return;

    map.removeLayer(markers[id]);

    delete markers[id];

});