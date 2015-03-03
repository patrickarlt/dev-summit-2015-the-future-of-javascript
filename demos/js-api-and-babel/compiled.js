"use strict";

define(["exports", "module", "esri/map", "esri/layers/FeatureLayer", "esri/renderers/HeatmapRenderer"], function (exports, module, _esriMap, _esriLayersFeatureLayer, _esriRenderersHeatmapRenderer) {
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var Map = _interopRequire(_esriMap);

  var FeatureLayer = _interopRequire(_esriLayersFeatureLayer);

  var HeatmapRenderer = _interopRequire(_esriRenderersHeatmapRenderer);

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

  heatmapFeatureLayer.setRenderer(new HeatmapRenderer());

  map.addLayer(heatmapFeatureLayer);

  module.exports = map;
});
