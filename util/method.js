function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
}

var validation = {
  isEmpty: function (value, name, content) {
    if (value.trim() == "") {
      // document.querySelector(`p[data-error-required=${name}]`)
      document.querySelector(`#${name}`).style.display = "block";
      document.querySelector(`#${name}`).innerHTML =
        content + " không được bỏ trống !";
      return false;
    }
    document.querySelector(`#${name}`).style.display = "none";
    document.querySelector(`#${name}`).innerHTML = "";
    return true;
  },

  isLetter: function (value, name, content) {
    var regexLetter = /^[A-Z a-z]+$/;
    if (regexLetter.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + " không được bỏ trống và tất cả phải là chữ !";
    return false;
  },

  isEmailValid: function (value, name, content) {
    var regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + " không được bỏ trống và đúng định dạng !";
    return false;
  },

  isNumberAndValueValid: function (value, name, content, minValue, maxValue) {
    value = Number(value);
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value) && value >= minValue && value <= maxValue) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, tất cả phải là số và có giá trị từ ${minValue.toLocaleString()} - ${maxValue.toLocaleString()} !`;
    return false;
  },

  isNumberValid: function (value, name) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
      document.querySelector(`[data-error-regexNumber=${name}]`).innerHTML = "";
      return true;
    }
    document.querySelector(`[data-error-regexNumber=${name}]`).innerHTML =
      name + " tất cả phải là số";
    return false;
  },

  isLengthValid: function (value, name, minLength, maxLength) {
    var length = value.length;
    if (length < minLength || length > maxLength) {
      document.querySelector(
        `[data-error-min-max-length=${name}]`
      ).innerHTML = `${name} có giá trị từ ${minLength} - ${maxLength}`;
      return false;
    }
    document.querySelector(
      `[data-error-min-max-length=${name}]`
    ).innerHTML = ``;
    return true;
  },

  isValueValid: function (value, name, minValue, maxValue) {
    if (Number(value) < minValue || Number(value) > maxValue) {
      document.querySelector(
        `[data-error-min-max-value=${name}]`
      ).innerHTML = `${name} giá trị từ ${minValue} - ${maxValue}  !`;
      return false;
    }
    document.querySelector(`[data-error-min-max-value=${name}]`).innerHTML = ``;
    return true;
  },

  isPassValid: function (value, name) {
    var regexPassword =
      /(?=.*\d)(?=.*[A-Z])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{6,10}/; //(?=.*[a-z])
    if (regexPassword.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    } else {
      document.querySelector(`#${name}`).style.display = "block";
      document.querySelector(`#${name}`).innerHTML =
        "Mật khẩu không được bỏ trống, phải chứa ít nhất 1 số, 1 chữ hoa, 1 ký tự đặc biệt và độ dài từ 6-10 ký tự !";
      return false;
    }
  },

  isDateValid: function (value, name, content) {
    var regexDate = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (regexDate.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, và đúng định dạng mm/dd/yyyy`;
    return false;
  },

  isUserIDNumberLengthExist: function (
    arr,
    prop,
    userID,
    name,
    content,
    minLength,
    maxLength
  ) {
    var length = userID.length;
    var regexNumber = /^[0-9]+$/;
    //test exist
    for (var index = 0; index < arr.length; index++) {
      if (arr[index][prop] === userID) {
        document.querySelector(`#${name}`).style.display = "block";
        document.querySelector(
          `#${name}`
        ).innerHTML = `${content} cần nhập lại do trùng với người khác, nếu bạn sở hữu tài khoản này hãy nhập mật khẩu`;
        return false;
      }
    }
    //test length and number
    if (
      regexNumber.test(userID) &&
      length >= minLength &&
      length <= maxLength
    ) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }

    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, tất cả phải là số và độ dài từ ${minLength} - ${maxLength} ký tự!`;
    return false;
  },

  isNumberAndLengthValid: function (
    value,
    name,
    content,
    minLength,
    maxLength
  ) {
    var length = value.length;
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value) && length >= minLength && length <= maxLength) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, tất cả phải là số và độ dài từ ${minLength} - ${maxLength} ký tự!`;
    return false;
  },
};

