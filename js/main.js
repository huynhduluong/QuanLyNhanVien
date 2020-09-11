var dsnv = new DanhSachNhanVien();
var validation = new Validation();


getEle("btnThem").addEventListener("click", function () {
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "block";

})

/**
 * thêm nhân viên
 */

getEle("btnThemNV").addEventListener("click", function () {
    var maNV = getEle("msnv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var password  = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;

    var isValid = true;

    isValid &=
        validation.kiemTraRong(maNV, "tbMaNV", "(*) Manv k dc rong!") &&
        validation.kiemTraDoDaiKyTu(maNV, "tbMaNV", "(*) Do dai ky tu 4 - 10", 4, 10) &&
        validation.kiemTraTrung(maNV, "tbMaNV", "(*) manv da ton tai!", dsnv.arr);

    isValid &=
        validation.kiemTraRong(tenNV, "tbTen", "(*) Tên NV k dc rong!") &&
        validation.kiemTraChuoi(tenNV, "tbTen", "(*) Phai nhap vao chuoi");

    isValid &= 
        validation.kiemTraRong(email, "tbEmail", "(*) Email k dc rong!") &&
        validation.checkEmail(email, "tbEmail", "(*) Email k dung dinh dang!");

    isValid &=
        validation.kiemTraRong(password, "tbMatKhau", "(*) password k dc rong!");

        isValid &=
        validation.kiemTraRong(date, "tbNgay", "(*) ngày k dc rong!");

    isValid &= 
        validation.kiemTraChucVu("chucvu", "tbChucVu", "(*) Vui lòng chọn chức vụ");

    if (!isValid) return;

    var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);
    dsnv.themNhanVien(nhanVien);
})








function getEle(id) {
    return document.getElementById(id);
}