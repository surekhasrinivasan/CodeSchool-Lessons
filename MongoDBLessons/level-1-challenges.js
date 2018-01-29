// 1. Dispelling the Database 150 PTS

//We've inherited a database that stores information about magic wands.
//A MongoDB shell has been started below, so write the command that will set 
//the current database to wandRecorder.
//Remember, if you ever forget a command, you can use help.

//Type help to see the help menu
// Answer : use wandRecorder
//switched to db wandRecorder
//Congratulations, you're correct!

// 2. Conjuring Collections

//The wandRecorder database has wands already loaded inside of a collection named wands. 
//Write a command to find all of the documents in that collection.
> db.wands.find()
{
  "_id": ObjectId('f01a4524a6de4c8f98d4e8bf'),
  "name": "Journey End",
  "creator": "Foxmond",
  "level_required": 1,
  "price": 4.99,
  "powers": [
    "Molten",
    "Fire"
  ],
  "damage": {
    "magic": 0.7,
    "melee": 0.6
  }
}
{
  "_id": ObjectId('0d2b33b9fd424edc8aef5747'),
  "name": "Windsong",
  "creator": "Foxmond",
  "level_required": 80,
  "price": 4.99,
  "powers": [
    "Wind",
    "Serenity"
  ],
  "damage": {
    "magic": 9.3,
    "melee": 6.1
  }
}
{
  "_id": ObjectId('5605463508ab03e5d899234c'),
  "name": "Doom Bringer",
  "creator": "Foxmond",
  "level_required": 100,
  "price": 99.99,
  "powers": [
    "Death",
    "Destruction"
  ],
  "damage": {
    "magic": 10,
    "melee": 10
  }
}
{
  "_id": ObjectId('2db8f9de713b486cb6196340'),
  "name": "Destiny Fire",
  "creator": "Sageseer",
  "level_required": 2,
  "price": 24.99,
  "powers": [
    "Fire",
    "Spark"
  ],
  "damage": {
    "magic": 2,
    "melee": 2.6
  }
}
{
  "_id": ObjectId('46d9fc0c020a415e8c1f6df9'),
  "name": "Omega",
  "creator": "Pinebriar",
  "level_required": 25,
  "price": 4.99,
  "powers": [
    "Mind",
    "Reason"
  ],
  "damage": {
    "magic": 2.5,
    "melee": 2.5
  }
}
{
  "_id": ObjectId('5609e753bd62caa811c9abbd'),
  "name": "Riddle Bolt",
  "creator": "Moonsap",
  "level_required": 5,
  "price": 30.99,
  "powers": [
    "Earth",
    "Isolate"
  ],
  "damage": {
    "magic": 1.4,
    "melee": 0.4
  }
}
{
  "_id": ObjectId('5605400508ab03e5d8992349'),
  "name": "Death Bar",
  "creator": "Foxmond",
  "level_required": 100,
  "price": 99.99,
  "powers": [
    "Death",
    "Despair"
  ],
  "damage": {
    "magic": 10,
    "melee": 10
  }
}
{
  "_id": ObjectId('92952c3a0ba344e8a87fcfb5'),
  "name": "World Shaper",
  "creator": "Olivemist",
  "level_required": 24,
  "price": 54.99,
  "powers": [
    "Earth",
    "Arcane"
  ],
  "damage": {
    "magic": 4.4,
    "melee": 3.2
  }
}
{
  "_id": ObjectId('5605404d08ab03e5d899234b'),
  "name": "Widow Maker",
  "creator": "Foxmond",
  "level_required": 100,
  "price": 99.99,
  "powers": [
    "Death",
    "Horror"
  ],
  "damage": {
    "magic": 10,
    "melee": 10
  }
}
{
  "_id": ObjectId('c2b806d6edda4071839e4103'),
  "name": "Dream Caller",
  "creator": "Sageseer",
  "level_required": 74,
  "price": 64.95,
  "powers": [
    "Vision",
    "Mind"
  ],
  "damage": {
    "magic": 6.8,
    "melee": 3.4
  }
}
{
  "_id": ObjectId('7aa48b7bccb84f29bdc859b4'),
  "name": "Cometfell",
  "creator": "Moonsap",
  "level_required": 10,
  "price": 150.95,
  "powers": [
    "Solar",
    "Love"
  ],
  "damage": {
    "magic": 1.7,
    "melee": 2.3
  }
}
{
  "_id": ObjectId('fc25d06ad017449e8c31141a'),
  "name": "Life Mender",
  "creator": "Pinebriar",
  "level_required": 51,
  "price": 4.99,
  "powers": [
    "Healing",
    "Blessing"
  ],
  "damage": {
    "magic": 7,
    "melee": 1
  }
}
{
  "_id": ObjectId('7e9aac326a2146cba479ae7d'),
  "name": "Spirit Spire",
  "creator": "Pinebriar",
  "level_required": 15,
  "price": 4.99,
  "powers": [
    "Air",
    "Restoration"
  ],
  "damage": {
    "magic": 1.4,
    "melee": 3
  }
}
{
  "_id": ObjectId('d0a77e57a0544ec7ad5a740b'),
  "name": "Storm Seeker",
  "creator": "Olivemist",
  "level_required": 96,
  "price": 55.99,
  "powers": [
    "Wind",
    "Static"
  ],
  "damage": {
    "magic": 2,
    "melee": 5
  }
}
{
  "_id": ObjectId('5404bf9eb971425e86832c93'),
  "name": "Sacred Sun",
  "creator": "Moonsap",
  "level_required": 13,
  "price": 33.99,
  "powers": [
    "Solar",
    "Bless"
  ],
  "damage": {
    "magic": 1.7,
    "melee": 2.3
  }
}
{
  "_id": ObjectId('8bb40641abc24eba99505f3a'),
  "name": "Devotion Shift",
  "creator": "Pinebriar",
  "level_required": 2,
  "price": 34.99,
  "powers": [
    "Visions",
    "Soul"
  ],
  "damage": {
    "magic": 5,
    "melee": 1.7
  }
}
Congratulations, you're correct! 

