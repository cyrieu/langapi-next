import { LanguagePriorities } from "./types";

export function computeTargetLanguages(acceptLanguageHeaders: string) {
  const languagePreferences = acceptLanguageHeaders.split(",").reduce(
    (previousValue: LanguagePriorities, currentValue: string) => {
      const languageAndPriorityPair = currentValue.split(";");
      previousValue[languageAndPriorityPair[0]] =
        languageAndPriorityPair.length > 1
          ? parseFloat(languageAndPriorityPair[1].slice(2))
          : 1;
      return previousValue;
    },
    {} as LanguagePriorities,
  );

  const preferredLanguage = Object.keys(languagePreferences).sort((a, b) =>
    languagePreferences[a] >= languagePreferences[b] ? -1 : 1,
  );

  if (preferredLanguage.length) {
    return preferredLanguage;
  }
  // TODO: can we ever not have language headers???
  return ["en"];
}

export function isProductionKey(apiKey: string) {
  return apiKey.substring(0, 8) === "pk_prod_";
}
