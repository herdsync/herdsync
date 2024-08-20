import React from "react";
import Routes from "./Routes";
import { persistor, store } from "./Redux";
import Toast from "react-native-toast-message";
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
