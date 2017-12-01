MyApp.constant('constants', {
  url_ws: "https://api.shopbot.com.au/widget/builder/api/v1",
  url_widgetEngine:"//cdn1.shopbot-inc.com/widget/widgetEngine.js?" + Math.random(),
  countries: [
    {id:0,name:"Australia",		url_ws:"https://api.shopbot.com.au/widget/builder/api", 	version:"/v1"},
    {id:1,name:"Canada",		url_ws:"https://api.shopbot.ca/widget/builder/api", 		version:"/v1"},
    {id:2,name:"South Africa",	url_ws:"https://api.shopbot.co.nz/widget/builder/api", 		version:"/v1"},
    {id:3,name:"New Zealand",	url_ws:"https://api.shopbot.co.za/widget/builder/api", 		version:"/v1"},
    //{id:4,name:"Québec",		url_ws:"ee", version:"v1"},
    {id:5,name:"India",			url_ws:"https://api.shopbot.co.in/widget/builder/api", 		version:"/v1"},
    {id:7,name:"Malaysia",		url_ws:"https://api.shopbot.com.my/widget/builder/api", 	version:"/v1"},
    {id:8,name:"Singapore",		url_ws:"https://api.shopbot.com.sg/widget/builder/api", 	version:"/v1"}
  ]
});
