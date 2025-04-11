sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
  "use strict";

  return Controller.extend("app.splitapp.controller.App", {
      onInit() {
           var oModel = new JSONModel();
            oModel.loadData("/model/MockData/toolsData.json");
            // console.log(oModel);
            this.getView().setModel(oModel, 'ToolModel');
      }
  });
});