function getCurrentDate(): string {
    const now = new Date();

    // 연도, 월, 일 가져오기
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
const dateInput = document.getElementById("styledDateInput") as HTMLInputElement
dateInput.value = getCurrentDate();
