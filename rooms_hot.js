const roomList = document.getElementById('room-list');
const url = `http://localhost:3000/api/rooms_hot?soluong=12`;
const kq_rooms = await fetch(url);
const rooms = await kq_rooms.json();
rooms.forEach( room => {console.log(room)
    roomList.innerHTML += `
    <div class="col-md-3 mb-4">
        <div class="card h-100">
        <img src="http://localhost:3000${room.image_url}" class="card-img-top" alt="Phòng ${room.name}">
        <div class="card-body">
            <h5 class="card-title">Phòng ${room.name}</h5>
            <p class="card-text">Tags: ${room.tags}</p>
        </div>
        </div>
    </div>
    `;
})
