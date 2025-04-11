sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("app.splitapp.controller.DetailView", {

        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            var sIndex = oEvent.getParameter("arguments").index;
            var sPath = "/ToolModel/" + sIndex;
            // this.getView().bindElement({
            //     path: sPath,
            //     model: "ToolModel"
            // });
			console.log(this.getView().bindElement({
                path: sPath,
                model: "ToolModel"
            }));
        },

        onListView: function() {
            var oApp = this.getView().getParent();
            oApp.to("idList");
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteMasterView");
        }

    });

});
