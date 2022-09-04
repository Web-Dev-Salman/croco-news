const mainHeading = document.getElementById('main-heading');
//----------- getting categories form api------------
const getCategoriesFromApi = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res =>  res.json())
    .then(data => showCategories(data))
    .catch( err => console.log(err))
}

// ------- showing categories into nav -------------
const showCategories = (data) => {
    const categories = data.data['news_category'];
    const categoryList = document.getElementById('category-list');
    categories.forEach(categorie => {
        categoryList.innerHTML += `
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" onclick="getNewsByCategoryID('${categorie['category_id']}','${categorie['category_name']}')">${categorie['category_name']}</a>
            </li>
        `
    });

}

// ---------- show category news by category id------------------
const getNewsByCategoryID = (id, name) => {
    loadSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then( res => res.json())
    .then( data => showNewsByCategory(data, name))
    .catch( err => console.log(err))
}

//---------show news by category-----------------
const showNewsByCategory = (data, catName) => {
    const allNews = data.data;
    const allNewsDiv = document.getElementById('news-container');
    mainHeading.innerHTML = `${allNews.length ? allNews.length : "No" } News Found in ${catName}`
    allNewsDiv.innerHTML = ` `;
    allNews.forEach(news => {
        console.log(news)
        const {
            author: {
                img,
                name,
                published_date
            },
            details,
            total_view,
            image_url,
            rating: {
                badge,
                number
            },
            thumbnail_url,
            title,
            _id:id
        } = news;

        // -------------show all news------------
        allNewsDiv.innerHTML +=    `
            <div class="col">
                <div class="card h-100 rounded-3">
                    <div class="row">
                        <div class="col col-md-4 col-lg-3  col-xl-2 card-image">
                            <img src="${thumbnail_url}" class="h-100 card-img-top">
                        </div>
                        <div class="col col-md-8 col-lg-9 col-xl-10 card-body">
                            <div class="news">
                                <h4 class="card-title">${title}</h4>
                                <p class="card-text">${details.slice(0,250)}...</p>
                            </div>
                            <div class="info row mt-3">
                                <div class="author-box col-4">
                                    <div class="row">
                                        <div class="col author-image">
                                            <img src="${img}" alt="">
                                        </div>
                                        <div class="col author-info">
                                            <h5>Author: ${name ? name : "Name Not Given"}</h5>
                                            <p>Date: ${published_date}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 view">
                                    <h5>Views: ${total_view} </h5>
                                </div>
                                <div class="col-4 readmore">
                                    <a href="#" class="btn btn-primary" onclick="getNewsDetailsById('${id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Read News</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    loadSpinner(false)
}

const getNewsDetailsById = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showNewsDetailsById(data))
    .catch( err =>  console.log(err))
}

// show news details in modal
const showNewsDetailsById = (data) => {
    // console.log(data)
    const modalBody = document.getElementById('modal-container');
    const {
        title,
        details,
        image_url,
        author: {
            name,
            published_date
        }
    } = data.data[0];

    modalBody.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <img src="${image_url}">
            <br><br>
            <p>${details}</p>
            <hr>
            <br>
            <p>Author: ${name} </p>
            <p>Date: ${published_date} </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    `
}

const loadSpinner = (isTrue) => {
    const spinner = document.getElementById('spinner-container');
    const newsContainer = document.getElementById('news-container');
    if(isTrue) {
        newsContainer.classList.add('d-none');
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
        newsContainer.classList.remove('d-none');
    }
} 




getCategoriesFromApi();
getNewsByCategoryID('01', 'Breaking News')