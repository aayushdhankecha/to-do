import { check } from "express-validator";

export const RegisterSchema = [
    check('name',"name should be Alphabets only.").trim().isAlpha().exists()
    .withMessage("name should be Alphabets only."),

    check('username','username is required')
    .exists()
    .isAlphanumeric().withMessage("username should be alphanumeric character only (minlen:4 and maxlen:32)")
    .trim().isLength({min:4,max:32}),

    check('password','Password is required (min Length: 6)').isLength({min:6,max:100}).trim(),

    check('email','email is required').exists().isEmail(),
]