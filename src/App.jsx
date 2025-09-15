import "./styles/App.css";
import Login from "./components/Login";
import Article from "./components/Post";

function App() {
    const jwt = localStorage.getItem("token");
    return <>{jwt ? <Post /> : <Login />}</>;
}

export default App;
