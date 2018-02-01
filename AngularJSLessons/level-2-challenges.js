// 1. Using filters 

//In the previous challenge we practiced displaying the prices of gems in our index.html. 
//The first gem, Azurite, now costs $110.50 (due to supply shortages) but our current 
//code doesn't display the price correctly.
// index.html
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body class="container" ng-controller="StoreController as store">
    <div class="product row" ng-repeat="product in store.products">
      <h3>
        {{product.name}}
        // Use an Angular filter to display the price as a currency.
        
        <!--<em class="pull-right">${{product.price}}</em>-->
        <em class="pull-right">{{product.price | currency}}</em>
      </h3>
    </div>
  </body>
</html>


// 2. Displaying the First Image 

//We've added images to all products as well – like any self respecting store should have. 
//A product has an array of images we can use in our HTML. Let's get the first image to 
//show on the page!
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body ng-controller="StoreController as store">
    <!--  Products Container  -->
    <div class="list-group">
      <!--  Product Container  -->
      <div class="list-group-item" ng-repeat="product in store.products">
        <h3>
          {{product.name}}
          <em class="pull-right">{{product.price | currency}}</em>
        </h3>
        <!-- Image Gallery  -->
        <div class="gallery">
        // We want to display the first full-sized image for each product. Can you figure out how?
         <img ng-src = "{{product.images[0]}}"/>
        </div>
      </div>
    </div>
  </body>
</html>

// 3. Display All Thumbnails 

//Our 2-dimensional clients have worked hard to produce multiple images for their gems. 
//Display all the thumbnails inside our gallery without repeating yourself by using an 
//AngularJS directive on the li.thumbnail element.
//app.js
(function() {
  var app = angular.module('gemStore', []);

  app.controller('StoreController', function() {
    this.products = gems;
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
    ]
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
      "images/gem-04.gif"
    ]
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
      "images/gem-10.gif"
    ]
  }];
})();

//index.html
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body class="list-group" ng-controller="StoreController as store">
    <!--  Product Container  -->
    <div class="list-group-item" ng-repeat="product in store.products">
      <h3>{{product.name}} <em class="pull-right">{{product.price | currency}}</em></h3>

      <!-- Image Gallery  -->
      <div class="gallery">
        <div class="img-wrap">
          <img ng-src="{{product.images[0]}}" />
        </div>
        <ul class="img-thumbnails clearfix">
        //Make the li's repeat for each image in the image array. Use the variable image as your identifier.
          <li class="small-image pull-left thumbnail" ng-repeat="image in product.images>
          //Now that we have image available from our ng-repeat let's replace the product.images[0] with it.
            <!--<img ng-src="{{product.images[0]}}" />-->
            <img ng-src="{{image}}" />
          </li>
        </ul>
      </div>
    </div>
  </body>
</html>

// 4. No Images, No Gallery 

//Many times a product will be ready to sell, but won't have images yet (like our first one). 
//In this case the images array will just be empty. Note the change in our gems array.
//We don't want to display the .gallery element if there are no images. Create an expression 
//on our .gallery div to make this happen.
// index.html
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body ng-controller="StoreController as store">
    <!--  Products Container  -->
    <div class="list-group">
      <!--  Product Container  -->
      <div class="list-group-item" ng-repeat="product in store.products">
        <h3>
          {{product.name}}
          <em class="pull-right">{{product.price | currency}}</em>
        </h3>

        <!-- Image Gallery  -->
        // Use the ng-show directive to make sure our image gallery is only displayed if a product has images.
        <div class="gallery" ng-show='product.images.length'>
          <h4>{{product.description}}</h4>
          <img class="img img-circle img-thumbnail center-block" ng-src="{{product.images[0]}}" />
          <ul class="clearfix">
            <li class="small-image pull-left thumbnail" ng-repeat="image in product.images"> <img ng-src="{{image}}" /> </li>
          </ul>
        </div>
      </div>
    </div>
  </body>
</html>

