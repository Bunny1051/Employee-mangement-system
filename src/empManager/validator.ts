
import { body } from "express-validator"
export let validationprocess = [body().isArray(), body('*.EmployeeEmail').trim().notEmpty().isEmail().withMessage('check employee email'), 
body().isArray(), body('*.MobileNumber').trim().isLength({ min: 10, max: 10 }).withMessage('check phone number') ]  // body().isArray(),body('*.Departments').isLength({max:2}).withMessage('department should not be in 2 parts')    ]

