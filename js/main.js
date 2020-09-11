var dsnv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

getEle("btnThem").addEventListener("click", function () {
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "block";
    getEle("msnv").removeAttribute("disabled");
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

    var isValid = isValidation(maNV, tenNV, email, password, date, chucVu);
    isValid &= validation.kiemTraTrung(maNV, "tbMaNV", "(*) manv da ton tai!", dsnv.arr);
    if (!isValid) return;

    var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);
    dsnv.themNhanVien(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
    getEle("btnDong").click();
})

//kiểm tra validation cuả form
function isValidation(maNV, tenNV, email, password, date, chucVu) {
    var isValid = true;
    isValid &=
        validation.kiemTraRong(maNV, "tbMaNV", "(*) Manv k dc rong!") &&
        validation.kiemTraDoDaiKyTu(maNV, "tbMaNV", "(*) Do dai ky tu 4 - 10", 4, 10);

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

    return isValid;
}

function taoBang(arr) {
    var contentHTML = "";
    arr.forEach(function (item) {
        contentHTML += `
            <tr>
                <td>${item.maNV}</td>
                <td>${item.tenNV}</td>
                <td>${item.email}</td>
                <td>${item.date}</td>
                <td>${item.chucVu}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${item.maNV}')">Edit</button>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${item.maNV}')">Delete</button>
                </td>
            </tr>
        `;
    });
    getEle("tableDanhSach").innerHTML = contentHTML;
}

function xoaNhanVien(maNV) {
    dsnv.xoaNhanVien(maNV);
    taoBang(dsnv.arr);
    setLocalStorage();
}

/**
 * Sửa nhân viên
 */
function suaNhanVien(maNV){
    getEle("btnCapNhat").style.display = "block";
    getEle("btnThemNV").style.display = "none";

    var NhanVien = dsnv.layThongTinNhanVien(maNV);

    getEle("msnv").value = NhanVien.maNV;
    getEle("msnv").setAttribute("disabled", true);
    getEle("name").value = NhanVien.tenNV;
    getEle("email").value = NhanVien.email;
    getEle("password").value = NhanVien.password;
    getEle("datepicker").value = NhanVien.date;
    getEle("chucvu").value = NhanVien.chucVu;
}
/**
 * cập nhật nhân viên
 */
getEle("btnCapNhat").addEventListener("click", function () {
    var maNV = getEle("msnv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var password  = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;

    var isValid = isValidation(maNV, tenNV, email, password, date, chucVu);
    if (!isValid) return;
    

    var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);
    dsnv.capNhatNhanVien(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
    getEle("btnDong").click();
});

getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNhanVien(keyword);
    taoBang(mangTimKiem);
})


/**
 * Lưu mảng dsnv.arr xuống LocalStorage
 * Chuyển data thành kiểu string
 */
function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.arr));
    
  }
  
  /**
   * lấy mảng dsnv.arr từ LocalStorage
   * Chuyển qua kiểu JSON
   */
  function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
      //Lấy mảng từ LocalStorage gán vào biến arr
      var arr = localStorage.getItem("DSNV");
      
      //Chuyển arr thành kiểu JSON sau đó gán vào dsnv.arr
      dsnv.arr = JSON.parse(arr);
      taoBang(dsnv.arr);
    }
  }


function getEle(id) {
    return document.getElementById(id);
}