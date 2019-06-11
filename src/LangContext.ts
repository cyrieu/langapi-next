import * as React from "react";

export type LangContextType = {
  language: any;
  tr: (phrase: string, options?: any, forceLanguage?: any) => string;
};

const LangContext = React.createContext<LangContextType>({
  language: "en",
  tr: (phrase: string, options?: any, forceLanguage?: any) => phrase,
});

export default LangContext;
