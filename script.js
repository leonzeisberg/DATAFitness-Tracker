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
	["Split 3", 6, 5, 0, 7, 25],
	["Regeneration"]
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
	const startdatesec = new Date(2022, 1, 15).getTime();
	var todaysec = new Date().getTime();
	var dayspassed = Math.floor((todaysec - startdatesec)/(24 * 60 * 60 * 1000));

	DAY = (dayspassed % split);
	return DAY;
}

// display current training day

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
	DAY = getTrainingDay(P0039.split);
	current_exercise = P0039.exercises[DAY][1];
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

	if (counter <= P0039.exercises[DAY].length -1) {

		localStorage.setItem("sets:" + String(DAY) + String(counter), String(document.getElementById("sets").value));
		localStorage.setItem("reps:" + String(DAY) + String(counter), String(document.getElementById("reps").value));
		localStorage.setItem("weight:" + String(DAY) + String(counter), String(document.getElementById("weight").value));

		current_exercise = P0039.exercises[DAY][counter];
		displayTrainingData(current_exercise);
	}
	else {
		location = "congrats.html";
	}
}

// set number input placeholder to weight of last session

function managePlaceholder(counter) {
	ref_local = String(DAY) + String(counter);

	document.getElementById("sets").value = localStorage.getItem("sets:" + ref_local);
	document.getElementById("reps").value = localStorage.getItem("reps:" + ref_local);
	document.getElementById("weight").value = localStorage.getItem("weight:" + ref_local);
}