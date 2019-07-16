/* Major Todo List 
	#1: Restructure Scheduling
	#2: Create "Schedule" Class
	#3: Restructure Event Handling
	#4: Clean Up Functions/Code
	#5: Fix Cacheing
*/


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


var weekdays = ["Monday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday"]; //Monday 3 times, because if you're generating it on a Sat/Sun, you'd likely want Monday.
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var blockLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

var defaultValues = ["","","","","","","",""];

var currentDay = new Date().getDay();

class Schedule {
	constructor() {
		this.name = name;
		this.classes = ["","","","","","","",""];
		this.hw = ['','','','','','','',''];
		this.blockColors = ["Teal", "Pink", "Red", "Orange", "Yellow", "Blue", "White", "Indigo"];
		this.currentDay = new Date().getDay();
		if(this.currentDay == 0 || this.currentDay == 6) {
			this.currentDay = 1;
		}


		this.settings = [];

		//Needs Fleshing Out
		this.currentTheme = 0 //Light, Dark, ???
		this.themeNames = ['Dark', 'Light'];
		this.themes = ['Black', '#EEEEEE']; //Light, Dark
		this.themesContrast = ['White', 'Black'];
	}

	setName() {
		if(!localStorage.getItem("name")) {
			resetName();
			localStorage.setItem("name", this.name);
			this.setName();
		} else {
			this.name = localStorage.getItem('name');

			if(this.name[this.name.length - 1] != 's') {	
				if(this.isNormalDay()) {
					scheduleTitle.innerHTML = this.name + "'s Schedule (" + weekdays[this.currentDay] + ")"
				} else {
					scheduleTitle.innerHTML = this.name + "'s Schedule (" + weekdays[this.currentDay] + ", Advisory)"
				}
			} else {
				if(MySchedule.isNormalDay()) {
					scheduleTitle.innerHTML = this.name + "' Schedule (" + weekdays[this.currentDay] + ")"
				} else {
					scheduleTitle.innerHTML = this.name + "' Schedule (" + weekdays[this.currentDay] + ", Advisory)"
				}
			}

			intro.innerHTML = "Hey, " + this.name + "!";
		}
	}


	setClasses() {
		if(!localStorage.getItem("classes")) {
			localStorage.setItem("classes", JSON.stringify(this.classes));
		} else { 
			let parsedClasses = JSON.parse(localStorage.getItem("classes"));
			for(let i = 0; i < parsedClasses.length; i++) {
				this.classes[i] = parsedClasses[i];
			}

			for(let j = 0; j < lowerCaseLetters.length; j++) {
				for(let k = 0; k < document.getElementsByClassName(lowerCaseLetters[j]).length; k++) {
					document.getElementsByClassName(lowerCaseLetters[j])[k].innerHTML = this.classes[j];
				}
			}

			for(let k = 0; k < this.classes.length; k++) {
				document.getElementById(lowerCaseLetters[k]+"-block").value = this.classes[k];
			}

			for(let l = 0; l < this.classes.length; l++) {
				for(let m = 0; m < document.getElementsByClassName(lowerCaseLetters[l]+'-block').length; m++) { 
					document.getElementsByClassName(lowerCaseLetters[l]+"-block")[m].textContent = this.classes[l];
				}
			}
		}
	}

	setDay() {
		for(let i = 0; i < normalTimes.length; i++) {
			this.isNormalDay() ? 
				document.getElementById("t"+i).innerHTML = normalTimes[i] :
				document.getElementById("t"+i).innerHTML = advisoryTimes[i]; 
		}

		this.isNormalDay() ? advisoryRow.style.display = "none" : advisoryRow.style.display = "table-row";
	}

	isNormalDay() {
		if(this.currentDay != 2 && this.currentDay != 3) {
			return true;
		} else {
			advisoryRow.style.display = "table-row"; //Todo: Integrate this into a different function. This is messy.
			return false 
		}
	}

	switchTheme() {
		document.body.style.backgroundColor = this.themes[this.currentTheme];

		for(let i = 0; i < document.getElementsByTagName('p').length; i++) {
			if(document.getElementsByTagName('p')[i].id != "times-column") {
				document.getElementsByTagName('p')[i].style.color = this.themesContrast[this.currentTheme];
			}
		}

		for(let j = 0; j < document.getElementsByTagName('span').length; j++) {
			document.getElementsByTagName('span')[j].style.color = this.themesContrast[this.currentTheme];
		}

		for(let k = 0; k < document.getElementsByTagName('h2').length; k++) {
			document.getElementsByTagName('h2')[k].style.color = this.themesContrast[this.currentTheme];
		}



		this.themesContrast[this.currentTheme];
		this.themesContrast[this.currentTheme];
		if(this.currentTheme == this.themes.length - 1) {
			this.currentTheme = 0;
		} else {
			this.currentTheme++;
		}

		themeSwitcher.innerHTML = this.themeNames[this.currentTheme] + " Theme";
	}

	setHomework() {
		if(!localStorage.getItem("homework")) {
				localStorage.setItem("homework", JSON.stringify(this.hw));
				this.setHomework();
			} else { 
				var parsedHomework = JSON.parse(localStorage.getItem("homework"));
				for(let i = 0; i < parsedHomework.length; i++) {
					this.hw[i] = parsedHomework[i];
				}

				for(let k = 0; k < this.classes.length; k++) {
					document.getElementById(lowerCaseLetters[k]+"-block-hw-edit").value = this.hw[k];
					document.getElementById(lowerCaseLetters[k]+"-block-hw").innerHTML = this.hw[k];
			}
		}
	}

