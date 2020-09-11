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
    }
}