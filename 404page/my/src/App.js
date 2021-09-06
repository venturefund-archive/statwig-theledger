import "./App.css";
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import Feed from "./pages/Feed";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";

function App(){
  return(
   <div className="App">
    <Router>
      <Link to="/feed"> Feed</Link>
      <Link to="/menu"> Menu</Link>
      <Link to="/profile"> Profile</Link>
      <Switch> 
      <Route path="/" exact />
      <Route path="/feed" exact component={Feed} />
      <Route path="/menu" exact component={Menu} />
      <Route path="/profile" exact component={Profile} />
      <Route component={PageNotFound} />
      </Switch>
    
      </Router>
  </div>
  );
}

export default App;
  