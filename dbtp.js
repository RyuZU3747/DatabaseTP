var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
function getCurrentDate() {
    var today = new Date();
    return formatDate(today);
}
function getTwoWeeksFromNow() {
    var today = new Date();
    today.setDate(today.getDate() + 10); // 2주(14일) 추가
    return formatDate(today);
}
function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작
    var day = date.getDate().toString().padStart(2, '0');
    return "".concat(year, "-").concat(month, "-").concat(day);
}
var dat = document.getElementById("styledDateInput");
dat.value = getCurrentDate();
dat.min = getCurrentDate();
dat.max = getTwoWeeksFromNow();
function getOptionsAsJson(formId) {
    var form = document.getElementById(formId);
    if (!form) {
        throw new Error("Form with ID \"".concat(formId, "\" not found"));
    }
    var inputs = form.querySelectorAll('input[type="checkbox"]');
    var options = {};
    inputs.forEach(function (input) {
        options[input.name] = input.checked; // 체크 여부를 저장
    });
    return options;
}
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json', // JSON 데이터를 서버로 전송
                            },
                            body: JSON.stringify(data),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to post data: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()]; // 응답 데이터를 JSON으로 반환
                case 3:
                    error_1 = _a.sent();
                    console.error('Error posting data:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var MAX_SELECTION = 3;
// HTML 요소 선택
var form = document.getElementById('optionsForm');
// 폼 내부의 모든 체크박스 선택
var checkboxes = form.querySelectorAll('input[type="checkbox"]');
// 이벤트 리스너 추가
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        // 현재 체크된 체크박스 개수 계산
        var checkedCount = Array.from(checkboxes).filter(function (cb) { return cb.checked; }).length;
        // 제한을 초과하면 현재 변경된 체크박스 체크를 해제
        if (checkedCount > MAX_SELECTION) {
            checkbox.checked = false;
            alert("\uD65C\uB3D9\uC740 ".concat(MAX_SELECTION, "\uAC1C\uAE4C\uC9C0 \uC120\uD0DD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."));
        }
    });
});
// 버튼 클릭 시 선택된 값을 가져오기 위한 이벤트 리스너 추가
function getCheckedValues() {
    // form 내부의 모든 체크박스를 선택
    var checkboxes = form.querySelectorAll('input[type="checkbox"]');
    // 체크된 항목만 필터링하여 값(value) 배열 반환
    var selectedValues = Array.from(checkboxes)
        .filter(function (checkbox) { return checkbox.checked; }) // 체크된 항목 필터링
        .map(function (checkbox) { return checkbox.value; }); // value 값 추출
    return selectedValues;
}
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('gyeonggi_button');
    form.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var dateInput, optionsJson, regionInput, formData, apiUrl, response, data, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    event.preventDefault(); // 폼의 기본 제출 동작을 막음
                    dateInput = document.getElementById('styledDateInput');
                    optionsJson = getCheckedValues();
                    regionInput = (_a = document.getElementById('regioninfo')) === null || _a === void 0 ? void 0 : _a.innerText;
                    formData = {
                        region: regionInput,
                        date: dateInput.value.trim(), // 입력값을 트림하여 가져옴
                        activity: optionsJson,
                    };
                    console.log('Form Data:', formData);
                    apiUrl = 'https://jsonplaceholder.typicode.com/posts';
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    response = postData(apiUrl, formData);
                    console.log('Response:', response);
                    alert('Data submitted successfully!');
                    return [4 /*yield*/, fetchJsonData(apiUrl)];
                case 2:
                    data = _b.sent();
                    alert('fetched');
                    renderList("results", data.map(function (item) { return item.title; }));
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    alert('Failed to submit data. Check console for details.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
function fetchJsonData(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error fetching data:', error_3);
                    throw error_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderList(containerId, data) {
    var container = document.getElementById(containerId);
    var div = document.getElementById(containerId);
    if (!container) {
        throw new Error("Container with ID \"".concat(containerId, "\" not found"));
    }
    // 블록 스타일 설정
    div.style.display = "block";
    // 기존 내용을 지움
    container.innerHTML = '';
    if (data.length === 0) {
        container.innerHTML = '<p>No items to display</p>';
        return;
    }
    // 리스트 생성
    var list = document.createElement('ul');
    data.forEach(function (item) {
        var listItem = document.createElement('li');
        // 각 항목의 데이터를 가독성 있게 렌더링
        listItem.textContent = "City ID: ".concat(item.city_id, ", Activity ID: ").concat(item.activity_id, ", Name: ").concat(item.name);
        list.appendChild(listItem);
    });
    container.appendChild(list);
}
// function renderList(containerId: string, data: any[]): void {
//     const container = document.getElementById(containerId);
//     const div = document.getElementById(containerId) as HTMLDivElement;
//     div.style.display = "block";
//     if (!container) {
//         throw new Error(`Container with ID "${containerId}" not found`);
//     }
//     // 기존 내용을 지움
//     container.innerHTML = '';
//     if (data.length === 0) {
//         container.innerHTML = '<p>No items to display</p>';
//         return;
//     }
//     // 리스트 생성
//     const list = document.createElement('ul');
//     data.forEach((item) => {
//         const listItem = document.createElement('li');
//         listItem.textContent = typeof item === 'string' ? item : JSON.stringify(item);
//         list.appendChild(listItem);
//     });
//     container.appendChild(list);
// }
