exports.authMiddleware = (req, res, next) => {

    
    if (req.headers['authorization']) {
        console.log(req.headers['authorization'])
        return next()
    } else {
        res.status(403).send({message : 'Token required'})
    }

}