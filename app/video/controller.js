const Video = require('./model')
const Partvideo = require('../partvideo/model');
const Course = require('../course/model')


module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {message: alertMessage, status: alertStatus}
            const video = await Video.find()
                .populate('partvideo_id')
                .populate('course_id')
    
            res.render('admin/video/view_video', {
                alert,
                video,
                name: req.session.user.name,
                title: 'Halaman Video'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/video')
        }
    },
    viewCreate: async(req, res)=>{
        try {
            const partvideo = await Partvideo.find()
            const course = await Course.find() 

            res.render('admin/video/create', {
                course,
                partvideo,
                name: req.session.user.name,
                title: 'Halaman tambah Video'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/video')
        }
    },
    actionCreate: async (req, res) => {
        try {
               
            const { partvideo_id, title, link,  order, course_id } = req.body

            let video = await Video({ 
                partvideo_id,
                title,
                link, 
                order, 
                course_id 
            })
            await video.save()

            req.flash('alertMessage', "Berhasil tambah data video")
            req.flash('alertStatus', "success")

            res.redirect('/video')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/video')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params
            const partvideo = await Partvideo.find()
            const course = await Course.find()

            const video = await Video.findOne({_id: id})
                .populate('course_id')
                .populate('partvideo_id')

            res.render('admin/video/edit', {
                video,
                partvideo,
                course,
                name: req.session.user.name,
                title: 'Halaman edit Video'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/video')
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const { partvideo_id, title, link, order, course_id } = req.body

            await Video.findOneAndUpdate(
                {_id: id}, 
                {
                    partvideo_id, 
                    title,
                    link, 
                    order,
                    course_id
                }
            )

            req.flash('alertMessage', "Berhasil ubah data video")
            req.flash('alertStatus', "success")

            res.redirect('/video')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/video')
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params

            await Video.findOneAndRemove({_id: id})

            req.flash('alertMessage', "Berhasil hapus data video")
            req.flash('alertStatus', "success")

            res.redirect('/video')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/video')
        }
    }
}