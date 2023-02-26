var globalChars = [];

const divMainContent = document.createElement('div');
divMainContent.classList.add('main-content');
divMainContent.style.width = '90%';
divMainContent.style.maxWidth = '1200px';
divMainContent.style.margin = '0px auto';

const h1Elm = document.createElement('h1');
h1Elm.innerText = 'Makeup API';
h1Elm.style.fontFamily = 'Gruppo, cursive';
h1Elm.style.textAlign = 'center';
h1Elm.style.fontSize = '4.3rem';
h1Elm.style.padding = '20px';

const pElm = document.createElement('p');
pElm.style.width = '72%';
pElm.style.margin = '0px auto 40px auto';
pElm.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam cum illum soluta reprehenderit earum totam reiciendis natus non officiis doloremque ex, quae iste, eos doloribus';

const divSearch = document.createElement('div');
divSearch.classList.add('m-3');

const searchLbl = document.createElement('label');
searchLbl.classList.add('form-label');
searchLbl.setAttribute('for', 'search');
searchLbl.innerText = 'Search for a brand item';

const searchField = document.createElement('input');
searchField.setAttribute('id', 'search');
searchField.classList.add('form-control');
searchField.setAttribute('placeholder', 'Type to search...');

const searchbtn = document.createElement('button');
searchbtn.classList.add('btn');
searchbtn.classList.add('btn-primary');
searchbtn.classList.add('m-2');
searchbtn.innerText = 'Search';
searchbtn.addEventListener('click', (e) => {
    searchFunc();
});

const divCharArea = document.createElement('div');
divCharArea.setAttribute('id', 'chars-area');
divCharArea.classList.add('m-3');
divCharArea.classList.add('d-flex');
divCharArea.classList.add('flex-wrap');
divCharArea.classList.add('justify-content-between');

divSearch.append(searchLbl, searchField, searchbtn);

const paginationDivElm = document.createElement('div');
paginationDivElm.classList.add('d-flex');
paginationDivElm.classList.add('justify-content-between');

const prevBtn = document.createElement('button');
prevBtn.innerText = 'Prev';
prevBtn.classList.add('btn');
prevBtn.classList.add('btn-primary');
prevBtn.classList.add('m-2');

prevBtn.addEventListener('click', (e) => {
    // e.preventDefault();
    prevPageFunc();
});

const nextBtn = document.createElement('button');
nextBtn.classList.add('btn');
nextBtn.classList.add('btn-primary');
nextBtn.classList.add('m-2');
nextBtn.innerText = 'Next';

nextBtn.addEventListener('click', (e) => {
    // e.preventDefault();
    nextPageFunc();
});

paginationDivElm.append(prevBtn, nextBtn);

divMainContent.append(h1Elm, pElm, divSearch, divCharArea, paginationDivElm);


document.body.appendChild(divMainContent);

var start = 0;
var end = 10;
var responseLength = undefined;
const charsArea = document.getElementById('chars-area');
const getMakupItems = async (searchBrand) => {
    var response;
    try {
        if (searchBrand) {
            response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${searchBrand}`);
        } else {
            response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json`);
        }

        const makeupItems = await response.json();
        globalChars = makeupItems;
        charsArea.innerHTML = '';
        responseLength = makeupItems.length;
        // console.log(makeupItems.length);
        makeupItems.forEach(({ id, brand, name, price, image_link, product_link, description }) => {
            // console.log(id, brand, name, price, image_link, product_link, description);
            const divElement = document.createElement('div');
            //     divElement.innerHTML = `
            //     <div class="card" style="width: 18rem;">
            //     <img src=${image_link} class="card-img-top" alt=${name}>
            //     <div class="card-body">
            //       <h5 class="card-title">${brand} ${name}</h5>
            //       <h6 class="card-subtitle mb-2 text-muted">${price}</h6>
            //       <p class="card-text">${description}</p>
            //       <a href="#" class="card-link">${product_link}</a>
            //     </div>
            //   </div>`;

            const h5Element = document.createElement('h5');
            h5Element.classList.add('card-title');
            h5Element.innerText = `Brand: ${brand}, Product Name:${name}`;

            const h4Element = document.createElement('h4');
            h4Element.classList.add('card-subtitle');
            h4Element.classList.add('mb-2');
            h4Element.classList.add('text-muted');
            h4Element.innerText = `Price: ${price}`;

            const pElement = document.createElement('p');
            pElement.classList.add('card-text');
            pElement.innerText = `Description: ${description}`;

            const aElement = document.createElement('a');
            aElement.classList.add('card-link');
            aElement.href = `${product_link}`;
            aElement.innerText = `${product_link}`;

            const cardbodyElement = document.createElement('div');
            cardbodyElement.classList.add('card-body');

            cardbodyElement.append(h5Element, h4Element, pElement, aElement);

            const imgElement = document.createElement('img');
            imgElement.classList.add('card-img-top');
            imgElement.src = `${image_link}`;
            imgElement.alt = `${id} ${name}`;

            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.style.width = '18rem';

            cardElement.append(imgElement, cardbodyElement);

            divElement.appendChild(cardElement);

            charsArea.appendChild(divElement);
        });

    } catch (errResp) {
        // console.log('Unable to fetch Api', errResp);
    }
}
const searchFunc = () => {
    const value = document.getElementById('search').value;
    getMakupItems(value);
}


const nextPageFunc = () => {
    // page++;
    /**
     *  start = end;  
     *  end =  end + 10; 
     */
    getMakupItems();
}

const prevPageFunc = () => {
    // page--;
    /**
     *  20
     *  start = 20 - 10; 
     *  end = 10 - 10; 
     * start =  - 10;
     *  end = end - 10; 
     * 
     *  start > 0  && end < totallength 
     *  
     */
    getMakupItems();
}

getMakupItems();

