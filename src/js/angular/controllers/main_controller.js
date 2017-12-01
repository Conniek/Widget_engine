MyApp.controller('main_controller', main_controller);

main_controller.$inject = ['$rootScope', '$state', '$stateParams', '$http', '$uibModal', '$window', '$timeout', 'constants', '$location', 'stepsFactory'];

function main_controller($rootScope, $state, $stateParams, $http, $uibModal, $window, $timeout, constants, $location, stepsFactory) {
    var vm = this;

    $rootScope.widgetObject = {
        url_ws: constants.url_ws,
        token: null,
        format: null,
        template: null,
        content: {
            universe: {
                lvl0: null,
                lvl1: null
            },
            product: null,
            brand: null
        },
        customize: {
            background: {
                color: "#F33C00",
                hue: 60,
                lum: 0.5,
                sat: 1
            },
            shopBotLogo: true,
            shopBotReview: true,
            discountSpot: true,
            sponsorOffers: true
        }
    };

    /*******************************************************************************************
            USER
        ***********************************************************************************************/
    vm.userName = "";

    /*******************************************************************************************
    	STEPS
    ***********************************************************************************************/

    /* Here universe product and brands are a sub step of the content step (see app_config) */
    vm.steps = [{
            id: 1,
            route: "",
            variable: "format",
            menu_title: "format",
            title: "Which format do you want to use ?",
            text: "First choose the banner format you want to use among the options on the right."
        },
        {
            id: 2,
            route: "template",
            variable: "template",
            menu_title: "template",
            title: "Which template do you want to use ?",
            text: "Next select the template you would like to use. Use the arrows to see different examples then click \"Choose this template\" to make your choice."
        },
        {
            id: 3,
            route: "content",
            variable: "content",
            menu_title: "content",
            title: "Choose the content for your widget.",
            text: "Select the content that will appear in the widget by using the drop-down menus. Choose from universes, products, brands or a combination of all three."
        },
        {
            id: 3,
            route: "universe",
            variable: "content",
            menu_title: "content",
            title: "Choose universes/categories",
            text: "Select the content that will appear in the widget by using the drop-down menus. Choose from universes, products, brands or a combination of all three."
        },
        {
            id: 3,
            route: "products",
            variable: "content",
            menu_title: "content",
            title: "Choose a product",
            text: "Select the content that will appear in the widget by using the drop-down menus. Choose from universes, products, brands or a combination of all three."
        },
        {
            id: 3,
            route: "brands",
            variable: "content",
            menu_title: "content",
            title: "Choose a brand",
            text: "Select the content that will appear in the widget by using the drop-down menus. Choose from universes, products, brands or a combination of all three."
        },
        {
            id: 4,
            route: "customize",
            variable: "customize",
            menu_title: "customize",
            title: "Customize your widget",
            text: "The last step is customizing your widget. Select exactly what you want to be displayed and pick a background color."
        },
        {
            id: 5,
            route: "code",
            variable: "code",
            menu_title: "get the code",
            title: "Congrats ! Get your code...",
            text: "Here is your personnalised widget. Simply copy the code and paste it where you want your widget to appear on your website. If you don't know how to do that, just ask your developer."
        }
    ];

    /* Updating currentStep, nextStep,isCurrentStep and textButton on each state change*/
    $rootScope.$on("$stateChangeSuccess", function() {
        vm.currentStep = _.filter(vm.steps, function(step) {
            return ("/" + step.route == $state.current.url);
        })[0];

        vm.nextStep = _.filter(vm.steps, function(step) {
            return (step.id == vm.currentStep.id + 1);
        })[0];
        vm.isCurrentStep = function(step) {
            if (step) {
                return (step.variable == vm.currentStep.variable);
            }
        };

        switch ($state.current.name) {
            case "customize":
                vm.textButton = "Get the Code";
                break;
            case "code":
                vm.textButton = "Copy (Ctrl + C)";
                break;
            default:
                vm.textButton = "Next Step";
                break;
        }

        /* TESTING
        $stateParams.token = "O9uY13jJd17RgspD1UhopTyKci-O1l9v31LTu1N0yn0sje2wcFpb_w==";
        $stateParams.partner_id=1002;
        */

        if (["format", "code"].indexOf($state.current.name) != -1) {
            if ($location.search().token && $location.search().partner_id) {
                $http({
                        method: "GET",
                        url: $rootScope.widgetObject.url_ws + '/auth?token=' + $location.search().token + '&partner_id=' + $location.search().partner_id
                    })
                    .then(function(res) {
                        $rootScope.widgetObject.token = res.data.widget_token;
                    }, function(res) {
                        var modalInstance = $uibModal.open({
                            templateUrl: '/view_partials/popup_error_token.html',
                            backdrop: 'static',
                            keyboard: false
                        });
                    });
            } else {
                var modalInstance = $uibModal.open({
                    templateUrl: '/view_partials/popup_error_token.html',
                    backdrop: 'static',
                    keyboard: false
                });
            }
        }
    });

    /* Displays a loading icon onclick */
    vm.linkClick = function(event) {
        angular.element(event.target).addClass('loading');
    };

    /*******************************************************************************************
           UPDATE widget object values on step completed
        ***********************************************************************************************/

    $rootScope.$on("step_completed", function(event, value) {
        var key = Object.keys(value)[0];
        $rootScope.widgetObject[key] = value[key];
    });

    $rootScope.$on("country_selected", function(event, value) {
        if (value.country) {
            $rootScope.widgetObject.url_ws = value.country.url_ws + value.country.version;
            $rootScope.country = value.country;
        }
    });

    /*******************************************************************************************
           NEXT STEP BUTTON
        ***********************************************************************************************/

    /* To decide to activate or not the button */
    vm.isStepCompleted = function() {
        /* During vm.currentStep initialisation always return false */
        if (!vm.currentStep || !vm.currentStep.variable) {
            return false;
        };

        /* Special condition when in content step (the object on this step is a bit more complex)*/
        if (vm.currentStep.variable == "content") {
            return ($rootScope.widgetObject[vm.currentStep.variable].universe != null && ($rootScope.widgetObject[vm.currentStep.variable].universe.lvl0 != null || $rootScope.widgetObject[vm.currentStep.variable].product != null || $rootScope.widgetObject[vm.currentStep.variable].brand != null));
        };

        /* When in code always return true*/
        if (vm.currentStep.variable == "code") {
            return true;
        };

        /* Default behaviour */
        return ($rootScope.widgetObject[vm.currentStep.variable] != null);
    };

    vm.actionStep = function() {
        /* No action if step is not completed */
        if (vm.isStepCompleted()) {
            /* If we are in the nested view universe/product/brand clicking on next sends back to content */
            if ($state.current.name.match(/content\./)) {
                var next = _.filter(vm.steps, function(step) {
                    return (step.id == 3);
                })[0];
                $state.go(next.route);
                return false;
            }

            /* If not last step moving on to next step */
            $state.go(vm.nextStep.route);
            return false;
        }
    };


    vm.isCorrectStep = function(step_name) {
        if (step_name) {
            return $state.current.name == step_name;
        } else {
            if ($state.current.name != 'code') {
                return true;
            } else {
                return false;
            }
        }
    };

    /*******************************************************************************************
       BUTTON "GET THE CODE"
    ***********************************************************************************************/
    vm.textCode = "Copy the Code";
    vm.isFlashing = false;
    vm.copySuccess = function(event) {
        vm.textCode = "Copied to clipboard !";
        vm.isFlashing = true;
        $timeout(function() {
            vm.textCode = "Copy the Code";
            vm.isFlashing = false;
        }, 1000);
    };


    /*******************************************************************************************
       RESET CONTENT
    ***********************************************************************************************/
    vm.resetContent = function() {
        $rootScope.$emit("reset_content", null);
    };

    /*******************************************************************************************
           NAVIGATION LINKS ON THE LEFT
        ***********************************************************************************************/

    vm.stepRedirect = function(step) {
        if (vm.isStepCompleted()) {
            $state.go(step.variable);
        } else {

            var stepsToValidate = _.filter(vm.steps, function(step2) {
                return (step2.id < step.id);
            }).map(function(x) {
                return x.variable;
            });
            
            console.info(stepsToValidate);

            stepsToValidate = _.uniq(stepsToValidate);

            stepsFactory.isInvalid($rootScope.widgetObject, stepsToValidate);
        }

        $timeout(function() {
            angular.element(".loading").removeClass('loading');
        }, 50);
    };
};
