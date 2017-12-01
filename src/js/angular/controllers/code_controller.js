
	MyApp.controller('code_controller', code_controller);
	
	code_controller.$inject = ['$rootScope','$uibModal','stepsFactory'];
	
	function code_controller($rootScope,$uibModal,stepsFactory)
	{
		var vm = this;
		
        /*******************************************************************************************************************************************************************************************************************
            If previous steps not completed display error modal.
        ******************************************************************************************************************************************************************************************************************/
        if(stepsFactory.isInvalid($rootScope.widgetObject,["format","template","content"])){return;};
        
        /*******************************************************************************************************************************************************************************************************************
           Widget popup and widget code
        ******************************************************************************************************************************************************************************************************************/
        
        vm.widgetScript = stepsFactory.initWidget($rootScope.widgetObject,false);
        
        vm.openPreviewModal = function(){stepsFactory.initWidget($rootScope.widgetObject,true);};
            
	};