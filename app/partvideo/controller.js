const Partvideo = require('./model');
const Course = require('../course/model')


module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const partvideo = await Partvideo.find().populate('course_id')
            res.render('admin/partvideo/view_partvideo', {
                alert,
                partvideo,
                name: req.session.user.name,
                title: 'Halaman Part Video'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/partvideo')
        }
    },
    viewCreate: async(req, res)=>{
        try {
            const course = await Course.find() 

            res.render('admin/partvideo/create', {
                course,
                name: req.session.user.name,
                title: 'Halaman tambah Part Video'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/partvideo')
        }
    },
    actionCreate: async (req, res) => {
        try {
               
            const { course_id, title, order } = req.body

            let partvideo = await Partvideo({ 
                course_id, 
                title, 
                order 
            })
            await partvideo.save()

            req.flash('alertMessage', "Berhasil tambah data partvideo")
            req.flash('alertStatus', "success")

            res.redirect('/partvideo')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/partvideo')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params
            const course = await Course.find()

            const partvideo = await Partvideo.findOne({_id: id})
                .populate('course_id')

            res.render('admin/partvideo/edit', {
                partvideo,
                course,
                name: req.session.user.name,
                title: 'Halaman edit Part Video'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/partvideo')
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const { course_id, title, order } = req.body

            await Partvideo.findOneAndUpdate(
                {_id: id}, 
                {
                    course_id, 
                    title, 
                    order
                }
            )

            req.flash('alertMessage', "Berhasil ubah data partvideo")
            req.flash('alertStatus', "success")

            res.redirect('/partvideo')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/partvideo')
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params

            await Partvideo.findOneAndRemove({_id: id})

            req.flash('alertMessage', "Berhasil hapus data partvideo")
            req.flash('alertStatus', "success")

            res.redirect('/partvideo')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/partvideo')
        }
    }
}