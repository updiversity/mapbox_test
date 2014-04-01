var id_spreadsheet = '0AkqsHAmwYbpudDJyNnBmbW9Cd1R6eW5BOG4xU3FBM0E',
	id_calendar = '',
	tile_bruclinId = 'ighbal.rkjoflxr',
	tile_transMadId = 'ighbal.6t6b6gvi',
 	osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
    thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>',
    brucLink = '<a href="http://updiversity.github.io/">UpDiversity</a>',
    transThunderUrl = 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
    thunAttrib = '&copy; ' + osmLink + ' Contributors & ' + thunLink,
    brucAttrib = ' Contributors & ' + brucLink;

	//load google shared data
	load_spreadsheet(id_spreadsheet, mapData);
	//load_calendar(id_calendar, calData);


var transThunderLayer = L.tileLayer(transThunderUrl , {attribution: thunAttrib,  format:'png64'}),
    bruclinLayer = L.mapbox.tileLayer(tile_bruclinId, {format:  'png64'}),
    transMadLayer = L.mapbox.tileLayer(tile_transMadId);

var groupTransportLayer = L.layerGroup([transThunderLayer, transMadLayer]);
var groupBruclinLayer = L.layerGroup([bruclinLayer]);

var map = L.map('map');

var baseLayers = {
	"Transport": groupTransportLayer,
	"Bruclin": groupBruclinLayer.addTo(map)
	};

var controlLayers = L.control.layers(baseLayers).addTo(map);
	
L.control.locate().addTo(map);
	
function mapData(myData){
	var bruclinEventos2014Layer = L.mapbox.featureLayer().setGeoJSON(myData);
	bruclinEventos2014Layer.eachLayer(function(marker){
		marker.setIcon(new L.divIcon({
	         className: 'count-icon',
	         html: '<b>' + marker.feature.properties.id + '</b>',
	         iconSize: [30,30]
	     }));
	});
	map.fitBounds(bruclinEventos2014Layer.getBounds());
	groupBruclinLayer.addLayer(bruclinEventos2014Layer);
};


