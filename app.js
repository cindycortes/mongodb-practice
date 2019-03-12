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
    
    rating: 34, 
    review: "Pretty solid as a fruit."
})

fruit.save();

//new person

const personSchema = new mongoose.Schema({
    name: String, 
    age: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person ({
    name: 'John', 
    age: 37
})

// person.save();




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