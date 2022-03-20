let PLAN_ID;

class Plan {
	constructor(username, id, exercises = []) {
		this.username = username;
		this.id = id;
		this.exercises = exercises;
		this.split = exercises.length;
	}

	getTraining(day) {
		return this.exercises[day];
	}
}

const P0039 = new Plan ("Igor Maciejewski", "P0039", [
	["Split 1", 0, 1, 2, 20, 21, 22, 23], 
	["Split 2", 4, 4, 12, 3, 7, 8, 24], 
	["Regeneration"], 
	["Split 3", 6, 5, 0, 7, 25]
]);

const EXERCISES = [
	["Bankdrücken", "https://modusx.de/wp-content/uploads/2021/01/bankdruecken-langhantel.gif"],
	["Schrägbankdrücken", "https://modusx.de/wp-content/uploads/2021/01/kurzhantel-schraegbankdruecken.gif"],
	["Crossover", "https://modusx.de/wp-content/uploads/2021/01/cable-fly-cablecross.gif"],
	["Rudern Langhantel", "https://modusx.de/wp-content/uploads/2021/03/langhantelrudern-obergriff.gif"],
	["Latzug", "https://modusx.de/wp-content/uploads/2021/03/klassische-latziehen-zur-brust.gif"],
	["Deadlift", "https://modusx.de/wp-content/uploads/2021/10/klassisches-kreuzheben.gif"],
	["Squad", "https://modusx.de/wp-content/uploads/2021/10/squats-kniebeugen-mit-der-langhantel.gif"],
	["Military Press", "https://modusx.de/wp-content/uploads/2020/11/military-press.gif"],
	["Seitheben", "https://modusx.de/wp-content/uploads/2020/11/seitheben-kurzhanteln-stehend.gif"],
	["Preacher Curls", "https://modusx.de/wp-content/uploads/2021/07/preacher-curls-sz-sitzend.gif"],
	// 11
	["Seilzug am Turm", "https://modusx.de/wp-content/uploads/2021/07/trizeps-pushdown-kabelzug-seil.gif"],
	["Bauchpresse", "https://modusx.de/wp-content/uploads/2021/10/crunches-an-der-crunch-maschine.gif"],
	["Rudern Kabelzug", "https://modusx.de/wp-content/uploads/2021/03/enges-rudern-am-kabelzug-gerade-stange.gif"],
	["Butterfly Reverse am Gerät", "https://modusx.de/wp-content/uploads/2020/11/butterfly-reverse-parallel.gif"],
	["Trizepsdrücken", "https://modusx.de/wp-content/uploads/2021/07/trizepsdruecken-einarmig-hinter-kopf.gif"],
	["Kickbacks", "https://modusx.de/wp-content/uploads/2021/07/kurzhantel-trizeps-kickbacks.gif"],
	["Ausfallschritte", "https://modusx.de/wp-content/uploads/2021/10/ausfallschritte-mit-der-langhantel.gif"],
	["Beinstrecker", "https://modusx.de/wp-content/uploads/2021/10/beinstrecken-am-geraet-beidbeinig.gif"],
	["Beinbeuger", "https://modusx.de/wp-content/uploads/2021/10/beinbeuger-sitzend-am-beinbeuger-geraet-beidbeinig.gif"],
	["Wadenheben", "https://modusx.de/wp-content/uploads/2021/10/langhantel-wadenheben-im-stehen.gif"],
	// 21
	["Trizeps Dips", "https://modusx.de/wp-content/uploads/2021/07/trizeps-dips-haengend-mit-gewicht.gif"],
	["Bizepscurls", "https://modusx.de/wp-content/uploads/2021/07/langhantel-curls-klassisch.gif"],
	["Trizeps Pushdown", "https://modusx.de/wp-content/uploads/2021/07/trizeps-pushdown-kabelzug-seil.gif"],
	["Unterarm Curls", "https://modusx.de/wp-content/uploads/2021/07/unterarm-curls-sitzend-langhantel.gif"],
	["Front Raises", "https://modusx.de/wp-content/uploads/2020/11/frontheben-kurzhanteln.gif"],
	["Klimmzüge Untergriff", "https://modusx.de/wp-content/uploads/2021/03/klimmzuege-untergriff-chin-up.gif"]
];

// get training day

let DAY;

function getTrainingDay(split) {
	const startday = 15;
	const startmonth = 2;
	const startyear = 2022;
	const startdate = new Date(startyear, startmonth -1, startday);
	var heute = new Date();
	var sekunden_geb = startdate.getTime();
	var heutesek = heute.getTime();
	var alter = heutesek - sekunden_geb;

	DAY = (Math.floor(alter/(24 * 60 * 60 * 1000)) % split);
	return DAY;
}

// display current training day

let regeneration = false;

function displayTraining() {
	if (!localStorage.getItem("planId")) {
		PLAN_ID = prompt("Trainigsplan ID: ");
		localStorage.setItem("planId", PLAN_ID);
	}
	let trainingday = P0039.getTraining(getTrainingDay(P0039.exercises.length))[0];
	document.getElementById("plan").textContent = trainingday;
	if (trainingday == "Regeneration") {
		regeneration = true;
	}

	document.getElementById("username").textContent = P0039.username;
}

function startWorkout() {
	const sound = new Audio ("./sounds/done.mp3");
	sound.play();
	if (!regeneration) {
		location = "exercise.html";
	}
	else {
		location = "congrats.html";
	}
}

// setup exercise.html

function setup() {
	training_day = getTrainingDay(P0039.split)
	current_exercise = P0039.exercises[DAY][1];
	displayTrainingData(current_exercise);
}

// display sets, reps and gif of current exercise

function displayTrainingData(exercise) {

	let title = document.getElementById("exercise-title");
	title.textContent = EXERCISES[exercise][0];

	let set = document.getElementById("sets");
	set.textContent = "🤷🏿‍♂️";

	let rep = document.getElementById("reps");
	rep.textContent = "🤷🏿‍♂️";

	document.getElementById("tutorial_img").src = EXERCISES[exercise][1];
}

// next button pressed => cycle between exercises

let counter = 1;
let weight_lifted = 0;
const sound = new Audio ("./sounds/done.mp3");

function nextExercise() {
	sound.play();

	if (document.getElementById("weight-input").value != "" && counter <= P0039.exercises[DAY].length) {

		managePlaceholder(counter);

		current_exercise = P0039.exercises[DAY][counter];
		console.log(current_exercise);
		displayTrainingData(current_exercise);

		localStorage.setItem("weight:" + String(DAY) + String(counter), String(document.getElementById("weight-input").value));

		counter ++;

		weight_lifted += document.getElementById("weight-input").value * 12 * 4;

		document.getElementById("weight-input").value = "";
	}
	if (counter >= P0039.exercises[DAY].length + 2) {
		localStorage.setItem("weight_lifted", String(weight_lifted));
		location = "congrats.html";
	}
}

// display weight lifted

function displayWeightLifted() {
	document.getElementById("weight-lifted").textContent = "Gewicht bewegt: " + localStorage.getItem("weight_lifted") + " kg";
}

// set number input placeholder to weight of last session

function managePlaceholder(counter) {
	weight_local = "weight:" + String(DAY) + String(counter);

	console.log(weight_local);

	document.getElementById("weight-input").placeholder = localStorage.getItem(weight_local) + " kg";
}