import * as React from "react";
import LangContext, { LangContextType } from "../LangContext";
import LangOptions from "./LangOptions";
import { LangProps } from "../types";
import { withCookies } from "react-cookie";
type Props = {};

type State = {
  dropdownOpen: boolean;
};

const selectStyle = {
  display: "inline-block",
};

class LangSelect extends React.Component<Props, State> {
  state: State = {
    dropdownOpen: false,
  };

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  hideDropdown = () => {
    this.setState({
      dropdownOpen: false,
    });
  };

  render() {
    const { context, cookies } = this.props as any;
    const Context = context || LangContext;

    return (
      <Context.Consumer>
        {(langContext: LangContextType) => {
          const { language, tr, Tr, langTranslateClient } = langContext;

          let allLanguages: string[] = [];
          if (langTranslateClient) {
            allLanguages = allLanguages.concat(
              langTranslateClient.targetLanguages,
            );
          }

          const onSelectLanguage = (targetLanguage: string) => {
            if (langTranslateClient) {
              cookies.set("LangManualLanguageToken", targetLanguage);
              window.location.reload();
            }
          };

          return (
            <>
              <div style={selectStyle} onClick={this.toggleDropdown}>
                Click me
              </div>
              {this.state.dropdownOpen && (
                <LangOptions
                  selectedLanguage="en"
                  targetLanguages={allLanguages}
                  closeOptions={this.hideDropdown}
                  onSelectLanguage={onSelectLanguage}
                />
              )}
            </>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withCookies(LangSelect);
