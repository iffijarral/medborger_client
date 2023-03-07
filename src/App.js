import React, { Fragment, useEffect, useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "src/Setup/Contexts/AuthContext";
// pages
import Layout from "src/pages/Layout";
import Home from "src/pages/Home";
import Packages from "src/pages/Packages";
import Tests from "src/pages/Tests";
import ActiveTest from "src/pages/Tests/ActiveTest";
import PrevExams from "src/pages/PrevExams";
import ActivePrevExam from "src/pages/PrevExams/ActivePrevExam";
import About from "src/pages/About";
import Tips from "src/pages/Tips";
import Statistics from "src/pages/Statistics";
import ResetPassword from "src/Setup/Auth/ResetPassword";
import CheckoutForm from "src/Components/Checkout";

// Global Styles
import "src/Setup/Styles/Global.scss"





function App() {
  const auth = useContext(AuthContext);
  useEffect(() => {        
    makeAuthentication()
  }, []);

  const makeAuthentication = async() => {
    await auth.authenticate()
  }

  return (
    <Fragment>
      
        
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="packages" element={<Packages />} />
              <Route path="tests" element={<Tests />} />
              <Route path="/tests/:testID" element={<ActiveTest />} />
              <Route path="prevexams" element={<PrevExams />} />
              <Route path="prevexams/:examid/:season" element={<ActivePrevExam />} />
              <Route path="/about/:action" element={<About />} />
              <Route path="/tips" element={<Tips />} /> 
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/checkout/:packageID" element={<CheckoutForm />} />
            </Route>
          </Routes>
        
      

    </Fragment>
  );
}

export default App;
