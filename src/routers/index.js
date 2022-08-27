const baiTapRouter=require('./BaiTap');
const chatDinhDuongRouter=require('./ChatDinhDuong');
const chiTietBaiTapRouter=require('./ChiTietBaiTap');
const chiTietThucDonRouter=require('./ChiTietThucDon');
const dongTacRouter=require('./DongTac');
const loaiThucDonRouter=require('./LoaiThucDon');
const nguoiDungRouter=require('./NguoiDung');
const taiKhoanRouter=require('./TaiKhoan');
const thongKeRouter=require('./ThongKe');
const thucDonRouter=require('./ThucDon');
const thucPhamRouter=require('./ThucPham');

function route(app){
    app.use('/taiKhoan',taiKhoanRouter);
    app.use('/baiTap',baiTapRouter);
    app.use('/chatDinhDuong',chatDinhDuongRouter);
    app.use('/chiTietBaiTap',chiTietBaiTapRouter);
    app.use('/chiTietThucDon',chiTietThucDonRouter);
    app.use('/dongTac',dongTacRouter);
    app.use('/loaiThucDon',loaiThucDonRouter);
    app.use('/nguoiDung',nguoiDungRouter);
    app.use('/thongKe',thongKeRouter);
    app.use('/thucDon',thucDonRouter);
    app.use('/thucDon',thucDonRouter);
    app.use('/thucPham',thucPhamRouter);
}

module.exports=route;