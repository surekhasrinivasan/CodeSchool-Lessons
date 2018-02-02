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

// 5. Tabs Inside Out 

//We just learned that cramming a bunch of logic into our HTML is kinda bad. 
//Let's start the Right Way with a Controller which will control our tabs.

//app.js
(function() {
  var app = angular.module('gemStore', []);

  app.controller('StoreController', function(){
    this.products = gems;
  });
  // a. Create a controller named TabController.
    app.controller('TabController', function(){
        // b. An empty Controller isn't much use. Do you remember why we needed a Controller 
        //at all? That's right, we need to initialize the tab property. Go ahead and 
        //add that property now, setting it to 1.
        
        this.tab = 1;
        
        //c. In order to set the current tab, we'll need a setTab method to use in our HTML. 
        //It should set the tab property of TabController to a value passed in.
        
        this.setTab = function(selectedTab){
            this.tab = selectedTab;
        };
        
        // d. We've got a setTab method. Now we need an isSet method that accepts a value 
        //and returns whether that value matches this.tab.
        
        his.isSet = function(checkTab){
            return this.tab === checkTab; 
        };
    });
  

  var gems = [
      {
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
        reviews: [{
          stars: 5,
          body: "I love this gem!",
          author: "joe@example.org",
          createdOn: 1397490980837
        }, {
          stars: 1,
          body: "This gem sucks.",
          author: "tim@example.org",
          createdOn: 1397490980837
        }]
      },
      {
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
        reviews: [{
          stars: 3,
          body: "I think this gem was just OK, could honestly use more shine, IMO.",
          author: "JimmyDean@example.org",
          createdOn: 1397490980837
        }, {
          stars: 4,
          body: "Any gem with 12 faces is for me!",
          author: "gemsRock@example.org",
          createdOn: 1397490980837
        }]
      },
      {
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
          "images/gem-09.gif"
        ],
        reviews: [{
          stars: 1,
          body: "This gem is WAY too expensive for its rarity value.",
          author: "turtleguyy@example.org",
          createdOn: 1397490980837
        }, {
          stars: 1,
          body: "BBW: High Shine != High Quality.",
          author: "LouisW407@example.org",
          createdOn: 1397490980837
        }, {
          stars: 1,
          body: "Don't waste your rubles!",
          author: "nat@example.org",
          createdOn: 1397490980837
        }]
      }
    ];
})();

// 6. Using TabController 

//To connect our controller to our page, we're going to need a few directives. Try to figure
//out which ones to use, but if you get stuck we'll give you hints along the way. 
//We've provided all the HTML for you. Try to accomplish the following tasks:

<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body class="list-group" ng-controller="StoreController as store">
    <header>
      <h1 class="text-center">Flatlander Crafted Gems</h1>
      <h2 class="text-center">– an Angular store –</h2>
    </header>
    <div class="list-group-item" ng-repeat="product in store.products">
      <h3>
        {{product.name}}
        <em class="pull-right">{{product.price | currency}}</em>
      </h3>
      <section ng-show="product.images.length">
        <img ng-src="{{product.images[0]}}" />
        <ul class="list-inline thumbs">
          <li class="thumbnail" ng-repeat="image in product.images">
            <img ng-src="{{image}}" />
          </li>
        </ul>
      </section>

// a. Attach the TabController to the <section> element with the .tab class. 
//Don't forget to also add an alias.
        <section class="tab" ng-controller="Tabontroller as tab">
        <ul class="nav nav-pills">
            // b. Trigger the setTab method when a link inside a tab is clicked. 
            //Add this to each of the tab links. Pass in the number of the tab, in this case 1, 2 or 3.
          //d. Add the active class to the correct <li> when each tab is clicked. You'll need to 
          //add a directive to each <li> in .nav.
          <li ng-class="{active: tab.isSet(1)}">
            <a href ng-click="tab.setTab(1)">Description</a></li>
          <li ng-class="{active: tab.isSet(2)}">
            <a href ng-click="tab.setTab(2)">Specs</a></li>
          <li ng-class="{active: tab.isSet(3)}">
            <a href ng-click="tab.setTab(3)">Reviews</a></li>
        </ul>
        // c. Use the isSet method to show the corresponding tab. You'll need to add 
        //a directive to each of the <div> elements in .tab.
        <div ng-show="tab.isSet(1)">
          <h4>Description</h4>
         // e. Within the Description tab, output the product's description within the <blockquote> element.
          <blockquote>{{product.description}}</blockquote>
        </div>
        <div ng-show ="tab.isSet(2)">
          <h4>Specs</h4>
          // f. Within the Specs tab, output the product's shine value. 
          //It should look something like this within the <blockquote> element: "Shine: 4".
          <blockquote>Shine: {{product.shine}}</blockquote>
        </div>
        <div ng-show ="tab.isSet(3)">
          <h4>Reviews</h4>
          <blockquote></blockquote>
        </div>
      </section>
    </div>
  </body>
