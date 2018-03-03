// 1.  Refactoring Description Tab 

//Notice that we have created an empty html file called product-description.html. 
//Separate out the Description Tab's content into the new html file. Include the 
//product-description.html in our index where it belongs.

//index.html

<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
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
        <div ng-controller="GalleryController as gallery"  ng-show="product.images.length">
          <div class="img-wrap">
            <img ng-src="{{product.images[gallery.current]}}" />
          </div>
          <ul class="img-thumbnails clearfix">
            <li class="small-image pull-left thumbnail" ng-repeat="image in product.images">
              <img ng-src="{{image}}" />
            </li>
          </ul>
        </div>

        <!-- Product Tabs  -->
        <section ng-controller="TabController as tab">
          <ul class="nav nav-pills">
            <li ng-class="{ active:tab.isSet(1) }">
              <a href ng-click="tab.setTab(1)">Description</a>
            </li>
            <li ng-class="{ active:tab.isSet(2) }">
              <a href ng-click="tab.setTab(2)">Specs</a>
            </li>
            <li ng-class="{ active:tab.isSet(3) }">
              <a href ng-click="tab.setTab(3)">Reviews</a>
            </li>
          </ul>
// a. Separate out our description tab into product-description.html.

// b. Include product-description.html inside the description tab.

          <!--  Description Tab's Content  -->
          <div ng-show="tab.isSet(1)" ng-include="'product-description.html'">
            
          </div>

          <!--  Spec Tab's Content  -->
          <div ng-show="tab.isSet(2)">
            <h4>Specs</h4>
            <ul class="list-unstyled">
              <li>
                <strong>Shine</strong>
                : {{product.shine}}</li>
              <li>
                <strong>Faces</strong>
                : {{product.faces}}</li>
              <li>
                <strong>Rarity</strong>
                : {{product.rarity}}</li>
              <li>
                <strong>Color</strong>
                : {{product.color}}</li>
            </ul>
          </div>

          <!--  Review Tab's Content  -->
          <div ng-show="tab.isSet(3)">
            <!--  Product Reviews List -->
            <ul>
              <h4>Reviews</h4>
              <li ng-repeat="review in product.reviews">
                <blockquote>
                  <strong>{{review.stars}} Stars</strong>
                  {{review.body}}
                  <cite class="clearfix">—{{review.author}}</cite>
                </blockquote>
              </li>  
            </ul>

            <!--  Review Form -->
            <form name="reviewForm" ng-controller="ReviewController as reviewCtrl" ng-submit="reviewCtrl.addReview(product)">

              <!--  Live Preview -->
              <blockquote >
                <strong>{{reviewCtrl.review.stars}} Stars</strong>
                {{reviewCtrl.review.body}}
                <cite class="clearfix">—{{reviewCtrl.review.author}}</cite>
              </blockquote>

              <!--  Review Form -->
              <h4>Submit a Review</h4>
              <fieldset class="form-group">
                <select ng-model="reviewCtrl.review.stars" class="form-control" ng-options="stars for stars in [5,4,3,2,1]" title="Stars">
                  <option value>Rate the Product</option>
                </select>
              </fieldset>
              <fieldset class="form-group">
                <textarea ng-model="reviewCtrl.review.body" class="form-control" placeholder="Write a short review of the product..." title="Review"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input ng-model="reviewCtrl.review.author" type="email" class="form-control" placeholder="jimmyDean@example.org" title="Email" />
              </fieldset>
              <fieldset class="form-group">
                <input type="submit" class="btn btn-primary pull-right" value="Submit Review" />
              </fieldset>
            </form>
          </div>

        </section>
      </div>

    </div>
  </body>
</html>

product-description.html

<h4>Description</h4>
            <blockquote>{{product.description}}</blockquote>


//2. Creating an Element Directive 

//Instead of using ng-include, lets create a custom directive called productDescription.

// a. Create an Element Directive for our Description div that includes the product-description.html.

//app.js
app.directive("productDescription", function() {
    return {
      restrict: 'E',
      templateUrl:"product-description.html"
    };  
  });

// b. Include the file on the page using a custom directive tag instead of ng-include.

//index.html
<!--  Description Tab's Content  -->
    
      <product-description ng-show="tab.isSet(1)"></product-description>


// 3. Creating an Attribute Directive

//As you probably have noticed, we have built out more information on the specs tab. 
//Let's refactor the contents of our specs div into an attribute directive.                    

// a. Move the contents inside the specs div to the product-specs.html.

//index.html
// see the above code for specs tab

//product-specs.html
<h4>Specs</h4>
            <ul class="list-unstyled">
              <li>
                <strong>Shine</strong>
                : {{product.shine}}</li>
              <li>
                <strong>Faces</strong>
                : {{product.faces}}</li>
              <li>
                <strong>Rarity</strong>
                : {{product.rarity}}</li>
              <li>
                <strong>Color</strong>
                : {{product.color}}</li>
            </ul>

