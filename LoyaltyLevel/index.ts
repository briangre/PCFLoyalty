import {IInputs, IOutputs} from "./generated/ManifestTypes";
import ReactDOM = require("react-dom");
import React = require("react");
import {Loyalty, ILoyaltyProps} from './LoyaltyLevels';

export class LoyaltyLevel implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _notifyOutputChanged: () => void;
	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	
	private props: ILoyaltyProps = {
		optionValueChanged: this.optionValueChanged.bind(this),
		_context: this._context
	};


	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._context = context;
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.props = {
			currentValue:context.parameters.loyaltyLevel.raw,
			allOptions:context.parameters.loyaltyLevel.attributes!.Options
		};		
		
		ReactDOM.render(
			React.createElement(Loyalty, this.props),
			this._container
		)
			
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			loyaltyLevel: Number(this.props.currentValue)
		};
	}
	
	private optionValueChanged(newValue: number): void
	{		
		if(this.props.currentValue !== newValue){
			this.props.currentValue = newValue;
			this._notifyOutputChanged();
		}
	}
			

	

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		ReactDOM.unmountComponentAtNode(this._container);
	}

}