export const DEV_VERSION = false; //изменить на true

export const appURL = !DEV_VERSION
    ? 'http://localhost:3000/'
    : 'https://vasyok28.github.io/cards-slip/';