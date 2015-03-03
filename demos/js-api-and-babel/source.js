import Map from 'esri/map';
import FeatureLayer from 'esri/layers/FeatureLayer';
import HeatmapRenderer from 'esri/renderers/HeatmapRenderer';

var map = new Map("map", {
  basemap: "gray",
  center: [-119.11, 36.65],
  zoom: 7,
  minZoom: 7,
  maxZoom: 9
});

var heatmapFeatureLayer = new FeatureLayer("//services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/2012_CA_NHTSA/FeatureServer/0", {
  outFields: ["*"]
});

heatmapFeatureLayer.setRenderer( new HeatmapRenderer());

map.addLayer(heatmapFeatureLayer);

export default map;