// 3. Waving the Wand 

//We're proud of the shiny new wand we've just purchased, so let's add it to the wands 
//collection. Our wand's name is "Dream Bender" and its creator is "Foxmond".

//Write a command to insert our wand into the wands collection.

> db.wands.insert({"name":"Dream Bender", "creator":"Foxmond"})
WriteResult({ 'nInserted' : 1 })

Congratulations, you're correct!

//4. Hey, Have You Heard About Wands? 

//Our friend Merlin was asking about a wand by the name of "Storm Seeker". 
//Let's check the wands collection to see if we can find information about it.

> db.wands.find({"name":"Storm Seeker"});
{
  "_id": ObjectId('d0a77e57a0544ec7ad5a740b'),
  "name": "Storm Seeker",
  "creator": "Olivemist",
  "level_required": 96,
  "price": 55.99,
  "powers": [
    "Wind",
    "Static"
  ],
  "damage": {
    "magic": 2,
    "melee": 5
  }
}
Congratulations, you're correct!

// 5. Expecto Mongo Wand 

//Merlin must be losing his marbles, because he actually wanted us to search for 
//any wand created by "Moonsap".
//Write a query that finds all wands where the creator is "Moonsap".
> db.wands.find({"creator":"Moonsap"});
{
  "_id": ObjectId('5609e753bd62caa811c9abbd'),
  "name": "Riddle Bolt",
  "creator": "Moonsap",
  "level_required": 5,
  "price": 30.99,
  "powers": [
    "Earth",
    "Isolate"
  ],
  "damage": {
    "magic": 1.4,
    "melee": 0.4
  }
}
{
  "_id": ObjectId('7aa48b7bccb84f29bdc859b4'),
  "name": "Cometfell",
  "creator": "Moonsap",
  "level_required": 10,
  "price": 150.95,
  "powers": [
    "Solar",
    "Love"
  ],
  "damage": {
    "magic": 1.7,
    "melee": 2.3
  }
}
{
  "_id": ObjectId('5404bf9eb971425e86832c93'),
  "name": "Sacred Sun",
  "creator": "Moonsap",
  "level_required": 13,
  "price": 33.99,
  "powers": [
    "Solar",
    "Bless"
  ],
  "damage": {
    "magic": 1.7,
    "melee": 2.3
  }
}
Congratulations, you're correct!

// 6. Wand Summonings 

//There's a lot more about wands than just their name and creator, so let's add a 
//new wand with much more detailed information.
//shell Editor

// e.Now that we've built out a wand with all the correct information, go ahead 
//and insert it into the wands collection.
db.wands.insert({
  "name": "Dream Bender",
  "creator": "Foxmond",
  // a. Some wands require more experience than others. Let's record the minimum 
  //level needed to use a wand in a field named level_required. This particular wand 
  //requires level 10.
  "level_required": 10,
  // b. We would never think of selling our wand, but it's fun to know how much it's 
  //worth anyway. Let's record the price of our wand in a field named price. 
  //This particular wand is worth 34.9 gems.
  "price":34.9,
  // c. Each wand can have any number of special powers, like Fire, Teleportation, 
  //or Energy. Let's record all of these power options in a field named powers. 
  //This particular wand has powers of "Fire" and "Love", which should be stored in an array.
  "powers":["Fire","Love"],
  // d. Magical folk are a peace-loving people, but occasionally they need to throw down, 
  //so it's a good idea to store each wand's damage capability in a field named damage. 
  //Most wands can cause 2 types of damage — magic and melee.
  
  //The value of the damage field should be an object with 2 properties. The magic 
  //property for this wand is 4, and the melee property is 2.
  "damage":{"magic":4,"melee":2}
})

// 7. Finding the Perfect Wand 

//We've upgraded our wands with data for all of the new fields. Now we can write 
//fun queries to find out — for example — which wands have "Fire" in their list of powers. 
//Try writing a query based on this.
> db.wands.find({"powers":"Fire"})
{
  "_id": ObjectId('f01a4524a6de4c8f98d4e8bf'),
  "name": "Journey End",
  "creator": "Foxmond",
  "level_required": 1,
  "price": 4.99,
  "powers": [
    "Molten",
    "Fire"
  ],
  "damage": {
    "magic": 0.7,
    "melee": 0.6
  }
}
{
  "_id": ObjectId('2db8f9de713b486cb6196340'),
  "name": "Destiny Fire",
  "creator": "Sageseer",
  "level_required": 2,
  "price": 24.99,
  "powers": [
    "Fire",
    "Spark"
  ],
  "damage": {
    "magic": 2,
    "melee": 2.6
  }
}
Congratulations, you're correct!


// 8. Bad Magic 

//You're doing a great job inserting and querying data from the database. 
//Occasionally, though, you may run into some bad data.
//Case in point, the following 2 documents are problematic. Can you tell which validation 
//they break?
{
  "_id": ObjectId("1234567"),
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire", "Love"],
  "damage": {"magic": 4, "melee": 2}
},
{
  "_id": ObjectId("1234567"),
  "name": "Lightbane",
  "creator": "Elvira",
  "level_required": 4,
  "price": 4.2,
  "powers": ["Light", "Darkness"],
  "damage": {"magic": 10, "melee": 0}
}
//Answer: Unique _id
//Valid syntax
//Size less than 16 MB