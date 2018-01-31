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

// 6. Smelly Wands

//A few of the old wands included a smell field, and we're not exactly sure why anyone 
//thought that would be a relevant field. Let's get rid of it!
db.wands.update(
  {},
//Add the update parameter that will remove the smell field from all documents.
  {"$unset":{"smell":" "}},
  {"multi": true}
)

// 7. Disgruntled Wand Makers 

//We've been getting some complaints from wand makers that the term "creator" 
//doesn't properly convey the true nature of their craft. To make them happy, 
//we need to change the field creator to maker.
db.wands.update(
  {},
  //Add the update parameter that will rename the creator field to "maker" for all documents.
   {"$rename":{"creator":"maker"}},
  {"multi": true}
)

// 8.  Abracadabra Array Alterations I 

//We want to be the go-to source for wand information. Currently, we are listing one-word powers for each wand, 
//but we should probably start being more specific. Here's the document we'll be working with:
{
  "_id": ObjectId("56016414959123c11810f9ad"),
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire", "Love"],
  "damage": {"magic": 4, "melee": 2}
}
db.wands.update(
  {"name": "Dream Bender"},
//For the wand above, let's add the update parameter to set the value of "Fire" to "Fire Deflection" in the powers array.
//Remember that we only want to update a single array value, not all of the values in the array.
  {"$set":{"powers.0":"Fire Deflection"}}
)

// 9. Abracadabra Array Alterations II 

//We know that there are a lot of wands with the power of "Love", but the correct power is actually named "Love Burst". We'll need to update all wands that contain this power.
{
  "_id": ObjectId("56016414959123c11810f9ad"),
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire Deflection", "Love"],
  "damage": {"magic": 4, "melee": 2}
}
db.wands.update(
  {"powers": "Love"},
//Add the update parameter using the positional operator to change the value of "Love" to "Love Burst".
  {"$set":{"powers.$":"Love Burst"}},
  {"multi": true}
)

// 10. Abracadabra Array Alterations III 

//While some people may know that wands can cast spells, others may think they're just fancy sticks. 
//Let's add "Spell Casting" to the list of powers for the "Dream Bender" wand.
{
  "_id": ObjectId("56016414959123c11810f9ad"),
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire Deflection", "Love Buster"],
  "damage": {"magic": 4, "melee": 2}
}
db.wands.update(
  {"name": "Dream Bender"},
//Add the update parameter that will add "Spell Casting" to the end of the powers array for this wand.
  {"$push":{"powers":"Spell Casting"}}
)

// 11. Abracadabra Array Alterations IV 

//Example document:
{
  "_id": ObjectId("56016414959123c11810f9ad"),
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire Deflection", "Love Buster", "Spell Casting"],
  "damage": {"magic": 4, "melee": 2}
}
db.wands.update(
  {},
//Let's go ahead and add "Spell Casting" to every wand's powers array, but only if that power doesn't already exist.
  {"$addToSet":{"powers":"Spell Casting"}},
  {"multi": true}
)

// 12. Sensible Stats

//People are getting confused by the damage stats for each wand. We've been basing damage on a scale of 1-10, 
//but we should be using a scale of 1-100. We've gone ahead and updated "damage.magic" by multiplying the 
//original value by 10 for all the documents. Here's an example:

// { ...
//   "damage": {"magic": 4, "melee": 2}
// }
// This document was updated to:

// { ...
//   "damage": {"magic": 40, "melee": 2}
// }
db.wands.update(
  {},
//Check out the MongoDB documentation to learn how to use the $mul operator, and then use it multiply the value 
//of "damage.melee" by 10 for all documents.
  {"$mul":{"damage.melee":10}},
  {multi: true}
)