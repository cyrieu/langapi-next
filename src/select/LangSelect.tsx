import * as React from "react";
import Globe from "../Globe";
import LangContext, { LangContextType } from "../LangContext";
import LangOptions from "./LangOptions";
import { LangProps } from "../types";
import { languageMapping } from "./utils";
import { withCookies } from "react-cookie";

type Props = {
  outerStyle?: any;
};

type State = {
  dropdownOpen: boolean;
};

const selectStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: 4,
  padding: "4px",
  backgroundColor: "#ffffff",
  transition: "background .16s ease-in-out",
  cursor: "pointer",
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

          console.log(langTranslateClient);
          console.log(this.props.outerStyle);

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
            <div style={{ ...this.props.outerStyle }}>
              <div
                style={{
                  ...selectStyle,
                }}
                onClick={this.toggleDropdown}>
                <div style={{ display: "flex" }}>
                  <Globe />
                  <div
                    style={{
                      marginLeft: "4px",
                      fontSize: "12px",
                      position: "relative",
                    }}>
                    {languageMapping[language] || "Unknown"}
                  </div>
                </div>
              </div>
              {this.state.dropdownOpen && (
                <LangOptions
                  selectedLanguage={language}
                  targetLanguages={allLanguages}
                  closeOptions={this.hideDropdown}
                  onSelectLanguage={onSelectLanguage}
                />
              )}
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withCookies<any>(LangSelect);
