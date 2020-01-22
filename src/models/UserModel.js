const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        require: true,
        min: 6,
        select: false
    }
},{
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

module.exports = model('User', UserSchema);