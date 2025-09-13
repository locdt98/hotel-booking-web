const blogHot = document.getElementById('blog_hot');
const url = `http://localhost:3000/api/blog_hot`;
fetch(url).then( res=> res.json()).then (data => {})
const kq_BlogHot = await fetch(url);
const blogHot_arr = await kq_BlogHot.json();
blogHot_arr.forEach( blog => {
    blogHot.innerHTML+=`
    <div class="col-md-4 mb-4">
        <div class="card h-100">
        <img src="${blog.image_url}" class="card-img-top" alt="${blog.title}">
        <div class="card-body">
            <h5 class="card-title">${blog.title}</h5>
            <p class="card-text">${blog.content}...</p>
        </div>
        </div>
    </div>`;
})
/*
fetch(url).then( res=> res.json()).then (blogHot_arr => {
    blogHot_arr.forEach( blog => {
        blogHot.innerHTML+=`
        <div class="col-md-4 mb-4">
            <div class="card h-100">
            <img src="${blog.image_url}" class="card-img-top" alt="${blog.title}">
            <div class="card-body">
                <h5 class="card-title">${blog.title}</h5>
                <p class="card-text">${blog.content}...</p>
            </div>
            </div>
        </div>`;
    })
})
*/