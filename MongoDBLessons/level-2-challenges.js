// 1. Oblitero Wand I 

//While Merlin was looking through our wand information, he suddenly began to panic 
//about a wand named the "Doom Bringer" and he ran out screaming. We should probably 
//get rid of that wand if it scares a great wizard like Merlin.

//Write the command to remove the wand with the name of "Doom Bringer" from our wands collection.
db.wands.remove({"name":"Doom Bringer"})
WriteResult({ 'nRemoved' : 1 })
//Congratulations, you're correct!

// 2. Oblitero Wand II

//When we removed the "Doom Bringer" wand, we noticed that it had a power of "Death", 
//and we don't want any wands like that in our database. To be safe, let's remove 
//any wands containing that in their powers.
> db.wands.remove({"powers":"Death"})
///Congratulations, you're correct!

// 3. Wand Reductions

//The makers of the "Devotion Shift" wand have decided to reduce its price since no one is 
//showing interest in their luxury wand.

// a. Write the command to update the wand with a name of "Devotion Shift" and set the 
//price to 5.99.
db.wands.update(
  {"name":"Devotion Shift"}, 
  {"$set": {"price":5.99}}
)

// 4. Magical Regulations

//The Grand House of Magic recently passed a law that all wands with "Fire" in their list of 
//powers must increase their level_required field by 2. We need to update all wands that 
//have been affected by the new law.

// a. First, let's add the query parameter to find all wands that include "Fire" in their powers.
db.wands.update(
  {"powers":"Fire"},
// b. Great! Now add an update parameter to increment the level_required by 2.
  {"$inc":{"level_required": 2}},
  // c. Now that we have a working update command, change it so that the update will apply 
  //to all documents that match the query.
  {"multi": true}
)

// 5.  User Chronicles 

//We'd like to see which wands users are looking at most. To do this, we'll use the logs 
//collection that contains documents that record the name and count for each wand.

db.logs.update(
// a. First, let's add the query parameter to find a wand with the name of "Dream Bender".
  {"name":"Dream Bender"}
  // b. Great! Now add the update parameter to increment the count field by 1.
   {"$inc":{"count":1}},
   // c. Add the option that will create a new document if none match the query 
   //or update an existing document.
   {"upsert": true}
)
