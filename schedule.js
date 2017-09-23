var scheduleTitle = document.getElementById('schedule-title');
var daySelector = document.getElementById('selector');
var weekdaySelector = document.getElementById('weekday-selector');
var advisoryRow = document.getElementById('advisory');
var changeName = document.getElementById('change-name');
var intro = document.getElementById('intro');
var editMenu = document.getElementById('edit-menu');
var homeworkEditMenu = document.getElementById('homework-edit-menu');
var title = document.getElementById('title');
var themeSwitcher = document.getElementById('theme-switcher');
var showExperimentalMenu = document.getElementById('experimental-settings');
var experimentalMenu = document.getElementById('experimental-features');
var rotateTimes = document.getElementById('rotate-times');
var timesColumn = document.getElementById('times-column');
var showSchedule = document.getElementById('show-schedule');
var scheduleMenu = document.getElementById('schedule-div');
var homeworkSelector = document.getElementById('show-homework');
var cacheReset = document.getElementById('reset-cache');
var enableColors = document.getElementById('block-colors');
var colorEditor = document.getElementById('color-editor');
var showColorMenu = document.getElementById('show-colors');
var colorMenu = document.getElementById('color-editor-menu');

var name;
var editMenuShowing = false;
var homeworkEditMenuShowing = false;
var scheduleShowing = true;
var experimentalMenuShowing = false;
var displayTheme = false; //False, True
var timesRotated = false;
var colorMenuShowing = false;

var enableBlockColors;

var classValues = document.getElementById('class-list');
var homeworkValues = document.getElementById('homework-list')


var normalTimes = ["8:30-9:55", "9:55-10:05", "10:05-11:30", "11:30-12:10", "12:10-1:35", "1:35-2:05", "2:05-3:30"]
var advisoryTimes = ["8:30-9:50", "9:50-10:00", "10:00-11:20", "11:20-11:55", "12:40-1:55", "1:55-2:15", "2:15-3:30"]
// var msTimes = ["8:30-9:50", "9:50-10:05", "10:05-11:20", "11:20-11:35", "11:35-12:05", "12:05-12:40", "12:40-2:00", "2:00-2:10", "2:10-3:30"]

var blockColors = ["Teal", "Pink", "Red", "Orange", "Yellow", "Blue", "White", "Indigo"];


var weekdays = ["Monday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday"]; //Monday 3 times, because if you're generating it on a Sat/Sun, you'd likely want Monday.
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var blockLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

var defaultValues = ["","","","","","","",""];

var classes = ["","","","","","","",""];
var hw = ['','','','','','','',''];

var currentDay = new Date().getDay();

function isNormalDay() {
	if(currentDay != 2 && currentDay != 3) {
		return true;
	} else {
		advisoryRow.style.display = "table-row";
		return false;
	}
} 

function switchTheme() {
	if(!displayTheme) {
		document.body.style.backgroundColor = "black";
		for(let i = 0; i < document.getElementsByTagName('p').length; i++) {
			if(document.getElementsByTagName('p')[i].id != "times-column") {
				document.getElementsByTagName('p')[i].style.color = "white";
			}
		}

		for(let j = 0; j < document.getElementsByTagName('span').length; j++) {
			document.getElementsByTagName('span')[j].style.color = "white";
		}

		for(let k = 0; k < document.getElementsByTagName('h2').length; k++) {
			document.getElementsByTagName('h2')[k].style.color = "white";
		}

		title.style.color = "white";
		intro.style.color = "white";
		themeSwitcher.innerHTML = "Light Theme"
		displayTheme = !displayTheme;

	} else {
		document.body.style.backgroundColor = "#EEEEEE";
		for(let i = 0; i < document.getElementsByTagName('p').length; i++) {
			document.getElementsByTagName('p')[i].style.color = "black";
		}

		for(let j = 0; j < document.getElementsByTagName('span').length; j++) {
			document.getElementsByTagName('span')[j].style.color = "black";
		}

		for(let k = 0; k < document.getElementsByTagName('h2').length; k++) {
			document.getElementsByTagName('h2')[k].style.color = "black";
		}


		title.style.color = "black";
		intro.style.color = "black";
		themeSwitcher.innerHTML = "Dark Theme"
		displayTheme = !displayTheme;
	}
}


