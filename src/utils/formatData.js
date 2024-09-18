/**
 * Định dạng số tiền thành kiểu tiền tệ Việt Nam.
 * @param {number} money - Số tiền cần định dạng.
 * @returns {string} - Số tiền đã được định dạng.
 * Auth: NTSon (18/09/2024)
 */
export const formatMoney = (money) => {
  return money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};
