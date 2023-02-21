

const clockView = document.getElementById("clock-view");
const date = new Date();
clockView.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

setInterval(() => {
    const date = new Date();
    clockView.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}, 5000)