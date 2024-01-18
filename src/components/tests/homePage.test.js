import { render, screen } from "@testing-library/react";
import HomePage from "../homePage";
import { Provider } from "react-redux";
import store from "../../store/store";
import { BrowserRouter } from "react-router-dom";

test("render homePage component", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  );
  //eslint-disable-next-line
  screen.debug();
});
