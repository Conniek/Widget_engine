
	MyApp.factory('stepsFactory', stepsFactory);

	stepsFactory.$inject = ['$rootScope','$uibModal','constants','$timeout'];

	function stepsFactory($rootScope,$uibModal,constants,$timeout)
	{
   		var stepsFactory =
	    {
	    	isInvalid : 	isInvalid,
	    	initWidget :   initWidget
	    };

		return stepsFactory;

		/////////////////////

	   	function isInvalid(object,steps)
	   	{
	   	   var defaultValues = {format: null,template: null,content: {universe:{lvl0:null,lvl1:null},product:null,brand:null}};

	   	   for(i=0;i<steps.length;i++) {
	   	       if(JSON.stringify(object[steps[i]])==JSON.stringify(defaultValues[steps[i]])) {
								var modalInstance = $uibModal.open({
								    template: '<div class="modal-body"><div>The widget is not properly configured. The<span class="bold">&nbsp;{{nullValue}}&nbsp;</span>value is missing</div><a href="/{{target}}" ng-click="close()" class="button squared capitalize">Ok</a></div>',
								    backdrop  : 'static',
								    keyboard  : false,
								    resolve: {
											nullValue: function() {
												return steps[i];
											}
										},
								    controller: function($scope, nullValue,$uibModalInstance,$location) {
								        $scope.nullValue = nullValue;
								        $scope.target = "";
								        if($scope.nullValue!="format") {
													$scope.target = $scope.nullValue;
												}
												$scope.target += "?";
												_.each($location.search(), function(value, key) {
														$scope.target+="&"+key+'='+value;
												});
								        $scope.close = function() {
														$uibModalInstance.close();
												};
								    }
								 });
								 
	   	           return;
	   	       }
	   	   }
	   	}

	   	function initWidget(widgetObject,open)
      {
            /* Change url for widget compared to url used in the widget engine */
            var shortWidgetObject = {
                url:widgetObject.url_ws.replace('/builder',''),
                t:widgetObject.token,
                f:widgetObject.format.id,
                w:widgetObject.format.width,
                h:widgetObject.format.height,
                tpl:widgetObject.template.index,
                u_id : (widgetObject.content.universe.lvl0)? widgetObject.content.universe.lvl0.originalObject.id : null,
                c_id : (widgetObject.content.universe.lvl1)? widgetObject.content.universe.lvl1.originalObject.id : null,
                p_id : (widgetObject.content.product)? widgetObject.content.product.originalObject.id : null,
                b_id : (widgetObject.content.brand)? widgetObject.content.brand.originalObject.id : null,
                cst:widgetObject.customize,
            };

            var url = constants.url_widgetEngine;

            var widgetScript = '<script>(function() {  function l(c) { var d = document, s = d.createElement("script"), ss = d.getElementsByTagName("script")[0]; s.src = "'+url+'"; if (s.readyState) {s.onreadystatechange = function() {if (s.readyState == "loaded" || s.readyState == "complete") {s.onreadystatechange = null;c();}};} else {s.onload = function() { c();};} ss.parentNode.insertBefore(s, ss); }; l(function(){ w.o = '+JSON.stringify(shortWidgetObject)+'; w.r(); }); }());</script><link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"><div class="shopBotWidget"></div>';

            /* Add a loader for the preview modal */
            widgetScriptDemo = widgetScript.replace('<div class="shopBotWidget"></div>', '<div class="shopBotWidget"><div class="loader-modal"><img src = "images/general/loaderRed.svg"><label>Loading in progress...</label></div></div>');

            if(open) {
               var modalInstance = $uibModal.open({
		        			template: '<div class="modal-body">'+widgetScriptDemo+'</div>',
		        			resolve: {},
		        			controller: function($scope, $uibModalInstance,$timeout) {
		            			$scope.close = function()   {
													$uibModalInstance.close();
											};

		            			$timeout(function()	{
												$(".shopBotWidget .loader-modal").html("An error seem to have occured, please try to preview the widget again.");
											},5000);
		        			},
		        			windowClass: 'full-modal'
		        		});
            };

            return widgetScript;
        };


	}
