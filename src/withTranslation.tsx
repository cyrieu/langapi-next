import * as React from "react";
import LangContext, { LangContextType } from "./LangContext";
import hoistNonReactStatics from "hoist-non-react-statics";
import { LangProps } from "./types";

const withTranslation = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  type WrappedComponentPropsExceptProvided = Exclude<keyof P, keyof LangProps>;
  type ForwardedProps = Pick<P, WrappedComponentPropsExceptProvided>;
  return hoistNonReactStatics(
    class LangWrapperComponent extends React.Component<ForwardedProps> {
      render() {
        const { context } = this.props as any;
        const Context = context || LangContext;
        return (
          <Context.Consumer>
            {(langContext: LangContextType) => {
              const { language, tr, param } = langContext;
              return (
                <Component
                  {...this.props as P}
                  language={language}
                  tr={tr}
                  param={param}
                />
              );
            }}
          </Context.Consumer>
        );
      }
    },
    Component,
  );
};

export default withTranslation;
