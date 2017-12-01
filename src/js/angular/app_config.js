
	MyApp.config(config);
    
    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$provide','$compileProvider','ScrollBarsProvider'];
	
	function config($stateProvider, $locationProvider, $urlRouterProvider, $provide,$compileProvider,ScrollBarsProvider)
    {
 		/* Slightly improves performance by removing classes ng-scope and ng-isolated-scope */
 		$compileProvider.debugInfoEnabled(false);
 		
 		/******************************************************************************************************************************************************************************************************************
        ROUTING
        ******************************************************************************************************************************************************************************************************************/
        /* No "#" in the URLs */
        $locationProvider.html5Mode({   enabled: true,  requireBase: false  });
        
        /* States */
        $stateProvider
            .state('404',          	     {   url: '/404',    		templateUrl: 'view_partials/404.html',         	      controller: '_404_controller as vm',         resolve: {}})
            .state('format',             {   url: '/',    		    templateUrl: 'view_partials/format.html',             controller: 'format_controller as vm',       resolve: {}})
          	.state('template',           {   url: '/template',    	templateUrl: 'view_partials/template.html',           controller: 'template_controller as vm',     resolve: {}})
          	.state('content',            {   url: '/content',    	templateUrl: 'view_partials/content.html',            controller: 'content_controller as vm',      resolve: {}})
          	.state('content.universe',   {   url: '/universe',      templateUrl: 'view_partials/content.universe.html'                                                            })
          	.state('content.products',   {   url: '/products',      templateUrl: 'view_partials/content.products.html'                                                            })
            .state('content.brands',     {   url: '/brands',        templateUrl: 'view_partials/content.brands.html'                                                              })
          	.state('customize',          {   url: '/customize',    	templateUrl: 'view_partials/customize.html',          controller: 'customize_controller as vm',    resolve: {}})
          	.state('code',               {   url: '/code',    		templateUrl: 'view_partials/code.html',               controller: 'code_controller as vm',         resolve: {}})
          ;
        $urlRouterProvider.otherwise('/404');
        
        /* Resolves */
        get_data.$inject = ['dataAPIFactory','$stateParams'];
        function get_data(dataAPIFactory,$stateParams)                  {   return dataAPIFactory.getData(this.name,$stateParams);  };
        
        /******************************************************************************************************************************************************************************************************************
        SYSTEM WIDE BEHABIOUR OF THE ANGULAR SCROLLBARS DIRECTVE
        ******************************************************************************************************************************************************************************************************************/
        ScrollBarsProvider.defaults = 
        {
            scrollButtons: {scrollAmount: 'auto', enable: true},
            scrollInertia: 200, 
            axis: 'y', 
            theme: 'minimal-dark',
            autoHideScrollbar: true
        };
 	}
