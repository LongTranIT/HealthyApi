
const DuKhach = require('../models/NguoiDung');
class DuKhachController {
    // [GET] /DuKhach
    show(req, res) {
        DuKhach.find({})
            .lean()
            .then(duKhachs => res.json(duKhachs))
            .catch(err => {
                message: err
            });
    }

    // [GET] /DuKhach/:id
    detail(req, res) {
        DuKhach.findById(req.params.id)
            .lean()
            .then(duKhach => res.json(duKhach))
            .catch(err => {
                message: err
            });
    }

    // [POST] /DuKhach
    create(req, res) {
        const duKhachs=req.body;
        var promisesDuKhach = duKhachs.map(duKhach => {
            let dk = new DuKhach(duKhach);
            return dk.save()
                .then(dk => dk['_id'])
        })
        Promise.all(promisesDuKhach)
            .then(idsDuKhach => res.json(idsDuKhach))
            .catch(err => {
                res.json({
                    message: err
                });
            })
    }

    // [PUT] /DuKhach/:id
    update(req, res) {
        DuKhach.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then(tk => res.json(tk))
            .catch(err => {
                res.json({
                    message: err
                });
            })
    }

    // [DELETE] /DuKhach/:id
    delete(req, res) {
        DuKhach.findByIdAndDelete(req.params.id)
            .lean()
            .then(dataDelete => res.json(dataDelete))
            .catch(err => {
                res.json({
                    message: err
                });
            })
    }
}

module.exports = new DuKhachController;