module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.is_admin) {
            middleware(req, res, next)
        }else {
            res.status(401).send('Usuário não é admnistrador')
        }

    }
}