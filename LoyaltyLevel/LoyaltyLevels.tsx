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
      imageUrls: [],
      optionInfo: [{}]
    };
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
    const imageUrls = await this.getImages();
    const optionInfo = await this.getImages();

    this.setState({
      imageUrls,
      optionInfo
    });
  };

  handleClick = (event: React.MouseEvent): void => {
    const target = event.target as HTMLImageElement;

    console.log(target.id);
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

          //const objInfo = JSON.parse('{"value":"' + allOptions![i].Value.toString() + '","url":' + imageUrl + '}');
          const objInfo = '{"value":"' + allOptions![i].Value.toString() + '","url":"' + imageUrl + '"}';

          //elemArray.push(imageUrl);
          elemArray.push(objInfo)
        } catch (error) {
          this.showError(error);
        }
      }
    }

    return elemArray;
  }

  render() {
    /* const { currentValue, imageUrls } = this.state;
     const images = imageUrls.map((imageUrl: string) => (
      <td>
        <img src={imageUrl} id={info.value} className={info.value == currentValue ? "Selected" : "notSelected"} />
      </td>
    ));
 */
    const { currentValue, optionInfo } = this.state;
    const images = optionInfo.map((info) => (
        <td>
        <img src={JSON.parse(info).url} id={JSON.parse(info).value} className={JSON.parse(info).value == currentValue ? "Selected" : "notSelected"} />
      </td>
    ));


    return (
      <div>
        <h1>{this.state.currentValue}</h1>
        <table>
          <tbody>
            <tr>{images}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}