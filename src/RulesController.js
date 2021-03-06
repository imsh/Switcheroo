angular.module('officeredirector')
.controller('RulesController', ['$scope', 'RulesService', function($scope, rulesService) {
	$scope.rules = chrome.extension.getBackgroundPage().rules;
	$scope.isEditing = false;

	$scope.add = function() {
		$scope.rules.push({
			site: $scope.site,
			isActive: true
		});

		$scope.site = '';
	};

	$scope.remove = function(index) {
		$scope.rules.splice(index,1);
	};

	$scope.clear = function() {
		$scope.rules = [];
	};

	$scope.enableEditing = function() {
		$scope.isEditing = true;
	};

	$scope.disableEditing = function() {
		$scope.isEditing = false;
	};

	$scope.shortenText = function (text){
		var maxLength = 25;
		if(text && text.length > maxLength){
			text = text.substring(0,maxLength) + "...";
		}

		return text;
	};

	$scope.$watch('rules', function(newValue, oldValue){
		rulesService.set(newValue);
	}, true);
}]);