import { Routes, Route } from "react-router-dom";
import "./style.css";
import Footer from "./iot-frontend/components/Footer";
import Header from "./iot-frontend/components/Header";
import Home from "./iot-frontend/components/Home";
import Project from "./iot-frontend/components/Project";
import Apply from "./iot-frontend/components/Apply";
import About from "./iot-frontend/components/About";
import Admin from "./iot-frontend/components/Admin";
import Feedback from "./iot-frontend/components/Feedback";
import Blogs from "./iot-frontend/components/Blogs";
import Login from "./iot-frontend/components/chats/home page/Login";
import AdminAuth from "./iot-frontend/components/AdminAuth";


function App() {
  // const { data } = useAdminAuthGetQuery();
  // let adminPath;
  // if (data) {
  //   adminPath = `/name${data[0].name}password${data[0].password}`;
  // } else {
  //   adminPath = "undefined";
  // }
  return (
    <div className="app">
      {/* ############################## IOT Routes ############################ */}
      <Header />
      <Routes>
        {/* <Route path="/"> */}
        <Route path="/" element={[<Home />]} />
        <Route path="/projects" element={<Project />} />
        <Route path="/apply" element={[<Apply />]} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* <Route path={adminPath} element={<Admin />} /> */}
        <Route path="/real" element={<Login />} />
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/feedback" element={<Feedback />} />
        {/* </Route> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
