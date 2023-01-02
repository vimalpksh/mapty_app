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

class Workout {
date = new Date();
id = (Date.now()+ "").slice(-10);


    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}

class Running extends Workout{
    type = "running";
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }
    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;

    }
}
class Cycling extends Workout{
    type = "cycling";
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }
    calcSpeed() {
        this.speed = this.distance / (this.duration/60);
        return this.speed;

    }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cyc1 = new Cycling([39, -12], 27, 96, 523);
console.log(run1,cyc1);
/////////////////////////////////////////////////////////
//APPLICATION ARCHITECTURE
class App{
    #map;
    #mapEvent;
    #workouts =[];


    constructor(){
        this._getPosition();

        form.addEventListener("submit", this._newWorkout.bind(this));

        inputType.addEventListener("change", this._toggleElevationField)}

    _getPosition(){
        if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){
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
        
        this.#map.on("click", this._showForm.bind(this))
        
        
        }

   
    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    }

    _toggleElevationField(){
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden")
    }

    _newWorkout(e){
const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));

const allPositive =  (...inputs) => inputs.every(inp => inp>0)

        e.preventDefault();
        /// Get data from form
const type = inputType.value;
const distance = +inputDistance.value;
const duration = +inputDuration.value;
const {lat,lng} = this.#mapEvent.latlng;
let workout;


        ///check if the data is valid

        /// If workout is running, create running object
        if(type === "running") {
const cadence = +inputCadence.value;

//check valid 
            // if(!Number .isFinite(distance) || !Number .isFinite(duration) || !Number .isFinite(cadence) ) 
          if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
            return alert("Inputs have to be positive numbers!")

             workout = new Running([lat,lng], distance, duration, cadence);
            
        }

        /// If workout is cycling, create cycling object
        if(type === "cycling") {
            const elevation = +inputElevation.value;

            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
            return alert("Inputs have to be positive numbers!")

            workout = new Cycling([lat,lng], distance, duration, elevation);
        }
        ///Add new object to workout array
        this.#workouts.push(workout);
        console.log(workout);


        ///Render workout on map as marker
this.renderWorkoutMarker(workout)
        //display marker
        
        console.log(this.#mapEvent);
        
            

        ///Render workout on list

        ///Hide form clear input fields


        //Clear input columns
        
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = " ";
        
        }
        renderWorkoutMarker(workout){
            L.marker(workout.coords).addTo(this.#map).bindPopup(L.popup({
                maxWidth:250, 
                minWidth:100,
                autoClose: false,
                closeOnClick : false,
                className: `${workout.type}-popup`,
        
            })).setPopupContent(`${workout.distance}`).openPopup(); 
        }
        
    }

const app = new App();




