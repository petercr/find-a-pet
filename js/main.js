// PetFinder API key = c5f90e0fc44747991721516ca355f18f

import fetchJsonp from "fetch-jsonp";
import {isValidZip} from "./validate";

const petForm = document.querySelector("#pet-form");

petForm.addEventListener("submit", fetchAnimals);

// Fetch animals from API
function fetchAnimals(e) {
  e.preventDefault();

  const animal = document.querySelector("#animal").value;
  const zip = document.querySelector("#zip").value;

  // Validate zip
  if (!isValidZip(zip)) {
    showMessage("No deal on the zip!!", 'danger');
    return;
  }

  // fetch pets
  // fetch(`http://api.petfinder.com/pet.find?format=json&key=c5f90e0fc44747991721516ca355f18f&animal=${animal}&location=${zip}`)
  fetchJsonp(
    `https://api.petfinder.com/pet.find?format=json&key=c5f90e0fc44747991721516ca355f18f&animal=${animal}&location=${zip}&callback=callback`,
    {
      jsonpCallbackFunction: "callback"
    }
  )
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(err => console.warn(err));
}

// jsonp Callback
function callback(data) {
  console.log(data);
}

// Show listings of fuzzy friends
function showAnimals(pets) {
  const results = document.querySelector("#results");

  // Clear First
  results.innerHTML = "";

  // loop through pets
  pets.forEach(pet => {
    console.dir(pet);
    if (pet.media.photos) {
    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
            <div class="row">
                <div class="col-sm-6">
                    <h4>${pet.name.$t} (${pet.age.$t})</h4>
                    <p class="text-secondary">${
                      pet.breeds.breed.$t
                        ? pet.breeds.breed.$t
                        : pet.breeds.breed["0"].$t
                    }</p>
                    <p>${pet.contact.address1.$t} ${pet.contact.city.$t} ${
      pet.contact.state.$t
    } ${pet.contact.zip.$t}</p>
                    <ul class="list-group ml-3">
                        <li class="list-group-item">Phone: ${
                          pet.contact.phone.$t
                        }</li>
                        ${
                          pet.contact.email.$t
                            ? `<li class="list-group-item">Email: ${
                                pet.contact.email.$t
                              }</li>`
                            : ``
                        }
                        <li class="list-group-item">Shelter ID: ${
                          pet.shelterId.$t
                        }</li>
                    </ul>
                </div>
                <div class="col-sm-6 text-center">
                    <img class="img-fluid rounded mt-2" src="${
                      pet.media.photos.photo[2].$t 
                    }">
                </div>
                <div class="col-sm-12 mt-4">
                  <p style="font-family: 'Merienda', cursive;"><b>About:</b> ${pet.description.$t}</p>
                </div>
            </div>
        `;
    results.appendChild(div);
                  }
  });
}
