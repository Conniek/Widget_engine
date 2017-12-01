	
	var MyApp = angular.module('MyApp', ['ui.router','ngAnimate','anim-in-out','angular-carousel','ui.bootstrap',"angucomplete-alt","ngScrollbars","ngclipboard","ui.select","ngSanitize"]);
	
	MyApp.run(app_run);
     
	app_run.$inject = ['$rootScope','$templateCache','$http','$location'];
	
	function app_run($rootScope,$templateCache,$http,$location)
	 {
   		$rootScope.first_load = true;
   		var locationSearch;

        /******************************************************************************************************************************************************************************************************************
        CHANGE STATE
        ******************************************************************************************************************************************************************************************************************/
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams)
        {
            $rootScope.isLoading = true;
            $http.get('view_partials/'+toState.name+'.html', { cache: $templateCache }); 
        });
        
        $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams)
        {
            $rootScope.isLoading = false;
            
            angular.element(".loading").removeClass('loading');
            
            if($rootScope.first_load)
            {
                $rootScope.first_load=false;
                /* Keep URL parameters between angular routing changes */
                locationSearch = $location.search();
            }
            $location.search(locationSearch);
        });
        
        $rootScope.$on('$viewContentLoaded', function(){});
        
	 };
    