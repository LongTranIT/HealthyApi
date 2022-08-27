
const NguoiDung = require('../models/NguoiDung');
class NguoiDungController {
    // [GET] /NguoiDung
    show(req, res) {
        NguoiDung.find({})
            .lean()
            .then(NguoiDungs => res.json(NguoiDungs))
            .catch(err => {
                message: err
            });
    }

    // [GET] /NguoiDung/:id
    detail(req, res) {
        NguoiDung.findById(req.params.id)
            .lean()
            .then(NguoiDung => res.json(NguoiDung))
            .catch(err => {
                message: err
            });
    }

    // [POST] /NguoiDung
    create(req, res) {
        const newData = new NguoiDung(req.body);
        newData.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({
                    message: err
                });
            })
    }

    // [PUT] /NguoiDung/:id
    update(req, res) {
        NguoiDung.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then(tk => res.json(tk))
            .catch(err => {
                res.json({
                    message: err
                });
            })
    }

    // [DELETE] /NguoiDung/:id
    delete(req, res) {
        NguoiDung.findByIdAndDelete(req.params.id)
            .lean()
            .then(dataDelete => res.json(dataDelete))
            .catch(err => {
                res.json({
                    message: err
                });
            })
    }
}

module.exports = new NguoiDungController;