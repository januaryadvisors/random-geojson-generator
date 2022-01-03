export const statusIsGood = (status) => status >= 200 && status < 300;
export const statusIsUnauthorized = (status) => status === 401;