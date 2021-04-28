const mongoose = require('mongoose');

const dbConnection = async () =>{
    try {
        console.log('init db config');

//        const mongoose = require('mongoose');
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true
        });
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el Administrador');
    }
};

module.exports = {
    dbConnection 
};