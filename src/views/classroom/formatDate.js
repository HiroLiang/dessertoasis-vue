// 將 date 型別轉換成 'yyyy-MM-dd' 字串
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 補零
    const day = String(date.getDate()).padStart(2, '0'); // 補零
    return `${year}-${month}-${day}`
}

export default formatDate;