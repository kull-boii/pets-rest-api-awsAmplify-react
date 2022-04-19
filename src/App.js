import Amplify, { API } from "aws-amplify";
import { useEffect } from "react";
import { useState } from "react";
import config from "./aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import "./App.css";
Amplify.configure(config);

function App() {
  // state
  const [petName, setpetName] = useState("");
  const [petType, setpetType] = useState("");
  const [pet, setpet] = useState([]);

  useEffect(() => {
    API.get("petsapirest", "/pets/name").then((res) => {
      console.log(res);
      setpet([...pet, ...res]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("petsapirest", "/pets", {
      body: {
        name: petName,
        type: petType,
      },
    }).then((response) => {
      // setpet([...response, ...pet]);
      console.log(response);
      API.get("petsapirest", "/pets/name").then((res) => {
        console.log(res);
        setpet([...res]);
       
      });
    });
    alert("inserted data");
    setpetName("");
    setpetType("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav
          className="nav"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Hello
          <AmplifySignOut />
        </nav>
        <form onSubmit={handleSubmit} className="sendForm">
          <input
            type="text"
            value={petName}
            placeholder="name of pet"
            onChange={(e) => setpetName(e.target.value)}
          />
          <input
            type="text"
            value={petType}
            placeholder="type of pet"
            onChange={(e) => setpetType(e.target.value)}
          />
          <button>Add Pet</button>
        </form>
        <ul>
          {pet.map((p) => (
            <li key={p.name}>{p.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
