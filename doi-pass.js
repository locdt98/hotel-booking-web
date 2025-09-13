const frm = document.forms['formdoipass'];
let token = sessionStorage.getItem("token");
let user = JSON.parse(sessionStorage.getItem("user"));
if (token===null || user==null) {
    alert("Bạn chưa đăng nhập");
    document.location = "dang-nhap.html";
}
frm.email.value = user.email;
frm.oldPassword.focus();

document.getElementById("btnDoiPass").addEventListener("click", ()=> {
    document.querySelector("#thongbao").innerText="";
    let data = {
        oldPassword: document.getElementById("oldPassword").value,
        newPassword: document.getElementById("newPassword").value,
        confirmPassword: document.getElementById("confirmPassword").value
    }
    if (data.oldPassword.trim()=="") {
        document.getElementById("thongbao").innerHTML="Chưa nhập mật khẩu cũ"; 
        frm.oldPassword.focus(); return;
    }
    if (data.newPassword.trim()=="") {
        document.getElementById("thongbao").innerHTML="Chưa nhập mật khẩu mới"; 
        frm.newPassword.focus(); return;
    }
    if (data.newPassword != data.confirmPassword) {
        document.getElementById("thongbao").innerHTML="2 Mật khẩu mới không giống"; 
        frm.confirmPassword.focus(); return;
    }
    const opt = {
        method:"post", body: JSON.stringify(data),
        headers: { "Content-type":"application/json", "authorization": "Beader " + token}
    }
    fetch(`http://localhost:3000/api/doi_pass`, opt).then(res =>{
        if (res.ok==false) throw new Error(res.statusText);
        return res.json();
    }).then( data =>{
        document.querySelector("#thongbao").innerText = data.message;
        if (data.status==0) //thành công  
         setTimeout( "document.location='index.html'", 3000)
    })
})
