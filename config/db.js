const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex',true);

mongoose.connect('mongodb://localhost:27017/sept-eccomerce',{useNewUrlParser:true}).then(function(){
    console.log('connecting to db')
}).catch(function(err){
    console.log('error connecting to db', err);
})

module.exports = {
    mongoose
}