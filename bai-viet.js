//bai-viet.js
const url_bai_viet = `http://localhost:3000/api/blogs`;
const kq_baiviet = await fetch(url_bai_viet);
const bai_viet_arr = await kq_baiviet.json();
// Cấu hình phân trang
const bvPerPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(bai_viet_arr.length / bvPerPage);

const div_baiviet = document.getElementById('blogs');
const pagination = document.getElementById('pagination');

// Hiển thị danh sách phòng cho một trang
function displayBV(page) {
  div_baiviet.innerHTML = ''; 
  const start = (page - 1) * bvPerPage;
  const end = start + bvPerPage;
  const bvToShow = bai_viet_arr.slice(start, end);

  bvToShow.forEach( bv => {
    div_baiviet.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${bv.image_url}" class="card-img-top" alt="${bv.title}">
          <div class="card-body">
            <h5 class="card-title">${bv.title}</h5>
            <p class="card-text">${bv.content}...</p>
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
      displayBV(currentPage);
      setupPagination();
    });
    pagination.appendChild(li);
  }
}

displayBV(currentPage);
setupPagination();
