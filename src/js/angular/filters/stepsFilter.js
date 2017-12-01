	
	MyApp.filter('stepsFilter', stepsFilter);
	
	stepsFilter.$inject = [];
	
	function stepsFilter() 
	{
		return function (steps) 
	    {
			return _.filter(steps, function(step){	return ["universe","products","brands"].indexOf(step.route) == -1;	});
		};
	};
