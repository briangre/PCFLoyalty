import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';


export interface ILoyaltyProps {
    currentValue?: number | null;
    allOptions?: ComponentFramework.PropertyHelper.OptionMetadata[];
    optionValueChanged?: (newValue: number) => void;
    // optionValueChanged?: ()=> void;
    _context?: ComponentFramework.Context<IInputs>
}

export interface ILoyaltyState extends React.ComponentState, ILoyaltyProps {
    imageUrl?: string
}

export class Loyalty extends React.Component<ILoyaltyProps, ILoyaltyState> {
    // export class Loyalty extends React.Component<ILoyaltyProps, {}> {

    constructor(props:ILoyaltyProps){
        super(props);
        this.state = {
            value: Number(props.currentValue),
            imageUrl:''
        };
    }

    private _imageUrl: string | undefined;

    
    render() {        

        let fileName: string;
        switch (Number(this.props.currentValue)) {
            case 355350000:
                fileName = "green_icon.png";
                break;
            case 355350001:
                fileName = "amber_icon.png";
                break;
            case 355350002:
                fileName = "red_icon.png";
                break;
            default:
                fileName = "no_selection_icon.png";
        }

        // console.log("calling getResource");
        if(this.props._context){
            this.props._context.resources.getResource(fileName, this.setImage.bind(this, false, "png"), this.showError.bind(this));
        }
        // console.log("after getResource");

        return (
            <div>
                <h1>{this.props.currentValue}</h1>
                {/* <img src={this._imageUrl} /> */}
                <img src={this.state.imageUrl} />
            </div>
        );
    }

    private setImage(
        shouldUpdateOutput: boolean,
        fileType: string,
        fileContent: string
    ): void {
        // console.log("entering setImage");
        this.setState({imageUrl: this.generateImageSrcUrl(fileType, fileContent)});
        
        // this._imageUrl = this.generateImageSrcUrl(fileType, fileContent);

        // below was just a lame attempt at forcing a call to notifyOutput()
/*         if(this.props.optionValueChanged){
            this.props.optionValueChanged();
        };
 */        
        if(shouldUpdateOutput){
            if(this.props.optionValueChanged){
                this.props.optionValueChanged(Number(this.props.currentValue));
            };
        }
    }

    private generateImageSrcUrl(fileType: string, fileContent: string): string {
        // console.log("entering generateImageSrcUrl");
        return "data:image/" + fileType + ";base64, " + fileContent;
    }

    private showError(): void {
        console.log("an error occurred attempting to getResource() showError");
        return;
    }

}

export interface ImageProps {
    name: string;
    src: string;
}
export class LoyaltyImage extends React.Component<ImageProps, {}>{
    render() {
        return (
            <td><img src={this.props.src} id={this.props.name} /></td>
        )
    }
}

export interface OptionProps {
    name: string;
    value: number;
}
export class LoyaltyOption extends React.Component<OptionProps, {}>{
    render() {
        return (
            <td><input id={this.props.name} name="level" type="radio" value={this.props.value} />{this.props.name}</td>
        )
    }
}