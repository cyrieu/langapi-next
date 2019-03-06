import * as React from "react";
import LangClient from "langapi-client";
import { computeTargetLanguages } from "./utils";
import LangContext from "./LangContext";
import { TranslationsData, LangProps } from "./types";
import { IncomingMessage } from "http";

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

    tr = (phrase: string) => {
      return this.langClient.tr(phrase);
    };

    param = (phrase: string) => {
      return this.langClient.param(phrase);
    };

    render() {
      const { context } = this.props as any;
      const Context = context || LangContext;
      const { tr, param } = this;
      const language = (this.props as any).languages[0];
      return (
        <Context.Provider
          value={{
            language,
            tr: this.tr,
            param: this.param,
          }}>
          <App {...this.props as P} language={language} tr={tr} param={param} />
        </Context.Provider>
      );
    }
  };
};
