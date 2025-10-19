// destinations to show on the map
const destinations = [
    { name: "Slovenia (Ljubljana)", coords: [46.0569, 14.5058], link: "place-2.html", color: "#1f77b4" },
    { name: "Colombia (Medellín)", coords: [6.2462, -75.5623], link: "place-1.html", color: "#ff7f0e" },
    { name: "Georgia (Tbilisi)", coords: [41.7151, 44.8271], link: "place-3.html", color: "#2ca02c" },
    { name: "Laos (Luang Prabang)", coords: [19.8832, 102.1387], link: "place-4.html", color: "#d62728" }
];

const map = L.map('map', { zoomControl: true }).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function makeIcon(color) {
    const svg = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 24 24">
            <path fill="${color}" d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5" fill="#ffffff"/>
        </svg>
    `);
    return L.divIcon({
        className: 'custom-marker',
        html: `<img src="data:image/svg+xml;charset=utf-8,${svg}" alt="${color} marker">`,
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        popupAnchor: [0, -36]
    });
}

destinations.forEach(dest => {
    const marker = L.marker(dest.coords, { icon: makeIcon(dest.color) }).addTo(map);
    marker.bindPopup(`<strong>${dest.name}</strong><br><a href="${dest.link}">Open page</a>`);
});

// optional: fit map to markers
const group = L.featureGroup(destinations.map(d => L.marker(d.coords)));
map.fitBounds(group.getBounds().pad(0.3));