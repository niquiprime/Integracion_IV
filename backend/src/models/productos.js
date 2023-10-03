const {Schema, model} = require ('mongoose');

const productSchema = new Schema({
    Nombre: {
        type: String,
        required: true,
    },
    Precio: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = model('Productos', productSchema);