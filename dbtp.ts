function getCurrentDate(): string {
    const today = new Date();
    return formatDate(today);
}

function getTwoWeeksFromNow(): string {
    const today = new Date();
    today.setDate(today.getDate() + 10); // 2주(14일) 추가
    return formatDate(today);
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const dat = document.getElementById("styledDateInput") as HTMLInputElement
dat.value = getCurrentDate();
dat.min = getCurrentDate();
dat.max = getTwoWeeksFromNow();


function getOptionsAsJson(formId: string): Record<string, boolean> {
    const form = document.getElementById(formId) as HTMLFormElement;

    if (!form) {
        throw new Error(`Form with ID "${formId}" not found`);
    }

    const inputs = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    const options: Record<string, boolean> = {};

    inputs.forEach((input) => {
        options[input.name] = input.checked; // 체크 여부를 저장
    });

    return options;
}

async function postData(url: string, data: Record<string, any>): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // JSON 데이터를 서버로 전송
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to post data: ${response.status}`);
        }

        return await response.json(); // 응답 데이터를 JSON으로 반환
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

const MAX_SELECTION = 3;

// HTML 요소 선택
const form = document.getElementById('optionsForm') as HTMLFormElement;

// 폼 내부의 모든 체크박스 선택
const checkboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

// 이벤트 리스너 추가
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // 현재 체크된 체크박스 개수 계산
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

        // 제한을 초과하면 현재 변경된 체크박스 체크를 해제
        if (checkedCount > MAX_SELECTION) {
            checkbox.checked = false;
            alert(`활동은 ${MAX_SELECTION}개까지 선택할 수 있습니다.`);
        }
    });
});


// 버튼 클릭 시 선택된 값을 가져오기 위한 이벤트 리스너 추가
function getCheckedValues(): string[] {
    // form 내부의 모든 체크박스를 선택
    const checkboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    // 체크된 항목만 필터링하여 값(value) 배열 반환
    const selectedValues = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked) // 체크된 항목 필터링
        .map(checkbox => checkbox.value);    // value 값 추출

    return selectedValues;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gyeonggi_button') as HTMLInputElement;
    form.addEventListener('click', async (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작을 막음

        // HTML 요소에서 데이터를 추출
        const dateInput = document.getElementById('styledDateInput') as HTMLInputElement;
        // const optionsJson = getOptionsAsJson('optionsForm');
        const optionsJson = getCheckedValues();
        const regionInput = document.getElementById('regioninfo')?.innerText;
        const formData = {
            region: regionInput,
            date: dateInput.value.trim(), // 입력값을 트림하여 가져옴
            activity: optionsJson,
        };

        console.log('Form Data:', formData);
        const apiUrl = 'http://localhost:3000/recommend'; // POST 요청을 보낼 API 엔드포인트

        try {
            const response = postData(apiUrl, formData);
            console.log('Response:', response);
            alert('Data submitted successfully!');
            const data = await fetchJsonData(apiUrl);
            alert('fetched');
            console.log(data);
            renderList("results", data);
        } catch (error) {
            alert('Failed to submit data. Check console for details.');
        }
    });
});

async function fetchJsonData(url: string): Promise<any[]> {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

interface Item {
    city_name: number;
    activity_name: number;
    name: string;
    rank: string;
}

interface ApiResponse{
    results: {[key:string]: Item};
}

function renderList(containerId: string, json: ApiResponse): void {
    const container = document.getElementById(containerId);
    const div = document.getElementById(containerId) as HTMLDivElement;

    if (!container) {
        throw new Error(`Container with ID "${containerId}" not found`);
    }

    // 블록 스타일 설정
    div.style.display = "block";

    // 기존 내용을 지움
    container.innerHTML = '';
    const data = Object.values(json.results);
    if (data.length === 0) {
        container.innerHTML = '<p>No items to display</p>';
        return;
    }

    // 리스트 생성
    const list = document.createElement('ul');
    data.forEach((item) => {
        const listItem = document.createElement('li');
        
        // 각 항목의 데이터를 가독성 있게 렌더링
        listItem.textContent = `추천하는 도시: ${item.city_name}, 가능한 활동 ${item.activity_name}`;
        
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