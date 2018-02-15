var data = [
    {id:1,sex:"M", age:28, country:"Japan",city:"Kyoto",name:"Sergey", sername:"Fiantsev", occupation:"Programmer", experience: 1},
    {id:2,sex:"M", age:28, country:"Russia",city:"Moscow",name:"Pashaa", sername:"Baykov", occupation:"Programmer", experience: 2},
    {id:3,sex:"M", age:23, country:"Russia",city:"Moscow",name:"Ruslan", sername:"Balkarov", occupation:"Programmer", experience: 3},
    {id:4,sex:"M", age:39, country:"Japan",city:"Tokyo",name:"Aleksey", sername:"Kuznetsov", occupation:"Programmer", experience: 4},
    {id:5,sex:"M", age:39, country:"Japan",city:"Tokyo",name:"Aleksey", sername:"Kuznetsov", occupation:"Programmer", experience: 5},
    {id:6,sex:"M", age:28, country:"Japan",city:"Kyoto",name:"Sergey", sername:"Fiantsev", occupation:"Programmer", experience: 4},
    {id:7,sex:"M", age:28, country:"USA",city:"Boston",name:"Pasha", sername:"Baykov", occupation:"Programmer", experience: 7},
    {id:7,sex:"M", age:28, country:"USA",city:"Boston",name:"Sergey", sername:"Fiantsev", occupation:"Programmer", experience: 7},
    {id:7,sex:"M", age:40, country:"USA",city:"New_York",name:"Tyuldin", sername:"Pasha", occupation:"Tester", experience: 9},
    {id:7,sex:"M", age:40, country:"USA",city:"New_York",name:"Antipov", sername:"Nikolay", occupation:"Tester", experience: 13},
];

var store = new DevExpress.data.ArrayStore({
    key: "id",
    data: data,
});

// store.on("modified", ()=>console.log("Modified"));

var customStore = new DevExpress.data.CustomStore({
    loadMode: "raw",
    load: (opt) => {
        debugger;
        console.log(opt);
        if(opt.skip === 0 && opt.take === 20)
            return store.load();
            //return store.load().then(r=>[r[0]]);
        else
            return store.load();
    },
    insert: () => store.insert()
});

module.exports = {
    data: data,
    store: store,
    customStore: customStore,
};

// window.ds = new DevExpress.data.DataSource({store:store})