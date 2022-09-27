const Course = require('./model');
const Category = require('../category/model');
const path = require('path')
const fs = require('fs')
const config = require('../../config');
const { findOneAndUpdate } = require('./model');


module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMessage, status: alertStatus }
            const course = await Course.find().populate('category')
            // console.log(course)
            res.render('admin/course/view_course', {
                alert,
                course,
                name: req.session.user.name,
                title: 'Halaman Course'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/course')
        }
    },
    viewCreate: async (req, res) => {
        try {
            const category = await Category.find()

            res.render('admin/course/create', {
                category,
                name: req.session.user.name,
                title: 'Halaman tambah Course'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/course')
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { 
                title, 
                category,
                slogan,
                description,
                keypoint,
                designedfor,
                tools,
                price,
                discount 
            } = req.body

            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)
                src.on('end', async () => {
                    try {
                        const course = new Course({
                            title,
                            category,
                            slogan,
                            description,
                            keypoint,
                            designedfor,
                            tools,
                            price,
                            discount,
                            photo: filename
                        })
                        await course.save()

                        req.flash('alertMessage', "Berhasil tambah data Course")
                        req.flash('alertStatus', "success")
                        res.redirect('/course')

                    } catch (error) {
                        req.flash('alertMessage', `${error.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/course')
                    }
                })
            } else {
                const course = new Course({
                    title,
                    category,
                    slogan,
                    description,
                    keypoint,
                    designedfor,
                    tools,
                    price,
                    discount,
                })
                await course.save()

                req.flash('alertMessage', "Berhasil tambah data Course")
                req.flash('alertStatus', "success")
                res.redirect('/course')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/course')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params
            const category = await Category.find()
            const course = await Course.findOne({ _id: id })
                .populate('category')

            res.render('admin/course/edit', {
                course,
                category,
                name: req.session.user.name,
                title: 'Halaman edit Course'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/course')
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const { 
                title, 
                category,
                slogan,
                description,
                keypoint,
                designedfor,
                tools,
                price,
                discount, 
            } = req.body

            if (req.file) {
                let tmp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)

                src.pipe(dest)
                src.on('end', async () => {
                    try {

                        const course = await Course.findOne({ _id: id })

                        let currentImage = `${config.rootPath}/public/uploads/${course.photo}`;
                        if (fs.existsSync) {
                            fs.unlinkSync(currentImage)
                        }

                        await Course.findOneAndUpdate({
                            _id: id,
                        }, {
                            title,
                            category,
                            slogan,
                            description,
                            keypoint,
                            designedfor,
                            tools,
                            price,
                            discount,
                            photo: filename
                        })

                        await course.save()

                        req.flash('alertMessage', "Berhasil ubah data Course")
                        req.flash('alertStatus', "success")
                        res.redirect('/course')

                    } catch (error) {
                        req.flash('alertMessage', `${error.message}`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/course')
                    }
                })
            } else {
                await Course.findOneAndUpdate({
                    _id: id,
                }, {
                    title,
                    category,
                    slogan,
                    description,
                    keypoint,
                    designedfor,
                    tools,
                    price,
                    discount,
                })

                req.flash('alertMessage', "Berhasil ubah data Course")
                req.flash('alertStatus', "success")
                res.redirect('/course')
            }

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/course')
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params

            const course = await Course.findOneAndRemove({
                _id: id
            });

            let currentImage = `${config.rootPath}/public/uploads/${course.photo}`;
            if (fs.existsSync) {
                fs.unlinkSync(currentImage)
            }

            req.flash('alertMessage', "Berhasil hapus data course")
            req.flash('alertStatus', "success")

            res.redirect('/course')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/course')
        }
    }
}