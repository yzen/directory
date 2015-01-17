define(["exports", "components/fxos-mvc/dist/mvc", "js/model/list_model", "js/view/list_view"], function (exports, _componentsFxosMvcDistMvc, _jsModelListModel, _jsViewListView) {
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

  var Controller = _componentsFxosMvcDistMvc.Controller;
  var ListModel = _jsModelListModel["default"];
  var ListView = _jsViewListView["default"];
  var ListController = (function (Controller) {
    var ListController = function ListController() {
      var _this = this;
      this.model = new ListModel();
      this.view = new ListView();

      this.installedApps = Object.create(null);

      window.onerror = function (e) {
        _this.view.showAlertDialog("Unhandled exception: " + e.message);
      };
    };

    _extends(ListController, Controller);

    ListController.prototype.main = function () {
      document.addEventListener("visibilitychange", this.refreshInstalledList.bind(this));
      this.showList();
    };

    ListController.prototype.showList = function () {
      this.view.render();
      document.body.appendChild(this.view.el);

      this.appList = this.model.getAppList();
      this.view.update(this.appList);
      this.view.onAppClick(this.handleAppClick.bind(this));

      this.refreshInstalledList();
    };

    ListController.prototype.refreshInstalledList = function () {
      var _this2 = this;
      this.installedApps = Object.create(null);

      // Use mgmt.getAll if available to fetch apps,
      // otherwise use mozApp.getInstalled.
      var req;
      if (navigator.mozApps.mgmt && navigator.mozApps.mgmt.getAll) {
        req = navigator.mozApps.mgmt.getAll();
      } else {
        req = navigator.mozApps.getInstalled();
      }

      req.onsuccess = function () {
        var apps = req.result;
        var installedApps = Object.create(null);
        apps.forEach(function (app) {
          installedApps[app.manifestURL] = app;
        });
        for (var manifestURL in _this2.appList) {
          _this2.appList[manifestURL].installed = !!installedApps[manifestURL];
          _this2.appList[manifestURL].mozApp = installedApps[manifestURL] || false;
        }
        _this2.view.update(_this2.appList);
      };

      req.onerror = function (e) {
        _this2.view.showAlertDialog("error fetching install apps: " + e.message);
        console.log("error fetching installed apps: ", e);
      };
    };

    ListController.prototype.handleAppClick = function (appData) {
      var manifestURL = appData.manifestURL;
      if (this.appList[manifestURL].mozApp) {
        this.appList[manifestURL].mozApp.launch();
      } else {
        this.installApp(appData);
      }
    };

    ListController.prototype.installApp = function (appData) {
      var _this3 = this;
      var manifest = appData.manifestURL;
      var type = appData.type;
      var installReq;
      if (type === "hosted") {
        console.log("installing hosted app, ", manifest);
        installReq = navigator.mozApps.install(manifest, {
          installMetaData: {
            url: appData.url,
            revision: appData.revision
          }
        });
      } else if (type === "packaged") {
        console.log("installing packaged app, ", manifest);
        installReq = navigator.mozApps.installPackage(manifest, {
          installMetaData: {
            url: appData.url,
            revision: appData.revision
          }
        });
      } else {
        throw new Error("Could not install app, unrecognized type: " + type);
      }

      installReq.onerror = function (err) {
        _this3.view.showAlertDialog("Error installing: " + err.target.error.name);
        console.log("install error", err);
      };
      installReq.onsuccess = function () {
        _this3.refreshInstalledList();
      };
    };

    return ListController;
  })(Controller);

  exports["default"] = ListController;
});