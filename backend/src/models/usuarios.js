const {Schema, model} = require ('mongoose');

const userSchema = new Schema({
    usuario : {
        type: String,
        required: true,
    },
    nombre : {
        type: String,
        required: true,
    },
    apellido : {
        type: String,
        required: true,
    },
    n_documento : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    fec_Nacimiento : {
        type: String,
        required: true,
    },
    admin : {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});


module.exports = model('Usuarios', userSchema);