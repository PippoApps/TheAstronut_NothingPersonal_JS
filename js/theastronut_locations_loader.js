// INIT
function NothingPersonalLocationsJSONtoHTML(jsonUrl, divId) {
    this._jsonUrl = jsonUrl;
    this._divId = divId;
    this._data;
    this._containerDiv = document.getElementById(divId);
    console.log("Inizializzata lista di locations HTML, dati: " + this._jsonUrl);
    console.log("ID contenitore:\n" + this._containerDiv.outerHTML);
    fetch(jsonUrl)
    .then((response) => response.json())
    .then((json) => this.renderJson(json));//.catch((onrejected) => alert("Errore caricamento dati: " + this._jsonUrl));
}
// CONSTANTS
NothingPersonalLocationsJSONtoHTML.prototype.RENDER_LINK = true; // Mettere false se non si vuole il link a google maps
NothingPersonalLocationsJSONtoHTML.prototype.RENDER_CONTINENT_AMOUNTS = true; // Mettere false se non si vuole il numero di locations tra parentesi nel continente
NothingPersonalLocationsJSONtoHTML.prototype.CONTINENT_FORMAT = "<h3 class='np_locations_continent_name'>[CONTINENT_NAME]</h3><ul class='np_locations_continent_list'>[LIST]</ul>";
NothingPersonalLocationsJSONtoHTML.prototype.CONTINENT_FORMAT_WITH_NUMBER = "<h3 class='np_locations_continent_name'>[CONTINENT_NAME] <span class='np_locations_continent_number'>([NUM])</span></h3><ul class='np_locations_continent_list'>[LIST]</ul>";
NothingPersonalLocationsJSONtoHTML.prototype.LOCATION_FORMAT = "<li class='np_locations_location'>[NAME]</li>";
NothingPersonalLocationsJSONtoHTML.prototype.LOCATION_FORMAT_WITH_LINK = "<li class='np_locations_location'><a href='https://www.google.com/maps/place/[LAT],[LON]' target='_blank' rel='noopener'>[NAME]</a></li>";
// VARIABLES
NothingPersonalLocationsJSONtoHTML.prototype._jsonUrl;
NothingPersonalLocationsJSONtoHTML.prototype._divId;
NothingPersonalLocationsJSONtoHTML.prototype._data;
NothingPersonalLocationsJSONtoHTML.prototype._languageCode = "en";
NothingPersonalLocationsJSONtoHTML.prototype._containerDiv;
NothingPersonalLocationsJSONtoHTML.prototype._continentsData = {};  // Continents by ID, i.e. "en":[loc, loc, loc]
// HTML
NothingPersonalLocationsJSONtoHTML.prototype._continentsHtmlList = {};
NothingPersonalLocationsJSONtoHTML.prototype._continentsHtml = {}; // L'html del singolo continente
NothingPersonalLocationsJSONtoHTML.prototype._htmlString = "";

// PROCESS  
NothingPersonalLocationsJSONtoHTML.prototype.renderJson = function(data) {
    console.log(data);
    this._data = data;
    var locationFormat = this.RENDER_LINK ? this.LOCATION_FORMAT_WITH_LINK : this.LOCATION_FORMAT;
    // Loop in locations
    for (let i = 0; i < this._data.LocationPoints.length; i++) {
        var location = this._data.LocationPoints[i];
        console.log(location);
        if (location.Secret) {
            console.log("Location non aggiunta in quanto segreta.");
        } else if (location.IsDebug) {
            console.log("Location non aggiunta in quanto di DEBUG (quella con gli swipe).");
        } else {
            var continentId = location.Continent;
            if (!this._continentsData[continentId]) {
                this._continentsData[continentId] = [];
                this._continentsHtmlList[continentId] = [];
                this._continentsHtml[continentId] = "";
            }
            var continentList = this._continentsData[continentId];
            var continentHtmlList = this._continentsHtmlList[continentId];
            continentList.push(location);
            var locationHtml = this.renderLocationHTML(location, locationFormat);
            console.log(locationHtml);
            continentHtmlList.push(locationHtml);
        }
    }
    // Loop in continents and create html
    for (let id in this._continentsHtmlList) {
        console.log(id);
        var continentHtmlList = this._continentsHtmlList[id];
        for (let i = 0; i < continentHtmlList.length; i++) {
            var locationHtml = continentHtmlList[i];
            this._continentsHtml[id] += locationHtml;
        }
        this._continentsHtml[id] = this.renderContinentHTML(id, continentHtmlList);
        this._htmlString += this._continentsHtml[id];
    }
    console.log(this._htmlString);
    this._containerDiv.innerHTML = this._htmlString;
}
// UTILITIES
NothingPersonalLocationsJSONtoHTML.prototype.renderLocationHTML = function(object, format) {
    var txt = format;
    txt = txt.split("[NAME]").join(object.ARObjName[this._languageCode]);
    txt = txt.split("[LAT]").join(object.Lat);
    txt = txt.split("[LON]").join(object.Lon);
    return txt;
}
NothingPersonalLocationsJSONtoHTML.prototype.renderContinentHTML = function(continentCode, locationsHtmlList) {
    var txt = this.RENDER_CONTINENT_AMOUNTS ? this.CONTINENT_FORMAT_WITH_NUMBER : this.CONTINENT_FORMAT;
    txt = txt.split("[CONTINENT_NAME]").join(this.getContinentName(continentCode));
    txt = txt.split("[LIST]").join(locationsHtmlList.join(""));
    txt = txt.split("[NUM]").join(locationsHtmlList.length);
    return txt;
}
NothingPersonalLocationsJSONtoHTML.prototype.getContinentName = function(continentCode) {
    for (let i = 0; i < this._data.Continents.length; i++) {
        var continentObject = this._data.Continents[i];
        if (continentObject.code == continentCode) return continentObject.name;
    }
    return "Unspecified";
}


