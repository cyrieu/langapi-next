import * as React from "react";

export type LangContextType = {
  language: any;
  tr: (phrase: string) => string;
  param: (phrase: string) => string;
};

const LangContext = React.createContext<LangContextType>({
  language: "en",
  tr: (phrase) => phrase,
  param: (phrase) => `[[__${phrase}__]]`,
});

export default LangContext;
