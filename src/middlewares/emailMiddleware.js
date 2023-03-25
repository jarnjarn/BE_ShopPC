
const emailMiddleware = async (req, res, next) => {
    if((req.body.email).includes('@')){
        next();
    } else {
        res.status(400).send('Invalid email');
    }
}
module.exports = emailMiddleware;