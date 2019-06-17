import * as React from "react";
import { LangTranslateClient } from "langapi-client/dist/LangTranslateClient";

export type LangContextType = {
  language: any;
  tr: (phrase: string, options?: any, forceLanguage?: any) => string;
  Tr: (reactProps: any) => any;
  langTranslateClient: LangTranslateClient | null;
};

const LangContext = React.createContext<LangContextType>({
  language: "en",
  tr: (phrase: string, options?: any, forceLanguage?: any) => phrase,
  Tr: (reactProps: any) => "",
  langTranslateClient: null,
});

export default LangContext;
