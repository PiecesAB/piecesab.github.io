function HandleData(data) {
	console.log(data);
	window.document.getElementById("updated-time").innerHTML = data.date;
	for (const [namespaceId, namespaceData] of Object.entries(data.namespaces)) {
		let techElement = window.document.getElementById("tech");
		let classElementList = []
		for (const [classId, classData] of Object.entries(namespaceData.classes)) {
			classElementList.push(`
			<div class="buttonlike-container class-element">
				<span class="declaration-kind">class</span> <span class="class-title">${classId}</span>
			</div>
			`);
		}
		techElement.insertAdjacentHTML("beforeend", 
		`
		<div class="primary-container">
			<div class="namespace-block">
				<span class="declaration-kind">namespace</span> <span class="namespace-title">${namespaceId}</span>
			</div>
			${classElementList.join("")}
		</div>
		`);
	}
}

let load = false;

function LoadData() {
	if (load) { return; }
	load = true;
	fetch('./docgen.json')
    .then((response) => response.json())
    .then(HandleData);
}

document.addEventListener("DOMContentLoaded", LoadData);