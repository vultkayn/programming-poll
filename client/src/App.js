import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './Login';


function DefaultAppBody () {
  return (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
  );
}

export default function App () {
  const [content, setContent] = useState(null);

  return (
    <> 
    <Navbar
      tabs={[
        {
          key: 0,
          name: "index",
          content: <DefaultAppBody />
        },
        {
          key: 1,
          name: "login",
          content: <LoginPage />
        }
      ]}
      onChange={(e, content) => setContent(content)}
    />
    {content}
    </>
  );
}
