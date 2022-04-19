import Amplify, { API } from "aws-amplify";
import { useEffect } from "react";
import config from "./aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import "./App.css";
Amplify.configure(config);

function App() {
  useEffect(() => {
    API.get("petsapirest", "/pets/name").then((res) => console.log(res));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Hello <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
