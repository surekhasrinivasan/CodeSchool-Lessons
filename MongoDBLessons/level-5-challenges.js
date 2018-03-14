//1. Many Makers 
//Not only have we been adding wands, but our users have been adding new ones daily! 
//Let's create a list of all the unique wand makers in our database.

//Write an aggregate to group wands by their maker so that we'll get a list of unique makers.

db.wands.aggregate([{"$group":{"_id":"$maker"}}])

//2. Detecting Damage 
//Most of our users only care about the magic damage for their wand. After all, what's 
//the point of doing awesome spells at low levels? Let's find out how many wands we have 
//for each damage.magic score.

// a. Write an aggregate that groups wands by their damage.magic.
db.wands.aggregate([{"$group":{"_id":"$damage.magic"}}])

// b. Add an accumulator with a wand_count field to count the number of wands per damage.magic score.
db.wands.aggregate([{"$group":{"_id":"$damage.magic","wand_count":{"$sum":1}}}])

//3. Royal Connoisseurs
//Our site is a popular resource for wand collectors to find wands by makers they don't yet have. 
//One ambitious connoisseur has asked how much it would cost to buy all the wands for each vendor. 
//Let's find out!

//a. Write an aggregate that groups our wands by the maker field.

db.wands.aggregate([{"$group":{"_id":"$maker"}}])

//b. Add an accumulator with the total_cost field that sums the price for each wand per maker.

db.wands.aggregate([{"$group":{"_id":"$maker", "total_cost":{"$sum":"$price"}}}])

//4. Mischievous Makers
//They say that knowledge is power. Let's see what sort of interesting information 
//we can find out based on the data we have. We have a slight suspicion that wand makers like 
//to charge more for wands at "monumental levels". Time to prove it!

//a. Write an aggregate to group wands by their level_required.

db.wands.aggregate([{"$group":{"_id":"$level_required"}}])

//b. Add an accumulator with a field named price_average to get the average price for 
//the wands per level.

db.wands.aggregate([{"$group":{"_id":"$level_required","price_average":{"$avg":"$price"}}}])

//5. A Glimmering Guide
//Let's put together a simple buyer's guide with some basic stats about makers to help 
//our users quickly make wand decisions.

//a. Write an aggregate to group wands by their maker.

db.wands.aggregate([{"$group":{"_id":"$maker"}}])

//b. Add an accumulator with the field total_wands to sum the number of wands each maker has.

db.wands.aggregate([{"$group":{"_id":"$maker", "total_wands":{"$sum":1}}}])

//c. Now add an accumulator with the field max_magic that finds that greatest damage.magic per maker.

db.wands.aggregate([{"$group":{
                                "_id":"$maker", 
                                "total_wands":{"$sum":1},
                                "max_magic":{"$max":"$damage.magic"}
}}]);

//d. Lastly, add one more accumulator with the field lowest_price that finds the lowest wand price per maker.

db.wands.aggregate([{"$group":{
                                "_id":"$maker", 
                                "total_wands":{"$sum":1},
                                "max_magic":{"$max":"$damage.magic"},
                                "lowest_price":{"$min":"$price"}
}}]);

//6. Lower-level Castings 
//Some wand powers can be harder to find in lower-level wands. We've heard that the power
//"Air Bolt" is a really fun one to have. Let's find out which makers offer a wand with that 
//power and find the lowest level_required per maker.

//a. Write an aggregate that will only match wands that have "Air Bolt" in their list of powers.

db.wands.aggregate([{"$match":{"powers":"Air Bolt"}}])

//b. Add another aggregate stage to group the data by their maker.

db.wands.aggregate([{"$match":{"powers":"Air Bolt"}},
                   {"$group":{"_id":"$maker"}}])
                   
//c. Add an accumulator with a field named lowest_level that finds the lowest level_required per maker.                   

db.wands.aggregate([{"$match":{"powers":"Air Bolt"}},
                   {"$group":{"_id":"$maker", "lowest_level":{"$min":"$level_required"}}}])

//7. Budget Castings 
//A user has asked us to find out which makers have wands that are under 50 gems and 
//have a damage.magic average above 40.

//a. Write an aggregate to match wands that have a price that is less than 50.

db.wands.aggregate([{"$match":{"price":{"$lt":50}}}])

//b. Add the aggregate stage to group the wands by their maker.

db.wands.aggregate([{"$match":{"price":{"$lt":50}}},
                   {"$group":{"_id":"$maker"}}])

//c. Add an accumulator with a field named average_magic to find the average damage.magic 
//per maker using the $avg accumulator.                   

db.wands.aggregate([{"$match":{"price":{"$lt":50}}},
                   {"$group":{"_id":"$maker", "average_magic":{"$avg":"$damage.magic"}}}])

//d. Now that we've got our data all set, let's filter it down further.

//Below the existing $match and $group aggregates, add another $match aggregate so that 
//we're only retrieving results with an average_magic that is greater than 40.

db.wands.aggregate([{"$match":{"price":{"$lt":50}}},
                   {"$group":{"_id":"$maker", "average_magic":{"$avg":"$damage.magic"}}},
                   {"$match":{"average_magic":{"$gt":40}}}])

//8. Clairvoyant Decisions
//We're always on the lookout for the best wand for its value. Let's find out the top 5 makers 
//that offer the most magic damage for a wand in our level range.

//a. Write an aggregate that finds wands that have a level_required that's less than or equal to 5.

db.wands.aggregate([{"$match":{"level_required":{"$lte":5}}}])

//b. Add the aggregate stage to group the wands by their maker.

db.wands.aggregate([{"$match":{"level_required":{"$lte":5}}},
                   {"$group":{"_id":"$maker"}}])

//c. Add an accumulator with the field max_damage that finds the max damage.magic per maker.                   

db.wands.aggregate([{"$match":{"level_required":{"$lte":5}}},
                   {"$group":{"_id":"$maker", "max_damage":{"$max":"$damage.magic"}}}])                   

//d. Now that we have the bulk of our data, let's go ahead and sort the max_damage in descending order.

db.wands.aggregate([{"$match":{"level_required":{"$lte":5}}},
                   {"$group":{"_id":"$maker", "max_damage":{"$max":"$damage.magic"}}},
                   {"$sort":{"max_damage":-1}}]);

//e. Add a limit stage so that we only find the first 4 results. After all, we don't have all day to look through wands!

db.wands.aggregate([{"$match":{"level_required":{"$lte":5}}},
                   {"$group":{"_id":"$maker", "max_damage":{"$max":"$damage.magic"}}},
                   {"$sort":{"max_damage":-1}},
                   {"$limit": 4}]);

//f. There's one more stage we can add to our pipeline to make sure it's fully optimized. 
//Since we only need the maker and damage.magic fields, add a $project stage that only passes 
//those fields along to the rest of operators.

//Remember, where you place this is important!
                   
db.wands.aggregate([{"$match":{"level_required":{"$lte":5}}},
                    {"$project":{"_id":false,"maker":true, "damage.magic":true}},
                   {"$group":{"_id":"$maker", "max_damage":{"$max":"$damage.magic"}}},
                   {"$sort":{"max_damage":-1}},
                   {"$limit": 4}]); 