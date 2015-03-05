define(["exports", "components/fxos-mvc/dist/mvc", "components/gaia-component/gaia-component", "components/gaia-header/dist/gaia-header"], function (exports, _componentsFxosMvcDistMvc, _componentsGaiaComponentGaiaComponent, _componentsGaiaHeaderDistGaiaHeader) {
  "use strict";

  var _extends = function (child, parent) {
    child.prototype = Object.create(parent.prototype, {
      constructor: {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    child.__proto__ = parent;
  };

  var View = _componentsFxosMvcDistMvc.View;
  var DetailsView = (function (View) {
    var DetailsView = function DetailsView() {
      this.el = document.createElement("div");
      this.el.id = "app-details";
    };

    _extends(DetailsView, View);

    DetailsView.prototype.render = function () {
      View.prototype.render.call(this);
      this.titleElement = this.el.querySelector("#details-title");
    };

    DetailsView.prototype.show = function (details) {
      this.titleElement.textContent = details.name;
      this.classList.add("active");
    };

    DetailsView.prototype.hide = function () {
      this.classList.remove("active");
    };

    DetailsView.prototype.template = function () {
      var string = "\n      <gaia-header>\n        <a id=\"close-button\"><i data-icon=\"close\"></i></a>\n        <h1 id=\"details-title\">App Details</h1>\n      </gaia-header>";
      return string;
    };

    return DetailsView;
  })(View);

  exports["default"] = DetailsView;
});