// Kiểm tra không cho nhập rỗng, kiểm tra phải là email,kiểm tra về độ dài ký tự, kiểm tra về điểm các môn bé hơn bằng 10 và lớn hơn bằng 0
function checkEmptyValue(value, idSpan) {
  // xử lí dữ liệu value để kiểm tra xem có rỗng hay không
  let eleSpan = document.getElementById(idSpan);
  if (value == "") {
    // thực hiện đưa lên giao diện một đoạn thông báo cho người dùng
    eleSpan.innerHTML = "Vui lòng không bỏ trống trường này";
    return false;
  } else {
    eleSpan.innerHTML = "";
    return true;
  }
}
// Check email
function checkEmailValue(value, idSpan) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  // tương tác với regex để kiểm tra dữ liệu người dùng
  var isValid = regexEmail.test(value);
  if (isValid) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML = "Email không đúng định dạng";
    return false;
  }
}
//  Check mật khẩu 6-10 ký tự, chứa 1 ký số, 1 ký tự in hoa, 1 ký tự đặc biệt
let checkPass = (value, idSpan, min, max) => {
  const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).+$/;
  let isValid = regex.test(value);
  let doDaiKyTu = value.length;
  if (isValid && doDaiKyTu >= min && doDaiKyTu <= max) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Vui lòng nhập 6 - 10 ký tự, chứa 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    return false;
  }
};
// Check định dạng dd/mm/yyyy
let checkNgayThangNam = (value, idSpan) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  let isValid = regex.test(value);
  if (isValid) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML = "Vui lòng nhập dd/mm/yyyy";
    return false;
  }
};
// Check độ dài ký số
let checkDoDaiKySo = (value, idSpan, min, max) => {
  const numberRegex = /^[+]?(\d+(\.\d*)?|\.\d+)([eE][+]?\d+)?$/;
  let isValid = numberRegex.test(value);
  let doDaiKySo = value.length;
  if (isValid && doDaiKySo >= min && doDaiKySo <= max) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Vui lòng nhập tối đa 4 - 6 ký số";
    return false;
  }
};
// Check input chỉ là chữ
let kiemTraChiLaChuCai = (value, idSpan) => {
  const regex =
    /^[a-zA-ZÀ-Ỹà-ỹẠ-ỹĂ-ửĨ-ỹƠ-ởƯ-ửẠ-ỹẢ-ỹÃ-ỹÀ-Ỹấ-ỳầ-ỷẩ-ẫằ-ỵắ-ỷẵ-ặÁ-Ýắ-ỷẤ-ỲẦ-ỶẨ-ẪẰ-Ỵắ-ỷẵ-ặ\s]+$/;
  let isValid = regex.test(value);

  if (isValid) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML = "Vui lòng chỉ nhập chữ";
    return false;
  }
};
let kiemTraLuong = (value, idSpan) => {
  const regex = /^\d+$/;
  let isValid = regex.test(value);
  if (isValid && value >= 1000000 && value <= 20000000) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Chỉ được nhập số và lương cơ bản thấp nhất 1 triệu và cao nhất 20 triệu";
    return false;
  }
};
// check số giờ làm
let checkSoGioLam = (value, idSpan) => {
  if (value >= 80 && value <= 200) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML =
      "Số giờ làm trong tháng thấp nhất 80 và cao nhất 200";
    return false;
  }
};
// Bỏ dấu trong chữ cái
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

// Ngăn chặn hành vi
let inputForm = document.querySelectorAll(".txt-form-input");
inputForm.forEach(function (input) {
  input.addEventListener("input", function (event) {
    // Lấy giá trị của input
   let inputValue = event.target.value;

    // Loại bỏ các ký tự không phải số
   let numericValue = inputValue.replace(/[^0-9./]/g, "");

    // Cập nhật giá trị của input chỉ bao gồm các số
    event.target.value = numericValue;
  });
});
