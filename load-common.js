function AddNavigator() {
	window.document.body.insertAdjacentHTML("afterbegin", 
	`
	<div id="navigator">
		<button class = "nav-button" onclick="window.location.href='/index.html'">Home</button>
		<button class = "nav-button" onclick="window.location.href='/blastula/index.html'">Blastula</button>
		<button class = "nav-button" onclick="window.location.href='/hellsyncer/index.html'">HellSyncer</button>
	</div>
	`);
}

function AddHeader() {
	let title = "Pieces-AB";
	let subtitle = "Questionrat's Evil Lab";
	if (window.location.pathname.includes("blastula")) {
		title = "Blastula";
		subtitle = "It's &quot;easy&quot;!"
	}
	else if (window.location.pathname.includes("hellsyncer")) {
		title = "HellSyncer";
		subtitle = "Now reaches the fatal attraction be described by music synchronization"
	}
	
	window.document.body.insertAdjacentHTML("afterbegin", 
	`
	<div id="header">
		<div class="primary-container">
			<span class="title">${title}</span>
			<hr />
			<span class="subtitle">${subtitle}</span>
		</div>
	</div>
	`);
}

function AddFooter() {
	// Add footer
	window.document.body.insertAdjacentHTML("beforeend", 
	`
	<div id="footer">
		&mdash;This is a personal website, not to be copied without permission. &copy; 2024 "Questionrat"&mdash;
	</div>
	`);
}

function LoadCommon() {
	AddNavigator();
	AddHeader();
	AddFooter();
}

document.addEventListener("DOMContentLoaded", LoadCommon);