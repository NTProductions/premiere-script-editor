(function () {
 'use strict';
 var path, slash;
 path = location.href;
	if(getOS() == "MAC") {
		slash = "/";
		path = path.substring(0, path.length - 11);
	}
	if(getOS() == "WIN") {
		slash = "/";
		path = path.substring(8, path.length - 11);
	}

	var csInterface = new CSInterface();
	csInterface.evalScript('init()');
 }());

 var docCounter = 0;

window.addEventListener("keydown", function(e) {
	if(e.ctrlKey && e.key == "s") {
		saveFile();
	}
});



function saveFile() {
	var csInterface = new CSInterface();

	if(docCounter > 0) {
		csInterface.evalScript('saveJSXFile('+JSON.stringify(document.getElementsByClassName("scriptFileTab")[0].innerHTML)+', '+JSON.stringify(document.getElementsByClassName("scriptFileTextArea")[0].value)+')', function() {

		});
	}
}

function openFile() {
	var csInterface = new CSInterface();
	
	if(docCounter > 0) {
		csInterface.evalScript('saveJSXFile('+JSON.stringify(document.getElementsByClassName("scriptFileTab")[0].innerHTML)+', '+JSON.stringify(document.getElementsByClassName("scriptFileTextArea")[0].value)+')', function() {
			csInterface.evalScript("chooseJSXFile()", function(res) {
				// .fileName
				// .code
				document.getElementsByClassName("scriptFileTab")[0].innerHTML = JSON.parse(res).fileName;
				document.getElementsByClassName("scriptFileTextArea")[0].value = JSON.parse(res).code;
			});
		});
	} else {
		var editorContainer = document.createElement("DIV");
		editorContainer.setAttribute("id", "editorContainer");
		document.getElementById("contentDiv").appendChild(editorContainer);

		var editorContainerHeader = document.createElement("DIV");
		editorContainerHeader.setAttribute("id", "editorContainerHeader");
		editorContainer.appendChild(editorContainerHeader);

		var editorContainerContent = document.createElement("DIV");
		editorContainerContent.setAttribute("id", "editorContainerContent");
		editorContainer.appendChild(editorContainerContent);

		// create tab
		var scriptFileTab = document.createElement("DIV");
		scriptFileTab.setAttribute("class", "scriptFileTab");
		scriptFileTab.innerHTML = "Untitled.jsx";
		editorContainerHeader.appendChild(scriptFileTab);

		// create large text box
		var scriptFileTextArea = document.createElement("TEXTAREA");
		scriptFileTextArea.setAttribute("class", "scriptFileTextArea");
		scriptFileTextArea.innerHTML = "// ";
		editorContainerContent.appendChild(scriptFileTextArea);

		docCounter++;
		csInterface.evalScript("chooseJSXFile()", function(res) {
			// .fileName
			// .code
			document.getElementsByClassName("scriptFileTab")[0].innerHTML = JSON.parse(res).fileName;
			document.getElementsByClassName("scriptFileTextArea")[0].value = JSON.parse(res).code;
		});
	}

	
}

function textAreaKeyDown(e) {
	alert(e.toString());
}

function playClick() {
	var csInterface = new CSInterface();
	if(docCounter > 0) {
		csInterface.evalScript('runScriptFile('+JSON.stringify(document.getElementsByClassName("scriptFileTab")[0].innerHTML)+')');
	}
}

function newFile() {
	var csInterface = new CSInterface();

	csInterface.evalScript('selectFileName()', function(res) {
		if(JSON.parse(res) != null) {
	if(docCounter == 1) {
		//alert();
	csInterface.evalScript('saveJSXFile('+JSON.stringify(document.getElementsByClassName("scriptFileTab")[0].innerHTML)+', '+JSON.stringify(document.getElementsByClassName("scriptFileTextArea")[0].value)+')', function() {


	var scriptFileTab = document.getElementsByClassName("scriptFileTab")[0];
	scriptFileTab.innerHTML = JSON.parse(res)+".jsx";

	var scriptFileTextArea = document.getElementsByClassName("scriptFileTextArea")[0];
	scriptFileTextArea.innerHTML = "// " + JSON.parse(res);

	});
	} else {

	
	var editorContainer = document.createElement("DIV");
	editorContainer.setAttribute("id", "editorContainer");
	document.getElementById("contentDiv").appendChild(editorContainer);

	var editorContainerHeader = document.createElement("DIV");
	editorContainerHeader.setAttribute("id", "editorContainerHeader");
	editorContainer.appendChild(editorContainerHeader);

	var editorContainerContent = document.createElement("DIV");
	editorContainerContent.setAttribute("id", "editorContainerContent");
	editorContainer.appendChild(editorContainerContent);

	// create tab
	var scriptFileTab = document.createElement("DIV");
	scriptFileTab.setAttribute("class", "scriptFileTab");
	scriptFileTab.innerHTML = JSON.parse(res)+".jsx";
	editorContainerHeader.appendChild(scriptFileTab);

	// create large text box
	var scriptFileTextArea = document.createElement("TEXTAREA");
	scriptFileTextArea.setAttribute("class", "scriptFileTextArea");
	scriptFileTextArea.innerHTML = "// " + JSON.parse(res);
	editorContainerContent.appendChild(scriptFileTextArea);

	docCounter++;

	csInterface.evalScript('saveJSXFile('+JSON.stringify(document.getElementsByClassName("scriptFileTab")[0].innerHTML)+', '+JSON.stringify(document.getElementsByClassName("scriptFileTextArea")[0].value)+')', function() {	

	});
	}

	}
	});
}

function getOS() {
 		var userAgent = window.navigator.userAgent,
 		platform = window.navigator.platform,
 		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
 		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
 		os = null;

 		if(macosPlatforms.indexOf(platform) != -1) {
 			os = "MAC";
 		} else if(windowsPlatforms.indexOf(platform) != -1) {
 			os = "WIN";
 		}
 		return os;
 	}