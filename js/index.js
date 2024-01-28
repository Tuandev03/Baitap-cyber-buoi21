var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

let arrNhanVien = [];

let addNhanVien = () => {
  let arrInput = $$(".form-control.input-sm");
  let nhanVien = new NhanVien();
  arrInput.forEach((item) => {
    let idInput = item.id;
    nhanVien[idInput] = item.value;
  });
  let isValid = true;
  isValid &=
    checkEmptyValue(nhanVien.tkNhanVien, "tbTKNV") &&
    checkDoDaiKySo(nhanVien.tkNhanVien, "tbTKNV", 4, 6);
  isValid &=
    checkEmptyValue(nhanVien.name, "tbTen") &&
    kiemTraChiLaChuCai(nhanVien.name, "tbTen");
  isValid &=
    checkEmptyValue(nhanVien.email, "tbEmail") &&
    checkEmailValue(nhanVien.email, "tbEmail");
  isValid &=
    checkEmptyValue(nhanVien.password, "tbMatKhau") &&
    checkPass(nhanVien.password, "tbMatKhau", 6, 10);
  isValid &=
    checkEmptyValue(nhanVien.ngayLam, "tbNgay") &&
    checkNgayThangNam(nhanVien.ngayLam, "tbNgay");
  isValid &=
    checkEmptyValue(nhanVien.luongCoBan, "tbLuongCB") &&
    kiemTraLuong(nhanVien.luongCoBan, "tbLuongCB");
  isValid &= checkEmptyValue(nhanVien.chucVu, "tbChucVu");
  isValid &=
    checkEmptyValue(nhanVien.gioLam, "tbGioLam") &&
    checkSoGioLam(nhanVien.gioLam, "tbGioLam");
  // kiểm tra nếu isValid = false thì sẽ không trả về nhanVien
  if (isValid) {
    return nhanVien;
  }
};
// Thêm sinh viên
$("#btnThemNV").onclick = () => {
  let nhanVien = addNhanVien();
  // $(".thongBao").style.display="block important"
  if (nhanVien) {
    arrNhanVien.push(nhanVien);
    saveLocalStorage("arrNhanVien", arrNhanVien);
    renderNhanVien(arrNhanVien);
    $(".form-list").reset();
  }
};
let renderNhanVien = (arr) => {
  if (!arr) {
    arr = arrNhanVien;
  }
  let content = "";
  arr.forEach((item) => {
    let nhanVien = item;
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    let stringHtml = `
    <tr>
      <td>${newNhanVien.tkNhanVien}</td>
      <td>${newNhanVien.name}</td>
      <td>${newNhanVien.email}</td>
      <td>${newNhanVien.ngayLam}</td>
      <td>${newNhanVien.chucVu}</td>
      <td>${newNhanVien.tongLuong()}</td>
      <td>${newNhanVien.xepLoaiNhanVien()}</td>
      <td>
        <button onclick="deleteNhanVien('${
          newNhanVien.tkNhanVien
        }')" class="btn btn-danger">
        Xóa
        </button>
        <button onclick="getInfoNhanVien('${
          newNhanVien.tkNhanVien
        }')" class="btn btn-warning " data-toggle="modal" data-target="#myModal">
        Sửa
        </button>
      </td>
    </tr>
    `;
    content += stringHtml;
  });
  $("#tableDanhSach").innerHTML = content;
};
// data-toggle="modal"
// data-target="#myModal"
// Hàm xóa nhân viên
let deleteNhanVien = (taiKhoanNhanVien) => {
  arrNhanVien.forEach((item, index) => {
    if (taiKhoanNhanVien == item.tkNhanVien) {
      arrNhanVien.splice(index, 1);
    }
  });
  renderNhanVien();
  saveLocalStorage("arrNhanVien", arrNhanVien);
};
// Hàm giúp cập nhật sinh viên
let getInfoNhanVien = (taiKhoanNhanVien) => {
  // Tìm tới nhân viên có mã nhân viên trùng với tham số được truyền vào
  let nhanVien;
  arrNhanVien.forEach((item) => {
    if (taiKhoanNhanVien == item.tkNhanVien) {
      nhanVien = item;
    }
  });
  // khi đã tìm được nhân viên, thực hiện quá trình đưa dữ liệu lên input
  let arrInput = $$(".form-control.input-sm");
  arrInput.forEach((item) => {
    let id = item.id;
    if (id == "tkNhanVien") {
      item.readOnly = true;
    }
    item.value = nhanVien[id];
  });
};

let updateNhanVien = () => {
  let nhanVien = addNhanVien();
  if (nhanVien) {
    arrNhanVien.forEach((item, index) => {
      let nhanVienTrongMang = item;
      if (nhanVien.tkNhanVien == nhanVienTrongMang.tkNhanVien) {
        arrNhanVien[index] = nhanVien;
      }
    });
    renderNhanVien();
    saveLocalStorage("arrNhanVien", arrNhanVien);
    $("#tkNhanVien").readOnly = false;
    $(".form-list").reset();
  }
};
$("#btnCapNhat").onclick = updateNhanVien;
// tìm kiếm nhân viên
let searchNhanVien = (event) => {
  let valueUser = event.target.value;
  let arrNhanVienFilter = [];
  // dọn dẹp dữ liệu: chuyển đổi tất cả về chữ thường hoặc chữ hoa
  let keyword = valueUser.trim().toLowerCase();
  let newKeyword = removeVietnameseTones(keyword);

  arrNhanVien.forEach((item) => {
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, item);
    let newXepLoaiNhanVien = removeVietnameseTones(
      newNhanVien.xepLoaiNhanVien().trim().toLowerCase()
    );
    if (newXepLoaiNhanVien.includes(newKeyword)) {
      arrNhanVienFilter.push(newNhanVien);
    }
  });
  renderNhanVien(arrNhanVienFilter);
};

// Hàm lưu trữ dữ liệu vào localStorage
let saveLocalStorage = (key, value) => {
  // Chuyển đổi dữ liệu về thành chuỗi JSON
  let stringJson = JSON.stringify(value);
  // sử dụng setItem để lưu trữ
  localStorage.setItem(key, stringJson);
};
// Hàm giúp lưu trữ lấy dữ liệu từ localStorage
let getLocalStorage = (key) => {
  let dataLocal = localStorage.getItem(key);
  // Kiểm tra dữ liệu xem có hay không, vì nếu localStorage.getItem gọi lấy dữ liệu không có sẽ trả về null
  if (dataLocal) {
    let newData = JSON.parse(dataLocal);

    arrNhanVien = newData;
    renderNhanVien();
  }
};
getLocalStorage("arrNhanVien");

let kiemTraLuongCoBan = () => {};
