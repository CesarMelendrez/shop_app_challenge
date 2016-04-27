(function(){

  angular
  .module('shopApp')
  .controller('ProductCtrl',ProductCtrl);

  function ProductCtrl($stateParams,api,productSrv, $uibModal,$state){
    var productVm = this;

    productVm.categories = [
      {label:'Shirts',value:'shirts'},
      {label:'Pants',value:'pants'},
      {label:'Shoes',value:'shoes'},
      {label:'Outerwear',value:'outerwear'},
      {label:'Accessories',value:'accessories'},
    ];

    productVm.quantity = 1;
    productVm.product = productSrv.getProduct($stateParams.productId);
    console.log(productVm.product);
    console.log($stateParams.productId);

    productVm.product_add_btn = 'Add Product'
    productVm.product_update_btn = 'Update Product';
    productVm.product_delete_btn = 'Remove Product';

    if($stateParams.productId != undefined){
      productSrv.getProduct($stateParams.productId)
      .then(function(res){
        console.log(res);
        productVm.product = res.data.product;
        //TODO #2 set category based on edit form based on
        //product category
        for(var index in productVm.categories){
          if(productVm.product.category == productVm.categories[index].value){
            productVm.set_category = productVm.categories[index].value;
          }
        }

      })
    }

    //public functions
    productVm.addProduct = addProduct;
    productVm.updateProduct = updateProduct;
    productVm.deleteProduct = deleteProduct;
    productVm.addtoCart = addtoCart;
    productVm.openCart_v2 = openCart_v2;
    productVm.goBack = goBack;

    function openCart_v2(){

      $uibModal.open({
        animation: true,
            templateUrl: 'site/partials/cart.html',
            controller: "CartCtrl as ctrl"
      });
    }

    function addProduct(){
      //TODO #2
      //create product object, pass to product service
      //Update text in button
      console.log('add')
      var newProduct = {
        name:productVm.name,
        image:productVm.image,
        description:productVm.description,
        category:productVm.category,
        price:productVm.price,
        quantity:productVm.quantity,
        status:1
      }
      console.log(newProduct)
      productSrv.addProduct(newProduct);
      productVm.product_add_btn = 'Product Added';
    }

    function updateProduct(){
      //TODO #2
      //create product object, pass to product service
      //Update text in button
      productSrv.updateProduct(productVm.product,$stateParams.productId)

    }

    function deleteProduct(){
      //TODO #2
      //remove product, pass to product service
      //update text in button
      productSrv.deleteProduct($stateParams.productId)
      alert('Product Deleted')
    }

    function addtoCart(isValid){
    	if(!isValid){
    		alert('There are too many items!')
    	}else{
      		productSrv.addtoCart(productVm.product,productVm.quantity);
    	}
    }

    function goBack(){
    	$state.go('categories',{'categoryName':productVm.product.category})
    }
  }


})();
