const baseUrl = "http://localhost:8000";


export const api = `${baseUrl}`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/uploads/${fileName}`;
};