if(localStorage.getItem('products') === null) {
    localStorage.setItem('products',JSON.stringify([]))
}

function Search() {
    let value = document.querySelector('.search input').value;
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        let count = 0
       let html = '';
       data.forEach(pr => {
        let exist_prod = pr.title.toLowerCase().includes(value.toLowerCase());
        if(exist_prod) {
            count++;
            let pr_title = pr.title.length > 40 ? pr.title.slice(0,40) + "..." : pr.title;
            let pr_name = pr.description.length > 40 ? pr.description.slice(0,40) + "..." : pr.description
        html += `
        <div class="col-lg-4 box">
            <div id=${pr.price > 100 ? "exp" : 'cheap'} class="card">
                <img src=${pr.image} class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${pr_title}</h5>
                <p class="card-text">${pr_name}</p>
                <p class="card-text">Rating: ${pr.rating.rate > 3 ? 'High' : 'Low'}</p>
                <p class="card-text">${pr.price} AZN</p>
                <a href="#" class="btn btn-success add">Add to cart</a>
                </div>
            </div>
        </div> 
        `
        }
       })
       if(count === 0) {
        document.querySelector('.page_404').classList.remove('d-none')
       }
       else{
        document.querySelector('.page_404').classList.add('d-none')
       }

       document.getElementById('List').innerHTML = html
    })
    .catch(error => console.log(error))
}

function  GetProducts() {
    let count = 0;
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
       let html = '';
        data.forEach(pr => {
            count++
            let pr_title = pr.title.length > 20 ? pr.title.slice(0,20) + "..." : pr.title;
            let pr_name = pr.description.length > 40 ? pr.description.slice(0,40) + "..." : pr.description
            html += `
                <div class="col-lg-4 mt-4 box">
                    <div id=${count} class="card">
                        <img src=${pr.image} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${pr_title}</h5>
                            <p class="card-text">${pr_name}</p>
                            <p class="card-text ">${pr.price} AZN</p>
                            <a href="#" class="btn btn-success add">Add to cart</a>
                        </div>
                    </div>
                </div> 
            `
       })
       document.getElementById('List').innerHTML = html
    })
    .catch(error => console.log(error))
}
GetProducts();


setTimeout(() => {
let buttons = document.querySelectorAll('.add');
for(let btn of buttons) {
    btn.onclick = function(e) {
        console.log(btn);
        e.preventDefault();
        let id = e.target.parentElement.parentElement.id;
        let src = e.target.parentElement.previousElementSibling.src;
        let pr_name = e.target.previousElementSibling.previousElementSibling.innerHTML;
        let price = e.target.previousElementSibling.innerHTML;
        
        let basket = JSON.parse(localStorage.getItem('products'));
        console.log(basket);

        let existProd = basket.find(pr => pr.Id === id);

        if(existProd == undefined) {
            basket.push({
                Id: id,
                Image: src,
                Name: pr_name,
                Price: price,
                Count: 1
            })
        }
        else{
            existProd.Count += 1
        }

       

        localStorage.setItem('products',JSON.stringify(basket))
        ShowCount();
        document.querySelector('.alert_msg').classList.add('active-alert')
        setTimeout(() => {
        document.querySelector('.alert_msg').classList.remove('active-alert')
        }, 1000);
    }
}
}, 1000);


function ShowCount() {
    let span = document.getElementById('count');
    let basket = JSON.parse(localStorage.getItem('products'));
    span.innerHTML = basket.length;
}

ShowCount();


function ShowCategory() {
    let icon = document.querySelectorAll('.box i');
    for (const i of icon) {
        i.addEventListener('click', function () {
            let value = document.querySelector('.search input').value;
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
        let count = 0
        let html = '';
        data.forEach(pr => {
        let exist_prod = pr.category.toLowerCase().includes(i.parentNode.lastElementChild.innerHTML.toLowerCase());
        if(exist_prod) {
            count++;
            let pr_title = pr.title.length > 40 ? pr.title.slice(0,40) + "..." : pr.title;
            let pr_name = pr.description.length > 40 ? pr.description.slice(0,40) + "..." : pr.description
        html += `
        <div class="col-lg-4 box">
            <div id=${pr.price > 100 ? "exp" : 'cheap'} class="card">
                <img src=${pr.image} class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${pr_title}</h5>
                <p class="card-text">${pr_name}</p>
                <p class="card-text">Rating: ${pr.rating.rate > 3 ? 'High' : 'Low'}</p>
                <p class="card-text">${pr.price} AZN</p>
                <a href="#" class="btn btn-success add">Add to cart</a>
                </div>
            </div>
        </div> 
        `
        }
       })
       if(count === 0) {
        document.querySelector('.page_404').classList.remove('d-none')
       }
       else{
        document.querySelector('.page_404').classList.add('d-none')
       }

       document.getElementById('List').innerHTML = html
    })
    .catch(error => console.log(error))
        })
    }

}
ShowCategory();
