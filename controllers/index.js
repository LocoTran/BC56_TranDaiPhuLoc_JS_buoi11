var arrNhanVien = [];

document.querySelector("#btnThem").onclick = function () {
  document.querySelector("#password").value = "";
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#gioLam").value = "";
  document.querySelector("#chucvu").value = "";
  document.querySelector("#tbMatKhau").style.display = "none";
  document.querySelector("#tbTKNV").style.display = "none";
  document.querySelector("#tbTen").style.display = "none";
  document.querySelector("#tbEmail").style.display = "none";
  document.querySelector("#tbNgay").style.display = "none";
  document.querySelector("#tbLuongCB").style.display = "none";
  document.querySelector("#tbChucVu").style.display = "none";
  document.querySelector("#tbGiolam").style.display = "none";
  document.querySelector("#confirmDelDiv").style.display = "none";
};

/**
 * nhận vào 1 object tên name đã được tạo rồi lấy các value cần thiết
 * @param {*} name
 * @returns
 */
function getValue(name) {
  name.taiKhoan = document.querySelector("#tknv").value;
  name.hoTen = document.querySelector("#name").value;
  name.email = document.querySelector("#email").value;
  name.matKhau = document.querySelector("#password").value;
  name.ngayLam = document.querySelector("#datepicker").value;
  name.luongCoBan = document.querySelector("#luongCB").value;

  var slChucVu = document.querySelector("#chucvu");
  name.chucVu = slChucVu[slChucVu.selectedIndex].innerHTML;
  name.heSoChucVu = slChucVu.value;

  name.gioLamTrongThang = document.querySelector("#gioLam").value;
  name.tongLuong = name.tinhLuong();
  name.loaiNhanVien = name.xepLoaiNhanVien();
  return name;
}

/**
 * hàm nhận tham số là mảng arrNV chứa các object nhanvien=[{...}{...}{...}]
 * @param {*} arrNV
 */
function renderTableNhanVien(arrNV) {
  var outputHTML = "";
  for (index = 0; index < arrNV.length; index++) {
    var nhanVien = arrNV[index];

    outputHTML += `
        <tr>
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.hoTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong.toLocaleString()}</td>
        <td>${nhanVien.loaiNhanVien}</td>
        <td><button class="btn btn-danger mx-1" onclick="xoaNhanVien(${index})">Xóa</button><button class="btn btn-success mx-1" onclick="suaNhanVien(${index})">Sửa</button></td>
        </tr>
        `;
  }
  document.querySelector("#tableDanhSach").innerHTML = outputHTML;
}

/////////////////////////Thêm NV/////////////////////////////
document.querySelector("#btnThemNV").onclick = function () {
  var nhanVienNew = new NhanVien();
  getValue(nhanVienNew);

  //Kiểm tra rỗng
  var valid = validation.isEmpty(nhanVienNew.heSoChucVu, "tbChucVu", "Chức vụ");
  // Kiểm tra password
  valid = valid & validation.isPassValid(nhanVienNew.matKhau, "tbMatKhau");
  // Kiểm tra tên
  valid = valid & validation.isLetter(nhanVienNew.hoTen, "tbTen", "Họ và Tên");
  // Kiểm tra Email
  valid =
    valid & validation.isEmailValid(nhanVienNew.email, "tbEmail", "Email");
  // Kiểm tra giá trị
  valid =
    valid &
    validation.isNumberAndValueValid(
      nhanVienNew.luongCoBan,
      "tbLuongCB",
      "Lương cơ bản",
      1000000,
      20000000
    ) &
    validation.isNumberAndValueValid(
      nhanVienNew.gioLamTrongThang,
      "tbGiolam",
      "Số giờ làm",
      80,
      200
    );
  //Kiểm tra ngày làm
  valid =
    valid & validation.isDateValid(nhanVienNew.ngayLam, "tbNgay", "Ngày làm");
  //kiểm tra tài khoản duy nhất
  valid =
    valid &
    validation.isUserIDNumberLengthExist(
      arrNhanVien,
      "taiKhoan",
      nhanVienNew.taiKhoan,
      "tbTKNV",
      "Tài khoản",
      4,
      6
    );

  if (!valid) {
    return;
  }

  arrNhanVien.push(nhanVienNew);
  renderTableNhanVien(arrNhanVien);

  saveStorageArr(arrNhanVien);

  document.querySelector("#btnDong").click();
};

/////////////////////////Xóa NV ///////////////////////////////
/**
 * sự kiên onclick được tạo ra khi nhấn thêm nhân viên có sẵn idexDel bên trong
 * @param {*} indexDel
 */
