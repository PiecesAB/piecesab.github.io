function GetCommentElement(comment, defaultElement) {
	let commentRegion = "";
	if (comment.summary !== "" 
	|| comment.returns !== "" 
	|| comment.remarks !== "" 
	|| Object.keys(comment.params).length > 0
	|| Object.keys(comment.typeParams).length > 0) {
		let returnComment = "";
		if (comment.returns !== "") {
			returnComment = `
				<div class="comment-region special-comment">
					<div class="main-line-subinfo special-comment-start">Returns:</div> 
					<div>${comment.returns}</div>
				</div>
			`;
		}
		
		let remarkComment = "";
		if (comment.remarks !== "") {
			remarkComment = `
				<div class="comment-region special-comment">
					<div class="main-line-subinfo special-comment-start">Remarks:</div> 
					<div>${comment.remarks}</div>
				</div>
			`;
		}
		
		let paramsList = [];
		for (const [paramId, paramComment] of Object.entries(comment.typeParams)) {
			paramsList.push(`
				<div class="comment-region special-comment">
					<div class="main-line-subinfo special-comment-start">
						<span class="declaration-kind">type-param</span> ${paramId}:
					</div>
					<div>${paramComment}</div>
				</div>
			`);
		}
		for (const [paramId, paramComment] of Object.entries(comment.params)) {
			paramsList.push(`
				<div class="comment-region special-comment">
					<div class="main-line-subinfo special-comment-start">
						<span class="declaration-kind">param</span> ${paramId}:
					</div>
					<div>${paramComment}</div>
				</div>
			`);
		}
		
		let examplesList = [];
		for (const example of comment.examples) {
			examplesList.push(`
				<div class="comment-region special-comment">
					<div class="main-line-subinfo special-comment-start">Example:</div>
					<div>${example}</div>
				</div>
			`);
		}
		
		commentRegion = `
		<div class="comment-region">
			${comment.summary}
			${paramsList.join("")}
			${returnComment}
			${examplesList.join("")}
			${remarkComment}
		</div>
		`;
	}
	return commentRegion;
}

function GetClassElement(classId, classData) {
	let commentRegion = GetCommentElement(classData.comment, "<br /><br />");
	let baseList = "";
	if (classData.bases.length > 0) {
		baseList = `<span class="main-line-subinfo">: ${classData.bases.join(", ")}</span>`;
	}
	
	let declarationList = [];
	for (const dec of classData.declarations) {
		let commentRegion = GetCommentElement(dec.comment, "");
		let kindString = `${dec.kind}`;
		if (dec.mainType !== "") {
			kindString = `${dec.kind} &bull; ${dec.mainType}`
		}
		if (dec["static"] === "true" && dec.kind !== "const") {
			kindString = "static " + kindString;
		}
		let subInfo = "";
		if (dec.defaultValue !== "") {
			if (dec.defaultValue.length >= 200) {
				subInfo = `<span class="main-line-subinfo">= (very long default value not shown.)</span>`;
			}
			else {
				subInfo = `<span class="main-line-subinfo">= ${dec.defaultValue}</span>`;
			}
		}
		let methodInfo = "";
		if (dec.kind === "method") {
			let mparamList = [];
			for (const [mpname, mparam] of Object.entries(dec.methodParams)) {
				let subInfo = "";
				if (mparam.defaultValue !== "") {
					subInfo = ` <span class="main-line-subinfo">= ${mparam.defaultValue}</span>`
				}
				mparamList.push(`<span class="declaration-kind">${mparam.paramType}</span> ${mpname}${subInfo}`)
			}
			methodInfo = `(${mparamList.join(", ")})`;
		}
		
		declarationList.push(`
			<div class="yellow-container declaration-element">
				<span class="declaration-kind">${kindString}</span> <span>${dec.id}${methodInfo}</span> ${subInfo}
				${commentRegion}
			</div>
		`);
	}
	
	let innerList = [];
	for (const [innerId, innerData] of Object.entries(classData.inners).sort((a, b) => a[0].localeCompare(b[0]))) {
		innerList.push(GetClassElement(innerId, innerData));
	}
	
	return `
	<div class="red-container class-element">
		<span class="declaration-kind">${classData.kind}</span> 
		<span class="class-title">${classId}</span>
		${baseList}
		${commentRegion}
		${innerList.join("")}
		${declarationList.join("")}
	</div>
	`;
}

function HandleData(data) {
	console.log(data);
	window.document.getElementById("updated-time").innerHTML = data.date;
	for (const [namespaceId, namespaceData] of Object.entries(data.namespaces).sort((a, b) => a[0].localeCompare(b[0]))) {
		let techElement = window.document.getElementById("tech");
		let classElementList = [];
		for (const [classId, classData] of Object.entries(namespaceData.classes).sort((a, b) => a[0].localeCompare(b[0]))) {
			classElementList.push(GetClassElement(classId, classData));
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