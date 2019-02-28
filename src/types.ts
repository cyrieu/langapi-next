export type TranslationsData = {
  prod: any;
  test: any;
  originalLanguage: string;
  targetLanguages: string[];
};

export interface LangProps {
  language: string;
  tr: (phrase: string) => string;
  param: (phrase: any) => string;
}

export type LanguagePriorities = { [key: string]: number };
