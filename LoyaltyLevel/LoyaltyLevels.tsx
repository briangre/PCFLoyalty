import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import { LoyaltyLevel } from ".";


export interface ILoyaltyProps {
    currentValue?: number | null;
    allOptions?: ComponentFramework.PropertyHelper.OptionMetadata[];
    optionValueChanged?: (newValue: number) => void;
    _context?: ComponentFramework.Context<IInputs>
}

export interface ILoyaltyState extends React.ComponentState, ILoyaltyProps {
    currentOption?: number;
    fileName?: string;
    imageUrl: string
}

export class Loyalty extends React.Component<ILoyaltyProps, ILoyaltyState> {

    constructor(props: ILoyaltyProps) {
        super(props);

        this.state = {
            value: Number(props.currentValue),
            fileName: '',
            imageUrl: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    private _imageUrl: string;
    private _counter: number = 0;
    private _elemArray: JSX.Element[] = [];

    handleClick = (event: React.MouseEvent): void => {

        let target = event.target as HTMLImageElement;
        console.log(target.id);

    }

    private setImage(
        shouldUpdateOutput: boolean,
        fileType: string,
        fileContent: string
    ): void {
        console.log(fileType.toString());
        this._imageUrl = this.generateImageSrcUrl(fileType, fileContent);
        //this._elemArray.push(<LoyaltyImage src={this._imageUrl} class='selected' />);
        this._elemArray.push(<td><img src={this._imageUrl} className='selected' /></td>);
        this._counter++;

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

    /* componentDidMount() {

        // this.setState(this.state);
        const badges = [];

        for (let i = 0; i < this.props.allOptions!.length; i++) {

            if (this.props.allOptions![i].Value == this.props.currentValue) {
                this._fileName = this.props.allOptions![i].Label.toLowerCase() + '_badge.png';
                break;
            }
        }

        if (this.props._context) {
            console.log('calling getResource; filename = ' + this._fileName);
            this.props._context.resources.getResource(this._fileName, this.setImage.bind(this, false, "png"), this.showError.bind(this));
        }
    } */

    renderImage() {

        const elemArray: JSX.Element[] = [];

        for (let i = 0; i < this.props.allOptions!.length; i++) {
            if (this.props._context) {
                let fileName: string = this.props.allOptions![i].Label.toLowerCase() + '_badge.png';
                console.log('calling getResource; filename = ' + fileName);
                this.props._context.resources.getResource(fileName, this.setImage.bind(this, false, "png"), this.showError.bind(this));
            }
        }

        /* while(this._counter < this.props.allOptions!.length){
            
        } */
        return(            
            this._elemArray
        )
    }

    render() {
        return (

            <div>
                <h1>{this.props.currentValue}</h1>
                <table>
                    <tbody>
                        <tr>
                            {this.renderImage()}
                            {/* <LoyaltyImage class='selected' name={this.props.currentValue?.toString()} src={this.state.imageUrl} /> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export interface ImageProps {
    name?: string;
    src: string;
    class: string
}

export class LoyaltyImage extends React.Component<ImageProps>{

    render() {
        return (
            <td><img src={this.props.src} className={this.props.class} /></td>
        )
    }
}

/* export interface OptionProps {
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