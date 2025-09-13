const div_service= document.getElementById('div_service');
const url = `http://localhost:3000/api/services`;
const kq_Service = await fetch(url);
const services_arr = await kq_Service.json();
services_arr.forEach( service => { 
    div_service.innerHTML+=`
    <div class="col-md-3">
      <div class="text-center p-4 bg-white rounded shadow-sm h-100">
        <img src="${service.image_url}" style="max-width:50px; max-height:50px">
        <h5 class="mt-3">${service.name}</h5>
        <p class="text-muted">${service.description}</p>
      </div>
    </div>`;
})
