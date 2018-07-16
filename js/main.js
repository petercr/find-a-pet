// PetFinder API key = c5f90e0fc44747991721516ca355f18f

import fetchJsonp from 'fetch-jsonp';

const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', fetchAnimals);

// Fetch animals from API
function fetchAnimals(e) {
    e.preventDefault();

    const animal = document.querySelector('#animal').value;
    const zip = document.querySelector('#zip').value;

    // fetch pets
    fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=c5f90e0fc44747991721516ca355f18f&animal=${animal}&location=${zip}&callback=callback`, {
        jsonpCallbackFunction: 'callback'
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

// jsonp Callback
function callback(data) {
    console.log(data);
}