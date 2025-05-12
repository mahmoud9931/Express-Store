

let productsContainer = document.querySelector(".products-container")
let hh= document.querySelector("h2")
function getData(url){
    productsContainer.innerHTML=""
    let r= new XMLHttpRequest();

r.onload=function(){
    if(r.readyState==4 && r.status==200){
        let data= JSON.parse(r.responseText);
        let products=data.products;
        console.log(data.products);
        hh.innerHTML = `<span>All Products: ${data.products.length}</span>`
        products.map(function(p){
            productsContainer.innerHTML+=`
            <div class="product-card">
            <img class="product-img" src="${p.thumbnail}" alt="${p.title}">
            <div class="data">
                <h3 class="title">
                    ${p.title}
                </h3>

                <p class="description">
                    ${p.description}                
                    </p>

                <p class="price">
                    price : <span class="value">${p.price}</span> $
                </p>

            <div class="btns">
                <button class="add-btn">
                    <i class="fa-solid fa-cart-shopping"></i>  add to cart
                </button>
                <button class="view-btn">
                    <i class="fa-solid fa-eye"></i>
                    view
                </button>
            </div>
            </div>
        </div>
            `


        })
    }else{
        console.log("error")
    }
}

r.open("GET",url,true);
r.send();

}

let basicLink="https://dummyjson.com/products";
let customLink="https://dummyjson.com/products?skip=40"
getData(customLink);

let categoriesLink="https://dummyjson.com/products/categories";
let select= document.querySelector(".categories")

let cr=new XMLHttpRequest();
cr.onload=function(){
    if(cr.readyState==4 && cr.status==200){
        let response= JSON.parse(cr.responseText);
        console.log(response)

        response.map(function(c){
            select.innerHTML+=`
            <option value="${c.url}"> ${c.name}</option>
            `
        })
    }
}
cr.open("GET",categoriesLink,true);
cr.send();

select.addEventListener("change",function(e){
    getData(e.target.value)
})


let searchInput= document.querySelector(".search")
searchInput.addEventListener("input",function(){
    let newLink=`https://dummyjson.com/products/search?q=${searchInput.value}`
    getData(newLink);
})
