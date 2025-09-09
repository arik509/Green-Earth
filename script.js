const manageSpinner = (status) => {
    if(status){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
    }
    else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('card-container').classList.remove('hidden');
    }
}


const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategory(json))
}

const displayCategory = (categoriesData) =>{
    const categories = categoriesData.categories;
    console.log(categories);

    const categoryContainer = document.getElementById('category-container')
    categoryContainer.innerHTML = "";

    for(let category of categories){
        const li = document.createElement("li")
        li.className = "p-2 hover:bg-green-300"
        li.innerHTML = `
        <span style="cursor:pointer">${category.category_name} </span>
        ` 

        li.addEventListener('click', (() => {
            document.querySelectorAll('#category-container li').forEach(item => {
                item.classList.remove('bg-green-700', 'text-white');
            });

            li.classList.add('bg-green-700', 'text-white');

            loadPlantsCategory(category.id)
            console.log(category.id)
        }))

        categoryContainer.appendChild(li);
    }
}

const loadPlantsCategory = (id) => {
    manageSpinner(true);

    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((json) => displayLoadTree(json.plants))
}


const loadAlltree = () =>{
    manageSpinner(true);

    const url = "https://openapi.programming-hero.com/api/plants"
    fetch(url)
    .then((res) => res.json())
    .then((json) => displayLoadTree(json.plants))
}

const displayLoadTree = (plants) => {

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = "";

    for(let plant of plants) {
        const card = document.createElement('div')
        card.innerHTML = `
        <div class="card bg-base-100 w-90 shadow-sm p-4 space-y-[10px] h-[450px]">
                    <figure>
                      <img class="rounded-[5px] h-[300px] w-full object-cover"
                        src="${plant.image}" />
                    </figure>
                    <div class="card-body p-0 space-y-[10px]">
                      <h2 id="plant-name-${plant.id}" onclick="loadTreeDetails(${plant.id})" class="card-title"> 
                        <span style="cursor:pointer"> ${plant.name} </span>
                      </h2>
                      <p class="w-full">${plant.description}</p>
                      <div class="card-actions justify-between">
                        <div class="badge badge-secondary bg-[#DCFCE7] text-green-600 font-bold border-0">${plant.category}</div>
                        <div class="font-bold">৳${plant.price}</div>
                      </div>
                      <div class="">
                        <button class="add-cart-btn bg-[#15803D] w-full text-white py-3 px-[100px] rounded-2xl" style="cursor:pointer">Add to Cart</button>
                      </div>
                    </div>
                </div>

        `

        const button = card.querySelector(".add-cart-btn");
        button.addEventListener("click", () => {
            addToCart(plant.name, plant.price);
        });

        cardContainer.appendChild(card);

        manageSpinner(false);
    }

}

const loadTreeDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res => res.json()))
    .then(json => displaytreeDetails(json.plants))
}

const displaytreeDetails = (data) =>{
    const detailsContainer = document.getElementById('details-container')

    detailsContainer.innerHTML = `
    <h3 class="text-lg font-bold">${data.name}</h3>
    <img class="rounded-[5px] h-[300px] w-full object-cover"
    src="${data.image}" />
    <h3> <span class="font-bold">Category:</span> ${data.category}</h3>
    <h3> <span class="font-bold">Price:</span> ৳${data.price}</h3>
    <p> <span class="font-bold">Description:</span> ${data.description}</p>
    <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </form>
    </div>
    `
    document.getElementById('my_modal').showModal()
}

let cartPrice = 0;

const addToCart = (name,price) => {
    alert(`${name} is added to cart`);

    const cartContainer = document.getElementById('cart-container')

    console.log(name,price);
    
    const cart = document.createElement("div")
    cart.innerHTML = `
    <div class="cart flex justify-between items-center bg-[#F0FDF4] mt-3 p-3 rounded-[5px]">
                        <div class="space-y-[12px]">
                            <p class="font-bold">${name}</p>
                            <p>৳${price} x 1</p>
                        </div>
                        <div>
                            <button style="cursor:pointer" class="remove-cart-btn"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>
    `
    cartContainer.appendChild(cart);

    cartPrice = cartPrice + price;

    console.log(cartPrice);

    document.getElementById('total-price').innerText = cartPrice;

    const removeButton = cart.querySelector(".remove-cart-btn");
    removeButton.addEventListener("click", () => {
        cart.remove();
        cartPrice = cartPrice - price;
        document.getElementById('total-price').innerText = cartPrice;
    });

}

loadCategory()

loadAlltree();