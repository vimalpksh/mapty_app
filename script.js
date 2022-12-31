'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');



class App{
    #map;
    #mapEvent;


    constructor(){
        this._getPosition();
    }

    _getPosition(){
        if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(this._loadMap,function(){
    alert(`Could not get your position`)
} )

    }
    _loadMap(position){
        
            const {latitude} = position.coords; // 11.013356325441311
            const {longitude} = position.coords; // 76.95679622496444
            console.log(latitude, longitude);
            console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        
            const coords = [latitude, longitude]
        
         this.#map = L.map('map').setView(coords, 13);
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        
        this.#map.on("click", function(mapE){
            this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
        })
        
        
        }

   
    _showForm(){}

    _toggleElevationField(){}

    _newWorkout(){}
}
const app = new App();




form.addEventListener("submit", function(e){
    e.preventDefault();
//Clear input columns

inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = " ";

//display marker

     console.log(mapEvent);
const {lat,lng} = mapEvent.latlng;
    L.marker([lat, lng]).addTo(map).bindPopup(L.popup({
        maxWidth:250, 
        minWidth:100,
        autoClose: false,
        closeOnClick : false,
        className: "running-popup",

    })).setPopupContent("Workout").openPopup(); 

})

inputType.addEventListener("change", function(){
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden")
})