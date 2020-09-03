export const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
export const imageUrl = `${baseUrl}/`;
export const apiUrl = `${baseUrl}/api`;
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
