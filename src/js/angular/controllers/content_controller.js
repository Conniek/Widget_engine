
	MyApp.controller('content_controller', content_controller);

	content_controller.$inject = ['$rootScope','$scope','$state','$http','constants'];

	function content_controller($rootScope,$scope,$state,$http,constants)
	{
		var vm = this;

        vm.isMain = function(){return $state.current.name == "content";};

        $scope.oldContent = $scope.content = $rootScope.widgetObject.content;

        vm.isCancellable = false;

        vm.count = "Please select a filter to select your offers";

        /*******************************************************************************************************************************************************************************************************************
        	PLACEHOLDERS
        ******************************************************************************************************************************************************************************************************************/
        vm.placeHolders = {	brand : "Make your choice (2 characters minimum)",	product : "Make your choice (2 characters minimum)",category : "Refine your search (2 characters minimum)",	universe : "Universes"};

        /*******************************************************************************************************************************************************************************************************************
        	ACTION ON MAIN PAGE CONTENT
        ******************************************************************************************************************************************************************************************************************/
        vm.clickContent = function(target)	{if(vm.country)	{$state.go("content."+target);vm.isCancellable=false;}	};

        /*******************************************************************************************************************************************************************************************************************
        WATCH CONTENT CHANGE
        ******************************************************************************************************************************************************************************************************************/
				function countOffers() {
						var $fields = $scope.content;

						var uriParams = [
							'token=' + $rootScope.widgetObject.token,
							($fields.brand ? 'brand_id=' + $fields.brand.originalObject.id : ''),
							($fields.product ? 'product_id=' + $fields.product.originalObject.id : '')
						];

						if ($fields.universe) {
								if ($fields.universe.lvl0) {
										uriParams.push('category_id[]=' + $fields.universe.lvl0.originalObject.id);
								}
								if ($fields.universe.lvl1) {
										uriParams.push('category_id[]=' + $fields.universe.lvl1.originalObject.id);
								}
						}

						$http({
								method: "GET",
								url: $rootScope.widgetObject.url_ws+'/count?' + uriParams.join('&')})
						.then(function (res)    {
							vm.count =  "You got "+res.data.items+" offers !";
						},function(res) {
							vm.count = "Please select a filter to select your offers";
						});
				}

				$scope.$watch('content', function(newValue, oldValue)
        {
            $scope.oldContent = oldValue;

            $scope.brand_placeholder 	= (newValue.brand && newValue.brand.title) 		? $scope.brand_placeholder 		= newValue.brand.title : vm.placeHolders.brand;
            $scope.product_placeholder 	= (newValue.product && newValue.product.title) 	? $scope.product_placeholder 	= newValue.product.title : vm.placeHolders.product;
            $scope.universe_placeholder = (newValue.universe && newValue.universe.lvl0) ? $scope.universe_placeholder 	= newValue.universe.lvl0.title : vm.placeHolders.universe;
   					$scope.category_placeholder = (newValue.universe && newValue.universe.lvl1) ? $scope.category_placeholder 	= newValue.universe.lvl1.title : vm.placeHolders.category;

   					$rootScope.$emit("step_completed",{content:newValue});

        		vm.isCancellable = true;

        		if(JSON.stringify(newValue)!==JSON.stringify({universe:{lvl0:null,lvl1:null},product:null,brand:null})) {
                countOffers();
            } else {
								vm.count = "Please select a filter to select your offers";
						}
        },true);

        $rootScope.$on("reset_content",function(event,value)	{
						$scope.content = {universe:{lvl0:null,lvl1:null},product:null,brand:null};
				});

        /*******************************************************************************************************************************************************************************************************************
        LIST COUNTRIES
        ******************************************************************************************************************************************************************************************************************/
        vm.countries = constants.countries;

        vm.country = $rootScope.country ? $rootScope.country : vm.countries[1];

        $scope.$watch('vm.country', function(newValue, oldValue)	{
					$rootScope.$emit("country_selected",{country:vm.country});
					countOffers();
				},true);

        /*******************************************************************************************************************************************************************************************************************
        AUTOCOMPLETE
        ******************************************************************************************************************************************************************************************************************/

        vm.cancelOrBack = function(target)
        {
        	if(vm.isCancellable)
        	{
        		switch(target)
        		{
        			case "universe": 	$scope["universe_placeholder"] = vm.placeHolders.universe; $scope["category_placeholder"] = vm.placeHolders.category;	$scope.content.universe = {lvl0:null,lvl1:null}; 		break;
        			case "product": 	$scope[target+"_placeholder"] = vm.placeHolders[target];																$scope.content.product = $scope.oldContent.product; 	break;
        			case "brand": 		$scope[target+"_placeholder"] = vm.placeHolders[target];																$scope.content.brand = $scope.oldContent.brand; 		break;
        		}
        		vm.isCancellable = false;
        	}
        	$state.go("content");
        };

	};
