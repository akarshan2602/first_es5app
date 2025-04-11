sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("app.splitapp.controller.App", {
      onInit() {
        var oModel = new JSONModel();
            oModel.loadData("/model/MockData/toolsData.json");
            this.getView().setModel(oModel, 'ToolModel');
      }
  });
});