const API_URL = 'https://fakestoreapi.com/products';
const loaderr = document.querySelector('.loaderr');
const notFound = document.querySelector('.not-found')
async function fetchdata(api) {
    let query = new URLSearchParams(window.location.search);
    let id = query.get('id');
    let data = await fetch(`${api}/${id}`);
    data
        .json()
        .then(res => createCard(res))
        .catch((err) => {
            notFound.style.display = 'block',
                console.log(err)
        })

        .finally(() => {
            loaderr.style.display = 'none'
        });

    console.log(data);
}

fetchdata(API_URL);



////////////////////// ========================= create crd ========================   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let wraperdiv = document.querySelector('.big-wrapperr')
const createCard = (data) => {
    console.log(data);

    let fragment = document.createDocumentFragment();
    while (wraperdiv.firstChild) {
        wraperdiv.firstChild.remove()
    }
    let div = document.createElement('div');
    div.classList.add('big-wrapper')
    div.innerHTML = `
        <div class="mini-image-wraper">
                <img src="${data.image}" alt="">
            </div>
            <div class=" product__item-wrapper">
                <span class="product__item-wrapper-pr_flash pr_new">Новинка</span>
                <button class="product__item-heart border-0 p-0 bg-transparent radius">
                    <img src="https://asaxiy.uz/custom-assets/images/icons/heart.svg">
                </button>
                <button class="product__item-compare border-0 p-0 bg-transparent ">
                    <img src="https://asaxiy.uz/custom-assets/images/icons/compare_gray.svg">
                </button>
                <img class="prduct-image-cradd" src="${data.image}" alt="">
            </div>
            <div class="card-section-wrapper">
                <h1 class="card-section-product-title"><b>${data.title}</b></h1>
                <div class="row">
                    <div class="product__item-rating--stars d-flex align-items-center gap-1 mb-2">
                        <span><i class="bi bi-star-fill"></i></span>
                        <span><i class="bi bi-star-fill"></i></span>
                        <span><i class="bi bi-star-fill"></i></span>
                        <span><i class="bi bi-star-fill"></i></span>
                        <span><i class="bi bi-star-fill"></i></span>
                        <span class="rating">${data.rating.rate}</span>
                    </div>
                </div>
                <div class="price_box mb-3">
                    <span class="price_box_one ">${data.price}$</span>
                    <div class="price_box_mudatli mt-2 mb-2">
                        <b class="font-weight-bold ">51 000 сум x 12 мес</b>
                    </div>
                </div>
                <div class="category_text-content d-flex align-items-center mb-2 ">
                    <p class="category_text-content-p">category:</p>
                    <span class="category_text-content-span"><a href="" class="text-decoration-none">${data.category}</a></span>
                </div>
                <div class="d-flex align-items-center mb-2">
                    <p class="category_text-content-p">Title: </p>
                    <span class="category_text-content-span"
                        title="${data.title}">${data.title} </span>
                </div>
                <div class="d-flex align-items-center nalichi mb-4">
                    <p class="nalichi_text-content-p">Наличии:_ _ _ _ _ _</p>
                    <span class="nalichi_text-content-span">● В наличии</span>
                </div>
                <div class="button-gr d-flex gap-2 align-items-center">
                    <button class="korzinka_add"><img src="https://asaxiy.uz/custom-assets/images/cart-white.svg"
                            alt="">Добавить в корзину</button>
                    <button class="buy_btn"> Купить сейчас</button>
                </div>

                <div class="wraper_like_container">
                    <div class="list_title  mt-3 mb-2">Проголосуйте:</div>
                    <div class="like-icon-container d-flex align-items-center justify-content-between">
                        <svg xmlns="http://www.w3.org/2000/svg" class="like-icon" id="recommended" viewBox="0 0 24 24"
                            fill="none">
                            <path
                                d="M2.39844 12.5984C2.39844 12.3621 2.445 12.128 2.53545 11.9096C2.62591 11.6912 2.7585 11.4928 2.92565 11.3256C3.09279 11.1585 3.29122 11.0259 3.50961 10.9355C3.72799 10.845 3.96206 10.7984 4.19844 10.7984C4.43482 10.7984 4.66888 10.845 4.88727 10.9355C5.10565 11.0259 5.30408 11.1585 5.47123 11.3256C5.63838 11.4928 5.77096 11.6912 5.86142 11.9096C5.95188 12.128 5.99844 12.3621 5.99844 12.5984V19.7984C5.99844 20.2758 5.8088 20.7337 5.47123 21.0712C5.13366 21.4088 4.67583 21.5984 4.19844 21.5984C3.72105 21.5984 3.26321 21.4088 2.92565 21.0712C2.58808 20.7337 2.39844 20.2758 2.39844 19.7984V12.5984ZM7.19844 12.398V18.914C7.19823 19.36 7.3223 19.7973 7.55673 20.1767C7.79116 20.5561 8.12668 20.8627 8.52564 21.062L8.58564 21.092C9.2515 21.4248 9.98564 21.5982 10.73 21.5984H17.2292C17.7843 21.5987 18.3222 21.4065 18.7515 21.0547C19.1808 20.7028 19.4748 20.2131 19.5836 19.6688L21.0236 12.4688C21.0932 12.1207 21.0847 11.7614 20.9987 11.417C20.9127 11.0725 20.7513 10.7514 20.5262 10.4768C20.3011 10.2023 20.0179 9.98108 19.697 9.82918C19.3761 9.67728 19.0255 9.59847 18.6704 9.59844H14.3984V4.79844C14.3984 4.16192 14.1456 3.55147 13.6955 3.10138C13.2454 2.65129 12.635 2.39844 11.9984 2.39844C11.6802 2.39844 11.375 2.52487 11.1499 2.74991C10.9249 2.97495 10.7984 3.28018 10.7984 3.59844V4.39884C10.7984 5.43741 10.4616 6.44798 9.83844 7.27884L8.15844 9.51804C7.53529 10.3489 7.19844 11.3595 7.19844 12.398Z"
                                fill="currentColor" />
                        </svg>
                        <p class="like-icon-container-text">Я рекомендую</p>
                        <span class="like-icon-container-count">0</span>
                    </div>
                </div>
            </div>
            <div class="rasrochka-container">
                <div class="warpper-rasrochka">
                    <h2 class="font-weight-bold text-left"> <b>Рассрочка платежа</b> </h2>
                    <div class="rasrochka-div d-flex gap-2">
                        <span class="rasrochka-div-sapn">3Мес</span>
                        <span class="rasrochka-div-sapn">6Мес</span>
                        <span class="rasrochka-div-sapn">12Мес</span>
                    </div>

                    <div class="rasrochka-mudatli-tolov">
                        <p>Рассрочка от партнера UzumNasiya</p>
                        <div class="logo-rasrochka d-flex justify-content-between align-items-center">
                            <img src="https://asaxiy.uz/custom-assets/images/company/uzumnasiya.svg" alt="" width="84px"
                                height="30px">
                            <b>267 100 sum</b>
                        </div>
                        <button class="zakazat_btn">Заказать в рассрочку</button>
                    </div>

                    <div class="rasrochka-mudatli-tolov">
                        <p>Рассрочка от Asaxiy</p>
                        <div class="logo-rasrochka d-flex justify-content-between align-items-center">
                            <img src="https://asaxiy.uz/custom-assets/images/logos/asaxiy-logo.svg" alt="">
                            <b>271 100 sum</b>
                        </div>
                        <button class="zakazat_btn">Заказать в рассрочку</button>
                    </div>
                </div>
            </div>
        </div>      
        `


    fragment.appendChild(div)
    wraperdiv.appendChild(fragment)
}





/////////////////////////////////////// ========================rstrochka ==================================\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


