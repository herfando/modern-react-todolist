import Home from "./components/pages/home";
import AppProvider from "./providers/AppProvider";

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
