function getCurrentDate() {
    var now = new Date();
    // 연도, 월, 일 가져오기
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    var day = String(now.getDate()).padStart(2, "0");
    return "".concat(year, "-").concat(month, "-").concat(day);
}
var dateInput = document.getElementById("styledDateInput");
dateInput.value = getCurrentDate();
