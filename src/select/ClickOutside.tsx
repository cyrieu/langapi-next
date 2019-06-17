import * as React from "react";

type Props = {
  onClickOutside: () => void;
};

/**
 * Component that alerts if you click outside of it
 * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 */
export default class OutsideAlerter extends React.Component<Props> {
  wrapperRef: any;

  constructor(props: Props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node: any) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event: any) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClickOutside();
    }
  }

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}
