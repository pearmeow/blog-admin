import "./styles/App.css";
import Login from "./components/Login";
import Article from "./components/Article";

function App() {
    const jwt = localStorage.getItem("token");
    return <>{jwt ? <Article /> : <Login />}</>;
}

export default App;
