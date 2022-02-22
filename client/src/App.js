import Dashboard from "./pages/Dashboard";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import Sessions from "./pages/Sessions";

// import ProtectedRoute from "./auth/protected-route";

export default function Home() {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/search" component={Search} />
          <Route path="/sessions/:id" component={Sessions} />
        </Switch>
      </Router>
    </>
  );
}
