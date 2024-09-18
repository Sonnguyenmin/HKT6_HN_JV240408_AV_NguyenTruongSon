/**
 * Hàm lưu dữ liệu lên localStoage
 * @param {*} key Key của dữ liệu
 * @param {*} data Mảng cart
 * Auth: NTSon (18/09/2024)
 */
export const saveData = (key, data) => {
  // Lưu trữ dữ liệu lên local
  localStorage.setItem(key, JSON.stringify(data));
};
