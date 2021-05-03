const { validationResult } = require("express-validator");

const camposPost = (req, res, next) => {
    //Utilizamos el metodo validator de express 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors
        });
    }
    next();
}

module.exports = { camposPost };