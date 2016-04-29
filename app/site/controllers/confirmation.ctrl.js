(function(){
	angular
		.module('shopApp')
		.controller('ConfirmationCtrl',ConfirmationCtrl)

	function ConfirmationCtrl($scope,$stateParams,productSrv,$location){
		var cfrmVm = this;

		//TODO #1 Capture name, email, conirmation #
		// and order list form checkout info
		
		cfrmVm.orderId = $stateParams.orderId
		cfrmVm.timed = false;
		console.log(cfrmVm.orderId)
		getOrder();
		// cfrmVm.order = productSrv.orders[0]
		console.log(cfrmVm.order)

		setTimeout(function(){
			$scope.$apply(function(){
				cfrmVm.timed = true;
				console.log('timed');
				console.log(cfrmVm.timed);
			});
		},1000);

		function getOrder(){
			for(var i = 0;i<productSrv.orders.length;i++){
				if($stateParams.orderId == productSrv.orders[i].id)
				{
					cfrmVm.order = productSrv.orders[i];
				}
			}
		}

		cfrmVm.backHome = backHome;
		
		function backHome() {
			$location.path('/categories/accessories');
		}
	}

})();