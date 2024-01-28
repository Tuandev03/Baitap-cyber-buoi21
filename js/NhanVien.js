function NhanVien() {
  this.tkNhanVien = "";
  this.name = "";
  this.email = "";
  this.password = "";
  this.ngayLam = "";
  this.luongCoBan = "";
  this.chucVu = "";
  this.gioLam = "";
  this.tongLuong = function () {
    let tongLuong = 0;
    if (this.chucVu == "Giám đốc") {
      tongLuong = this.luongCoBan * 3;
    } else if (this.chucVu == "Trưởng phòng") {
      tongLuong = this.luongCoBan * 2;
    } else {
      tongLuong = this.luongCoBan * 1;
    }
    return tongLuong;
  };
  this.xepLoaiNhanVien = function () {
    let xepLoai = "";
    if (this.gioLam >= 192) {
      xepLoai = "Xuất xắc";
    } else if (this.gioLam >= 176) {
      xepLoai = "Giỏi";
    } else if (this.gioLam >= 160) {
      xepLoai = "Khá";
    } else {
      xepLoai = "Trung bình";
    }
    return xepLoai;
  };
}
