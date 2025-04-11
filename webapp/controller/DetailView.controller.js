sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("app.splitapp.controller.DetailView", {

        onInit: function() {
            let oRouter= this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatch, this)
        },

        onRouteMatch: function(oEvent) {
            var sIndex = oEvent.getParameter("arguments").index;
            var sPath = "ToolModel>/toolDetails/" + sIndex;
            // this.getView().bindElement({
            //     path: sPath,
            //     model: "ToolModel"
            // });
            let oView= this.getView();
            oView.bindElement(sPath);
			this.getView().bindElement({
                path: sPath,
                model: "ToolModel"
            });
        },

        onListView: function() {
            // var oApp = this.getView().getParent();
            // oApp.to("idList");
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMasterView");
        }

    });

});
