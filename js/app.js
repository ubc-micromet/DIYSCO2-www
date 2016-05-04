var App = App || {};


App.map = (function() {

    var el = {
        map: null,
        grid: null,
        vehicles: null,
        currentChapter: null,
        currentSection: null
    };


    var initMap = function() {
        // map paramaters to pass to Leaflet
        var params = {
                center: [49.257, -123.12],
                minZoom: 8,
                maxZoom: 19,
                zoom: 12,
                // maxBounds : L.latLngBounds([40.675496,-73.957987],[40.714216,-73.877306]), 
                zoomControl: true,
                infoControl: false,
                attributionControl: true
            }
            // lat lngs for locations of stories
        el.location1 = new L.LatLng(49.294631, -123.125028);
        el.location2 = new L.LatLng(49.200740, -123.134209);
        el.location3 = new L.LatLng(49.295867, -123.128153);
        el.location4 = new L.LatLng(49.292776, -123.119756);
        el.location5 = new L.LatLng(49.200082, -123.113740);
        // instantiate the Leaflet map object
        el.map = new L.map('explore-section', params);

        var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        }).addTo(el.map);


        console.log(el);
    }

    function addEmissionsGridData(fp) {
        d3.json(fp, function(data) {
            el.grid = L.geoJson(null, {
                // style: myStyle,
                // onEachFeature: onEachFeature
            }).addTo(el.map);

            data.features.forEach(function(item) {
                if (item.properties.co2_avg_e != null) {
                    // console.log(item);
                    el.grid.addData(item);
                }
            });
        });
    }

    function addStudyAreaBounds() {
        // Study area bounds
        d3.json("data/studyarea.geojson", function(data) {
            var studyArea = L.geoJson(data, {
                style: {
                    weight: 5,
                    color: "#e6e6e6",
                    opacity: 0.8,
                    fillOpacity: 0
                }
            }).addTo(el.map);
        });
    }

    function restartCarAnimation(){
        console.log("Hello");
    }

    function animateCars(fp, linecol, guid) {
        el.vehicles = L.layerGroup([]).addTo(el.map);

        d3.json(fp, function(data) {
            var animMarkers = L.polyline([], {
                color: linecol,
                opacity: 0.95,
                weight: 2
            }).addTo(el.vehicles);

            var sensorData = data.features.filter(function(d) {
                if (d.properties.sensorid == guid) {
                    return d;
                }
            })

            var i = 0;
            setInterval(function() {
                i += 5;
                if (i <= sensorData.length) {
                    var item = sensorData[i += 5];
                    var coords = item.geometry.coordinates;
                    // console.log(coords);

                    animMarkers.addLatLng(
                        L.latLng(coords[1], coords[0]));
                }

            }, 1);
        });
    }


    function activateCarAnimation() {
        animateCars('data/all_20150528_wgs84.geojson', "#FF9933", "0108");
        animateCars('data/all_20150528_wgs84.geojson', "#CC66FF", "1641");
        animateCars('data/all_20150528_wgs84.geojson', "#2EB8E6", "0205");
        animateCars('data/all_20150528_wgs84.geojson', "#E3D317", "0150");
        animateCars('data/all_20150528_wgs84.geojson', "#DE004B", "0151");

    }


    function clearInfoPanelContent() {
        $(".info-panel-section").children().hide();
    }

    function displayCurrentSectionText(index) {
        var currentSection = $("#section" + index).css("display", "block");
        el.currentChapter = currentSection;
        $("#chapter-nav").css("display", "block");
        console.log(currentSection);

    }

    function removeCurrentGrid(){
        if (el.grid != null) el.map.removeLayer(el.grid);
    }

    function removeAnimatedLines(){
        if (el.vehicles != null) el.map.removeLayer(el.vehicles);   
    }



    // show the sensing:
    // animating points and lines
    // toggle text display
    function showSensing() {
        $("#chapter1").click(function() {
            removeCurrentGrid();
            removeAnimatedLines();
            clearInfoPanelContent();
            displayCurrentSectionText(1);
            activateCarAnimation();
        });
    }

    function showModel() {
        $("#chapter2").click(function() {
            removeCurrentGrid();
            removeAnimatedLines();
            clearInfoPanelContent();
            displayCurrentSectionText(2);
            addEmissionsGridData('data/data_100m_wgs84.geojson');
        });
    }

    function showEvaluate() {
        $("#chapter3").click(function() {
            clearInfoPanelContent();
            displayCurrentSectionText(3);
            removeCurrentGrid();
            removeAnimatedLines();
            addEmissionsGridData('data/data_100m_wgs84.geojson');
        });
    }


    function showChapters() {
        showSensing();
        showModel();
        showEvaluate()
    }

    // get it all going!
    var init = function() {
        initMap();
        clearInfoPanelContent();
        showChapters();
        addStudyAreaBounds();
        // click chapter 1
        $("#chapter1").click();
    }


    // only return init() and the stuff in the el object
    return {
        init: init,
        el: el
    }



})();

// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    App.layout.init();

    App.map.init();
    App.domix.init();

});
