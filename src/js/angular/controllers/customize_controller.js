    
	MyApp.controller('customize_controller', customize_controller);
	
	customize_controller.$inject = ['$rootScope','$timeout','stepsFactory'];
	
	function customize_controller($rootScope,$timeout,stepsFactory)
	{
		var vm = this;
		
        vm.customize = $rootScope.widgetObject.customize;
        
        /*******************************************************************************************************************************************************************************************************************
            Verify that mandatory previous steps are completed to display this step.
        ******************************************************************************************************************************************************************************************************************/
        if(stepsFactory.isInvalid($rootScope.widgetObject,["format","template","content"])){return;};
        
        /*******************************************************************************************
          COLOR PICKER 
        ***********************************************************************************************/
        var hueb = new Huebee( '.color-input',{setBGColor: true,saturations: 2});
        hueb.on('change', function(color,hue,sat,lum) { if(color.toLowerCase()=="#fff")	{color = "#F33C00"; $(".color-input").val(color);} vm.customize.background = {color:color, hue:hue, sat:sat, lum:lum };    vm.updateModel();   });
        
        /*******************************************************************************************
          OPTIONS 
        ***********************************************************************************************/
        
        vm.options = 
        [
            {id:0,label:"Display Shop Logo",        model:"shopBotLogo",    on:"On", off:"Off"},
            {id:1,label:"Display ShopBot Review",   model:"shopBotReview",  on:"On", off:"Off"},
            {id:2,label:"Display Discount Spot",    model:"discountSpot",   on:"On", off:"Off"},
            {id:3,label:"Allow Sponsored Offers",   model:"sponsorOffers",  on:"On", off:"Off"}
        ];
        
        vm.updateModel = function() {$rootScope.$emit("step_completed",{customize:vm.customize});};
        
        /*******************************************************************************************************************************************************************************************************************
           Widget popup
        ******************************************************************************************************************************************************************************************************************/
        
        vm.openPreviewModal = function(){stepsFactory.initWidget($rootScope.widgetObject,true);};
        
	};