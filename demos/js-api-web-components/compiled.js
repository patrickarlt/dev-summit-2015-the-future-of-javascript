"use strict";

define(["exports", "esri/map", "esri/layers/FeatureLayer", "esri/dijit/Search"], function (exports, _esriMap, _esriLayersFeatureLayer, _esriDijitSearch) {
  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var Map = _interopRequire(_esriMap);

  var FeatureLayer = _interopRequire(_esriLayersFeatureLayer);

  var Search = _interopRequire(_esriDijitSearch);

  var EsriMap = (function (HTMLElement) {
    function EsriMap() {
      _classCallCheck(this, EsriMap);

      if (HTMLElement != null) {
        HTMLElement.apply(this, arguments);
      }
    }

    _inherits(EsriMap, HTMLElement);

    _prototypeProperties(EsriMap, null, {
      createdCallback: {
        value: function createdCallback() {
          this.container = document.createElement("div");
          this.container.style.width = "100%";
          this.container.style.height = "100%";
          this.container.id = "map_internal";
          this.appendChild(this.container);

          var lat = this.getAttribute("lat");
          var lng = this.getAttribute("lng");
          var zoom = this.getAttribute("zoom");
          var basemap = this.getAttribute("basemap");

          this.map = new Map("map_internal", {
            basemap: basemap,
            zoom: zoom,
            center: [lng, lat]
          });
        },
        writable: true,
        configurable: true
      },
      addLayer: {
        value: function addLayer(layer) {
          this.map.addLayer(layer);
        },
        writable: true,
        configurable: true
      },
      getMap: {
        value: function getMap() {
          return this.map;
        },
        writable: true,
        configurable: true
      }
    });

    return EsriMap;
  })(HTMLElement);

  document.registerElement("esri-map", EsriMap);

  var EsriFeatureLayer = (function (HTMLElement) {
    function EsriFeatureLayer() {
      _classCallCheck(this, EsriFeatureLayer);

      if (HTMLElement != null) {
        HTMLElement.apply(this, arguments);
      }
    }

    _inherits(EsriFeatureLayer, HTMLElement);

    _prototypeProperties(EsriFeatureLayer, null, {
      createdCallback: {
        value: function createdCallback() {
          var url = this.getAttribute("url");
          var opacity = this.getAttribute("opacity");

          if (url) {
            this.layer = new FeatureLayer(url, {
              mode: FeatureLayer.MODE_ONDEMAND,
              opacity: parseFloat(opacity)
            });

            this.parentNode.addLayer(this.layer);
          }
        },
        writable: true,
        configurable: true
      }
    });

    return EsriFeatureLayer;
  })(HTMLElement);

  document.registerElement("esri-feature-layer", EsriFeatureLayer);

  var EsriSearch = (function (HTMLElement) {
    function EsriSearch() {
      _classCallCheck(this, EsriSearch);

      if (HTMLElement != null) {
        HTMLElement.apply(this, arguments);
      }
    }

    _inherits(EsriSearch, HTMLElement);

    _prototypeProperties(EsriSearch, null, {
      createdCallback: {
        value: function createdCallback() {
          this.container = document.createElement("div");
          this.container.id = "search_internal";
          this.appendChild(this.container);

          this.search = new Search({
            enableButtonMode: true,
            enableLabel: false,
            enableInfoWindow: true,
            showInfoWindowOnSelect: false,
            map: document.getElementById("map").getMap()
          }, "search_internal");

          this.search.startup();
        },
        writable: true,
        configurable: true
      },
      addSource: {
        value: function addSource(source) {
          var sources = this.search.get("sources");
          sources.push(source);
          this.search.set("sources", sources);
        },
        writable: true,
        configurable: true
      }
    });

    return EsriSearch;
  })(HTMLElement);

  ;

  document.registerElement("esri-search", EsriSearch);

  var EsriSearchSource = (function (HTMLElement) {
    function EsriSearchSource() {
      _classCallCheck(this, EsriSearchSource);

      if (HTMLElement != null) {
        HTMLElement.apply(this, arguments);
      }
    }

    _inherits(EsriSearchSource, HTMLElement);

    _prototypeProperties(EsriSearchSource, null, {
      createdCallback: {
        value: function createdCallback() {
          var source = {
            featureLayer: {
              url: this.getAttribute("url"),
              searchFields: [this.getAttribute("sourceField")],
              displayField: this.getAttribute("displayField"),
              name: this.getAttribute("name")
            }
          };

          if (this.parentNode && this.parentNode.addSource) {
            this.parentNode.addSource(source);
          }
        },
        writable: true,
        configurable: true
      }
    });

    return EsriSearchSource;
  })(HTMLElement);

  ;

  document.registerElement("esri-search-source", EsriSearchSource);
});
