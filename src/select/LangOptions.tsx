import * as React from "react";
import ClickOutside from "./ClickOutside";
import LangContext, { LangContextType } from "../LangContext";
import { LangProps } from "../types";
import { languageMapping } from "./utils";
import "./styles.css";

// TODO change this when original language eventually changes
const originalLanguage = "en";

type Props = {
  selectedLanguage: string;
  targetLanguages: string[];
  closeOptions: () => any;
  onSelectLanguage: (targetLanguage: string) => any;
};

type State = {
  dropdownOpen: boolean;
};

// const getDropdownRootKeyFrame = (visible: boolean) => {
//   return keyframes`
// from {
//   transform: ${!visible ? "rotateX(0)" : "rotateX(-15deg)"};
//   opacity: ${!visible ? 1 : 0};
// }
// to {
//   transform: ${!visible ? "rotateX(-15deg)" : "rotateX(0)"};
//   opacity: ${!visible ? 0 : 1};
// }
// `;
// };

export default class LangOptions extends React.Component<Props, State> {
  state: State = {
    dropdownOpen: false,
  };

  showDropdown = () => {
    this.setState({
      dropdownOpen: true,
    });
  };

  render() {
    const { context } = this.props as any;
    const Context = context || LangContext;

    const languages = [originalLanguage, ...this.props.targetLanguages]
      .map((language) => {
        if (languageMapping[language]) {
          return [language, languageMapping[language]];
        }

        return [];
      })
      .filter((language) => {
        return language.length !== 0;
      })
      .sort((languageA, languageB) => {
        return languageA[1].localeCompare(languageB[1]);
      });

    return (
      <ClickOutside onClickOutside={this.props.closeOptions}>
        <div className="langapi-next-option-container">
          {languages.map((targetLanguage, index) => {
            return (
              <div
                className="langapi-next-option"
                onClick={() => {
                  console.log("OK");
                  this.props.onSelectLanguage(targetLanguage[0]);
                  this.props.closeOptions();
                }}
                key={index}>
                {targetLanguage[1]}
              </div>
            );
          })}
          <div className="langapi-next-title">
            <div className="langapi-next-powered-by">Powered by&nbsp;</div>
            <div
              className="langapi-next-langapi"
              onClick={() => {
                window.location.assign("https://www.langapi.co");
              }}>
              Lang API
            </div>
          </div>
        </div>
      </ClickOutside>
    );
  }
}
