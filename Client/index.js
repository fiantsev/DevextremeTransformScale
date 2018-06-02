"use strict";

// require("devextreme/dist/css/dx.common.css");
// require("devextreme/dist/css/dx.light.css");

window.$ = require("jquery");

require("devextreme/integration/jquery");
const ArrayStore = require("devextreme/data/array_store");
const CustomStore = require("devextreme/data/custom_store");
const PivotGridDataSource = require("devextreme/ui/pivot_grid/data_source");

require("devextreme/ui/pivot_grid");
require("devextreme/ui/tooltip");
require("devextreme-intl");
const ruMessages = require('devextreme/localization/messages/ru.json');
const localization = require('devextreme/localization');
localization.loadMessages(ruMessages);
localization.locale("ru");

var store = new CustomStore({
    key: "OrderID",
    load: function(opt){
        var d = $.Deferred();
        var url = `http://${window.location.hostname}:3333/api`;
        fetch(url, {method:"POST", body: JSON.stringify(opt)})
            .then((r) => r.json() )
            .then((r) => {
                if(r.data)
                    return d.resolve(r.data, { summary: r.summary });
                else
                    return d.resolve(r);
            });

        return d.promise();
    }
});

var pivotDSConfig = {
    // retrieveFields: true,
    remoteOperations: true,
    store: store,
    // store: DATA.customStore,
    fields:[
        { dataField: "ShipCountry", area: "row" },
        { dataField: "ShipCity", area: "row" },
        { dataField: "ShipPostalCode", area: "row" },
        { dataField: "SalesAmount", caption: "Sale Amount", format: { type: "currency", presicion: 2 }, summaryType: "sum", area: "data" }
    ],
};
var pivotDS = new PivotGridDataSource(pivotDSConfig);
// DATA.store.on("modified", ()=>pivotDS.reload());
// pivotDS.filter("name", "=", "sername")

// $("#table").resizable({ handles: "n, e, s, w, ne, se, sw, nw", resize: function(){ pivot.updateDimensions(); } });

var pivot = $("#pivot").dxPivotGrid({
    stateStoring: {
        enabled: true,
        type: "localStorage",
        storageKey: "pivotgrid"
    },
    // rowHeaderLayout: "tree",
    wordWrapEnabled: false,
    showRowGrandTotals: false,
    showColumnGrandTotals: false,
    showRowTotals: false,
    showColumnTotals: false,
    dataSource: pivotDS,
    allowExpandAll: true,
    onContentReady: function(){
        window.setTimeout(UpdateInfo);
    }
}).dxPivotGrid("instance");

//********************************************************/
window.log = console.log;
window.pivotDS = pivotDS;
window.pivot = pivot;
window.store = store;