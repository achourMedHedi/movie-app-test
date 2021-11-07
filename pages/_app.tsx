import App from "next/app";
import React from "react";
import { Provider } from "mobx-react";
import { fetchInitialStoreState, TestStore } from "../stores/TestStore";
import '../styles/globals.css'
import { AppPagesContainer } from "../styles/appPage.styles";
import Footer from "../components/footer/Footer.component";

interface IState {
  testStore: TestStore,
}
class MyApp extends App {
  state: IState = {
    testStore: new TestStore()
  };

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext: any) {
    const appProps = await App.getInitialProps(appContext);
    const initialStoreState = await fetchInitialStoreState();

    return {
      ...appProps,
      initialStoreState
    };
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props: any, state: IState) {
    state.testStore.hydrate(props.initialStoreState);
    return state;
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider testStore={this.state.testStore}>
        <AppPagesContainer>
          <Component {...pageProps} />
        </AppPagesContainer>
        <Footer />
      </Provider>
    );
  }
}
export default MyApp;