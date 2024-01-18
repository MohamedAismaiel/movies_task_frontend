import HomePage from "./components/homePage";
import { Route, Routes } from "react-router-dom";
import DetailesPage from "./components/detailesPage";
import NotFound from "./components/notFound";
import SearchResults from "./components/results";
import Header from "./components/header";
function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" />
        <Route path="/results/:keyword" element={<SearchResults />} />
      </Route>

      <Route path="/movies">
        {/* <Route index element={<HomePage />} /> */}
        <Route path=":id" element={<DetailesPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