function setName() {
	if(!localStorage.getItem("name")) {
		resetName();
		localStorage.setItem("name", name);
		setName();
	} else {
		name = localStorage.getItem('name');

		if(name[name.length - 1] != 's') {	
			if(isNormalDay()) {
				scheduleTitle.innerHTML = name + "'s Schedule (" + weekdays[currentDay] + ")"
			} else {
				scheduleTitle.innerHTML = name + "'s Schedule (" + weekdays[currentDay] + ", Advisory)"
			}
		} else {
			if(isNormalDay()) {
				scheduleTitle.innerHTML = name + "' Schedule (" + weekdays[currentDay] + ")"
			} else {
				scheduleTitle.innerHTML = name + "' Schedule (" + weekdays[currentDay] + ", Advisory)"
			}
		}

		intro.innerHTML = "Hey, " + name + "!";
	}
}

function setDay() {
	for(let i = 0; i < normalTimes.length; i++) {
		isNormalDay() ? 
			document.getElementById("t"+i).innerHTML = normalTimes[i] :
			document.getElementById("t"+i).innerHTML = advisoryTimes[i]; 
	}

	isNormalDay() ? advisoryRow.style.display = "none" : advisoryRow.style.display = "table-row";
}

function setClasses() {
	if(!localStorage.getItem("classes")) {
		/*Leaving commented for the time being—it's annoying as fuck.*/

		// for(let i = 0; i < blockLetters.length; i++) {
		// 	classes[i] = prompt("What class do you have for your " + blockLetters[i] + " block?");
		// }  
		localStorage.setItem("classes", JSON.stringify(classes));

		setClasses();
	} else { 
		parsedClasses = JSON.parse(localStorage.getItem("classes"));
		for(let i = 0; i < parsedClasses.length; i++) {
			classes[i] = parsedClasses[i];
		}

		for(let j = 0; j < lowerCaseLetters.length; j++) {
			for(let k = 0; k < document.getElementsByClassName(lowerCaseLetters[j]).length; k++) {
				document.getElementsByClassName(lowerCaseLetters[j])[k].innerHTML = classes[j];
			}
		}

		for(let k = 0; k < classes.length; k++) {
			document.getElementById(lowerCaseLetters[k]+"-block").value = classes[k];
		}

		for(let l = 0; l < classes.length; l++) {
			for(let m = 0; m < document.getElementsByClassName(lowerCaseLetters[l]+'-block').length; m++) { 
				document.getElementsByClassName(lowerCaseLetters[l]+"-block")[m].textContent = classes[l];
			}
		}
	}
}

function setHomework() {
	if(!localStorage.getItem("homework")) {

			localStorage.setItem("homework", JSON.stringify(hw));
			setHomework();
		} else { 
			parsedHomework = JSON.parse(localStorage.getItem("homework"));
			for(let i = 0; i < parsedHomework.length; i++) {
				hw[i] = parsedHomework[i];
			}

			for(let k = 0; k < classes.length; k++) {
				document.getElementById(lowerCaseLetters[k]+"-block-hw-edit").value = hw[k];
				document.getElementById(lowerCaseLetters[k]+"-block-hw").innerHTML = hw[k];
			}
	}
}

function resetName() {
	input = prompt("What would you like your name to be?");
	
	if(input != null && input != "") {
		name = input;
		localStorage.setItem("name",name);
		setName();
	}  
}

function setColors() {
	if(!localStorage.getItem('colors')) {
		localStorage.setItem('colors', JSON.stringify(blockColors));
		setColors();
	} else {
		var parsedBlockColors = JSON.parse(localStorage.getItem('colors'));

		if(enableBlockColors) {
			for(let i = 0; i < classes.length; i++) {
				document.getElementById(lowerCaseLetters[i]+'-color').value = parsedBlockColors[i];

				for(let j = 0; j < document.getElementsByClassName(lowerCaseLetters[i]).length; j++) {
					document.getElementsByClassName(lowerCaseLetters[i])[j].style.backgroundColor = parsedBlockColors[i];
				}
			} 
		} else {
			for(let i = 0; i < classes.length; i++) {
				for(let j = 0; j < document.getElementsByClassName(lowerCaseLetters[i]).length; j++) {
					document.getElementsByClassName(lowerCaseLetters[i])[j].style.backgroundColor = "white";
				}
			} 
		}
	}
}

