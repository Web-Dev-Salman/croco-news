const loadblogs = () => {
    const blogsContainer = document.getElementById('blog-container');
    blogsContainer.innerHTML = ` `;
    blogs.forEach(blog => {
        blogsContainer.innerHTML += `
            <div class="col">
                <div class="card h-100">
                    <img src="photos/arrowVsNormalFunction.png" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${blog.title}</h5>
                        <p class="card-text">${blog.details.slice(0,200)}</p>
                        <hr>
                        <p class="card-text">${blog.published_date}</p>
                    </div>
                    <a onclick="showBlogDetail(${blog.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#blogModal">Read More</a>
                </div>
            </div>
        `
    })
}

// =======show blog details=============
const showBlogDetail = (id) => {
    const modalContainer = document.getElementById('modal-container');
    const blog = blogs[id];
    modalContainer.innerHTML = `
    <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="blogModalLabel">${blog.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <img src="${blog.image}">
                <br><br>
                ${blog.details}
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>

    `
}


loadblogs();