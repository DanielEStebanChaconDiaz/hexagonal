const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");

class ProductValidator {
    validateProductData = () => {
        return [
            body('name').notEmpty().isString().withMessage('The product name is mandatory'),
            body('description').isString().withMessage('Send the product description'),
            body('price').notEmpty().isNumeric().withMessage('The price is mandatory and must be a number'),
            body('category').notEmpty().isString().withMessage('The category is mandatory'),
            body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
            body('sku').notEmpty().isString().withMessage('SKU is mandatory'),
            body('status', 'The status was not sent').notEmpty().exists().custom((value) => {
                if (value && !['Available', 'Out of Stock', 'Discontinued'].includes(value)) {
                    throw new Error(`There are only three statuses available: 'Available', 'Out of Stock', 'Discontinued'`);
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateProductDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateProductId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid Product ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    validateProductUpdateDataById = () => {
        return [   
            body('name').optional().isString().withMessage('The product name must be a string'),
            body('description').optional().isString().withMessage('The product description must be a string'),
            body('price').optional().isNumeric().withMessage('The price must be a number'),
            body('category').optional().isString().withMessage('The category must be a string'),
            body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
            body('sku').optional().isString().withMessage('SKU must be a string'),
            body('status', 'The status was not sent').optional().exists().custom((value) => {
                if (value && !['Available', 'Out of Stock', 'Discontinued'].includes(value)) {
                    throw new Error(`There are only three statuses available: 'Available', 'Out of Stock', 'Discontinued'`);
                }
                return true;
            }),
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid Product ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };
}

module.exports = ProductValidator;