export const validateProduct = (product) => {
    const errors = {};

    // Validate name
    if (!product.name) {
        errors.name = 'Name is required';
    } else if (product.name.length < 3) {
        errors.name = 'Name must be at least 3 characters';
    } else if (product.name.length > 50) {
        errors.name = 'Name must be less than 50 characters';
    }

    // Validate description
    if (!product.description) {
        errors.description = 'Description is required';
    } else if (product.description.length < 10) {
        errors.description = 'Description must be at least 10 characters';
    } else if (product.description.length > 500) {
        errors.description = 'Description must be less than 500 characters';
    }

    // Validate price
    if (!product.price) {
        errors.price = 'Price is required';
    } else if (isNaN(product.price) || product.price <= 0) {
        errors.price = 'Price must be a positive number';
    }

    // Validate stock
    if (!product.stock) {
        errors.stock = 'Stock is required';
    } else if (isNaN(product.stock) || product.stock < 0) {
        errors.stock = 'Stock must be a non-negative number';
    } else if (!Number.isInteger(Number(product.stock))) {
        errors.stock = 'Stock must be a whole number';
    }

    return {
        isValid: Object.keys(errors).length === 0, // Returns true if there are no errors
        errors,
    };
};
