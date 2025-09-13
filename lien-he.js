document.getElementById("btnGui").addEventListener("click", ()=> {
    let data = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    }
    const url =`http://localhost:3000/api/lien_he`;
    const opt = {
        method:"post",
        body: JSON.stringify(data),
        headers: { "Content-Type":"application/json"}
    }
    fetch(url, opt)
    .then(res => res.json())
    .then( data =>{
        document.getElementById("contactForm").reset();
        document.getElementById("thongbao").innerHTML= data.message;
    })
})
