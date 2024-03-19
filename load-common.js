window.onload = function LoadCommon() {
	window.document.body.insertAdjacentHTML("afterbegin", 
	`
	<div id="navigator">
		<button class = "nav-button" onclick="window.location.href='/index.html'">Home</button>
		<button class = "nav-button" onclick="window.location.href='/blastula/index.html'">Blastula</button>
		<button class = "nav-button" onclick="window.location.href='/hellsyncer/index.html'">HellSyncer</button>
	</div>
	`);
	window.document.body.insertAdjacentHTML("afterbegin", 
	`
	<div id="header">
		<div class="primary-container">
			<span class="title">Pieces-AB</span>
			<hr />
			<span class="subtitle">Questionrat's Evil Lab</span>
		</div>
	</div>
	`);
	window.document.body.insertAdjacentHTML("beforeend", 
	`
	<div id="footer">
		&mdash;This is a personal website, not to be copied without permission. &copy; 2024 "Questionrat"&mdash;
	</div>
	`);
}