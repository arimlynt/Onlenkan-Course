const Course = require('../course/model')
const Partvideo = require('../partvideo/model')
const Video = require('../video/model')
const Member = require('../member/model')

module.exports={
    index: async(req, res)=>{
        try {

            const course = await Course.countDocuments()
            const partvideo = await Partvideo.countDocuments()
            const video = await Video.countDocuments()
            const member = await Member.countDocuments()

            res.render('admin/dashboard/view_dashboard', {
                name: req.session.user.name,
                title: 'Halaman Dashboard',
                count: {
                    course,
                    partvideo,
                    video,
                    member
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}