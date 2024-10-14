import { body, param } from 'express-validator';

export const validatePlayer = [
  body('id').isInt().withMessage('Player ID must be an integer'),
  body('name').notEmpty().withMessage('Name is required'),
  body('team').notEmpty().withMessage('Team is required'),
  body('position').notEmpty().withMessage('Position is required'),
];


