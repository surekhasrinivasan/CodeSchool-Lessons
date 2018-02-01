// 1. Creating a Store Module 
//The Flatlanders need a store to sell their gems and more! They need it really quick, 
//Angular will do the trick!

//They have figured out how to manipulate time and space, allowing them to create 
//three-dimensional gems. The buying and selling of their gems has become a popular 
//Flatlander practice and they believe the next step is taking their wonderful wares to the 
//fourth dimension (the web).

//Can you help them reach their online peddling goals?
//app.js
// a. Create a Module named gemStore so we can get started on this marketing journey.
var app = angular.module("gemStore", []);

<!DOCTYPE html>
// b. Attach the gemStore module to our HTML page with a Directive.
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body>
  <!--c. In index.html, create a simple Expression to display a friendly "Hello, Angular!" message.-->
      <h1>{{"Hello, Angular!"}}</h1>
  </body>
</html>

// 2. Our First Controller

//In order to add some behavior to our application, we need a controller. Add a controller 
//named StoreController to our gemStore application.
//app.js
(function(){
  var gem = { name: 'Azurite', price: 2.95 };
  var app = angular.module('gemStore', []);
  // a. Add a controller named StoreController to our gemStore application.
  app.controller('StoreController', function(){
      // c. In app.js, we've added a gem object to represent one of the 
      //products in our gemStore. Assign it to the product property of StoreController so we 
      //can use them in the page.
      this.product = gem;
  });
})();

<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
    // b. Attach the StoreController to the <body> tag. Be sure to alias it as store.
  <body ng-controller='StoreController as store'>
    <div class="product row">
      // d. Display the name of the product inside the <h3> tag.
      <h3>
        {{store.product.name}}
        //e. Display the price of the product inside the <em> tag.
        <em class="pull-right">{{store.product.price}}</em>
      </h3>
    </div>
  </body>
</html>

// 3. Not For Sale 

//We've added two new properties to our product that we can use on the HTML side. 
//The first of these two is canPurchase, which is a boolean indicating if the 
//product can be purchased. The second is soldOut which, as you can imagine, 
//is a boolean indicating if the product is sold out.

//Use these two new properties in our HTML page to solve the following objectives.
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body class="container" ng-controller="StoreController as store">
  // b. Our first gem is so popular that we've run out of stock already! Well, 
  //Flatlander gems are pretty rare, so it shouldn't be a big surprise. Luckily there 
  //is a soldOut property to our gem. When a gem is soldOut, hide the .product element.
    <div class="product row" ng-hide='store.product.soldOut'>
      <h3>
        {{store.product.name}}
        <em class="pull-right">${{store.product.price}}</em>
      </h3>
        // a.Use a directive to ensure that we can only see the "Add to Cart" button if 
        //the canPurchase property is true.
      <button ng-show='store.product.canPurchase'>Add to Cart</button>
    </div>
  </body>
</html>

// 4. Look, More Gems! 

//Looks like the Flatlanders have discovered more gems for us to sell in the gemStore. 
//That's a relief! Follow the objectives below to add these new gems to the store.

//app.js
(function() {
  var app = angular.module('gemStore', []);

  app.controller('StoreController', function(){
    // a. In the app.js file we changed things up a little with a new gems array. 
    //Assign gems to a products property inside StoreController.
    this.products = gems;
  });

  var gems = [
    { name: 'Azurite', price: 2.95 },
    { name: 'Bloodstone', price: 5.95 },
    { name: 'Zircon', price: 3.95 }
  ];
})();
//index.html
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body class="container" ng-controller="StoreController as store">
// b. You know how to display all the products, 
//don't you? Use the correct directive to display all the products in product row divs.
    <div class="product row" ng-repeat ='product in store.products'>
      <h3>
        {{product.name}}
        <em class="pull-right">${{product.price}}</em>
      </h3>
    </div>
  </body>
</html>