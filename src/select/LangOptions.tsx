import * as React from "react";
import ClickOutside from "./ClickOutside";
import LangContext, { LangContextType } from "../LangContext";
import styled from "@emotion/styled";
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
        <OptionContainer>
          {languages.map((targetLanguage, index) => {
            return (
              <Option
                className="langapi-next-option"
                onClick={() => {
                  this.props.onSelectLanguage(targetLanguage[0]);
                  this.props.closeOptions();
                }}
                key={index}>
                {targetLanguage[1]}
              </Option>
            );
          })}
          <Title>
            <PoweredBy>Powered by</PoweredBy>&nbsp;
            <LangApi
              onClick={() => {
                window.location.assign("https://www.langapi.co");
              }}>
              Lang API
            </LangApi>
          </Title>
        </OptionContainer>
      </ClickOutside>
    );
  }
}

export const OptionContainer = styled.div`
  width: 200px;
  background-color: #ffffff;
  position: absolute;
  z-index: 1;
  box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  top: 50px;
  opacity: 1;
  transition: opacity 0.16s fade-in-out;
}
`;

const Title = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #fafafa;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 4px;
  justify-content: center;
`;

const PoweredBy = styled.div`
  color: #a0a0a0;
  font-size: 12px;
`;

const LangApi = styled.div`
  color: #43f096;
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
`;

const Option = styled.div`
  font-size: 14px;
  color: #909090;
  padding: 8px 16px;
  background-color: #ffffff;
  transition: background-color 0.16s fade-in-out !important;
  cursor: pointer;
  &:first-child {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }
  &:hover {
    background-color: #eaeaea;
  }
`;
