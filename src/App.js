import "./App.scss";
import Routes from "./Routes";
import Navbar from "./components/navbar";

const App = () => (
    <>
        <Navbar />
        <div className="content">
            <Routes />
        </div>
    </>
);

export default App;
