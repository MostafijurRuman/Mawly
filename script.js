// Utility Function ###


// Function Fetch ###

// Fetch pet category *
const petCategories = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data =await res.json()
    displayPetBtn(data.categories)
    
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => {
                btn.classList.remove('rounded-3xl', 'border', 'border-[#0E7A81]', 'bg-[#0E7A811A]');
            });
            button.classList.add('rounded-3xl', 'border', 'border-[#0E7A81]', 'bg-[#0E7A811A]');
        });
    });
}

// Fetch pets card data *

const fetchAllPets = async () => {
    const mainCardContainer = document.getElementById("main-card-container");
    mainCardContainer.innerHTML = '<span id="loadingSpinner" class=" loading loading-bars loading-xl"></span>'; // Show spinner

    setTimeout(async () => {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await res.json();
        mainCardContainer.innerHTML = ''; // Clear spinner
        displayPets(data.pets); // Display pets
    }, 2000); // 2 seconds delay
};

fetchAllPets();
// Display Function ###

// Display  pet buttons *
const displayPetBtn = (pets) =>{
    const petBtnContiner = document.getElementById("pet-btn");
    pets.forEach(pet => {
        const petBtn = document.createElement("div");
        petBtn.innerHTML = `
          <button onclick="fetchPetsByCategory('${pet.category}')" id="btn${pet.id}" class="btn btn-wide font-bold text-xl md:text-2xl text-[#131313] px-8 md:px-12 py-8 bg-white ro"> <img class="w-8 h-8" src="${pet.category_icon}" alt="">${pet.category}</button>
        `;
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
            src="${pet.image ? pet.image : 'Not available'}"
            alt="${pet.pet_name ? pet.pet_name : 'Not available'}"
            />
            </figure>
            <div class="p-5">
            <h2 class="font-bold text-xl mb-2">${pet.pet_name ? pet.pet_name : 'Not available'}</h2>
            <div>
            <div class="flex items-center gap-2 mb-2">
            <img src="./assets/breedi.svg" alt="Breed Icon" class="w-5 h-5">
            <p class="text-gray-700">Breed: ${pet.breed ? pet.breed : 'Not available'}</p>
            </div>
            <div class="flex items-center gap-2 mb-2">
            <img src="./assets/birth.svg" alt="Birth Icon" class="w-5 h-5">
            <p class="text-gray-700">Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not available'}</p>
            </div>
            <div class="flex items-center gap-2 mb-2">
            <img src="./assets/gender.svg" alt="Gender Icon" class="w-5 h-5">
            <p class="text-gray-700">Gender: ${pet.gender ? pet.gender : 'Not available'}</p>
            </div>
            <div class="flex items-center gap-2 mb-4">
            <img src="./assets/price.svg" alt="Price Icon" class="w-5 h-5">
            <p class="text-gray-700">Price: ${pet.price ? pet.price + '$' : 'Not available'}</p>
            </div>
            </div>
            <hr class="border-gray-200 mb-4">
            <div class="flex justify-between gap-2">
            <button class="btn like-btn px-3 text-most rounded-lg text-[18px] font-bold"><img src="./assets/likeiIcon.svg" alt=""></button>
            <button class="btn adopt-btn px-3 text-most rounded-lg text-[18px] font-bold">Adopt</button>
            <button class="btn details-btn flex-1 text-most font-bold  px-3 rounded-lg  text-[18px]  hover:bg-most hover:text-white transition-colors" data-pet-id="${pet.id}">
                        Details
                    </button>
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
            const modal = document.getElementById('my_modal_5');
            modal.showModal();

            // Countdowner
            const countdownElement = document.getElementById('countdown');
            let countdown = 3;

            const countdownInterval = setInterval(() => {
            countdownElement.textContent = countdown;
            countdown--;

            if (countdown < 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = '0';
                modal.close();
                const adoptBtn = petCard.querySelector('.adopt-btn');
                adoptBtn.disabled = true;
                adoptBtn.textContent = 'Adopted';
                adoptBtn.classList.add("text-text")
            }
            }, 1000);
        });

        petCard.querySelector('.details-btn').addEventListener('click', () => {
            showModal(pet);
        });
        });
    }

