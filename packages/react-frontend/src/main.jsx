import React from "react";
import ReactDomClient from "react-dom/client";
import MyApp from "./MyApp"
import "./main.css";


//Create the container
const container = document.getElementById("root");

//Create a root
const root = ReactDomClient.createRoot(container);

//Initial reader: Render an element to the root
root.render(<MyApp />)
