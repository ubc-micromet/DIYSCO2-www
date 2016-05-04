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
		el.currentSection = "#"+$(selection).attr("id");
		console.log(el.currentSection);
		sect = "#"+$(selection).attr("id").split("-")[0] + "-section";
		

		$(String(sect)).css("display", "block");

		if(sect =="#explore-section"){
			$("#chapter-nav").css("display", "block");
			// get the chapter that was last accessed
			el.currentChapter.css("display", "block");
		}
	}

	function resetNavHighlight(){
		// reset the colors to default
		$(".nav h5").css("background-color","rgba(150,150,150, 0.15)")
		// change the background current active button
		$(el.currentSection).css("background-color", "orange");
	}

	function exploreButton(){
		$("#explore-button").click(function(){
			clearMainContent();
			populateContent(this);
			resetNavHighlight();
		})
	}

	function backgroundButton(){
		$("#background-button").click(function(){
			clearMainContent();
			clearInfoPanelContent();
			populateContent(this);
			resetNavHighlight();
		})
	}
	function sensorButton(){
		$("#sensor-button").click(function(){
			clearMainContent();
			clearInfoPanelContent();
			populateContent(this);
			resetNavHighlight();
		})
	}
	function contactButton(){
		$("#contact-button").click(function(){
			clearMainContent();
			clearInfoPanelContent();
			populateContent(this);
			resetNavHighlight();
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

