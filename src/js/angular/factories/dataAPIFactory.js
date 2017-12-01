	
	MyApp.factory('dataAPIFactory', dataAPIFactory);
	
	dataAPIFactory.$inject = ['$rootScope','$http','$state','$stateParams'];
	
	function dataAPIFactory($rootScope,$http,$state,$stateParams)
	{
   		var dataAPIFactory =
	    {	
	    	getData : 	getData
	    };
	    
		return dataAPIFactory;
		
		/////////////////////
	   	
	   	function getData(stateName,params)	
	   	{	
			if(stateName == 'content')  {	url = $rootScope.widgetObject.url_ws+'/categories?token='+$rootScope.widgetObject.token; method = 'GET';}
			else	{return [];}
			
			return 	$http({method: method,url: url}).then(function(res){ return res.data.data;},
					function(err)
	 				{
	 					return [];
	 				});
	   	}
	}