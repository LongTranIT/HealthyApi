const baiTapRouter=require('./BaiTap');
const chiTietBaiTapRouter=require('./ChiTietBaiTap');
const chiTietThucDonRouter=require('./ChiTietThucDon');
const dongTacRouter=require('./DongTac');
const loaiThucDonRouter=require('./LoaiThucDon');
const nguoiDungRouter=require('./NguoiDung');
const taiKhoanRouter=require('./TaiKhoan');
const thongKeRouter=require('./ThongKe');
const thucDonRouter=require('./ThucDon');
const thucPhamRouter=require('./ThucPham');
const loginRouter=require('./Login');
const nhomCoRouter=require('./NhomCo')

function route(app){
    app.use('/taiKhoan',taiKhoanRouter);
    app.use('/nhomCo',nhomCoRouter);
    app.use('/baiTap',baiTapRouter);
    app.use('/chiTietBaiTap',chiTietBaiTapRouter);
    app.use('/chiTietThucDon',chiTietThucDonRouter);
    app.use('/dongTac',dongTacRouter);
    app.use('/loaiThucDon',loaiThucDonRouter);
    app.use('/nguoiDung',nguoiDungRouter);
    app.use('/thongKe',thongKeRouter);
    app.use('/thucDon',thucDonRouter);
    app.use('/thucDon',thucDonRouter);
    app.use('/thucPham',thucPhamRouter);
    app.use('/login',loginRouter);
}

module.exports=route;