const mongoose = require('mongoose');



const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
            .then(()=>{
                console.log('********** Mongodb connected **********');
            })
            .catch((err)=>{
                console.log('Error to connect Mongodb :- ',err.message);
            })
    }catch(err){
        console.log('Internal Server error :- ',err);
    }
}

module.exports = connectDB;

