import React from "react";

import logo from '../logo.svg';
import './styles/home.css';

import MarkdownReader from "../components/MarkdownReader";

export default function Home () {
  

  return (
    <div className="App">
      <MarkdownReader path="/pages/home.md" />
    </div>
  );
}