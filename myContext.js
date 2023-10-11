import React from "react";

const MyContext = React.createContext({
  currentUser: null,
  updateUser: () => {},
});

export { MyContext };
