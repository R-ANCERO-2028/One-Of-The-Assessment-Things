document.getElementById('registrationForm').onsubmit = function (refresh) {  
	refresh.preventDefault();  
	let name = document.getElementById('nameInput').value.trim();  
	let id = document.getElementById('idNumberInput').value.trim();  
	let purpose = document.getElementById('purposeInput').value.trim();  
	let gender = document.getElementById('genderInput').value.trim();  
	let section = document.getElementById('sectionInput').value.trim();  
	let q = load();  
  	
	let regist = loadID();    
 	if (regist[id] && regist[id] !== name) {    
  		alert("Invalid Queue Entry - ID In-Use"); return;    
 	}    
     	
 	let queuing = false;    
 	for (let i = 0; i < q.length; i++) {    
   		if (q[i].name === name || q[i].id === id) {    
     			queuing = true; break;    
   		}    
 	}    
     
 	if (queuing) {    
   		alert("Invalid Queue Entry - Already Queuing"); return;    
 	}    
     
 	let time = new Date().toLocaleString();    
 	q.push({ time, name, id, purpose, gender, section });    
 	save(q); saveID(id, name); cookieLay("userName", name); cookieLay("userID", id);    
 	display(); this.reset(); return false;  
  
}  
  
function cookieGrab(name) {  
	let cookies = document.cookie.split("; ");  
	for (let i = 0; i < cookies.length; i++) {  
		let crumbs = cookies[i].split("=");  
		if (crumbs[0] === name) {  
			return crumbs[1];  
		}  
	} return null;  
}  
  
function cookieLay(name, value) {  
	document.cookie = name + "=" + value + "; path=/";  
}  
  
function save(queue) {  
	let entries = "";  
	for (let i = 0; i < queue.length; i++) {  
		entries += queue[i].time + "|" + queue[i].name + "|" + queue[i].id + "|" + queue[i].purpose + "|" + queue[i].gender + "|" + queue[i].section + ";";  
	} localStorage.setItem("queueInfo", entries);  
}  
  
function load() {  
	let info = localStorage.getItem("queueInfo");  
	if (!info) {  
		return [];  
	} let bits = info.split(";"); let list = [];  
	for (let i = 0; i < bits.length; i++) {  
		let parts = bits[i].split("|");  
		if (parts.length >= 6) {  
			list.push({  
				time: parts[0],  
				name: parts[1],  
				id: parts[2],  
				purpose: parts[3],  
				gender: parts[4],  
				section: parts[5],  
			});  
		}  
	} return list;  
}
  
function saveID(id, name) {  
	let idRegist = localStorage.getItem("idRegist");;  
	if (!idRegist) {  
		idRegist = "";  
	} let idens = idRegist.split("|");  
	idRegist += id + "|" + name + "|";  
	localStorage.setItem("idRegist", idRegist);  
}  
  
function loadID() {  
	let idRegist = localStorage.getItem("idRegist");  
	if (!idRegist) {  
		return {};  
	} let regist = {}; let entries = idRegist.split("|");  
	for (let i = 0; i < entries.length - 1; i += 2) {  
		regist[entries[i]] = entries[i + 1];  
	} return regist;  
}  
  
function display() {  
	let queue = document.getElementById('queue'); let que = "";  
	let admin = document.getElementById('admin'); let adm = "";  
	let q = load();  
  
	if (q.length === 0) {  
		queue.innerHTML = "Waiting for person...";  
		admin.innerHTML = "No one in the queue...";  
	} else {  
		for (let i = 0; i < q.length; i++) {  
			let u = q[i];  
			que += "<li>" + u.name + " - " + u.purpose + "</li>";  
			adm += "<li>"  + "(" + u.time + ") " + u.name + " (" + u.id + " - " + u.section + " - " + u.gender + ") " + u.purpose +  ' <button id="serveButton" onclick = "serve(' + i + ')"> Serve </button> ' + ' <button id="removeButton" onclick = "remove(' + i + ')"> Remove </button> ' + "</li>";  
		}  
	} queue.innerHTML = que; admin.innerHTML = adm;  
}  
  
function serve(index) {  
	let q = load(); q.splice(index, 1);  
	save(q); display(); alert("Serving...");  
}  
  
function remove(index) {  
	let q = load(); q.splice(index, 1);  
	save(q); display(); alert("Removing...");  
}  
  
display();
