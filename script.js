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
          <button id="btn${pet.id}" class="btn  btn-wide font-bold text-xl md:text-2xl text-[#131313] px-8 md:px-12 py-8 bg-white ro"> <img class="w-8 h-8" src="${pet.category_icon}" alt="">${pet.category}</button>
        `
        petBtnContiner.appendChild(petBtn)
    });
}

// Display all pets as card *
const displayPets = (pets) => {
    const mainCardContainer = document.getElementById("main-card-container");
    pets.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.innerHTML = `
            <div class="bg-white w-full max-w-sm rounded-lg shadow-sm mb-5 overflow-hidden">
                <figure class="px-5 pt-5">
                    <img
                    class="w-full h-56 object-cover rounded-lg"
                    src="${pet.image}"
                    alt="${pet.pet_name}"
                    />
                </figure>
                <div class="p-5">
                    <h2 class="font-bold text-xl mb-2">${pet.pet_name}</h2>
                    <div class="flex items-center gap-2 mb-2">
                    <img src="./assets/breedi.svg" alt="Breed Icon" class="w-5 h-5">
                    <p class="text-gray-700">Breed: ${pet.breed}</p>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                    <img src="./assets/birth.svg" alt="Birth Icon" class="w-5 h-5">
                    <p class="text-gray-700">Birth: ${pet.date_of_birth}</p>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                    <img src="./assets/gender.svg" alt="Gender Icon" class="w-5 h-5">
                    <p class="text-gray-700">Gender: ${pet.gender}</p>
                    </div>
                    <div class="flex items-center gap-2 mb-4">
                    <img src="./assets/price.svg" alt="Price Icon" class="w-5 h-5">
                    <p class="text-gray-700">Price: ${pet.price}$</p>
                    </div>
                    <hr class="border-gray-200 mb-4">
                    <div class="flex justify-between gap-2">
                    <button class="btn like-btn px-3 text-most rounded-lg text-[18px] font-bold"><img src="./assets/likeiIcon.svg" alt=""></button>
                    <button class="btn adopt-btn px-3 text-most rounded-lg text-[18px] font-bold">Adopt</button>
                    <button class="btn details-btn px-3 text-most rounded-lg text-[18px] font-bold">Details</button>
                    </div>
                </div>
            </div>
        `;
        mainCardContainer.appendChild(petCard);

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
const liked = (img) => {
    const likedPetsContainer = document.getElementById('likedPetsContainer');
    const likedPet = document.createElement("div");
    likedPet.innerHTML = `
      <img class="w-[124px] h-[124px] rounded-lg" src="${img}" alt="pet Image">
    `;
    likedPetsContainer.classList.remove("hidden")
    document.getElementById('liked-pet-head').classList.remove("hidden")
    likedPetsContainer.appendChild(likedPet);
}

// Function Calls ###
petCategories();
allPets();