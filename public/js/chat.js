const socket = io();

/*socket.on('countUpdated', (count) => {
    console.log('count updated', count);
});

document.querySelector('#increment').addEventListener('click', () => {
    console.log('clicked');
    socket.emit('increment');
});*/

const {username, room}= Qs.parse(location.search, { ignoreQueryPrefix : true});

socket.on('message', (message) => {
    document.querySelector('#myLabel').innerHTML += "<br>"+message.username+'__'+message.text + " __ " + moment(message.createdAt).format();
});

socket.on('locationMessage', (message) => {
    document.querySelector('#myLabel').innerHTML += "<br>"+message.username+'__'+message.text + " __ " + moment(message.createdAt).format();
});

socket.on('roomData', ({room, users}) => {
    console.log(room);
    console.log(users);
})


const messageForm = document.querySelector('form');
const messageElement = document.querySelector('#message');
const sendLocationButton = document.querySelector('#sendLocation');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageElement.value;
    socket.emit('sendMessage', message, (error) => {
        if(error){
            return console.log(error);
        }
        
        console.log('message delivered');
    });
});

sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('No library');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position);
        const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        socket.emit('sendLocation', coords, () => {
            console.log('Location shared');
        });
    });
});


socket.emit('join', {username, room}, (error) => {
    if(error){
        alert(error);
        location.href = "http://localhost:3000"
    }
});
