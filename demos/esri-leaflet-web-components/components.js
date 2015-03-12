import L from "leaflet";
import EsriLeaflet from "esri-leaflet";

class EsriMap extends HTMLElement {
  createdCallback() {
    this.container = document.createElement('div');
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    this.appendChild(this.container);

    var lat = this.getAttribute("lat");
    var lng = this.getAttribute("lng");
    var zoom = this.getAttribute("zoom");
    var basemap = this.getAttribute("basemap");

    this.map = new L.Map(this.container).setView([lat, lng], zoom);

    EsriLeaflet.basemapLayer(basemap).addTo(this.map);
  }

  addLayer(layer){
    this.map.addLayer(layer);
  }
}

document.registerElement('esri-map', EsriMap);

class EsriFeatureLayer extends HTMLElement {
  createdCallback() {
    var url = this.getAttribute("url");

    this.layer = new EsriLeaflet.FeatureLayer(url);

    this.parentNode.addLayer(this.layer);
  }
}

document.registerElement('esri-feature-layer', EsriFeatureLayer);
