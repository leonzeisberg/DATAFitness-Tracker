// store exercise data

let exercises = [
	"Bankdrücken",
	"Schrägbankdrücken",
	"Flys am Seilzug",
	"Rudern Langhantel",
	"Latzug",
	"Deadlift",
	"Squad",
	"Military Press",
	"Seitheben",
	"Preacher Curls",
	"Seilzug am Turm",
	"Bauchpresse",
	"Cable Jumps"
];

let sets = [
	"4", "4", "4", "4", "4", "5", "4", "4", "4", "4", "4", "3"
];

let reps = new Array (
	"8-12", "8-12", "8-12", "8-12", "8-12", "5-6", "8-12", "8-12", "8-12", "8-12", "8-12", "20 +"
);

let gifs = [
	"https://modusx.de/wp-content/uploads/2021/01/bankdruecken-langhantel.gif",
	"https://modusx.de/wp-content/uploads/2021/01/kurzhantel-schraegbankdruecken.gif",
	"https://modusx.de/wp-content/uploads/2021/01/cable-fly-cablecross.gif",
	"https://modusx.de/wp-content/uploads/2021/03/langhantelrudern-obergriff.gif",
	"https://modusx.de/wp-content/uploads/2021/03/klassische-latziehen-zur-brust.gif",
	"https://modusx.de/wp-content/uploads/2021/10/klassisches-kreuzheben.gif",
	"https://modusx.de/wp-content/uploads/2021/10/squats-kniebeugen-mit-der-langhantel.gif",
	"https://modusx.de/wp-content/uploads/2020/11/military-press.gif",
	"https://modusx.de/wp-content/uploads/2020/11/seitheben-kurzhanteln-stehend.gif",
	"https://modusx.de/wp-content/uploads/2021/07/preacher-curls-sz-sitzend.gif",
	"https://modusx.de/wp-content/uploads/2021/07/trizeps-pushdown-kabelzug-seil.gif",
	"https://modusx.de/wp-content/uploads/2021/10/crunches-an-der-crunch-maschine.gif"
];

const plan = [
	[0,1,2,3,4,5],
	[6,7,8,9,10,11],
	[]
];

let current_exercise;
let training_day;
let regeneration = false;
let weight_lifted = 0;

// get training day

function getTrainingDay() {
	const startday = 15;
	const startmonth = 2;
	const startyear = 2022;
	const startdate = new Date(startyear, startmonth -1, startday);
	var heute = new Date();
	var sekunden_geb = startdate.getTime();
	var heutesek = heute.getTime();
	var alter = heutesek - sekunden_geb;

	
	return (Math.floor(alter/(24 * 60 * 60 * 1000)) % 3);
}

// display current training day

function displayTraining() {

	training_day = getTrainingDay();

	if (training_day == 0) {
		document.getElementById("plan").textContent = "Training A";
	}
	else if (training_day == 1) {
		document.getElementById("plan").textContent = "Training B";
	}
	else if (training_day == 2) {
		document.getElementById("plan").textContent = "Regeneration";
		regeneration = true;
	}
}

// get from index.html to exercise.html

function startWorkout() {
	const sound = new Audio ("done.mp3");
	sound.play();
	if (!regeneration) {
		location = "exercise.html";
	}
	else{
	location = "congrats.html";
	}
}

// setup exercise.html

function setup() {
	training_day = getTrainingDay()
	current_exercise = plan[training_day][0];
	displayTrainingData(current_exercise);
}

// set number input placeholder to weight of last session

function managePlaceholder(training_day, counter) {
	weight_local = "weight:" + String(training_day) + String(counter);

	console.log(weight_local);

	document.getElementById("weight-input").placeholder = localStorage.getItem(weight_local) + " kg";
}

// next button pressed => cycle between exercises

let counter = 0;
const sound = new Audio ("./sounds/done.mp3");

function nextExercise() {
	sound.play();

	if (document.getElementById("weight-input").value != "" && counter <= 6) {

		current_exercise = plan[training_day][counter + 1];
		displayTrainingData(current_exercise);

		localStorage.setItem("weight:" + String(training_day) + String(counter), String(document.getElementById("weight-input").value));

		counter ++;

		weight_lifted += document.getElementById("weight-input").value * 12 * 4;

		document.getElementById("weight-input").value = "";
	}
	if (counter >= 6) {
		localStorage.setItem("weight_lifted", String(weight_lifted));
		location = "congrats.html";
	}
}

// display sets, reps and gif of current exercise

function displayTrainingData(exercise) {

	managePlaceholder(training_day, counter);

	let title = document.getElementById("exercise-title");
	title.textContent = exercises[exercise];

	let set = document.getElementById("sets");
	set.textContent = sets[exercise];

	let rep = document.getElementById("reps");
	rep.textContent = reps[exercise];

	document.getElementById("tutorial_img").src = gifs[exercise];
}

// display weight lifted

function displayWeightLifted() {
		document.getElementById("weight-lifted").textContent = "Gewicht bewegt: " + localStorage.getItem("weight_lifted") + " kg";
}