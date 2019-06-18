import * as React from "react";
import LangClient from "langapi-client";
import LangContext from "./LangContext";
import { computeTargetLanguages, parseCookie } from "./utils";
import { IncomingMessage } from "http";
import { LangProps, TranslationsData } from "./types";
import { parseCookies } from "nookies";

const isServer = typeof window === "undefined";

export default (publicKey: string, translations: TranslationsData) => <
  P extends object
>(
  App: React.ComponentType<P>,
) => {
  type WrappedComponentPropsExceptProvided = Exclude<keyof P, keyof LangProps>;
  type ForwardedProps = Pick<P, WrappedComponentPropsExceptProvided>;
  return class AppWithLang extends React.Component<
    ForwardedProps & { language: string; forceLanguage: string | undefined }
  > {
    langClient: any;
    static async getInitialProps(appContext: any) {
      let languages = {};
      let langProps = {};
      if (isServer) {
        let req: IncomingMessage;
        if (appContext.req) {
          req = appContext.req;
        } else {
          req = appContext.ctx.req;
        }
        languages = computeTargetLanguages(
          (req.headers as any)["accept-language"],
        );
      }

      const cookies = parseCookies(
        appContext.ctx ? appContext.ctx : appContext,
      );

      langProps = {
        languages,
        ...(cookies.LangManualLanguageToken && {
          forceLanguage: cookies.LangManualLanguageToken,
        }),
      };

      let appProps = {};
      const app: any = App;
      if (typeof app.getInitialProps === "function") {
        appProps = await app.getInitialProps(appContext);
      }

      // console.log("INITIAL");
      // console.log(langProps);
      return {
        ...langProps,
        ...appProps,
      };
    }

    constructor(props) {
      super(props);
      this.langClient = LangClient(
        publicKey,
        translations,
        props.forceLanguage,
      );
      // console.log("BRRR");
      // console.log(props);
      this.langClient.setPreferredLanguages(props.languages);
      this.langClient.setForceLanguage(props.forceLanguage);
    }

    tr = (phrase: string, options?: any, forceLanguage?: any) => {
      return this.langClient.tr(phrase, options, forceLanguage);
    };

    Tr = (reactProps: any) => {
      return this.langClient ? this.langClient.Tr(reactProps) : () => null;
    };

    render() {
      const { context } = this.props as any;
      const Context = context || LangContext;
      const { tr, Tr, langClient } = this;
      const language =
        this.props.forceLanguage ||
        this.props.language ||
        (langClient.languagesSortedByPref &&
          langClient.languagesSortedByPref[0]) ||
        "en";
      if (this.props.forceLanguage) {
        langClient.forceLanguage = this.props.forceLanguage;
      }

      // console.log("HEREEE");
      // console.log(langClient);

      return (
        <Context.Provider
          value={{
            language,
            tr: this.tr,
            Tr: this.Tr,
            langTranslateClient: this.langClient,
          }}>
          <App
            {...this.props as P}
            language={language}
            tr={tr}
            Tr={Tr}
            langTranslateClient={langClient}
          />
        </Context.Provider>
      );
    }
  };
};
