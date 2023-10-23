const {Schema, model} = require ('mongoose');

const userSchema = new Schema({
    name: String,
    apellido: String,
    n_documento: String,
    fec_Nacimiento: String,
    password: String,
}, {
    timestamps: true,
});


module.exports = model('eusuarios', userSchema);