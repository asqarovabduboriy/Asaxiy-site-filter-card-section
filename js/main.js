///////////////// =====================    LOADING COPY =========================\\\\\\\\\\\\\\\\\\\\\\\\\

const wrapper = document.querySelector('.wrapper');
const loader = document.querySelector('.loader');

let arr = Array(20).fill("");
let fragment = document.createDocumentFragment('');
arr.forEach(() => {
    let div = document.createElement('div');
    div.classList.add('loader');
    fragment.appendChild(div);
})

wrapper.appendChild(fragment);

///////////////////////// ================= API AND LOADING ================= \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const API_URL = 'https://fakestoreapi.com/products';

async function fetchdata(api) {
    let data = await fetch(api);
    data
        .json()
        .then(res => {
            Displaydata(res)
            createCategory(res)
        })
        .catch(err => console.log(err))
        .finally(() => {
            wrapper.style.display = "none"
        });

    console.log(data);
}

fetchdata(API_URL);



////////////////////////// =====================     create Card   ============================ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let output = document.querySelector('.cards-wrapper');
function Displaydata(data) {

    let fragment = document.createDocumentFragment();

    while (output.firstChild) {
        output.firstChild.remove()
    }
    data.forEach((el) => {
        let div = document.createElement('div');
        div.className = 'card-content-wraper';
        div.innerHTML = `
        <div data-id="${el.id}" class="product_item">
        <span class="pr_flash pr_new">Новинка</span>
        <img name = "prduct-image"  class="product_img " src="${el.image}" alt="">
        <button class="product__item-heart border-0 p-0 bg-transparent">
            <img name = "prduct-heart" src="https://asaxiy.uz/custom-assets/images/icons/heart.svg">
        </button>
        <button class="product__item-compare border-0 p-0 bg-transparent ">
            <img src="https://asaxiy.uz/custom-assets/images/icons/compare_gray.svg">
        </button>
        <div class="title-info">
            <p>${el.title}</p>
        </div>
        <div class="product__item-rating--stars d-flex align-items-center gap-2">

            <span><i class="bi bi-star-fill"></i></span>
            <span><i class="bi bi-star-fill"></i></span>
            <span><i class="bi bi-star-fill"></i></span>
            <span><i class="bi bi-star-fill"></i></span>
            <span><i class="bi bi-star-fill"></i></span>
            <span>${el.rating.rate}</span>
        </div>
        <div class="price-container ">
            <p>${el.price}$</p>
            <div class="bolib-tolash p-1 mt-2 rounded mb-1 w-100">
                1 464 800 сум x 12 мес
            </div>
        </div>
        <div class="btn-wrapper">
            <button class="btn 1 default-btn btn-primary p-2 w-100"> Купить сейчас</button>
            <button class="cart-button"><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 1.14286C0.5 0.78782 0.826217 0.5 1.22862 0.5H1.77096C2.69434 0.5 3.24721 1.04771 3.56336 1.55685C3.77408 1.89623 3.92653 2.28987 4.04577 2.64624C4.07806 2.64401 4.11078 2.64286 4.14387 2.64286H16.2849C17.0914 2.64286 17.6738 3.32379 17.4527 4.00811L15.677 9.50163C15.3498 10.5142 14.3012 11.2124 13.1079 11.2124H7.32937C6.12618 11.2124 5.07145 10.5028 4.75303 9.47909L4.01422 7.10386L2.7915 3.4621L2.78952 3.45572C2.63825 2.96901 2.49629 2.51433 2.28534 2.1746C2.08048 1.84469 1.91718 1.78571 1.77096 1.78571H1.22862C0.826217 1.78571 0.5 1.49789 0.5 1.14286Z" fill="white"></path>
                <path d="M6.81481 15.5C7.88792 15.5 8.7578 14.7325 8.7578 13.7857C8.7578 12.8389 7.88792 12.0714 6.81481 12.0714C5.74173 12.0714 4.87183 12.8389 4.87183 13.7857C4.87183 14.7325 5.74173 15.5 6.81481 15.5Z" fill="white"></path>
                <path d="M13.6151 15.5C14.6882 15.5 15.5581 14.7325 15.5581 13.7857C15.5581 12.8389 14.6882 12.0714 13.6151 12.0714C12.542 12.0714 11.6721 12.8389 11.6721 13.7857C11.6721 14.7325 12.542 15.5 13.6151 15.5Z" fill="white"></path>
            </svg></button>
        </div>
    </div>
        `;


        fragment.appendChild(div);
    });

    output.appendChild(fragment);
}

const singleRotue = (id) => {
    window.open(`/page/product.html?id=${id}`, '_self')
}

output.addEventListener('click', e => {
    // let {name} = e.target.name;
    if (e.target.name === 'prduct-image') {
        let id = e.target.closest("[data-id]").dataset.id;
        singleRotue(id)
    }else if (e.target.name === 'prduct-heart') {
        console.log('heart');
    }
})



//////////////////////////////// ====================================       elsect   ====================================    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\     

const category = document.querySelector('.category');

function createCategory(data) {
    let categoris = Array.from(new Set(data.map(el => el.category)))
    categoris.forEach((el) => {
        let option = document.createElement('option');
        option.innerHTML = el;
        option.value = el;
        category.appendChild(option)
    })
}

category.addEventListener('change', async e => {
    let value = e.target.value;
    wrapper.style.display = "flex"

    let categoryurl = value === 'all' ? '' : `/category/${value}`

    let data = await fetch(`${API_URL}${categoryurl}`);
    data
        .json()
        .then(res => {
            Displaydata(res)
            // createCategory(res)
        })
        .catch(err => console.log(err))
        .finally(() => {
            wrapper.style.display = "none"
        });


})