// Function to show modal
const showModal = (pet) => {
    const modal = document.createElement("dialog");
    modal.id = `modal_${pet.id}`;
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-box">
            <figure class=" ">
                <img
                class="w-full h-56 object-cover rounded-lg"
                src="${pet.image ? pet.image : 'Not available'}"
                alt="${pet.pet_name ? pet.pet_name : 'Not available'}"
                />
            </figure>
            <h3 class="text-lg font-bold mt-4">${pet.pet_name}</h3>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <img src="./assets/breedi.svg" alt="Breed Icon" class="w-5 h-5">
                        <p class="text-gray-700">Breed: ${pet.breed ? pet.breed : 'Not available'}</p>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <img src="./assets/birth.svg" alt="Birth Icon" class="w-5 h-5">
                        <p class="text-gray-700">Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not available'}</p>
                    </div>
                </div>
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <img src="./assets/gender.svg" alt="Gender Icon" class="w-5 h-5">
                        <p class="text-gray-700">Gender: ${pet.gender ? pet.gender : 'Not available'}</p>
                    </div>
                    <div class="flex items-center gap-2 mb-4">
                        <img src="./assets/price.svg" alt="Price Icon" class="w-5 h-5">
                        <p class="text-gray-700">Price: ${pet.price ? pet.price + '$' : 'Not available'}</p>
                    </div>
                </div>
            </div>
            <hr class="border-gray-200 mb-4">
            <p class="py-4">Description: ${pet.pet_details ? pet.pet_details : 'No description available'}</p>
            <div class="modal-action">
                <button class="btn w-full text-center text-most bg-[#0E7A8133] rounded-lg  border-[#0E7A811A]" onclick="this.closest('dialog').close()">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.showModal();
}

// Like Function  *
const liked = (img) => {
    const likedPetsContainer = document.getElementById('likedPetsContainer');
    const likedPet = document.createElement("div");
    likedPet.innerHTML = `
      <img class="w-[124px] h-[124px] rounded-lg object-cover" src="${img}" alt="pet Image">
    `;
    likedPetsContainer.classList.remove("hidden")
    document.getElementById('liked-pet-head').classList.remove("hidden")
    likedPetsContainer.appendChild(likedPet);
}

// Sort by Price *


// Function to sort pets by price
const sortPetsByPrice = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    const pets = data.pets;
    pets.sort((a, b) => b.price - a.price);
    const mainCardContainer = document.getElementById("main-card-container");
    mainCardContainer.classList.add("grid")
    mainCardContainer.innerHTML = ''; // Clear existing cards
    displayPets(pets); // Display sorted pets
};

// Event listener for sort by price button
document.getElementById('sortByPrice').addEventListener('click', sortPetsByPrice);


// fetch by category *
const fetchPetsByCategory = async (category) => {
    const mainCardContainer = document.getElementById("main-card-container");
    mainCardContainer.innerHTML = '<span id="loadingSpinner" class=" loading loading-bars loading-xl"></span>'; // Show spinner

    setTimeout(async () => {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
        const data = await res.json();
        mainCardContainer.innerHTML = ''; // Clear spinner

        // Check if pets are available
        if (data.data.length === 0) {
            mainCardContainer.classList.remove("grid");
            const noPet = document.createElement("div");
            noPet.innerHTML = `
                <div class="flex flex-col items-center gap-6 w-full max-w-[985px] py-[50px] md:py-[100px] rounded-[24px] bg-[rgba(19,19,19,0.03)] mx-auto  mb-8 px-8">
                    <img class="mx-auto w-1/2 md:w-auto" src="./assets/error.webp" alt="">
                    <h1 class="text-[#131313] text-center font-inter text-[24px] md:text-[32px] font-bold">No Information Available</h1>
                    <p class="text-[rgba(19,19,19,0.70)] text-center font-loto text-[14px] md:text-[16px] font-normal leading-[22px] md:leading-[26px]">Currently, there are no pets available for adoption. 
                    Please check back later for updates on available pets.</p>
                </div>
            `;
            mainCardContainer.appendChild(noPet);
        } else {
            mainCardContainer.classList.add("grid");
            displayPets(data.data); // Display pets
        }
    }, 2000); // 2 seconds delay
};

// button active function *
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => {
            btn.classList.remove('rounded-3xl', 'border', 'border-[#0E7A81]', 'bg-[#0E7A811A]');
        });
        button.classList.add('rounded-3xl', 'border', 'border-[#0E7A81]', 'bg-[#0E7A811A]');
    });
});


        
        
        



// Function Calls ###
petCategories();
allPets();