import * as React from "react";
import Globe from "./Globe";
import LangContext, { LangContextType } from "../LangContext";
import LangOptions from "./LangOptions";
import styled from "@emotion/styled";
import { LangProps } from "../types";
import { languageMapping } from "./utils";
import { withCookies } from "react-cookie";

type Props = {
  outerStyle?: any;
};

type State = {
  dropdownOpen: boolean;
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
            <div style={{ ...this.props.outerStyle }}>
              <Select onClick={this.toggleDropdown}>
                <div style={{ display: "flex", justifyContent: "center" }}>
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
              </Select>
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

const Select = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  padding: 5px 10px;
  background-color: #ffffff;
  transition: background 0.16s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
`;
