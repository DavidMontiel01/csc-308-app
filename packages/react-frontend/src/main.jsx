import React from "react";
import ReactDomClient from "react-dom/client";
import "./main.css";
import MyApp from "./myApp";

//creat a container
const container = document.getElementById("root");

//Create root
const root = ReactDomClient.createRoot(container);

root.render(<MyApp />);