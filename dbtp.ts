function getCurrentDate(): string {
    const now = new Date();

    // 연도, 월, 일 가져오기
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
const dat = document.getElementById("styledDateInput") as HTMLInputElement
dat.value = getCurrentDate();

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


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gyeonggi_button') as HTMLInputElement;
    form.addEventListener('click', async (event) => {
        event.preventDefault(); // 폼의 기본 제출 동작을 막음

        // HTML 요소에서 데이터를 추출
        const dateInput = document.getElementById('styledDateInput') as HTMLInputElement;
        const optionsJson = getOptionsAsJson('optionsForm');
        const regionInput = document.getElementById('regioninfo')?.innerText;
        const formData = {
            region: regionInput,
            date: dateInput.value.trim(), // 입력값을 트림하여 가져옴
            activity: optionsJson,
        };

        console.log('Form Data:', formData);
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // POST 요청을 보낼 API 엔드포인트

        try {
            const response = postData(apiUrl, formData);
            console.log('Response:', response);
            alert('Data submitted successfully!');
            const data = await fetchJsonData(apiUrl);
            alert('fetched');
            renderList("results", data.map((item) => item.title));
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

function renderList(containerId: string, data: any[]): void {
    const container = document.getElementById(containerId);
    const div = document.getElementById(containerId) as HTMLDivElement;
    div.style.display = "block"; 
    if (!container) {
        throw new Error(`Container with ID "${containerId}" not found`);
    }

    // 기존 내용을 지움
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p>No items to display</p>';
        return;
    }

    // 리스트 생성
    const list = document.createElement('ul');
    data.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = typeof item === 'string' ? item : JSON.stringify(item);
        list.appendChild(listItem);
    });

    container.appendChild(list);
}