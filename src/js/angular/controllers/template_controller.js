
	MyApp.controller('template_controller', template_controller);
	
	template_controller.$inject = ['$rootScope','stepsFactory'];
	
	function template_controller($rootScope,stepsFactory)
	{
		var vm = this;
		
		/*******************************************************************************************************************************************************************************************************************
            Verify that mandatory previous steps are completed to display this step.
        ******************************************************************************************************************************************************************************************************************/
        if(stepsFactory.isInvalid($rootScope.widgetObject,["format"]))  {return;};
           
		/*******************************************************************************************************************************************************************************************************************
         TEMPLATES FOR CAROUSEL
        ******************************************************************************************************************************************************************************************************************/
		var object = $rootScope.widgetObject.format;  vm.templates = [];
		for(i=1;i<=object.templates;i++)   {   vm.templates.push({index:i,url:"images/template/"+object.id+"-"+object.width+"-"+object.height+"-template"+i+".jpg"}); }
    };
