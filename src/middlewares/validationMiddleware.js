import joi from 'joi';

const signUpValidator = (req,res,next) =>{

    const dataSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required(),
    });

    const validation = dataSchema.validate({ ...req.body }, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.details.map(d => d.message));
    }
    next();
}

const signInValidator = (req,res,next) =>{

    const dataSchema = joi.object({
        email: joi.string().required(),
        password: joi.string().required(),
    });

    const validation = dataSchema.validate({ ...req.body }, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.details.map(d => d.message));
    }

    next();

}

export {signInValidator, signUpValidator}