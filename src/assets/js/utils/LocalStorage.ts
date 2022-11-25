import { LocalStorageKeys } from "../../../store/types";

export const clearLocalStorage = () => {
    localStorage.removeItem(LocalStorageKeys.QUIZ_ANSWERS);
    localStorage.removeItem(LocalStorageKeys.QUIZ_FINISHED);
    localStorage.removeItem(LocalStorageKeys.QUIZ_STARTED);
    localStorage.removeItem(LocalStorageKeys.QUIZ_TIMER);
}