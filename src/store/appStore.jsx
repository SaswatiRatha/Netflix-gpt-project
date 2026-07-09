import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import mediaReducer from "./slices/mediaSlice";
import modalReducer from "./slices/modalSlice";
import gptReducer from "./slices/gptSlice";
export const appStore = configureStore({
  reducer: {
    user: userReducer,
    media: mediaReducer,
    modal: modalReducer,
    gpt: gptReducer,
  },
});
