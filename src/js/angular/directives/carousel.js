    MyApp.directive('carousel', carousel);
    
    carousel.$inject = ['$rootScope'];
    
    function carousel($rootScope) {
        return {
            restrict: 'E',
            scope: {
                images: "=?",
                height: "@",
                width: "@",
                withThumbnails: "="
            },
            template: '<ul rn-carousel class="main_ul" rn-carousel-index="carouselIndex" rn-carousel-transition="slide" rn-carousel-duration="300">'+
            '<li ng-repeat="image in images track by $index">' +
            '<div class="carousel image" ng-click="selectTemplate()" style="background-image: url({{image.url}});"></div>' +
            '</li>' +
            '</ul>'+
            '<button class="squared"        ng-click="selectTemplate()"     ng-if="!isTemplateSelected"><span class="small">Choose this template</span></button>'+
            /*
            '<button class="squared active" ng-click="deSelectTemplate()"    ng-if="isTemplateSelected">'+
                '<span class="small"><i class="fa fa-check" aria-hidden="true"></i> Template Selected !</span>'+
            '</button>'+
            */
            '<div ng-if="!withThumbnails" rn-carousel-indicators ng-if="images.length > 1" slides="images" rn-carousel-index="carouselIndex"></div>'+
            '<ul ng-if="withThumbnails" class="thumbnails" rn-carousel rn-carousel-transition="slide" rn-carousel-controls rn-carousel-duration="300">'+
            	'<li ng-repeat="image in images track by $index" class="thumbnail" ng-click = "changeIndex($index);changeTumbnailsIndex($index);linkClick($event)" ng-class="{\'selected\':(thumbnailsIndex == $index)}">'+
            	       '<div class="carousel image" style="background-image: url({{image.url}});"></div>'+
            	'</li>'+
            '</ul>'
            ,
            link: function ($scope, $element, $attributes) 
            {
                if (!$scope.images) { console.error("No images in the carousel directive"); return;}
                
                $element.attr("style","width: "+$scope.width+"; height: "+$scope.height);
                
                $scope.carouselIndex = 0; 	$scope.changeIndex = function(index){$scope.carouselIndex = index;$scope.selectTemplate();};
                $scope.thumbnailsIndex = 0;	$scope.changeThubnailsIndex = function(index){$scope.thumbnailsIndex = index;};
                
                $scope.linkClick = function (event)
                {
                    angular.element(event.target).parents("li").siblings().removeClass('selected');
                    angular.element(event.target).parents("li").addClass('selected');
                };
                
                $scope.isTemplateSelected = false;
                
                $scope.selectTemplate = function()      {   $scope.isTemplateSelected = true;   $rootScope.$emit("step_completed",{template:$scope.images[$scope.carouselIndex]});};
                
                /* Select on load the first template */
                $scope.selectTemplate();
                
                //$scope.deSelectTemplate = function()    {   $scope.isTemplateSelected = false;  $rootScope.$emit("step_completed",{template:null});};
                
                $scope.isSelected = function()    {   if($rootScope.widgetObject.template && JSON.stringify(format) == $rootScope.widgetObject.template)    {   return true;    }   return false;   };
                
                /* Deselect template when user uses carousel */
                $scope.$watch('carouselIndex', function(newValue, oldValue) {$scope.thumbnailsIndex = $scope.carouselIndex;});
            }
        };
    };