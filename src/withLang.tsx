import * as React from "react";
import LangClient from "langapi-client";
import LangContext from "./LangContext";
import { computeTargetLanguages } from "./utils";
import { IncomingMessage } from "http";
import { LangProps, TranslationsData } from "./types";

const isServer = typeof window === "undefined";

export default (publicKey: string, translations: TranslationsData) => <
  P extends object
>(
  App: React.ComponentType<P>,
) => {
  type WrappedComponentPropsExceptProvided = Exclude<keyof P, keyof LangProps>;
  type ForwardedProps = Pick<P, WrappedComponentPropsExceptProvided>;
  return class AppWithLang extends React.Component<
    ForwardedProps & { language: string }
  > {
    langClient: any;

    static async getInitialProps(appContext: any) {
      let langProps = {};
      if (isServer) {
        let req: IncomingMessage;
        if (appContext.req) {
          req = appContext.req;
        } else {
          req = appContext.ctx.req;
        }
        const languages = computeTargetLanguages(
          (req.headers as any)["accept-language"],
        );
        langProps = {
          languages,
        };
      }

      let appProps = {};
      const app: any = App;
      if (typeof app.getInitialProps === "function") {
        appProps = await app.getInitialProps(appContext);
      }

      return {
        ...langProps,
        ...appProps,
      };
    }

    constructor(props) {
      super(props);
      this.langClient = LangClient(publicKey, translations);
      this.langClient.setPreferredLanugages(props.languages);
    }

    tr = (phrase: string, options?: any, forceLanguage?: any) => {
      return this.langClient.tr(phrase, options, forceLanguage);
    };

    render() {
      const { context } = this.props as any;
      const Context = context || LangContext;
      const { tr } = this;
      const language = (this.props as any).language
        ? this.props.language
        : "en";

      return (
        <Context.Provider
          value={{
            language,
            tr: this.tr,
          }}>
          <App {...this.props as P} language={language} tr={tr} />
        </Context.Provider>
      );
    }
  };
};
