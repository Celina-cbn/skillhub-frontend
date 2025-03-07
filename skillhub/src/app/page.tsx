import { ToastContainer } from "react-toastify";
import { createStore } from "redux";

export default function Home({ Component, pageProps }) {
  const store = createStore(rootReducer)
  
  return (
      <>
          <ToastContainer />
          <Component {...pageProps} />
      </>
  );
}
