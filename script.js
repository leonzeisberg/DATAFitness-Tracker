let PLAN_ID;

class Plan {
	constructor(username, id, exercises = []) {
		this.username = username;
		this.id = id;
		this.exercises = exercises;
		this.split = exercises.length;
	}
}

const P0001 = new Plan ('Coach Leon', 'P0001', [
	["Training A", 0, 2, 6, 21, 7, 3, 4, 5],
	["Regeneration"]
]);

const P0039 = new Plan ("Igor Maciejewski", "P0039", [
	["Split 1", 0, 1, 2, 20, 21, 22, 23], 
	["Split 2", 4, 4, 12, 3, 7, 8, 24], 
	["Split 3", 6, 5, 0, 7, 25],
	["Regeneration"]
]);

const P0038 = new Plan ("Taner Aliev", "P0038", [
	["Training A", 0, 1, 2, 3, 4, 26],
	["Training B", 6, 7, 8, 21, 10, 27, 5],
	["Regeneration"]
]);

const PLAN = {
	"P0039":P0039,
	"P0038":P0038,
	"P0001":P0001
}

const EXERCISES = [
	["Bankdrücken", "https://modusx.de/wp-content/uploads/2021/01/bankdruecken-langhantel.gif"],
	["Schrägbankdrücken Kurzhantel", "https://modusx.de/wp-content/uploads/2021/01/kurzhantel-schraegbankdruecken.gif"],
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
	["Klimmzüge Untergriff", "https://modusx.de/wp-content/uploads/2021/03/klimmzuege-untergriff-chin-up.gif"],
	["Wadenheben Stehend", "https://modusx.de/wp-content/uploads/2021/10/wadenheben-stehend-an-der-multipresse-mit-block.gif"],
	["Leg Raises Hängend", "https://modusx.de/wp-content/uploads/2021/10/beinheben-haengend-fuer-die-seitlichen-bauchmuskeln-seitlich.gif"]
];

// Select User and plan 

var user;

function selectUser() {
	if(!localStorage.getItem('username')){
		localStorage.clear()
		console.log("LocalStorage cleared")
		username = prompt("Trainingsplan ID: ");
		if(username in PLAN) {
			localStorage.setItem('username', username);
			localStorage.setItem('split', PLAN[username].split);
			location.reload()
		}
		else {
			alert('Ungültige Trainingsplan ID!');
			location = 'index.html';
		}
	}
}

// get training day

let DAY;

function selectTraining(day) {
	selected = parseInt(localStorage.getItem('selectedDay'))
	document.querySelectorAll('p.button')[selected].classList.value = 'center button'
	localStorage.setItem('selectedDay', String(day));
	document.querySelectorAll('p.button')[day].classList.value += ' selected'
}

// display correct amount of buttons

function reduceButtons() {
	selectUser();
	for (let [index, elem] of document.querySelectorAll('p.button').entries()) {
		if (index > PLAN[localStorage.getItem('username')].split) {
			document.querySelectorAll('p.button')[index-2].style.display = "none"
		}
	}
}

// start workout

let regeneration = false;

function startWorkout() {
	if (!regeneration) {
		location = "exercise.html";
	}
	else {
		location = "congrats.html";
	}
}

// setup exercise.html

function setup() {
	DAY = parseInt(localStorage.getItem('selectedDay'));
	current_exercise = PLAN[localStorage.getItem('username')].exercises[DAY][1];
	displayTrainingData(current_exercise);
}

// display sets, reps and gif of current exercise

function displayTrainingData(exercise) {

	let title = document.getElementById("exercise-title");
	console.log(EXERCISES[exercise][0]);
	title.textContent = EXERCISES[exercise][0];

	document.getElementById("tutorial_img").src = EXERCISES[exercise][1];

	counter ++;

	managePlaceholder(counter);
}

// next button pressed => cycle between exercises

let counter = 1;
let weight_lifted = 0;

function nextExercise() {

	localStorage.setItem("sets:" + String(DAY) + String(counter), String(document.getElementById("sets").value));
	localStorage.setItem("reps:" + String(DAY) + String(counter), String(document.getElementById("reps").value));
	localStorage.setItem("weight:" + String(DAY) + String(counter), String(document.getElementById("weight").value));

	if (counter <= PLAN[localStorage.getItem('username')].exercises[DAY].length -1) {

		current_exercise = PLAN[localStorage.getItem('username')].exercises[DAY][counter];
		displayTrainingData(current_exercise);
	}
	else {
		location = "congrats.html";
	}
}

// back button pressed => cycle back

function lastExercise() {
	if (counter > 2) {
		counter -= 2;
		nextExercise();
	}
}

// set number input placeholder to weight of last session

function managePlaceholder(counter) {
	ref_local = String(DAY) + String(counter);

	document.getElementById("sets").value = localStorage.getItem("sets:" + ref_local);
	document.getElementById("reps").value = localStorage.getItem("reps:" + ref_local);
	document.getElementById("weight").value = localStorage.getItem("weight:" + ref_local);
}