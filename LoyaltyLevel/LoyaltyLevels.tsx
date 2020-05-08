import { IInputs } from "./generated/ManifestTypes";
import * as React from "react";

export interface ILoyaltyProps {
  currentValue?: number | null;
  allOptions?: ComponentFramework.PropertyHelper.OptionMetadata[];
  optionValueChanged?: (newValue: number) => void;
  _context?: ComponentFramework.Context<IInputs>;
}

export interface ILoyaltyState extends React.ComponentState, ILoyaltyProps {
  currentOption?: number;
}

export class Loyalty extends React.Component<ILoyaltyProps, ILoyaltyState> {
  constructor(props: ILoyaltyProps) {
    super(props);

    this.state = {
      optionInfo: [],
      currentOption: Number(this.props.currentValue)
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount = () => {
    this.updateImages();
  };

  componentWillUpdate = (nextProps, nextState) => {
    // whenever the allOptions change, update images and re-render
    if (nextState.allOptions !== this.state.allOptions) {
      this.updateImages();
    }
  };

  updateImages = async () => {
    const optionInfo = await this.getImages();

    this.setState({
      optionInfo
    });
  };

  handleClick = (event: React.MouseEvent): void => {
    const target = event.target as HTMLImageElement;
    console.log(target.id);

    if(target.id !== this.state.currentOption?.toString()){
      this.setState({
          currentOption: Number(target.id)
      });
      if(this.props.optionValueChanged){
        this.props.optionValueChanged(Number(target.id));
      }
    }
  };

  private showError(error): void {
    console.log(
      "an error occurred attempting to getResource() showError",
      error
    );
    return;
  }

  /**
   * Turns the callback-based method into one returning a promise
   * The caller could then simply async..await for file content
   */
  getResourceAsync = (fileName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      this.props._context?.resources.getResource(fileName, resolve, reject);
    });
  };

  async getImages() {
    const { _context, allOptions } = this.props;
    const contextAvailable = !!_context;
    const numberOfOptions = allOptions!.length;
    const optionsAvailable = !!numberOfOptions;
    const elemArray: string[] = [];

    if (contextAvailable && optionsAvailable) {
      for (let i = 0; i < numberOfOptions; i++) {
        const fileName: string =
          allOptions![i].Label.toLowerCase() + "_medal_1.png";

        try {
          const fileContent = await this.getResourceAsync(fileName);
          const imageUrl = "data:image/png;base64, " + fileContent;

          const objInfo = '{"value":"' + allOptions![i].Value.toString() + '","url":"' + imageUrl + '"}';

          elemArray.push(objInfo)
        } catch (error) {
          this.showError(error);
        }
      }
    }

    return elemArray;
  }

  render() {
    const { currentOption, optionInfo } = this.state;
    const options = optionInfo.map((info) => (
      <td>
        <img src={JSON.parse(info).url} id={JSON.parse(info).value} 
          className={"reward " + (JSON.parse(info).value == currentOption ? "Selected" : "notSelected")} onClick={this.handleClick}/>
      </td>
    ));


    return (
      <div>
        <table>
          <tbody>
            <tr>{options}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}