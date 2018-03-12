// 1. Marvelous Merging 
//Fill in the blank with the correct answer.

//When we take the data from one document and place it inside another one, that's called an 
// embedded document.

//2. Related Realms 
//Fill in the blank with the correct answer.

// If we take a unique value like an _id from one document and store it as a value 
//within a related document, we have just created a referenced document.

//3. Lookout Incantations 

// For what reason might we want to consider referencing maker information instead of 
//embedding it within each wand?

// Atomic Writes

// Answer: Duplicate Data

// Single Query Access


//4.  Quantifying Queries 
//What's the minimum number of queries we'd have to write in order to retrieve a 
//document and its referenced data?

// 1
//Answer: 2
// 3

//5. Chalice of Choices 
//Which modeling option would give us all the data we need with a single query, 
//support for atomic writes, and is great for data that is strongly related?

// Answer: Embedding

// Referencing

//6. Cauldrons of Considerations
// Which data modeling decision doesn't have default support for atomic writes 
//across multiple documents and should be utilized with care?

// Embedded

// Answer: Referenced

//7.  Casting Choices
//In general, what's the best option to first consider for modeling your related data?

//Answer: Embedding

//Referencing


//8. Unique Users 250 PTS
//Which data modeling option would be the best fit for storing users and their addresses 
//when we know that the data is used together often, won't be changing regularly, and 
//each user will only be storing a few addresses?

//Answer: Embedding

// Referencing

//9. Charming Cars
//We'd like to store information about cars, and each car can have a few hundred parts. 
//Most of the time, we won't be needing specific information about each part. 
//Which data modeling route should we take?

// Embedding

//Answer: Referencing

//10. Charming Changes 
//Which modeling route is best when we have data that is constantly changing and will 
//help prevent data inconsistencies from arising?

// Embedding

//Answer: Referencing

//11. Bewitched Access 
// Which data modeling route allows us to access our data independently instead of 
//having to use something like dot notation to get information?

// Embedding

//Answer: Referencing