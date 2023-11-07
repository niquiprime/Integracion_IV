const {Schema, model} = require ('mongoose');

const productSchema = new Schema({
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
    Tipo_Producto: {
        type: String,
        required: true,
    },
    CodigoBarras: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model('Productos', productSchema);