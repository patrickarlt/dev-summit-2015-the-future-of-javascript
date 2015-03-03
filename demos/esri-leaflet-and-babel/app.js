import L from "leaflet";
import EsriLeaflet from "esri-leaflet";

var map = new L.Map('map').setView([45.526, -122.667], 15);

var tiles = new EsriLeaflet.BasemapLayer('Streets').addTo(map);

var stops = EsriLeaflet.featureLayer('https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Trimet_Transit_Stops/FeatureServer/0', {
 pointToLayer: function (geojson, latlng) {
    return L.circleMarker(latlng, {
      color: '#5B7CBA',
      weight: 2,
      opacity: 0.85,
      fillOpacity: 0.5
    });
  }
}).addTo(map);

var previousIds = [];

map.on('click', function(e){
  stops.query().nearby(e.latlng, 500).ids(function(error, ids){
    for (var j = 0; j < previousIds.length; j++) {
      stops.resetStyle(previousIds[j]);
    }

    previousIds = ids;

    for (var i = 0; i < ids.length; i++) {
      stops.setFeatureStyle(ids[i], {
        color: '#BA454E',
        weight: 2,
        opacity: 0.85,
        fillOpacity: 0.5
      });
    }
  });
});

export default map;