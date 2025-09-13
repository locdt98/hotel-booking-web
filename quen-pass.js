document.getElementById("btnQuenPass").addEventListener("click", ()=> {
    let data = {
        email: document.getElementById("email").value,
    }
    const url =`http://localhost:3000/api/quen_pass`;
    const opt = {
        method:"post",
        body: JSON.stringify(data),
        headers: { "Content-Type":"application/json"}
    }
    fetch(url, opt).then(res => res.json()).then( data =>{
        document.querySelector("#thongbao").innerHTML=data.message      
    })
})
