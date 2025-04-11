sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, Sorter,Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.MasterView", {
        // onInit() {
        //     var oModel = new JSONModel("/model/MockData/toolsData.json");
        //     this.getView().setModel(oModel, 'ToolModel');
        // },
        onDetailView: function(id){
            let oRouter= this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteDetailView")
        },
        onSort: function(){
            if(this.bDescending===undefined){
				this.bDescending=false;
			}
			var oSorter=new Sorter("price",this.bDescending);
			var oList=this.getView().byId("idtool");
            console.log(oList)
			var oBinding=oList.getBinding("items");
            console.log(oBinding)
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
			//when i click it should navigate to the next page
			var oList=oEvent.getParameter("listItem");
            var sPath=oList.getBindingContextPath();
            var id= sPath.slice(-1);
            let oRouter= this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", {
                index: id
            });
            // console.log(id)
			
			this.onDetailView(id);
		}
    });
});
