//room-with-tag.js
const params  = new URLSearchParams(location.search)
const tag = params.get("tag") 
const roomList = document.getElementById('room-list');
const pagination = document.getElementById('pagination');
const urlRoomInTag = `http://localhost:3000/api/rooms_with_tag/${tag}`;
const kq_rooms = await fetch(urlRoomInTag);
const rooms = await kq_rooms.json();
console.log(rooms, urlRoomInTag);
// Cấu hình phân trang
const roomsPerPage = 4;
let currentPage = 1;
const totalPages = Math.ceil(rooms.length / roomsPerPage);

// Hiển thị danh sách phòng cho một trang
function displayRooms(page) {
  roomList.innerHTML = ''; 
  const start = (page - 1) * roomsPerPage;
  const end = start + roomsPerPage;
  const roomsToShow = rooms.slice(start, end);

  roomsToShow.forEach(room => {
    roomList.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <img src="${room.image_url}" class="card-img-top" alt="Phòng ${room.name}">
          <div class="card-body">
            <h5 class="card-title">Phòng ${room.name}</h5>
            <p class="card-text">Tags: ${room.tags}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// Tạo các nút phân trang
function setupPagination() {
  pagination.innerHTML = ''; // xóa hết code hiện lại

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === currentPage ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = i;
      displayRooms(currentPage);
      setupPagination();
    });
    pagination.appendChild(li);
  }
}

displayRooms(currentPage);
setupPagination();

document.getElementById("room_in_tag").innerHTML= tag;
