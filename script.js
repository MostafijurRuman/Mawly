// Utility Function ###


// Function Fetch ###

// Fetch pet category *
const petCategories = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data =await res.json()
    displayPetBtn(data.categories)
}

// Fetch pets card data *
const allPets = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data =await res.json()
    displayPets(data.pets)
}

// Display Function ###

// Display  pet buttons *
const displayPetBtn = (pets) =>{
    const petBtnContiner = document.getElementById("pet-btn");
    pets.forEach(pet => {
        const petBtn = document.createElement("div");
        petBtn.innerHTML = `
          <button id="btn${pet.id}" class="btn  btn-wide font-bold text-2xl text-[#131313] px-12 py-8 bg-white ro"> <img class="w-8 h-8" src="${pet.category_icon}" alt="">${pet.category}</button>
        `
        petBtnContiner.appendChild(petBtn)
    });
}

// Display all pets as card *
const displayPets = (pets) =>{
    const mainCardContainer = document.getElementById("main-card-container");
    pets.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.innerHTML = `
          <div class="card bg-base-100 w-96 shadow-sm mb-5">
                    <figure class="px-5 pt-5">
                      <img class="w-[373px] h-[230px] rounded-lg"
                    src="${pet.image}"
                    alt="Shoes"
                    class="rounded-xl" />
                    </figure>
                    <div class="card-body ">
                      <h2 class="font-bold text-[20px]">${pet.pet_name}</h2>
                      <div class="flex gap-x-1">
                    <img src="./assets/breedi.svg" alt="">
                    <h1>Breed:  ${pet.breed}</h1>
                      </div>
                      <div class="flex gap-x-1">
                    <img src="./assets/birth.svg" alt="">
                    <h1>Birth: ${pet.date_of_birth}</h1>
                      </div>
                      <div class="flex gap-x-1">
                    <img src="./assets/gender.svg" alt="">
                    <h1>Gender: ${pet.gender}</h1>
                      </div>
                      <div class="flex gap-x-1">
                    <img src="./assets/price.svg" alt="">
                    <h1>Price :${pet.price}$</h1>
                      </div>
                      <hr class="text-[#1313131A]">
                      <div class="flex justify-between gap-x-7">
                    <button class="btn like-btn px-3 text-most rounded-lg text-[18px] font-bold"><img src="./assets/likeiIcon.svg" alt=""></button>
                    <button class="btn adopt-btn px-3 text-most rounded-lg text-[18px] font-bold">Adopt</button>
                    <button class="btn details-btn px-3 text-most rounded-lg text-[18px] font-bold">Details</button>
                      </div>
                    </div>
                  </div>
                </div>
        `;
        mainCardContainer.appendChild(petCard)
        
        // Button functions
        petCard.querySelector('.like-btn').addEventListener('click', () => {
            liked(pet.image);


        });

        petCard.querySelector('.adopt-btn').addEventListener('click', () => {
            console.log(`Adopted ${pet.pet_name}`);
        });

        petCard.querySelector('.details-btn').addEventListener('click', () => {
            console.log(`Details for ${pet.pet_name}`);
        });
        
    });
}

// Like Function  *
 const liked = (img) =>{
    const likedPetsContainer = document.getElementById('likedPetsContainer');
    const likedPet = document.createElement("div");
    likedPet.innerHTML=`
      <img class="w-[124px] h-[124px] rounded-lg" src="${img}" alt="pet Image">
    `
    likedPetsContainer.appendChild(likedPet)
 }


// Function Calls ###
petCategories()
allPets ()