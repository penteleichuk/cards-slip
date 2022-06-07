export const DEV_VERSION = true; //изменить на true

export const appURL = !DEV_VERSION
    ? 'http://localhost:3000/'
    : 'https://vasyok28.github.io/cards-slip/';