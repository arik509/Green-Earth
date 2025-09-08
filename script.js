const loadCategory = () => {
    
}


const loadtree = () =>{
    const url = "https://openapi.programming-hero.com/api/plants"
    fetch(url)
    .then((res) => res.json())
    .then((json) => displayLoadTree(json.plants))
}

const displayLoadTree = (plants) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = "";

    for(plant of plants) {
        const card = document.createElement('div')
        card.innerHTML = `
        <div class="card bg-base-100 w-90 shadow-sm p-4 space-y-[10px] h-[450px]">
                    <figure>
                      <img class="rounded-[5px] h-[300px] w-full object-cover"
                        src="${plant.image}" />
                    </figure>
                    <div class="card-body p-0">
                      <h2 class="card-title">
                        ${plant.name}
                      </h2>
                      <p class="w-full">${plant.description}</p>
                      <div class="card-actions justify-between">
                        <div class="badge badge-secondary bg-[#DCFCE7] text-green-600 font-bold border-0">${plant.category}</div>
                        <div class="font-bold">৳${plant.price}</div>
                      </div>
                      <div>
                        <button class="bg-[#15803D] w-full text-white py-3 px-[100px] rounded-2xl">Add to Cart</button>
                      </div>
                    </div>
                </div>
        `

        cardContainer.appendChild(card);
    }

}


loadtree();