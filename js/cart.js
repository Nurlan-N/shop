function ShowAlert() {
    let basket = JSON.parse(localStorage.getItem('products'));

    if(basket.length === 0) {
        document.querySelector('.empty-cart').classList.remove('d-none')
        document.querySelector('.table').classList.add('d-none')
    }
    else{
        document.querySelector('.empty-cart').classList.add('d-none')
        document.querySelector('.table').classList.remove('d-none')
    }
}


ShowAlert();

function GetList() {
    let basket = JSON.parse(localStorage.getItem('products'));
    let total = document.getElementById('Top')
    let sum = 0;
    let row = '';
    basket.forEach(pr => {
        let int_price = pr.Price.slice(-(pr.Price.length),-4);
        console.log(int_price);
        sum += +int_price;
        row += `
            <tr >
                    <th  scope="row">${pr.Id}</th>
                    <td class="img-td">
                        <img src=${pr.Image} alt="">
                    </td>
                    <td>${pr.Name.length > 10 ? pr.Name.slice(0,20) + "..." : pr.Name}</td>
                    <td>
                        <input class="counts" onchange="ShowPrice()" type="number" min="1" value=${pr.Count} >
                    </td>
                    <td>
                        <span  class="text-success fw-bold sum">${int_price * pr.Count} AZN</span>
                    </td>
                    <td>
                        <button onclick="Delete()" class="btn btn-warning" >sil</button>
                    </td>
                    
            </tr>
            
        `
        ShowPrice();
    })
    total.innerHTML = `Toplam : ${sum} AZN`
    document.getElementById('tbdy').innerHTML = row;

    

}

GetList();


function ShowPrice(){
    let basket = JSON.parse(localStorage.getItem('products'));
    let sum = document.querySelectorAll('.sum');
    let count = document.querySelectorAll('.counts');
    let total = document.getElementById('Top')
    let total_sum = 0;
    let x = 0;
    let t = 0;
    for (const i of count) {
        if (x < basket.length) {
            int_price = basket[x].Price.slice(-(basket[x].Price.length),-4)
            basket[x].Count = i.value;
            int_price = int_price * i.value;
            total_sum += +int_price;
            if(t < sum.length){
                sum[t].innerHTML = int_price + " AZN"
            }
            t++
            
            
        }
        x++
    }
    total.innerHTML = `Toplam : ${total_sum} AZN`
   
}
function Delete(){
    console.log(this.parentElement);
}