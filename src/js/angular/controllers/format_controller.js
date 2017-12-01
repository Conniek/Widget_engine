MyApp.controller('format_controller', format_controller);

format_controller.$inject = ['$rootScope'];

function format_controller($rootScope) {
    var vm = this;

    vm.format = JSON.stringify($rootScope.widgetObject.format);

    /*******************************************************************************************************************************************************************************************************************
        FORMATS
        ******************************************************************************************************************************************************************************************************************/
    vm.formats = [{
            id: "mediumRectangle",
            name: "Medium Rectangle",
            width: 300,
            height: 250,
            disabled: false,
            templates: 1
        },
        {
            id: "mediumRectangleFlat",
            name: "Medium Rectangle (Flat)",
            width: 300,
            height: 200,
            disabled: false,
            templates: 1
        },
        {
            id: "inBetween",
            name: "In between page",
            width: 800,
            height: 600,
            disabled: false,
            templates: 1
        },
        {
            id: "inBetweenFlat",
            name: "In between page (Flat)",
            width: 700,
            height: 300,
            disabled: false,
            templates: 1
        },
        {
            id: "rectangle",
            name: "Rectangle",
            width: 180,
            height: 150,
            disabled: false,
            templates: 1
        },
        {
            id: "wideSkyscrape",
            name: "Wide Skyscrape",
            width: 160,
            height: 600,
            disabled: false,
            templates: 1
        },
        {
            id: "superLeaderboard",
            name: "Super Leaderboard",
            width: 970,
            height: 90,
            disabled: false,
            templates: 1
        },
        {
            id: "halfPage",
            name: "Half Page",
            width: 300,
            height: 600,
            disabled: false,
            templates: 1
        },
        //{id:"expandable",         name:"Expandable",          width:300,  	height:600, 	disabled:false, templates: 1},
        //{id:"custom",             name:"Custom",              width:"auto", height:"auto",  disabled:false, templates: 2},
        {
            id: "leaderboard",
            name: "Leaderboard",
            width: 728,
            height: 90,
            disabled: false,
            templates: 1
        }
    ];

    vm.formatSelected = function() {
        $rootScope.$emit("step_completed", {
            format: JSON.parse(vm.format)
        }); /* Reset template selected */
        $rootScope.$emit("step_completed", {
            template: null
        });
    };

    vm.isSelected = function(format) {
        if (vm.format && JSON.stringify(format) == vm.format) {
            return true;
        }
        return false;
    };
};
