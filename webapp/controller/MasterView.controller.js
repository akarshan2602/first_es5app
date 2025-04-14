sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, Sorter, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.MasterView", {
        onInit() {

            var oModel = new JSONModel();
                oModel.loadData("/model/MockData/toolsData.json")
			this.getView().setModel(oModel, 'ToolModel');

        },
        onDetailView:function(){
            //get the router object 
            let oRouter=this.getOwnerComponent().getRouter()
            // use the navigation method
            oRouter.navTo("RouteDetailView")
        },
        onSort:function(){
			if(this.bDescending===undefined){
				this.bDescending=false;
			}
			var oSorter=new Sorter("price",this.bDescending);
			var oList=this.getView().byId("idtool");
			var oBinding=oList.getBinding("items");
			oBinding.sort(oSorter);
				this.bDescending=!this.bDescending;
		},
		onSearch:function(oEvent){
			var searchString=oEvent.getParameter("query")||oEvent.getParameter("newValue");
			var oName=new Filter("toolsName", FilterOperator.Contains, searchString);
			var oAvail=new Filter("availability", FilterOperator.Contains, searchString);
			var aFilter=[oName, oAvail];
			var mainFilter=new Filter({
				filters:aFilter,
				and:false
			});
			var oList=this.getView().byId("idtool");
			var oBinding=oList.getBinding("items");
			oBinding.filter(mainFilter);
		},
        onItemSelect:function(oEvent){
            var oList=oEvent.getParameter("listItem");
            var sPath=oList.getBindingContextPath();
            let aItems=sPath.split("/")
                let id=aItems[aItems.length-1]

            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView", {
                index:id
            })

			// //when i click it should navigate to the next page
			// var oList=oEvent.getParameter("listItem");
			// var sPath=oList.getBindingContextPath();
			// var completePath="ToolModel>" + sPath;
			// var oApp=this.getView().getParent();
			// var oDetail=oApp.getAggregation("pages")[1];
			// oDetail.bindElement(completePath);
			// this.onDetailView();
		},
		onFormView: function(){
			let oRouter= this.getOwnerComponent().getRouter();
			oRouter.navTo("RouteFormView");
		}
    });
});