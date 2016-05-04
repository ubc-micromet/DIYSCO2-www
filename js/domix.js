var App = App || {};

App.domix = (function(){
	// create empty el to take on attributes of the main el
	var el = null


	function sayHello(){
		console.log("hello");
	}

	function clearMainContent(){
		$("#main-page-content").children().hide();
	}

	// copied from app.js 
	function clearInfoPanelContent(){
        $(".info-panel-section").children().hide();
    }

	function populateContent(selection){
		sect = "#"+$(selection).attr("id").split("-")[0] + "-section";

		$(String(sect)).css("display", "block");

		if(sect =="#explore-section"){
			$("#chapter-nav").css("display", "block");
			// get the chapter that was last accessed
			el.currentChapter.css("display", "block");
		}
	}

	function resetNavHighlight(selection){
		console.log("")
	}

	function exploreButton(){
		$("#explore-button").click(function(){
			clearMainContent();
			populateContent(this);
		})
	}

	function backgroundButton(){
		$("#background-button").click(function(){
			clearMainContent();
			clearInfoPanelContent();
			populateContent(this);
		})
	}
	function sensorButton(){
		$("#sensor-button").click(function(){
			clearMainContent();
			clearInfoPanelContent();
			populateContent(this);
		})
	}
	function contactButton(){
		$("#contact-button").click(function(){
			clearMainContent();
			clearInfoPanelContent();
			populateContent(this);
		})
	}

	function navButtons(){
		exploreButton();
		backgroundButton();
		sensorButton();
		contactButton();
	}



	

	var init = function(){
		el = App.map.el;
		navButtons();
		$("#explore-button").click();
	}

	return {
		init: init
	}
})();

