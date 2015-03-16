import Map from 'esri/map';
import FeatureLayer from 'esri/layers/FeatureLayer';
import Search from 'esri/dijit/Search';

class EsriMap extends HTMLElement {
  createdCallback() {
    this.container = document.createElement('div');
    this.container.style.width = "100%";
    this.container.style.height = "100%";
    this.container.id = "map_internal";
    this.appendChild(this.container);

    var lat = this.getAttribute("lat");
    var lng = this.getAttribute("lng");
    var zoom = this.getAttribute("zoom");
    var basemap = this.getAttribute("basemap");

    this.map = new Map("map_internal", {
      basemap,
      zoom,
      center: [lng, lat]
    });
  }

  addLayer(layer){
    this.map.addLayer(layer);
  }

  getMap(){
    return this.map;
  }
}

document.registerElement('esri-map', EsriMap);

class EsriFeatureLayer extends HTMLElement {
  createdCallback() {
    var url = this.getAttribute("url");
    var opacity = this.getAttribute("opacity");

    if(url){
      this.layer = new FeatureLayer(url, {
        mode: FeatureLayer.MODE_ONDEMAND,
        opacity: parseFloat(opacity)
      });

      this.parentNode.addLayer(this.layer);
    }
  }
}

document.registerElement('esri-feature-layer', EsriFeatureLayer);


class EsriSearch extends HTMLElement {
  createdCallback(){
    this.container = document.createElement('div');
    this.container.id = "search_internal";
    this.appendChild(this.container);

    this.search = new Search({
      enableButtonMode: true,
      enableLabel: false,
      enableInfoWindow: true,
      showInfoWindowOnSelect: false,
      map: document.getElementById(this.getAttribute('map')).getMap()
    }, "search_internal");

    this.search.startup();
  }

  addSource(source){
    var sources = this.search.get("sources");
    sources.push(source);
    this.search.set("sources", sources);
  }
};

document.registerElement('esri-search', EsriSearch);

class EsriSearchSource extends HTMLElement {
  createdCallback(){
    var source = {
      featureLayer:{
        url: this.getAttribute("url"),
        searchFields: [this.getAttribute("sourceField")],
        displayField: this.getAttribute("displayField"),
        name: this.getAttribute("name")
      }
    }

    if(this.parentNode && this.parentNode.addSource){
      this.parentNode.addSource(source);
    }
  }
};

document.registerElement('esri-search-source', EsriSearchSource);