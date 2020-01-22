const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports = {
    async store(req, res) {
        var { email } = req.body;

        const userExists = await User.findOne({email});

        if(userExists) 
            return res.json({error: 'Usuário já cadastrado'});

        const user = await User.create(req.body)
        user.senha = undefined;

        return res.json({
            user,
            token: generateToken({id: user.id})
        });
    },
    async login(req, res) {
        const { email, senha } = req.body;

        const user = await User.findOne({email}).select('+senha');
        if(!user) 
            return res.status(400).send({error: 'Usuário não encontrado'})

        if(!await bcrypt.compare(senha, user.senha))
            return res.status(400).send({error: 'Senha inválida'})
        
        user.senha = undefined;

        res.send({
            user, 
            token: generateToken({id: user.id})
        });
    },
    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true }, error => {
            if (error) return res.status(400).json({error: 'Erro ao atualizar!'});
        })

        user.senha = undefined;

        return res.json({user, msg: 'Atualizado com sucesso!'});
    },
    async delete(req, res) {
        const user = await User.findByIdAndRemove(req.params.id, req.body, error => {
            if (error) return res.status(400).json({error: 'Erro ao deletar!'});
        });
        return res.json({user, msg: 'Deletado com sucesso!'});
    }
}