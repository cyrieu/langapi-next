import * as React from "react";
import ClickOutside from "./ClickOutside";
import LangContext, { LangContextType } from "../LangContext";
import { LangProps } from "../types";

type Props = {
  selectedLanguage: string;
  targetLanguages: string[];
  closeOptions: () => any;
  onSelectLanguage: (targetLanguage: string) => any;
};

type State = {
  dropdownOpen: boolean;
};

const styling: React.CSSProperties = {
  height: "400px",
  width: "600px",
  backgroundColor: "#ff0000",
  position: "absolute",
  zIndex: 100,
  boxShadow: "0px 2px 4px rgb(0, 0, 0)",
};

const smallStyle = {
  height: "200px",
  width: "300px",
  backgroundColor: "#00ff00",
};

const optionStyle = {};

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

    return (
      <ClickOutside onClickOutside={this.props.closeOptions}>
        <div style={styling}>
          {this.props.targetLanguages.map((targetLanguage) => {
            return (
              <div
                style={optionStyle}
                onClick={() => {
                  console.log("OK");
                  this.props.onSelectLanguage(targetLanguage);
                  this.props.closeOptions();
                }}>
                {targetLanguage}
              </div>
            );
          })}
        </div>
      </ClickOutside>
    );
  }
}