function xoaNhanVien(indexDel) {
  document.querySelector("#btnThem").click();
  document.querySelector("#tknv").value = arrNhanVien[indexDel].taiKhoan;
  document.querySelector("#confirmDelDiv").style.display = "block";
  document.querySelector("#tbMatKhau").style.display = "block";
  document.querySelector("#tbMatKhau").innerHTML =
    "Bạn cần nhập mật khẩu rồi bấm nút xóa phía trên";

  var count = 0;
  document.querySelector("#confirmDel").onclick = function () {
    var passToCheck = document.querySelector("#password").value;
    var userToCheck = document.querySelector("#tknv").value;
    if (
      arrNhanVien[indexDel].matKhau === passToCheck &&
      arrNhanVien[indexDel].taiKhoan === userToCheck
    ) {
      arrNhanVien.splice(indexDel, 1);
      renderTableNhanVien(arrNhanVien);
      saveStorageArr(arrNhanVien);
      document.querySelector("#btnDong").click();
    } else {
      count++;
      document.querySelector(
        "#tbMatKhau"
      ).innerHTML = `Bạn đã nhập sai mật khẩu ${count} lần, bạn hãy nhập lại rồi bấm nút xóa phía trên`;
    }
  };
}

/////////////////////////Tim NV theo loại//////////////////////
document.querySelector("#searchName").onkeyup = function () {
  var tuKhoa = document.querySelector("#searchName").value;
  var arResult = [];
  if (tuKhoa == "") {
    renderTableNhanVien(arrNhanVien);
    return;
  }

  for (var index = 0; index < arrNhanVien.length; index++) {
    tuKhoa = stringToSlug(tuKhoa);
    xlNhanVien = stringToSlug(arrNhanVien[index].loaiNhanVien);

    if (xlNhanVien.search(tuKhoa) !== -1) {
      arResult.push(arrNhanVien[index]);
    }
  }
  renderTableNhanVien(arResult);
};

/////////////////////////Edit NV //////////////////////
/**
 * sự kiên onclick được tạo ra khi nhấn thêm nhân viên có sẵn idexEdit bên trong
 * @param {*} indexEdit
 */
function suaNhanVien(indexEdit) {
  document.querySelector("#btnThem").click();

  document.querySelector("#tknv").value = arrNhanVien[indexEdit].taiKhoan;

  document.querySelector("#password").placeholder =
    "Bạn hãy nhập mật khẩu để chỉnh sửa thông tin";
  document.querySelector("#name").placeholder = "";
  document.querySelector("#email").placeholder = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#datepicker").placeholder = "";
  document.querySelector("#luongCB").placeholder = "";
  document.querySelector("#gioLam").placeholder = "";

  document.querySelector("#password").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#datepicker").value = "";
  document.querySelector("#luongCB").value = "";
  document.querySelector("#gioLam").value = "";

  document.querySelector("#password").onkeyup = function () {
    var passToCheck = document.querySelector("#password").value;
    if (arrNhanVien[indexEdit].matKhau === passToCheck) {
      document.querySelector("#name").value = arrNhanVien[indexEdit].hoTen;
      document.querySelector("#email").value = arrNhanVien[indexEdit].email;
      document.querySelector("#datepicker").value =
        arrNhanVien[indexEdit].ngayLam;
      document.querySelector("#luongCB").value =
        arrNhanVien[indexEdit].luongCoBan;
      document.querySelector("#chucvu").value =
        arrNhanVien[indexEdit].heSoChucVu;
      document.querySelector("#gioLam").value =
        arrNhanVien[indexEdit].gioLamTrongThang;

      document.querySelector("#tbMatKhau").style.display = "none";
      document.querySelector("#tbMatKhau").innerHTML = "";
    } else {
      document.querySelector("#tbMatKhau").style.display = "block";
      document.querySelector("#tbMatKhau").innerHTML =
        "Bạn đã đúng ID cần nhập lại đúng mật khẩu";
    }
  };
}

