import joi from 'joi';
import User from '../models/Users.js'
export const validateUser = async (req,res,next) => {

    const Schema = joi.object({
        firstname: joi.string().min(4).required(),
        lastname: joi.string().min(4).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,15}$'))
    })

    const validateResult = Schema.validate(req.body);
    if (validateResult.error) {
        return res.status(400).json(validateResult.error.message)
    }
    next()
}