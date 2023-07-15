const baseUrl = "https://filthy-tiara-deer.cyclic.app";


export const api = `${baseUrl}`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/uploads/${fileName}`;
};