import React, { useEffect, useState } from "react";
import HomePage from "../home";

/**
 * This is the main component for the app
 * it is used to switch between the different views
 * based on the events that are received from the server
 * Will leave it here as a reference on how to access the events from the electron app
 */
const AppIndex = () => {
  const [view, setView] = useState("home");

  useEffect(() => {
    window.electron.ipcRenderer.on("session-end", () => {
      setView("session-end");
    });
  });

  /**
   * This is a function that switches the view based on the events that are received from the server
   */
  const switchViewBasedOnEvents = () => {
    switch (view) {
      default:
        return <HomePage />;
    }
  };
  return switchViewBasedOnEvents();
};

export default AppIndex;
