//1. Refactoring into a Module 

//After that we will need a way to encapsulate our directives in order to give our app access 
//to them. We can use a module to do this! It is time for Module inception! There is a 
//new js file provided for you — products.js; extract all store directives(descriptions, 
//specs, reviews, title, gallery, and tabs) and paste them inside this new file. Then create a 
//new module that we will make our original gemStore module require as a dependency.

//a. Create a new Module named store-directives to encapsulate our store Directives.
//products.js
(function() {
  var app = angular.module('store-directives',[]);
})();

//b. Move the Directive definitions from app.js into products.js.
//products.js

(function() {
  var app = angular.module('store-directives',[]);
  
  app.directive("productDescription", function() {
    return {
      restrict: 'E',
      templateUrl: "product-description.html"
    };
  });

  app.directive("productReviews", function() {
    return {
      restrict: 'E',
      templateUrl: "product-reviews.html"
    };
  });

  app.directive("productSpecs", function() {
    return {
      restrict:"A",
      templateUrl: "product-specs.html"
    };
  });

  app.directive("productTabs", function() {
    return {
      restrict: "E",
      templateUrl: "product-tabs.html",
      controller: function() {
        this.tab = 1;

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(activeTab) {
          this.tab = activeTab;
        };
      },
      controllerAs: "tab"
    };
  });

  app.directive("productGallery", function() {
    return {
      restrict: "E",
      templateUrl: "product-gallery.html",
      controller: function() {
        this.current = 0;
        this.setCurrent = function(imageNumber){
          this.current = imageNumber || 0;
        };
      },
      controllerAs: "gallery"
    };
    });

})();

//app.js

(function() {
  var app = angular.module('gemStore', ['store-directivies']);

  app.controller('StoreController', function(){
    this.products = gems;
  });

  app.controller('ReviewController', function() {
    this.review = {};

    this.addReview = function(product) {
      product.reviews.push(this.review);

      this.review = {};
    };
  });

 

  var gems = [{
      name: 'Azurite',
      description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
      shine: 8,
      price: 110.50,
      rarity: 7,
      color: '#CCC',
      faces: 14,
      images: [
        "images/gem-02.gif",
        "images/gem-05.gif",
        "images/gem-09.gif"
      ],
      reviews: []
    }, {
      name: 'Bloodstone',
      description: "Origin of the Bloodstone is unknown, hence its low value. It has a very high shine and 12 sides, however.",
      shine: 9,
      price: 22.90,
      rarity: 6,
      color: '#EEE',
      faces: 12,
      images: [
        "images/gem-01.gif",
        "images/gem-03.gif",
        "images/gem-04.gif",
      ],
      reviews: []
    }, {
      name: 'Zircon',
      description: "Zircon is our most coveted and sought after gem. You will pay much to be the proud owner of this gorgeous and high shine gem.",
      shine: 70,
      price: 1100,
      rarity: 2,
      color: '#000',
      faces: 6,
      images: [
        "images/gem-06.gif",
        "images/gem-07.gif",
        "images/gem-08.gif"
      ],
      reviews: []
    }];
})();

//c. Give gemStore Module access to the directives by adding a dependency to gemStore's definition.

(function() {
  var app = angular.module('gemStore', ['store-directives']);

  app.controller('StoreController', function(){
    this.products = gems;
  });

  app.controller('ReviewController', function() {
    this.review = {};

    this.addReview = function(product) {
      product.reviews.push(this.review);

      this.review = {};
    };
  });


//d. Link in the new products.js file.
//index.html

<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
    <script type="text/javascript" src="products.js"></script>
  </head>

  <body ng-controller="StoreController as store">
    <!--  Store Header  -->
    <header>
      <h1 class="text-center">Flatlander Crafted Gems</h1>
      <h2 class="text-center">– an Angular store –</h2>
    </header>

    <!--  Products Container  -->
    <div class="list-group">
      <!--  Product Container  -->
      <div class="list-group-item" ng-repeat="product in store.products">
        <h3>{{product.name}} <em class="pull-right">{{product.price | currency}}</em></h3>

        <!-- Image Gallery  -->
        <product-gallery></product-gallery>

        <!-- Product Tabs  -->
        <product-tabs></product-tabs>
      </div>

    </div>
  </body>
</html>


// 2. Built-in AngularJS Services

//We can use the built-in $http Service to make requests to a server (or in our case a json file). 
//Give our StoreController access to the products using a service.

// app.js 
(function() {
  var app = angular.module('gemStore', ['store-directives']);

// a. Inject the $http service into our StoreController.

  // app.controller('StoreController', function(){
  //   var store = this;
  //   store.products = [];

  // });

  app.controller('StoreController',['$http', function($http) {
    var store = this;
    store.products = [];
    
    //b. get the store-products.json using the $http Service.
    //$http.get('/store-products.json');
    
    //c. Attach a success to our get call.
    //d. Name the first parameter of the success function data.
     $http.get('/store-products.json').success(function(data){
      
       //e.Give our StoreController access to the products by setting products equal to the 
       //data given to us with the http service's success promise.
      store.products = data;
    });

  }]);


  app.controller('ReviewController', function() {
    this.review = {};

    this.addReview = function(product) {
      product.reviews.push(this.review);

      this.review = {};
    };
  });
})();
//All tasks have been completed!