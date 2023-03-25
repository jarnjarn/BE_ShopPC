
const phoneMiddleware = (req, res, next) => {
    if (req.body.phone) {
        if (req.body.phone.length !== 10) {
            res.status(400).json({
                status: 'fail',
                message: 'Phone number must be 10 digits'
            });
        }
        else {
            next();
        }
    }
    else {
        next();
    }
}
module.exports = phoneMiddleware;