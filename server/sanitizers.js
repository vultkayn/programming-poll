const {validationResult} = require('express-validator');

exports.validateSanitization = (req, res, next) => {
    let errors = validationResult(req);

    if (! errors.isEmpty())
    {
        errors = {
            errors: errors.mapped(),
            message: "Invalid fields",
            status: 400
        }
        next(errors);
    }
    else next();
}

