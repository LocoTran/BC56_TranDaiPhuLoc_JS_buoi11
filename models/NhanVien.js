function NhanVien() {
  this.taiKhoan = "";
  this.hoTen = "";
  this.email = "";
  this.matKhau = "";
  this.ngayLam = "";
  this.luongCoBan = "";
  this.chucVu = "";
  this.heSoChucVu = "";
  this.gioLamTrongThang = "";
  this.tongLuong sở hữu= "";
  this.loaiNhanVien = "";

  this.xepLoaiNhanVien = function () {
    if (this.gioLamTrongThang < 160) {
      return this.loaiNhanVien = "Trung Bình";
    } else if(this.gioLamTrongThang < 176){
      return this.loaiNhanVien = "Khá";
    } else if (this.gioLamTrongThang < 192) {
      return this.loaiNhanVien = "Giỏi";
    } else {
      return this.loaiNhanVien = "Xuất sắc";
    }
  };

  this.tinhLuong = function () {
    return this.luongCoBan * this.heSoChucVu;
  };
}