//app.js
(function() {
  var app = angular.module('gemStore', []);

  app.controller('GalleryController', function(){
    this.current = 0;
    this.setCurrent = function(imageNumber){
      this.current = imageNumber || 0;
    };
  });

  app.controller('StoreController', function() {
    this.products = gems;
  });

  app.controller("TabController", function() {
    this.tab = 1;

    this.isSet = function(checkTab) {
      return this.tab === checkTab;
    };

    this.setTab = function(setTab) {
      this.tab = setTab;
    };
  });

  app.controller("ReviewController", function(){

    this.review = {};

    this.addReview = function(product){
      product.reviews.push(this.review);
      this.review = {};
    };

  });

  app.directive("productDescriptions", function() {
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
//b. Create a new attribute directive for our specs tag called productSpecs. 
//Have it use our new product-specs.html template.

  app.directive("productSpecs", function(){
    return {
      restrict:'A',
      templateUrl: "product-specs.html"
    };
  });

// c. In index.html, use your new attribute directive to show the product specs.

//index.html
<!--  Spec Tab's Content  -->
          <div ng-show="tab.isSet(2)" product-specs></div>

// 4. Refactoring Product Tabs 

//We feel like the Product Tabs section could be better managed if it were a directive.

//app.js
// a. Create an element directive called productTabs.
app.directive("productTabs", function() {
    return {
      restrict: 'E',
// b. Tell your new directive to use the product-tabs.html template with the templateUrl attribute.
      templateUrl: 'product-tabs.html'
      
      };
  });

// c. Give our productTabs directive all the tab functionality that is currently inside our TabController. 
//Make sure that you do not delete the TabController yet. We don't want to break the site.  
//app.js 
app.directive("productTabs", function() {
    return {
      restrict: 'E',
      templateUrl: 'product-tabs.html',
      controller: function() {
      this.tab = 1;

    this.isSet = function(checkTab) {
      return this.tab === checkTab;
    };
    this.setTab = function(activeTab) {
      this.tab = activeTab;
    };
    },
//d. Add the controllerAs attribute to your directive setting it to tab so the directive knows 
//what all the references to tab in product-tabs.html are.
    controllerAs: 'tab'
    };            
 });
//e. Put the tabs section inside of the provided product-tabs.html. Remove the ng-controller 
//from the section inside the file once moved.
//product-tabs.html
<section>
          <ul class="nav nav-pills">
            <li ng-class="{ active:tab.isSet(1) }">
              <a href ng-click="tab.setTab(1)">Description</a>
            </li>
            <li ng-class="{ active:tab.isSet(2) }">
              <a href ng-click="tab.setTab(2)">Specs</a>
            </li>
            <li ng-class="{ active:tab.isSet(3) }">
              <a href ng-click="tab.setTab(3)">Reviews</a>
            </li>
          </ul>
          <!--  Description Tab's Content  -->
          <div ng-show="tab.isSet(1)" ng-include="'product-description.html'">
          </div>

          <!--  Spec Tab's Content  -->
          <div product-specs ng-show="tab.isSet(2)"></div>

          <!--  Review Tab's Content  -->
          <product-reviews ng-show="tab.isSet(3)"></product-reviews>

        </section>
//f. Now remove the product tabs section from index.html and the TabController from app.js.
//g. Use our new productTabs directive where the tabs section used to be in our index.html.
<!-- Product Tabs  -->
        <product-tabs></product-tabs>


//5. Refactoring Product Gallery

//Now that we've separated the Product Tabs, why not separate the Gallery too?        

//a. Create an element directive called productGallery.
//app.js
app.directive('productGallery', function(){
    return {
      restrict: 'E',
      //b. Tell your new directive to use the product-gallery.html template with the templateUrl attribute.
      templateUrl: 'product-gallery.html'
    };
  });
//c. Give our productGallery directive all the gallery functionality that is currently inside 
//our GalleryController. Make sure that you do not delete the GalleryController yet. 
//We don't want to break the site.
app.directive('productGallery', function(){
    return {
      restrict: 'E',
      templateUrl: 'product-gallery.html',
      controller: function() {
        this.current = 0;
        this.setCurrent = function(imageNumber){
        this.current = imageNumber || 0;
      };
    },
//d. Add the controllerAs attribute to your directive setting it to gallery so the directive 
//knows what all the references to gallery in product-gallery.html are.    
    controllerAs: 'gallery'
    };   
  });  
//e. Put the gallery div inside of the provided product-gallery.html. Remove the 
//ng-controller from the div inside the file once moved.

//product-gallery.html
<div ng-show="product.images.length">
          <div class="img-wrap">
            <img ng-src="{{product.images[gallery.current]}}" />
          </div>
          <ul class="img-thumbnails clearfix">
            <li class="small-image pull-left thumbnail" ng-repeat="image in product.images">
              <img ng-src="{{image}}" />
            </li>
          </ul>
        </div>
//f. Now remove the image gallery div from index.html and the GalleryController from app.js.
//g. Use our new productGallery directive where the gallery div used to be in our index.html.
//index.html
        <!-- Image Gallery  -->
        <product-gallery></product-gallery>
