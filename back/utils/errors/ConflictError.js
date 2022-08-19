const CONFLICT_ERROR_CODE = 401;

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = CONFLICT_ERROR_CODE;
    }
}

module.exports = { ConflictError };
