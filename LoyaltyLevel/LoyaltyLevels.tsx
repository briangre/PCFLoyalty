import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';


export interface ILoyaltyProps {
    currentValue?: number | null;
    allOptions?: ComponentFramework.PropertyHelper.OptionMetadata[];
    optionValueChanged?: (newValue: number) => void;
    _context?: ComponentFramework.Context<IInputs>
}

export interface ILoyaltyState extends React.ComponentState, ILoyaltyProps {
    currentOption?: number;
    imageUrl: string
}

export class Loyalty extends React.Component<ILoyaltyProps, ILoyaltyState> {

    constructor(props: ILoyaltyProps) {
        super(props);

        this.state = {
            value: Number(props.currentValue),
            imageUrl: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    private _imageUrl: string;

    handleClick = (event: React.MouseEvent): void => {

        let target = event.target as HTMLImageElement;
        console.log(target.id);

    }

private setImage(
        shouldUpdateOutput: boolean,
        fileType: string,
        fileContent: string
    ): void {
        this._imageUrl = this.generateImageSrcUrl(fileType, fileContent);
        // this.setState({ imageUrl: this.generateImageSrcUrl(fileType, fileContent) });
        this.setState({ imageUrl: this._imageUrl });

        if (shouldUpdateOutput) {
            if (this.props.optionValueChanged) {
                this.props.optionValueChanged(Number(this.props.currentValue));
            };
        }
    }

    private generateImageSrcUrl(fileType: string, fileContent: string): string {
        return "data:image/" + fileType + ";base64, " + fileContent;
    }

    private showError(): void {
        console.log("an error occurred attempting to getResource() showError");
        return;
    }
    componentDidMount(){
        let fileName: string;
        const badge = <div></div>;

        for (let i = 0; i < this.props.allOptions!.length; i++) {
            if (this.props.allOptions![i].Value == this.props.currentValue) {
                fileName = this.props.allOptions![i].Label + '_badge.png';
                break;
            }
        }

        if (fileName = '') {
            fileName = 'no_member_badge.png'
        } else {
            if (this.props._context) {
                this.props._context.resources.getResource(fileName, this.setImage.bind(this, false, "png"), this.showError.bind(this));
            }
        }
    }
    render() {
        return (

            <div>
                <h1>{this.props.currentValue}</h1>
                    <img src={this.state.imageUrl}></img>
                
            </div>
        );
    }

    

}

/* The below exports are for future expansion of the project; they can be ignored at the moment */
/* export interface ImageProps {
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
} */