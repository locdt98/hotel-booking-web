document.getElementById("btnDangKy").addEventListener("click", ()=> {
    let data = {
        hoten: document.getElementById("hoten").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        matkhau: document.getElementById("matkhau").value,
        nhaplaimatkhau: document.getElementById("nhaplaimatkhau").value
    }
    const url =`http://localhost:3000/api/dang_ky`;
    const opt = {
        method:"post",
        body: JSON.stringify(data),
        headers: { "Content-Type":"application/json"}
    }
    fetch(url, opt)
    .then(res => res.json())
    .then( data =>{
        document.getElementById("formdangky").reset();
         document.getElementById("thongbao").innerHTML= data.message;
    })
})
