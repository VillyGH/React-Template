import {startApp} from "./app/core/Application";

startApp();

// @ts-ignore
window.app = {
    start: startApp,
};
