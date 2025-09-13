const url = `http://localhost:3000/api/room_types`;
const kq_loai_phong = await fetch(url);
const loai_phong_arr = await kq_loai_phong.json();

//hiện các loại phòng trong tag select
const select_loai_phong= document.getElementById('select_loai_phong');
select_loai_phong.innerHTML=`<option value="-1" data-price="0">Chọn loại phòng</option>`;
loai_phong_arr.forEach( loai => { 
    select_loai_phong.innerHTML+=`
    <option value="${loai.id}" data-price="${loai.price_per_night}">
        ${loai.name} ( ${ Number(loai.price_per_night).toLocaleString("vi") } )
    </option>`;
})

//hiện các dịch vụ bổ sung
const urlService = `http://localhost:3000/api/services`;
const kqService = await fetch(urlService);
const serviceArr = await kqService.json();

const div_dich_vu_bo_sung= document.getElementById('div_dich_vu_bo_sung');
serviceArr.forEach( service => { 
div_dich_vu_bo_sung.innerHTML+=`
<div class="form-check col-md-6">
<input class="form-check-input" type="checkbox" value="${service.id}" data-price="${service.price}">
<label class="form-check-label">
${service.name} - ${Number(service.price).toLocaleString("vi") || "Miễn phí" }
</label>
</div>`;
})


//hiện phòng trong tag select theo loại đã chọn
document.getElementById('select_loai_phong').addEventListener('change', async function() {
  const typeId = this.value;
  const roomSelect = document.getElementById('select_phong');
  roomSelect.innerHTML = '<option>Đang tải...</option>';
  if (!typeId) {
    roomSelect.innerHTML = '<option>-- Chọn phòng cụ thể --</option>';
    return;
  }
  try {
    const res = await fetch(`http://localhost:3000/api/rooms_available_in_type/${typeId}`);
    const rooms = await res.json();
    if (Array.isArray(rooms)) {
      roomSelect.innerHTML = rooms.map(room =>
        `<option value="${room.id}">${room.name} - ${room.tags} </option>`
      ).join('');
    } else {
      roomSelect.innerHTML = '<option>Không có phòng</option>';
    }
  } catch (err) {
    roomSelect.innerHTML = '<option>Lỗi tải phòng</option>';
    console.error(err);
  }
});


 //tính tiền
  const checkInInput = document.querySelectorAll('input[type="date"]')[0];
  const checkOutInput = document.querySelectorAll('input[type="date"]')[1];
  const roomSelect = document.getElementById("select_loai_phong");
  const serviceCheckboxes = document.querySelectorAll(".form-check-input");
  const TongTien = document.getElementById("tong_tien");
  const div_thongbao = document.querySelector('#thongbao');

  function TinhTongTien() {
    div_thongbao.innerHTML=``;
    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);
    let days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    if (isNaN(days) || days <= 0) {
      TongTien.textContent = "Vui lòng chọn ngày hợp lệ";  return;
    }
    // Lấy giá phòng từ data-price
    const selectedRoom = roomSelect.options[roomSelect.selectedIndex];
    const roomPricePerDay = parseInt(selectedRoom.getAttribute("data-price") || 0);
    const roomTotal = roomPricePerDay * days;
    // Tính giá dịch vụ
    let serviceTotal = 0;
    serviceCheckboxes.forEach(cb => {
      if (cb.checked) {
        serviceTotal += parseInt(cb.getAttribute("data-price") || 0);
      }
    });
    const total = roomTotal + serviceTotal;
    TongTien.textContent = total.toLocaleString("vi-VN") + " VND";
  }

  checkInInput.addEventListener("change", TinhTongTien);
  checkOutInput.addEventListener("change", TinhTongTien);
  roomSelect.addEventListener("change", TinhTongTien);
  serviceCheckboxes.forEach(cb => cb.addEventListener("change", TinhTongTien));


  //gửi dữ liệu lên server
document.getElementById("btnDP").addEventListener("click", async function () {
  const check_in_date = document.getElementById("ngayden").value;
  const check_out_date = document.getElementById("ngaydi").value;
  const room_type_id  = document.getElementById("select_loai_phong").value;
  const room_id = document.getElementById("select_phong").value;

  // Kiểm tra 
  if (!check_in_date || !check_out_date) { div_thongbao.innerHTML="Mời chọn ngày nhận và trả phòng."; return; }
  if (check_in_date > check_out_date) { div_thongbao.innerHTML = "Ngày trả phải sau ngày nhận phòng."; return;}
  if (!room_type_id) { div_thongbao.innerHTML ="Vui lòng chọn loại phòng."; return; }
  if (!room_id) { div_thongbao.innerHTML ="Vui lòng chọn phòng."; return; }

  const service_ids = [];
  document.querySelectorAll(".form-check-input:checked").forEach(cb => {
    service_ids.push(cb.value);
  });
  const bookingData = { check_in_date, check_out_date, room_type_id, room_id, service_ids };
  try {
    const res = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });
    const result = await res.json();
    div_thongbao.innerHTML = result.message || "Đặt phòng thành công!"
  } catch (error) {
    div_thongbao.innerHTML ="Lỗi khi gửi dữ liệu: " + error.message;
  }
});
