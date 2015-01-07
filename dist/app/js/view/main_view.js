define(["exports", "components/fxos-mvc/dist/mvc", "components/gaia-header/dist/gaia-header"], function (exports, _componentsFxosMvcDistMvc, _componentsGaiaHeaderDistGaiaHeader) {
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
  var MainView = (function (View) {
    var MainView = function MainView() {
      View.apply(this, arguments);
    };

    _extends(MainView, View);

    MainView.prototype.template = function () {
      var string = "\n\t\t  <gaia-header>\n\t\t\t\t<h1>Apps</h1>\n\t\t\t</gaia-header>";
      return string;
    };

    return MainView;
  })(View);

  exports["default"] = MainView;
});