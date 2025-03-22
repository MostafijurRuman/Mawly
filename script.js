// Utility Function ###


// Function Fetch ###

// Fetch pet category *
const petCategories = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data =await res.json()
    displayPetBtn(data.categories)
}


// Display Function ###

// Display  pet buttons *
const displayPetBtn = (pets) =>{
    const petBtnContiner = document.getElementById("pet-btn");
    pets.forEach(pet => {
        console.log(pet)
        const petBtn = document.createElement("div");
        petBtn.innerHTML = `
          <button id="btn${pet.id}" class="btn  btn-wide font-bold text-2xl text-[#131313] px-12 py-8 bg-white ro"> <img class="w-8 h-8" src="${pet.category_icon}" alt="">${pet.category}</button>
        `
        petBtnContiner.appendChild(petBtn)
    });
}


// Function Calls ###
petCategories()