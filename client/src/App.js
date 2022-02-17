import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Search from "./pages/Search";

export default function Home() {
  return (
    <Router>
      <Nav />
      <Header />
      <Switch>
        <Route exact path="/" component={Dashboard}></Route>
        <Route exact path="/search" component={Search}></Route>
      </Switch>
    </Router>
  );
}
