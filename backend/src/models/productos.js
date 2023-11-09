const {Schema, model} = require ('mongoose');

const productSchema = new Schema({
    CodigoBarras: {
        type: Number,
        required: true,
    },
    Nombre: {
        type: String,
        required: true,
    },
    Cantidad: {
        type: Number,
        required: true,
    },
    Precio: {
        type: Number,
        required: true,
    },
    Oferta: {
        type: Number,
        required: true,
    },
    PrecioF: {
        type: Number,
        required: true,
    },
    Tipo_producto: {
        type: String,
        required: true,
    },
    
}, {
    timestamps: true,
});

module.exports = model('Productos', productSchema);