define(["exports", "components/fxos-mvc/dist/mvc"], function (exports, _componentsFxosMvcDistMvc) {
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

  var Model = _componentsFxosMvcDistMvc.Model;
  var ListModel = (function (Model) {
    var ListModel = function ListModel() {
      Model.apply(this, arguments);
    };

    _extends(ListModel, Model);

    ListModel.prototype.getAppList = function () {
      return {
        "http://fxos.github.io/camera/dist/app/manifest.webapp": {
          manifestURL: "http://fxos.github.io/camera/dist/app/manifest.webapp",
          name: "camera",
          type: "hosted",
          url: "https://github.com/fxos/camera"
        },
        "http://fxos.github.io/video/app/manifest.webapp": {
          manifestURL: "http://fxos.github.io/video/app/manifest.webapp",
          name: "video",
          type: "hosted",
          url: "https://github.com/fxos/video"
        },
        "http://henretty.us/manifest.webapp": {
          manifestURL: "http://henretty.us/manifest.webapp",
          name: "clock",
          type: "packaged",
          url: "https://github.com/mozilla-b2g/gaia/tree/apps/clock/"
        }
      };
    };

    return ListModel;
  })(Model);

  exports["default"] = ListModel;
});