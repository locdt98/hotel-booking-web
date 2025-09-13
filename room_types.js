const url = `http://localhost:3000/api/room_types`;
const kq_Room_Types = await fetch(url);
const room_types_arr = await kq_Room_Types.json();

const ul_room_types= document.getElementById('ul_room_types');
ul_room_types.innerHTML=``;
room_types_arr.forEach( type => { 
    ul_room_types.innerHTML+=`
    <li><a class="dropdown-item " href="room-with-type.html?type=${type.id}">
    ${type.name}
    </a></li>`;
})
