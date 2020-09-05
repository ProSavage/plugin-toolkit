import styled from "styled-components";
import Navbar from "../components/Navbar";
import "./../style.css"

function MyApp({ Component, pageProps }) {
  return (
    <Container>
        <Navbar/>
      <Component {...pageProps} />
    </Container>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;
