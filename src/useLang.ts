import * as React from "react";
import LangContext from "./LangContext";

const useLang = () => {
  return React.useContext(LangContext);
};

export default useLang;
