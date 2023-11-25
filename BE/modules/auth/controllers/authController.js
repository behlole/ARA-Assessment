const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const mappings = require('../../../utils/responseMappings');
module.exports = {
    login: (req, res) => {
        return res.send({})
    },
    register: async (req, res) => {
        let {name, email, password} = req.body;
        password = bcrypt.hashSync(password, 5)

        let user = await User.create({
            name,
            email,
            password
        })
        await user.save()
        console.log(user);
        let payload = jwt.sign({name: user.name, email: user.email}, "abcdefghijklmnopqrstuvwxyz")
        return mappings.getSuccessMessage(res, "User Registered", payload);
    }
}