// phương thức lưu dữ liệu vào localStorage
function saveStorageArr(arr) {
  var strArr = JSON.stringify(arr);

  localStorage.setItem("arr", strArr);
}

// phương thức lấy dữ liệu từ localStorage
function getStorageJSON(name) {
  if (localStorage.getItem(name)) {
    var str = localStorage.getItem(name);
    var jsonValue = JSON.parse(str);

    return jsonValue;
  }
  return null;
}

// kiểm tra và gọi dữ liệu đã lưu trong storage
function getDataStorage() {
  if (getStorageJSON("arr")) {
    arrNhanVien = getStorageJSON("arr");
    renderTableNhanVien(arrNhanVien);
  }
}

/**
 * @param {*} arrstrings mảng chứa nhiều chuỗi bên trong
 * @returns chuỗi xuất hiện nhiều nhất trong hàm
 */
function findMostCommonString(arrstrings) {
  var chuoiXuatHienNhieuNhat = "";
  var tanSuatMax = 0;
  for (var index = 0; index < arrstrings.length; index++) {
    var tuanSuat = 0;
    for (var j = 0; j < arrstrings.length; j++) {
      if (arrstrings[j] == arrstrings[index]) {
        tuanSuat++;
      }
    }
    if (tuanSuat > tanSuatMax) {
      tanSuatMax = tuanSuat;
      chuoiXuatHienNhieuNhat = arrstrings[index];
    }
  }
  return chuoiXuatHienNhieuNhat;
}

/**
 * @param {*} obj 1 object có nhiều thuộc tính
 * @param {*} prop thuộc tính cần lấy giá trị
 * @returns
 */
function getValue(obj, prop) {
  if (obj.hasOwnProperty(prop)) {
    return obj[prop];
  } else if (prop.includes(".")) {
    const [parentProp, childProp] = prop.split(".");
    if (
      obj.hasOwnProperty(parentProp) &&
      obj[parentProp].hasOwnProperty(childProp)
    ) {
      return obj[parentProp][childProp];
    }
  }
  return undefined;
}

/**
 * @param {*} array 1 chuỗi chứa các số
 * @returns vị trí và giá trị min, max trong chuỗi
 */
function findHighestAndLowest(array) {
  var indexMax = 0;
  var valueMax = array[0];
  var indexMin = 0;
  var valueMin = array[0];

  for (var i = 0; i < array.length; i++) {
    if (array[i] > valueMax) {
      valueMax = array[i];
      indexMax = i;
    } else if (array[i] < valueMin) {
      valueMin = array[i];
      indexMin = i;
    }
  }
  return {
    highest: { value: valueMax, index: indexMax },
    lowest: { value: valueMin, index: indexMin },
  };
}

/**
 * @param {*} str chuỗi
 * @returns đảo ngược của chuỗi
 */
function recursiveReverse(str) {
  return str.split("").reverse().join("");
}

/**
 * Tìm chuỗi con dài nhất ko chứa ký tự đặc biệt
 * @param {*} str
 * @returns
 */
function longestSubstr(str) {
  var longest = "";
  var current = "";

  for (var i = 0; i < str.length; i++) {
    var char = str.charAt(i);
    if (/^[0-9a-zA-Z]+$/.test(char)) {
      current += char;
      if (current.length > longest.length) {
        longest = current;
      }
    } else {
      current = "";
    }
  }

  return longest;
}

/**
 * Tính b lũy thừa e
 * @param {*} b
 * @param {*} e
 * @returns
 */
function powerOfNumber(b, e) {
  var result = 1;
  for (var i = 0; i < e; i++) {
    result *= b;
  }
  return result;
}

/**
 * Tính giai thừa của số n
 * @param {*} n
 * @returns
 */
function factorial(n) {
  var giaiThua = 1;
  for (var i = 1; i <= n; i++) {
    giaiThua *= i;
  }
  return giaiThua;
}

/**
 * Tính tổng từ 1 đến n
 * @param {*} n
 * @returns
 */
function sumWithRecursion(n) {
  var sum = 0;
  for (var i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * In hoa từ đầu VD: str = "hello case" => upperCase(str) = "Hello Case"
 * @param {*} string
 * @returns
 */
function upperCase(string) {
  var words = string.split(" ");
  words = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return words.join(" ");
}
