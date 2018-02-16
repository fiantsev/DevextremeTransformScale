"use strict";

var store = new DevExpress.data.CustomStore({
    key: "OrderID",
    load: function(opt){
        var d = $.Deferred();
        fetch("http://localhost:3333/api", {method:"POST", body: JSON.stringify(opt)})
            .then((r) => r.json() )
            .then((r) => {
                // var _r = r.data?[r.data, r.summary]:r;
                // console.log(_r);
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
var pivotDS = new DevExpress.data.PivotGridDataSource(pivotDSConfig);
// DATA.store.on("modified", ()=>pivotDS.reload());
// pivotDS.filter("name", "=", "sername")

$("#table").resizable({ handles: "n, e, s, w, ne, se, sw, nw", resize: function(){ pivot.updateDimensions(); } });

var pivot = $("#content").dxPivotGrid({
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
}).dxPivotGrid("instance");

//********************************************************/
window.log = console.log;
window.pivotDS = pivotDS;
window.pivot = pivot;
window.store = store;