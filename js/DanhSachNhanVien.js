function DanhSachNhanVien() {
    this.arr = [];

    this.themNhanVien = function (nhanVien) {
        this.arr.push(nhanVien);
    };

    this.timViTri = function (maNV) {
        return this.arr.findIndex(function (item) {
            return item.maNV === maNV;
        })
    };

    this.xoaNhanVien = function (maNV) {
        var index = this.timViTri(maNV);
        if(index !== -1){
            this.arr.splice(index, 1);
        };        
    };

    this.layThongTinNhanVien = function (maNV) {
        return this.arr.find(function (item) {
            return item.maNV === maNV;
        })
    };

    this.capNhatNhanVien = function (nhanVien) {
        var index = this.timViTri(nhanVien.maNV);
        if (index !== -1) {
            this.arr[index] = nhanVien;
        }
    };
}

DanhSachNhanVien.prototype.timKiemNhanVien = function (keyword){
    return this.arr.filter(function (item) {
        return item.tenNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    })
}