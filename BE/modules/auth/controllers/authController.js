const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const mappings = require('../../../utils/responseMappings');
module.exports = {
    login: async (req, res) => {
        let {email, password} = req.body;
        let user = await User.findOne({email: email});
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                let payload = jwt.sign({name: user.name, email: user.email}, "abcdefghijklmnopqrstuvwxyz")
                return mappings.getSuccessMessage(res, "User Registered", payload);
            }
        }

        return mappings.getErrorMessage(res, "Invalid Username/Password")
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
        let payload = jwt.sign({name: user.name, email: user.email}, "abcdefghijklmnopqrstuvwxyz")
        return mappings.getSuccessMessage(res, "User Registered", payload);
    }
}
