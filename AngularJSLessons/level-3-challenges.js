// 1. Displaying Reviews should seem repetitive 

//We added reviews to all the products, as you can see in the js file. Inside our Reviews
//tab display ALL the reviews for a product. Make sure you show the reviews body, author, and stars.
//index.html
<!DOCTYPE html>
<html ng-app="gemStore">
  <head>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
    <script type="text/javascript" src="angular.min.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </head>
  <body ng-controller="StoreController as store">
    <header>
      <h1 class="text-center">Flatlander Crafted Gems</h1>
      <h2 class="text-center">– an Angular store –</h2>
    </header>
    <div class="list-group">
      <div class="list-group-item" ng-repeat="product in store.products">
        <h3>{{product.name}} <em class="pull-right">{{product.price | currency}}</em></h3>
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
        <section ng-controller="TabController as tab">
          <ul class="nav nav-pills">
            <li ng-class="{ active:tab.isSet(1) }">
              <a href="" ng-click="tab.setTab(1)">Description</a>
            </li>
            <li ng-class="{ active:tab.isSet(2) }">
              <a href="" ng-click="tab.setTab(2)">Specs</a>
            </li>
            <li ng-class="{ active:tab.isSet(3) }">
              <a href="" ng-click="tab.setTab(3)">Reviews</a>
            </li>
          </ul>
          <div ng-show="tab.isSet(1)">
            <h4>Description</h4>
            <blockquote>{{product.description}}</blockquote>
          </div>
          <div ng-show="tab.isSet(2)">
            <h4>Specs</h4>
            <blockquote>Shine: {{product.shine}}</blockquote>
          </div>

          <!--  Review Tab's Content  -->
          <div ng-show="tab.isSet(3)">
            <!--  Product Reviews List -->
            <ul>
              <h4>Reviews</h4>
              // a. You need to create multiple li's for each review that exists.
              <li ng-repeat ="review in product.reviews>
                <blockquote>
                // b. Set the blockquote stars ( strong tag) to the review stars.
                  <strong>{{review.stars}} Stars</strong>
                  
                  //c. Add the review body between the strong & cite tags.
                  {{review.body}}
                  // d. Set the cite to the review author.
                  <cite class="clearfix">{{review.author}}</cite>
                </blockquote>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </body>
</html>


// 2. Create a Review Form

//We have provided a form below the list of reviews and a preview blockquote that will 
//show when the form is being filled out. Add ng-model to each input item stars, body, 
//and author. Remember, each one is a part of the review object as a whole.
//index.html

//continue from above code 
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
            <form name="reviewForm">
              <!--  Live Preview -->
              <blockquote>
                <strong> Stars</strong>
                
                <cite class="clearfix">—</cite>
              </blockquote>

              <!--  Review Form -->
              <h4>Submit a Review</h4>
              <fieldset class="form-group">
              // a. Use ng-model for review.stars select form field.
                <select ng-model="review.stars" class="form-control" ng-options="stars for stars in [5,4,3,2,1]"  title="Stars">
                  <option value="">Rate the Product</option>
                </select>
              </fieldset>
              <fieldset class="form-group">
              
              // b. Use ng-model for review.body for the forms textarea. 
                <textarea ng-model="review.body" class="form-control" placeholder="Write a short review of the product..." title="Review"></textarea>
              </fieldset>
              <fieldset class="form-group">
              
              // c. Use ng-model for review.author – the email field.
                <input ng-model="review.author" type="email" class="form-control" placeholder="jimmyDean@example.org" title="Email" />
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

//3. Review Live Preview!

//Display all three parts of the review in the preview blockquote.

continuation from the above code 

            <!--  Review Form -->
            <form name="reviewForm">
              <!--  Live Preview -->
              <blockquote>
              a. In the strong tag, before Stars, put in the right expression to display 
              review.stars. Keep the space prior to Stars
                <strong>{{ review.stars }} Stars</strong>
              
              b. On the blank line with no tags put in the right expression to display review.body
                {{ review.body }}
                
              c. In the cite tag, immediately after the -, put in the right expression to display review.author.  
                <cite class="clearfix">-{{ review.author }}</cite>
              </blockquote>

              <!--  Review Form -->
              <h4>Submit a Review</h4>
              ......same as above.....

//4. Creating Review Controller 

//Create a ReviewController and inside of it an empty review ripe for the stuffing! Then below 
that create the functionality to create new reviews.

//app.js

(function() {
  var app = angular.module('gemStore', []);

  app.controller('StoreController', function(){
    this.products = gems;
  });

  app.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(tab){
      this.tab = tab;
    };

    this.isSet = function(tab){
      return (this.tab === tab);
    };
  });

  app.controller('GalleryController', function(){
    this.current = 0;

    this.setCurrent = function(index){
      this.current = index;
    };
  
  a. Create a new controller called ReviewController.
    app.controller('ReviewController', function(){
    
    b. Set our review variable to an empty object when the ReviewController is created.
      this.review = {};
      
      c. Create an empty function named addReview in your ReviewController.
      d. We'll pass in the product we want to review to our addReview function.
      Edit your function declaration to accept a product parameter.
        this.addReview = function(product){
          
          e. When addReview is called with a product, it should add the review from 
          the controller to the passed-in product's reviews array. Implement this 
          functionality in the addReview method.
          
           product.reviews.push(this.review);
           
           f. Reset the review to an empty object after it's been added to product.reviews.
           this.review={};
        };
    });
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

//5. Using Review Controller 

//Assign the review controller we just created to our form and use the alias reviewCtrl 
to reference it inside the form. On submission of the form save the new review.

code continued from above.....
            <!--  Review Form -->
          a. Inside the form tag create a ng-controller attribute and assign it to the 
          ReviewController with an alias of reviewCtrl.  

          b. Inside the form tag create a ng-submit attribute. Set the value of the 
          ng-submit attribute to call our new addReview function. Remember to pass in 
          product when calling the addReview function.
          
          <form name="reviewForm" ng-controller="ReviewController as reviewCtrl" ng-submit="reviewCtrl.addReview(product)">
            
            d. If you will notice, our live preview is no longer working. Try and figure out why and get the preview blockquote working again!
              <!--  Live Preview -->
              <blockquote>
                <strong>{{reviewCtrl.review.stars}} Stars</strong>
                {{reviewCtrl.review.body}}
                <cite class="clearfix">—{{reviewCtrl.review.author}}</cite>
              </blockquote>
              
            c. Prefix all three ng-models with the controller's alias.(add reviewCtrl)
              
              <!--  Review Form -->
              <h4>Submit a Review</h4>
              <fieldset class="form-group">
                <select ng-model="reviewCtrl.review.stars" class="form-control" ng-options="stars for stars in [5,4,3,2,1]" title="Stars">
                  <option value="">Rate the Product</option>
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








