const Joi = require("joi");

const validationUser = Joi.object({
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  birthDate: Joi.string(),
  phoneNumber: Joi.number().integer(),
  sex: Joi.string().valid("Homme", "Femme"),
  email: Joi.string().email(),
  profilImage: Joi.string(),
  userName: Joi.string().required(),
});

const validationCreate = (req, res, next) => {
  console.log(req.body);
  const validation = validationUser.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

module.exports = {
  validationCreate,
};