	setColors() {
		if(!localStorage.getItem('colors')) {
			localStorage.setItem('colors', JSON.stringify(this.blockColors));
			this.setColors();
		} else {
			var parsedBlockColors = JSON.parse(localStorage.getItem('colors'));

			if(enableBlockColors) {
				for(let i = 0; i < this.classes.length; i++) {
					document.getElementById(lowerCaseLetters[i]+'-color').value = parsedBlockColors[i];

					for(let j = 0; j < document.getElementsByClassName(lowerCaseLetters[i]).length; j++) {
						document.getElementsByClassName(lowerCaseLetters[i])[j].style.backgroundColor = parsedBlockColors[i];
					}
				} 
			} else {
				for(let i = 0; i < this.classes.length; i++) {
					for(let j = 0; j < document.getElementsByClassName(lowerCaseLetters[i]).length; j++) {
						document.getElementsByClassName(lowerCaseLetters[i])[j].style.backgroundColor = "white";
					}
				} 
			}
		}
	}

	setSchedule() {
		this.setDay();
		this.setClasses();
		this.setHomework();
		this.setName();
		this.setColors();
	}
}

var MySchedule = new Schedule();



function resetName() { //This should be moved inside Schedule class...everything broke. So it's out here! Fix later.
	var input = prompt("What would you like your name to be?");
	
	if(input != null && input != "") {
		MySchedule.name = input;
		localStorage.setItem("name", MySchedule.name);
		MySchedule.setName();
	}  
}

changeName.addEventListener('click', resetName);

daySelector.addEventListener('click', function(){
	!editMenuShowing ? (editMenu.style.display = "block", daySelector.textContent = "Hide Classes"):
					   (editMenu.style.display = "none", daySelector.textContent = "Edit Schedule");
	editMenuShowing = !editMenuShowing
})

weekdaySelector.addEventListener('change', function(){
	MySchedule.currentDay = weekdaySelector.value;
	MySchedule.setDay();
	MySchedule.setName();
});

themeSwitcher.addEventListener('click', function(){
	MySchedule.switchTheme();
});

classValues.addEventListener('change', function() {
	for(let i = 0; i < MySchedule.classes.length; i++) {
		MySchedule.classes[i] = classValues.children[3*i + 1].value;
	}

	localStorage.setItem('classes', JSON.stringify(MySchedule.classes));
	MySchedule.setClasses();
});

colorEditor.addEventListener('change', function(){
	for(let i = 0; i < MySchedule.classes.length; i++) {
		MySchedule.blockColors[i] = colorEditor.children[3*i + 1].value;
	}

	localStorage.setItem('colors', JSON.stringify(MySchedule.blockColors));
	MySchedule.setColors();
});

homeworkValues.addEventListener('change', function() {
	for(let i = 0; i < MySchedule.hw.length; i++) {
		MySchedule.hw[i] = homeworkValues.children[3*i+1].value;
	}

	localStorage.setItem('homework', JSON.stringify(MySchedule.hw));
	MySchedule.setHomework();
});

showColorMenu.addEventListener('click',function() {
	!colorMenuShowing ? (
		colorMenu.style.display = "block", 
		showColorMenu.textContent = "Hide Color Editor"
		
		):(
		colorMenu.style.display = "none",
		showColorMenu.textContent = "Show Color Editor"
		)

	colorMenuShowing = !colorMenuShowing;

});

showExperimentalMenu.addEventListener('click', function() {	
	!experimentalMenuShowing ? (
		experimentalMenu.style.display = "block", 
		showExperimentalMenu.textContent = "Hide Experimental Menu"
		
		):(
		experimentalMenu.style.display = "none",
		showExperimentalMenu.textContent = "Show Experimental Menu"
		)

		experimentalMenuShowing = !experimentalMenuShowing;
});

rotateTimes.addEventListener('click', function () {
	!timesRotated ? timesColumn.style.transform = "rotateZ(-90deg)" : timesColumn.style.transform = "rotateZ(360deg)"
	timesRotated = !timesRotated
});

showSchedule.addEventListener('click', function() {
	scheduleShowing ? (scheduleMenu.style.display = "none", showSchedule.textContent = "Show Schedule"):
					  (scheduleMenu.style.display = "block", showSchedule.textContent = "Hide Schedule");
	
	scheduleShowing = !scheduleShowing;
});

homeworkSelector.addEventListener('click', function () {
	!homeworkEditMenuShowing ? (homeworkEditMenu.style.display = "block", homeworkSelector.textContent = "Close Homework Editor"):
							   (homeworkEditMenu.style.display = "none", homeworkSelector.textContent = "Edit Homework");
	homeworkEditMenuShowing = !homeworkEditMenuShowing
});

cacheReset.onclick = function() {
	MySchedule.classes = defaultValues;
	MySchedule.hw = defaultValues;

	localStorage.setItem('homework', JSON.stringify(defaultValues));
	localStorage.setItem('classes', JSON.stringify(defaultValues));
	localStorage.removeItem('name');

	MySchedule.setSchedule();
}

enableColors.onclick = function() {
	if(!enableBlockColors) {
		enableBlockColors = true;
		localStorage.setItem('colorsEnabled', enableBlockColors)
		MySchedule.setColors();
		enableColors.textContent = "Disable Block Colors"
	} else {
		enableBlockColors = false;
		localStorage.setItem('colorsEnabled', enableBlockColors)
		MySchedule.setColors();
		enableColors.textContent = "Enable Block Colors"
	}
}


window.onload = function() {
	weekdaySelector.value = currentDay;

	document.getElementById('date').innerHTML = weekdays[new Date().getDay()] + ", " + months[new Date().getMonth()] + " " + new Date().getDate();
	MySchedule.setSchedule();

}



