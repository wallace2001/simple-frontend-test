import "./App.scss";
import Routes from "./Routes";
import Navbar from "./components/navbar";
import Notification from "./components/notification";

const App = () => (
    <>
        <Navbar />
        <Notification />
        <div className="content">
            <Routes />
        </div>
    </>
);

export default App;
