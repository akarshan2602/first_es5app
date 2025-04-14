sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController, JSONModel, Fragment, Filter, FilterOperator) => {
    "use strict";

    return BaseController.extend("app.splitapp.controller.DetailView", {
        onInit() {
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this)
        },

        onRouteMatched:function(oEvent){
            
            let index = oEvent.getParameter("arguments").index
            let sPath="ToolModel>/toolDetails/"+index
            let oView=this.getView()
            oView.bindElement(sPath)

            // //code for table for the dynamic display
            // let oModel=this.getModel("ToolModel")
            // let searchString=oModel.getProperty("/toolDetails/"+index+"/toolsName")
            // let filterName=new sap.ui.model.Filter("toolsName",
            //     sap.ui.model.FilterOperator.EQ,
            //     searchString
            // )
            // //let aFilter=[filterName]
            // let oTable=this.getView().byId("idMTable")
            // let bindingInfo=oTable.getBinding("items")
            // bindingInfo.filter([filterName]);

        },

        onF4Help:function(oEvent){
            // let myInputFieldwhere the popUp actually popped up
            // let myInputField=oEvent.getSource().getId()
            this.inputFiled=oEvent.getSource().getId()
            let oModel=this.getView().getModel("ToolModel")
            let aData=oModel.getProperty("/supplierSet")
            let deepCopy=JSON.parse(JSON.stringify(aData))
            let oModelFrag=new JSONModel({newSuppSet:deepCopy})
            if(!this.oDiolog){
                this.oDiolog=Fragment.load({
                    fragmentName:"app.splitapp.fragments.popUp",
                    controller:this
                }).then((dialog)=>{
                    this.oDiolog=dialog
                    this.getView().addDependent(this.oDiolog)
                    this.getView().setModel(oModelFrag, "FragmentModel")
                    this.oDiolog.open()
                })
            }else{
                this.oDiolog.open()
            }
        },

        onFilter:function(){
            let aFilter=[]
            let sName=this.getView().byId("idInputSupp").getValue()
            let sCity=this.getView().byId("idInputCity").getValue()
            if(sName){
                let filterName=new Filter("supplierName", FilterOperator.Contains, sName)
                aFilter.push(filterName)
            }
            if(sCity){
                let filterCity=new Filter("location", FilterOperator.Contains, sCity)
                aFilter.push(filterCity)
            }
            let oTable=this.getView().byId("idMTable")
            let bindingInfo=oTable.getBinding("items")
            bindingInfo.filter(aFilter);
        },

        onConfirmSupplier:function(oEvent){
            let oSelectedItems=oEvent.getParameter("selectedItem")
            let sValue=oSelectedItems.getProperty("info")
            let oInput=sap.ui.getCore().byId(this.inputFiled)
                oInput.setValue(sValue)
        }

        // onF4Help:function(){
        //     //fragment is kind of a view they can be reused in multiple places
        //     //its a pop screen
        //     //arrow function
        //     let that=this
        //     if(!this.oDiolog){
        //         this.oDiolog=Fragment.load({
        //             fragmentName:"app.splitapp.fragments.popUp",
        //             controller:this
        //         }).then(function(dialog){
        //             that.oDiolog=dialog
        //             that.getView().addDependent(that.oDiolog)
        //             that.oDiolog.open()
        //         })
        //     }else{
        //         this.oDiolog.open()
        //     }
        // }
        // onListView:function(){
        //     let oRouter=this.getOwnerComponent().getRouter()
        //     // use the navigation method
        //     oRouter.navTo("RouteMasterView")
        // }

    });
});

