const Member = require('./model')
const Course = require('../course/model')
const User = require('../users/model')


module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const user = await User.find()
            const course = await Course.find()
            const member = await Member.find()
                .populate('user_id')
                .populate('course_id')
            res.render('admin/member/view_member', {
                alert,
                member,
                user,
                course,
                name: req.session.user.name,
                title: 'Halaman Member'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/member')
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params
            let member = await Member.findOne({ _id: id })

            let status = member.status === 'Aktif' ? 'NonAktif' : 'Aktif'

            member = await Member.findOneAndUpdate({
                _id: id
            }, { status })

            req.flash('alertMessage', "Berhasil ubah status")
            req.flash('alertStatus', "success")

            res.redirect('/member')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/member')
        }
    }
}