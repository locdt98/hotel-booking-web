document.getElementById("btnDangNhap").addEventListener("click", ()=> {
    let data = {
        email: document.getElementById("email").value,
        matkhau: document.getElementById("password").value,
    }
    const url =`http://localhost:3000/api/dang_nhap`;
    const opt = {
        method:"post",
        body: JSON.stringify(data),
        headers: { "Content-Type":"application/json"}
    }
    fetch(url, opt)
    .then(res => res.json())
    .then( data =>{
        document.querySelector("#thongbao").innerHTML=data.message
        if (data.status!=1) return; //1 mới là thành công 
        let token = data.token;
        let user = data.user;
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("user", JSON.stringify(user))
        document.location="index.html";
    })
})
