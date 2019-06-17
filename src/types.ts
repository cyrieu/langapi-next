export type TranslationsData = {
  prod: any;
  test: any;
  originalLanguage: string;
  targetLanguages: string[];
};

export interface LangProps {
  language: string;
  tr: (phrase: string, options?: any, forceLanguage?: any) => string;
  Tr: (reactProps: any) => JSX.Element;
}

export type LanguagePriorities = { [key: string]: number };
