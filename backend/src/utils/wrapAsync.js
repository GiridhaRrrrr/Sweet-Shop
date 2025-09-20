const wrapAsync = (fn) => {
    return (req, res, next) => {
         fn(req, res, next).catch(err => next(err));
         //calling global error handler in index.js!!
    }
}

export default wrapAsync;