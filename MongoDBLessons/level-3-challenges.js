// 1. Picky Preferences

//When it comes to wands, it's okay to be picky about which one we want.
// a. First, find all the wands where the maker is "Moonsap".
db.wands.find(
  {"maker":"Moonsap"}
)
  //b. Now, update the query to only retrieve wands that have a level_required of 5.
db.wands.find(
 {"maker": "Moonsap",
  "level_required":5
 }
)

// 2. Supernatural Stats 

//Believe it or not, some lower-level wands have better stats than those that 
//are equal to our current level.

//Write a query for wands that have a level_required that is less than or equal to 5.
db.wands.find(
  {"level_required": {"$lte":5}}
)

// 3.  All You Need Is Love

//Wands can only have a few powers, so it's important to make sure your wand doesn't 
//contain any powers you don't like.

//Write a query for wands that do not include "Love Burst" in their powers.
db.wands.find(
  {"powers":{"$ne":"Love Burst"}}
)

// 4. Marvelously Mighty Melee

//At our current level, we can't do much magic damage yet, but we can do melee damage 
//all the way up to 40.

//Let's find out which wands have a "damage.melee" that is greater than or 
//equal to 30 and less than or equal to 40.
db.wands.find(
  {"damage.melee":{"$gte":30, "$lte":40}}
)

// 5. Bananas for Wands

//Wands come in a variety of lengths, and the magic folk use bananas for measurement. 
//We've added a new lengths field to each wand that contains an array of the different 
//lengths a wand comes in.

//To find a proper wand, we'll need one that fits our size.

//Write a query that will find any wands that contain lengths that are greater 
//than or equal to 2.5 but less than 3. Remember, arrays can be tricky!
db.wands.find(
  {"lengths":{"$elemMatch":{"$gte":2.5,"$lt":3}}}
)

// 6. Merlin's Mythical Madness

//Now that we're getting pretty good at finding wands, let's find the perfect wand 
//for our friend Merlin.

// a. Merlin's first requirement is the wand must not be made by "Foxmond".
//Write the query to find wands that don't have "Foxmond" as the maker.
db.wands.find(
  {"maker":{"$ne":"Foxmond"}}
)
// b. Next, Merlin's level is 75 so we'll want to add a query for a level_required 
//that is less than or equal to 75.
db.wands.find(
  {"maker":{"$ne":"Foxmond"},
    "level_required":{"$lte":75}}
)
// c. Merlin doesn't want to spend more than 50 gems. Add another query that makes
//sure the price is less than 50.
db.wands.find(
  {"maker":{"$ne":"Foxmond"},
    "level_required":{"$lte":75},
    "price":{"$lt":50}}
)
// d. Lastly, make sure the wand is 3 to 4 banana lengths. Remember, arrays can be tricky!
db.wands.find(
  {"maker":{"$ne":"Foxmond"},
    "level_required":{"$lte":75},
    "price":{"$lt":50},
    "lengths":{"$elemMatch":{"$gte":3,"$lte":4}}
  }
)

// 7. Precise Projections

//We'd like to have an index page where users can see the name of all the wands we have in 
//our database.

//Write a query that will find all wands, but this time project only the name field. 
//Don't worry about the _id showing up in the results for now.
db.wands.find({},{"name": true})

//We've got all the names, but they're all jumbled up. Add a cursor method to sort 
//the names alphabetically.
db.wands.find({},{"name": true}).sort({"name":1})

// 8.  The Realm of Requirements

//We need to create a report detailing all the wand information except for 
//their price and lengths. Since non-developers will be looking at this report, 
//let's remove the _id as well.

//Write a query for all wands that excludes the price, lengths, and _id field.
db.wands.find({},{"price": false,"lengths":false,"_id":false})

//The criteria for the report have changed. We need to write a query to include 
//the name and powers fields.

//Include only the needed fields, but continue to exclude to _id field.
db.wands.find({},{"name": true,"powers":true,"_id":false})

// 9. Casting the Count

//For the sake of science and all things good, let's find out how many wands only 
//have a level_required of 2.

//Write a query to find wands with a level_required of 2, and then use the 
//appropriate cursor method to count the total.
db.wands.find({"level_required":2}).count()

// 10. The Cursor's Crystal Ball

//Finish the code below so that only 8 wands are returned by the cursor for each page:
db.wands.find({}).skip(0).limit(8)
//Correct

// 11. Fantastical Findings

//Some really famous wizards and sorceresses are interested in finding out information
//about the most expensive wands we have. Let's pull the data on our top three most 
//expensive wands.

//First, let's write a query to match all wands.
db.wands.find()

//Next, add a cursor method to sort the wands in descending order by their price field.
db.wands.find().sort({"price":-1})

//Lastly, add another cursor method to limit the results to only 3 documents.
db.wands.find().sort({"price":-1}).limit(3)