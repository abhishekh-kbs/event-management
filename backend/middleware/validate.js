const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            errors: error.details.map(e => e.message)
        });
    }

    next();
}

module.exports = validate;

// POST /clubs (create club)✅POST /events (create event)✅PUT /events/:id (update)✅POST /forgot-password✅POST /reset-password✅