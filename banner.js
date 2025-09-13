const url = `http://localhost:3000/api/banners`;
const kq_Banner= await fetch(url);
const banner_arr = await kq_Banner.json();//mảng data các banner đổ về từ server

//hiện các hình
const div_banner= document.getElementById('div_banner');
banner_arr.forEach( (banner, index) => { 
  const div = document.createElement('div');
  div.classList.add('carousel-item');
  if (index === 0) div.classList.add('active'); // rất quan trọng
  div.innerHTML = `<img src="${banner.image_url}" class="d-block w-100">`;
  div_banner.appendChild(div);
})

//hiện các indicator
const div_indicator= document.getElementById('div_indicator');
banner_arr.forEach( (banner, index) => { 
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('data-bs-target', '#hotelCarousel');
  button.setAttribute('data-bs-slide-to', index);
  if (index === 0) {
    button.classList.add('active');
  }
  div_indicator.appendChild(button);
})