//////////////////////////Update NV  ///////////////////////////////
document.querySelector("#btnCapNhat").onclick = function () {
  userToCheck = document.querySelector("#tknv").value;
  passToCheck = document.querySelector("#password").value;

  if (userToCheck === "" || passToCheck === "") {
    document.querySelector("#tbMatKhau").style.display = "block";
    document.querySelector("#tbMatKhau").innerHTML =
      "Bạn cần nhập đúng mật khẩu và tài khoản để cập nhật";
    document.querySelector("#tbTKNV").style.display = "block";
    document.querySelector("#tbTKNV").innerHTML =
      "Bạn cần nhập đúng mật khẩu và tài khoản để cập nhật";
  } else {
    var indexUpdate = -1;
    for (var index = 0; index < arrNhanVien.length; index++) {
      if (
        arrNhanVien[index].taiKhoan === userToCheck &&
        arrNhanVien[index].matKhau === passToCheck
      ) {
        indexUpdate = index;
        break;
      }
    }

    var nhanVienUpdate = new NhanVien();
    getValue(nhanVienUpdate);

    //Kiểm tra rỗng
    var valid = validation.isEmpty(
      nhanVienUpdate.heSoChucVu,
      "tbChucVu",
      "Chức vụ"
    );
    // Kiểm tra tên
    valid =
      valid & validation.isLetter(nhanVienUpdate.hoTen, "tbTen", "Họ và Tên");
    // Kiểm tra Email
    valid =
      valid & validation.isEmailValid(nhanVienUpdate.email, "tbEmail", "Email");
    // Kiểm tra giá trị
    valid =
      valid &
      validation.isNumberAndValueValid(
        nhanVienUpdate.luongCoBan,
        "tbLuongCB",
        "Lương cơ bản",
        1000000,
        20000000
      ) &
      validation.isNumberAndValueValid(
        nhanVienUpdate.gioLamTrongThang,
        "tbGiolam",
        "Số giờ làm",
        80,
        200
      );
    //Kiểm tra ngày làm
    valid =
      valid &
      validation.isDateValid(nhanVienUpdate.ngayLam, "tbNgay", "Ngày làm");

    if (!valid) {
      return;
    }

    if (
      indexUpdate !== -1 &&
      arrNhanVien[indexUpdate].taiKhoan === userToCheck &&
      arrNhanVien[indexUpdate].matKhau === passToCheck
    ) {
      arrNhanVien[indexUpdate].hoTen = nhanVienUpdate.hoTen;
      arrNhanVien[indexUpdate].email = nhanVienUpdate.email;
      arrNhanVien[indexUpdate].ngayLam = nhanVienUpdate.ngayLam;
      arrNhanVien[indexUpdate].luongCoBan = nhanVienUpdate.luongCoBan;
      arrNhanVien[indexUpdate].chucVu = nhanVienUpdate.chucVu;
      arrNhanVien[indexUpdate].heSoChucVu = nhanVienUpdate.heSoChucVu;
      arrNhanVien[indexUpdate].gioLamTrongThang =
        nhanVienUpdate.gioLamTrongThang;
      arrNhanVien[indexUpdate].tongLuong = nhanVienUpdate.tongLuong;
      arrNhanVien[indexUpdate].loaiNhanVien = nhanVienUpdate.loaiNhanVien;
    } else {
      return;
    }
    renderTableNhanVien(arrNhanVien);
    saveStorageArr(arrNhanVien);
    document.querySelector("#btnDong").click();
  }
};

///////////Nhập vào tài khoản có trong storage ////////////////////
document.querySelector("#tknv").onchange = function () {
  var userToCheck = this.value;

  var indexSame = -1;
  for (var index = 0; index < arrNhanVien.length; index++) {
    if (arrNhanVien[index].taiKhoan === userToCheck) {
      indexSame = index;
      document.querySelector("#tbTKNV").style.display = "block";
      document.querySelector(
        "#tbTKNV"
      ).innerHTML = `Chào mừng "${arrNhanVien[index].hoTen}" đã quay lại, hãy nhập mật khẩu để cập nhật thông tin`;

      document.querySelector("#password").onkeyup = function () {
        var passToCheck = document.querySelector("#password").value;
        if (arrNhanVien[indexSame].matKhau === passToCheck) {
          document.querySelector("#name").value = arrNhanVien[indexSame].hoTen;
          document.querySelector("#email").value = arrNhanVien[indexSame].email;
          document.querySelector("#datepicker").value =
            arrNhanVien[indexSame].ngayLam;
          document.querySelector("#luongCB").value =
            arrNhanVien[indexSame].luongCoBan;
          document.querySelector("#chucvu").value =
            arrNhanVien[indexSame].heSoChucVu;
          document.querySelector("#gioLam").value =
            arrNhanVien[indexSame].gioLamTrongThang;

          document.querySelector("#tbMatKhau").style.display = "none";
          document.querySelector("#tbMatKhau").innerHTML = "";
          document.querySelector("#tbTKNV").style.display = "none";
          return;
        } else {
          document.querySelector("#tbMatKhau").style.display = "block";
          document.querySelector("#tbMatKhau").innerHTML =
            "Bạn cần nhập đúng mật khẩu";
        }
      };
    }
  }
  if (indexSame === -1) {
    document.querySelector("#tbTKNV").style.display = "none";
  }
};

///////////////Khi load lại trang/////////////////////////////////////

window.onload = function () {
  getDataStorage();

  console.log(arrNhanVien);
};

////////////////////////////////////////////////////////////////////
