import * as React from "react";
import ClickOutside from "./ClickOutside";
import LangContext, { LangContextType } from "../LangContext";
import { LangProps } from "../types";
import { languageMapping } from "./utils";

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
        console.log(language);
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

    console.log("HERE");
    console.log(languages);

    return (
      <ClickOutside onClickOutside={this.props.closeOptions}>
        <div style={styling}>
          <div style={titleStyle}>
            <div style={poweredByStyle}>Made with ♥ by</div>
            <div
              style={langApiStyle}
              onClick={() => {
                window.location.assign("https://www.langapi.co");
              }}>
              Lang API
            </div>
          </div>
          {languages.map((targetLanguage) => {
            return (
              <div
                style={optionStyle}
                onClick={() => {
                  console.log("OK");
                  this.props.onSelectLanguage(targetLanguage[0]);
                  this.props.closeOptions();
                }}>
                {targetLanguage[1]}
              </div>
            );
          })}
        </div>
      </ClickOutside>
    );
  }
}

const styling: React.CSSProperties = {
  width: "200px",
  backgroundColor: "#ffffff",
  position: "absolute",
  zIndex: 1,
  boxShadow: "0px 5px 40px rgba(0, 0, 0, .16)",
  borderRadius: 4,
  cursor: "arrow",
};

const titleStyle: React.CSSProperties = {
  height: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#ffffff",
  fontSize: "12px",
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  padding: "4px",
  borderBottom: "1px solid #e0e0e0",
};
const poweredByStyle = {
  color: "#e0e0e0",
};

const langApiStyle = {
  color: "#43f096",
  cursor: "pointer",
};
const optionStyle = {
  fontSize: "14px",
  color: "#a0a0a0",
  padding: "4px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e0e0e0",
  "&:last-child": {
    borderBottom: "0px",
  },
  cursor: "pointer",
};
