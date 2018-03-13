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