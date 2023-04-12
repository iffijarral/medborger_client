import React, { Fragment, useEffect, useContext } from "react"
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "src/Components/Contexts/AuthContext";
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
import ResetPassword from "src/Components/Auth/ResetPassword";
import CheckoutForm from "src/Components/Checkout";
import PageNotFound from "src/pages/PageNotFound";

// Global Styles
import "src/Setup/Styles/Global.scss"

function App() {
  const auth = useContext(AuthContext);
  useEffect(() => {
    // Here user's state is loaded on page refresh, as it gets lost on refresh. 
    const loadState = async () => {
      await auth.authenticate()
    }

    loadState()
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="packages" element={<Packages />} />
          <Route path="tests" element={<Tests />} />
          <Route path="/tests/:testID" element={<ActiveTest />} />
          <Route path="prevexams" element={<PrevExams />} />
          <Route path="prevexams/:year/:season" element={<ActivePrevExam />} />
          <Route path="/about/:action" element={<About />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/checkout/:packageID" element={<CheckoutForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
