function registerForm() {
  var name = document.getElementById("nameInput").value;
  var purpose = document.getElementById("purposeInput").value;
  var idNumber = document.getElementById("idNumberInput").value;
  var section = document.getElementById("sectionInput").value;
  var gender = document.getElementById("genderInput").value;

  var queue = [];
  var personInLine = "Name: " + name + " - Purpose: " + purpose + " - ID Number: " + idNumber + " - Section: " + idNumber + " - Gender: " + gender;
  queue.shift(personInLine);
  displayQueue();
}

function displayqueue() {
	var show = "";
	for (var i = 0; i < queue.length; i++){
		show += queue[i] + "<br />";
	}
	document.getElementById("queue").innerHTML = show;
}
