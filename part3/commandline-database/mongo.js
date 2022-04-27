console.log(process.argv.length);

if (process.argv.length < 3) {
  console.log('Pls add password: node mongo.js <password>')
  process.exit(1)
}

// require and connection
const mongoose = require('mongoose')
const password = process.argv[2]
const url = `mongodb+srv://mongo1:${password}@cluster0.kikax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url);

//Create Schema
const personSchema = new mongoose.Schema({
  'name': String,
  'number': String
});

//Create model
const Person = new mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(data => {
    console.log('phonebook:');
    data.forEach(p => {
      console.log(`${p.name}`, `${p.number}`);
    });

    mongoose.connection.close();
  });
  
}

if (process.argv.length > 3) {
  //Create model instance
  const person = new Person({
    "name": process.argv[3], 
    "number": process.argv[4]
  });

  //Save instance to db
  person.save().then(result => {
    console.log('person saved! Yeee...!');
    mongoose.connection.close();
  });
}