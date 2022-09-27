module.exports = {
    isLoginAdmin: (req, res, next) => {
        if (req.session.user === null || req.session.user === undefined) {
            req.flash('alertMessage', `sesi telah habis silahkan login ulang`)
            req.flash('alertStatus', 'danger')  
            res.redirect('/') 
        }else {
            next()
        }
    }
}