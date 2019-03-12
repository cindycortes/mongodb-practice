const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', { useNewUrlParser: true })

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    }, 
    rating: {   // data validation
        type: Number,
        min: 1,
        max: 10
    }, 
    review: String
});

//model of a schema
const Fruit = mongoose.model('Fruit', fruitSchema) // mongoose will create a plural collection and drop the capital letter

// new fruit 
const fruit = new Fruit ({
    
    rating: 9, 
    review: "Peaches are delicious."
})

fruit.save();

//new person

const personSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    favouriteFruit: fruitSchema
})

const Person = mongoose.model('Person', personSchema)

const pineapple = new Fruit({
    name: "Pineapple", 
    score: 9, 
    review: "Great fruit."
});

pineapple.save();

const person = new Person ({
    name: 'Amy', 
    age: 12,
    favouriteFruit: pineapple
})

person.save();




//Find All Documents
const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits)
        callback(fruits);
    });
}

Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err);
    }else {
        mongoose.connection.close();

        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});

// Updating the document
Fruit.updateOne({_id: "ref #"}, {name: "Peach"}, function(err){
    if(err) {
        console.log(err);
    }else {
        console.log('successfully updated the document."')
    }
})

// Deleting the document:
Fruit.deleteOne({name: "Peach"}, function(err){
    if(err) {
        console.log(err)
    } else {
        console.log('Successfully deleted the document')
    }
});