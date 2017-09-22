var scheduleTitle = document.getElementById('schedule-title');
var daySelector = document.getElementById('selector');
var weekdaySelector = document.getElementById('weekday-selector');
var advisoryRow = document.getElementById('advisory');
var name;


var normalTimes = ["8:30-9:55", "9:55-10:05", "10:05-11:30", "11:30-12:10", "12:10-1:35", "1:35-2:05", "2:05-3:30"]
var advisoryTimes = ["8:30-9:50", "9:50-10:00", "10:00-11:20", "11:20-11:55", "12:40-1:55", "1:55-2:15", "2:15-3:30"]

var weekdays = ["Monday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday"]; //Monday 3 times, because if you're generating it on a Sat/Sun, you'd likely want Monday.

var blockLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var classes = [];

var currentDay = new Date().getDay();

function isNormalDay() {
	if(currentDay != 2 && currentDay != 3) {
		return true;
	} else {
		advisoryRow.style.display = "table-row";
		return false;
	}
} 

if(!localStorage.getItem("name")) {
	name = prompt("What's your name?")
	localStorage.setItem("name", name);
} else {
	name = localStorage.getItem('name');
	if(isNormalDay()) {
		scheduleTitle.innerHTML = name + "'s Schedule (" + weekdays[currentDay] + ")"
	} else {
		scheduleTitle.innerHTML = name + "'s Schedule (" + weekdays[currentDay] + ", Advisory)"
	}
}

function setSchedule() {
	if(!localStorage.getItem("classes")) {
		for(let i = 0; i < blockLetters.length; i++) {
			classes[i] = prompt("What class do you have for your " + blockLetters[i] + " block?");
		}

		localStorage.setItem("classes", JSON.stringify(classes));

		for(let j = 0; j < lowerCaseLetters.length; j++) {
			console.log(document.getElementsByClassName(lowerCaseLetters[j]).length)
			for(let k = 0; k < document.getElementsByClassName(lowerCaseLetters[j]).length; k++) {
				document.getElementsByClassName(lowerCaseLetters[j])[k].innerHTML = classes[j];
			}
		}

	} else { 
		parsedClasses = JSON.parse(localStorage.getItem("classes"));
		console.log(parsedClasses);
		for(let i = 0; i < parsedClasses.length; i++) {
			classes[i] = parsedClasses[i];
		}

		console.log(lowerCaseLetters.length)
		for(let j = 0; j < lowerCaseLetters.length; j++) {
			console.log(document.getElementsByClassName(lowerCaseLetters[j]).length)
			for(let k = 0; k < document.getElementsByClassName(lowerCaseLetters[j]).length; k++) {
				document.getElementsByClassName(lowerCaseLetters[j])[k].innerHTML = classes[j];
			}
		}
	}

	for(let i = 0; i < normalTimes.length; i++) {
		if(isNormalDay()) {
			document.getElementById("t"+i).innerHTML = normalTimes[i];
		} else {
			document.getElementById("t"+i).innerHTML = advisoryTimes[i];
		}

	}

	if(isNormalDay()) {
		scheduleTitle.innerHTML = name + "'s Schedule (" + weekdays[currentDay] + ")"
		advisoryRow.style.display = "none";
	} else {
		scheduleTitle.innerHTML = name + "'s Schedule (" + weekdays[currentDay] + ", Advisory)"
		advisoryRow.style.display = "table-row";
	}
}

daySelector.onclick = function() {
	localStorage.removeItem('classes');
	setSchedule();
}

weekdaySelector.onchange = function(){
	currentDay = weekdaySelector.value;
	setSchedule();
}


window.onload = function() {
	if(currentDay == 0 || currentDay == 6) {
		currentDay = 1;
	}
	weekdaySelector.value = currentDay;
	setSchedule();	
}