</html>

// 7. Creating Gallery Controller 

//Now that you're such a whiz with tabbed tab, can you apply what you've learned to
//our image gallery, too? Don't worry, we'll start slow… And there's a 
//lot more in common than you might think!

//app.js
(function() {
  var app = angular.module('gemStore', []);
// a. Let's start with a Controller, just like last time. Call it GalleryController.
  app.controller('GalleryController', function(){
    // b. Initialize a current property of GalleryController with a value of 0.
    this.current = 0;
    // c. Add a method to GalleryController called setCurrent that accepts a 
    //value and assigns it to current. If no value is passed in, set current to 0.
    this.setCurrent = function(newGallery){
        this.current = newGallery || 0;
    };
});  
  app.controller('StoreController', function(){
    this.products = gems;
  });

  app.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });

  var gems = [
    {
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
      reviews: [{
        stars: 5,
        body: "I love this gem!",
        author: "joe@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "This gem sucks.",
        author: "tim@example.org",
        createdOn: 1397490980837
      }]
    },
    {
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
      reviews: [{
        stars: 3,
        body: "I think this gem was just OK, could honestly use more shine, IMO.",
        author: "JimmyDean@example.org",
        createdOn: 1397490980837
      }, {
        stars: 4,
        body: "Any gem with 12 faces is for me!",
        author: "gemsRock@example.org",
        createdOn: 1397490980837
      }]
    },
    {
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
        "images/gem-09.gif"
      ],
      reviews: [{
        stars: 1,
        body: "This gem is WAY too expensive for its rarity value.",
        author: "turtleguyy@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "BBW: High Shine != High Quality.",
        author: "LouisW407@example.org",
        createdOn: 1397490980837
      }, {
        stars: 1,
        body: "Don't waste your rubles!",
        author: "nat@example.org",
        createdOn: 1397490980837
      }]
    }
  ];
})();

// 8. Using Gallery Controller

//Now that we've got an awesome GalleryController, let's wire it up to the page:
// index.html
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body class="list-group" ng-controller="StoreController as store">
    <header>
      <h1 class="text-center">Flatlander Crafted Gems</h1>
      <h2 class="text-center">– an Angular store –</h2>
    </header>
    <div class="list-group-item" ng-repeat="product in store.products">
      <h3>
        {{product.name}}
        <em class="pull-right">{{product.price | currency}}</em>
      </h3>

      <!-- Image Gallery  -->
      // a. Attach GalleryController to the .gallery element that wraps our gallery; use the alias gallery.
      <div class='gallery'ng-controller = "GalleryController as gallery" ng-show="product.images.length">
        // b. Change the first ng-src directive to use the current property. Properly use current as the index instead of 0.
        <!--<img ng-src="{{product.images[0]}}" />-->
        <img ng-src="{{product.images[gallery.current]}}" />
        <ul class="list-inline thumbs">
          <li class="thumbnail" ng-repeat="image in product.images">
            <img ng-src="{{image}}" />
          </li>
        </ul>
      </div>

      <section class="tab" ng-controller="TabController as tab">
        <ul class="nav nav-pills">
          <li ng-class="{ active: tab.isSet(1) }">
            <a href ng-click="tab.setTab(1)">Description</a></li>
          <li ng-class="{ active: tab.isSet(2) }">
            <a href ng-click="tab.setTab(2)">Specs</a></li>
          <li ng-class="{ active: tab.isSet(3) }">
            <a href ng-click="tab.setTab(3)">Reviews</a></li>
        </ul>
        <div ng-show="tab.isSet(1)">
          <h4>Description</h4>
          <blockquote>{{product.description}}</blockquote>
        </div>
        <div ng-show="tab.isSet(2)">
          <h4>Specs</h4>
          <blockquote>Shine: {{product.shine}}</blockquote>
        </div>
        <div ng-show="tab.isSet(3)">
          <h4>Reviews</h4>
        </div>
      </section>
    </div>
  </body>
</html>