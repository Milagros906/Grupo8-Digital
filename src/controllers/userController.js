const path = require('path');

module.exports = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '../views/register.ejs'))
    },
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/login.ejs'))
    }
}
