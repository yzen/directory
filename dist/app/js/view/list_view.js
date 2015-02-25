define(["exports", "components/fxos-mvc/dist/mvc", "components/gaia-list/gaia-list", "components/gaia-button/gaia-button", "components/gaia-dialog/gaia-dialog-alert"], function (exports, _componentsFxosMvcDistMvc, _componentsGaiaListGaiaList, _componentsGaiaButtonGaiaButton, _componentsGaiaDialogGaiaDialogAlert) {
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


  function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  var ListView = (function (View) {
    var ListView = function ListView() {
      this.el = document.createElement("gaia-list");
      this.el.id = "app-list";
      this.appElements = Object.create(null);
      this.clickHandlers = [];
    };

    _extends(ListView, View);

    ListView.prototype.template = function () {
      return "<gaia-dialog-alert id=\"alert-dialog\">Placeholder</gaia-dialog-alert>";
    };

    ListView.prototype.showAlertDialog = function (msg) {
      if (!this.alertDialog) {
        this.alertDialog = document.querySelector("#alert-dialog");
      }
      this.alertDialog.textContent = msg;
      this.alertDialog.open();
    };

    ListView.prototype.update = function (appList) {
      for (var manifestURL in appList) {
        var appData = appList[manifestURL];
        if (!this.appElements[manifestURL]) {
          this.appElements[manifestURL] = this.addAppElement(appData);
        }
        this.updateAppElement(this.appElements[manifestURL], appData);
      }
    };

    ListView.prototype.onAppClick = function (handler) {
      if (this.clickHandlers.indexOf(handler) === -1) {
        this.clickHandlers.push(handler);
      }
    };

    ListView.prototype.offAppClick = function (handler) {
      var index = this.clickHandlers.indexOf(handler);
      if (index !== -1) {
        this.clickHandlers.splice(index, 1);
      }
    };

    ListView.prototype.addAppElement = function (appData) {
      var item = document.createElement("li");
      item.className = "app-item";
      item.innerHTML = this.listItemTemplate(appData);
      this.el.appendChild(item);

      item.querySelector(".app-install").addEventListener("click", function (appData) {
        this.clickHandlers.forEach(function (handler) {
          handler(appData);
        });
      }.bind(this, appData));
      return item;
    };

    ListView.prototype.updateAppElement = function (appElement, appData) {
      var button = appElement.querySelector(".app-install");
      var icon = button.querySelector(".action-icon");

      if (appData.installed === true) {
        button.disabled = false;
        icon.dataset.icon = "play";
      } else if (appData.installed === false) {
        button.disabled = false;
        icon.dataset.icon = "download";
      } else {
        button.disabled = true;
        icon.dataset.icon = "repeat";
      }
    };

    ListView.prototype.listItemTemplate = function (_ref) {
      var name = _ref.name;
      var type = _ref.type;
      var string = "\n\t\t\t<img class=\"app-icon\" src=\"./img/app_icons/" + name + ".png\" />\n\t\t\t<h1 flex class=\"app-description\">" + capitalize(name) + "</h1>\n\t\t\t<gaia-button circular disabled class=\"app-install\">\n\t\t\t\t<i class=\"action-icon\" data-icon=\"repeat\"></i>\n\t\t\t</gaia-button>";
      return string;
    };

    return ListView;
  })(View);

  exports["default"] = ListView;
});