function setSchedule() {
	setDay();
	setClasses();
	setHomework();
	setName();

	setColors();

}

changeName.addEventListener('click', resetName);

daySelector.addEventListener('click', function() {
	!editMenuShowing ? (editMenu.style.display = "block", daySelector.textContent = "Hide Classes"):
					   (editMenu.style.display = "none", daySelector.textContent = "Edit Schedule");
	editMenuShowing = !editMenuShowing
})

weekdaySelector.onchange = function(){
	currentDay = weekdaySelector.value;
	setDay();
	setName();
}

themeSwitcher.onclick = function() {
	switchTheme();
	localStorage.setItem('displayTheme', displayTheme);
}

classValues.onchange = function() {
	for(let i = 0; i < classes.length; i++) {
		classes[i] = classValues.children[3*i + 1].value;
	}

	localStorage.setItem('classes', JSON.stringify(classes));
	setClasses();
}	

colorEditor.onchange = function() {
	for(let i = 0; i < classes.length; i++) {
		blockColors[i] = colorEditor.children[3*i + 1].value;
	}

	localStorage.setItem('colors', JSON.stringify(blockColors));
	setColors();
}

homeworkValues.onchange = function() {
	for(let i = 0; i < hw.length; i++) {
		hw[i] = homeworkValues.children[3*i+1].value;
	}
	localStorage.setItem('homework', JSON.stringify(hw));
	setHomework();
}

showColorMenu.onclick = function() {
	!colorMenuShowing ? (
		colorMenu.style.display = "block", 
		showColorMenu.textContent = "Hide Color Editor"
		
		):(
		colorMenu.style.display = "none",
		showColorMenu.textContent = "Show Color Editor"
		)

	colorMenuShowing = !colorMenuShowing;

}

showExperimentalMenu.onclick = function() {	
	!experimentalMenuShowing ? (
		experimentalMenu.style.display = "block", 
		showExperimentalMenu.textContent = "Hide Experimental Menu"
		
		):(
		experimentalMenu.style.display = "none",
		showExperimentalMenu.textContent = "Show Experimental Menu"
		)

		experimentalMenuShowing = !experimentalMenuShowing;
}

rotateTimes.onclick = function () {
	!timesRotated ? timesColumn.style.transform = "rotateZ(-90deg)" : timesColumn.style.transform = "rotateZ(360deg)"
	timesRotated = !timesRotated

	// 	
	// 	writing-mode: vertical-lr;
	//   text-orientation: upright;
	//  
}

showSchedule.onclick = function() {
	scheduleShowing ? (scheduleMenu.style.display = "none", showSchedule.textContent = "Show Schedule"):
					  (scheduleMenu.style.display = "block", showSchedule.textContent = "Hide Schedule");
	
	scheduleShowing = !scheduleShowing;
}

homeworkSelector.onclick = function () {
	!homeworkEditMenuShowing ? (homeworkEditMenu.style.display = "block", homeworkSelector.textContent = "Close Homework Editor"):
							   (homeworkEditMenu.style.display = "none", homeworkSelector.textContent = "Edit Homework");
	homeworkEditMenuShowing = !homeworkEditMenuShowing
}

cacheReset.onclick = function() {
	classes = defaultValues;
	hw = defaultValues;

	localStorage.removeItem('homework');
	localStorage.removeItem('classes');
	localStorage.removeItem('name');

	setSchedule();
}

enableColors.onclick = function() {
	if(!enableBlockColors) {
		enableBlockColors = true;
		localStorage.setItem('colorsEnabled', enableBlockColors)
		setColors();
		enableColors.textContent = "Disable Block Colors"
	} else {
		enableBlockColors = false;
		localStorage.setItem('colorsEnabled', enableBlockColors)
		setColors();
		enableColors.textContent = "Enable Block Colors"
	}
}


window.onload = function() {
	if(currentDay == 0 || currentDay == 6) {
		currentDay = 1;
	}
	weekdaySelector.value = currentDay;
	if(localStorage.getItem('colorsEnabled') == true) {
		enableBlockColors = true;
		setColors();
	}

	document.getElementById('date').innerHTML = weekdays[new Date().getDay()] + ", " + months[new Date().getMonth()] + " " + new Date().getDate();
	setSchedule();	
}



