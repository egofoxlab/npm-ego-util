/*
 * Developed by EGOFOXLAB.
 * Site http://egofoxlab.com/
 * Copyright (c) 2019.
 */

declare class EgoUtil {

	/**
	 * Send request
	 *
	 * @param params
	 * @param {string} params.url URL request
	 * @param {string} [params.method='POST'] params.method request method
	 * @param {object} [params.data=null] params.data request data
	 * @param {string} [params.type='json'] params.type response data type
	 * @param {object} [params.headers={}] params.headers request headers
	 * @param {Function} [params.success=null] params.success callback for success event
	 * @param {Function} [params.notSuccess=null] params.notSuccess callback for not success event
	 * @param {Function} [params.error=null] params.error callback for error event
	 */
	public static _request(params: {
		url: string,
		method?: string,
		data?: any,
		type?: string,
		headers?: any,
		success?: Function,
		notSuccess?: Function,
		error?: Function
	}): void;

	/**
	 * Check that form is empty or not
	 *
	 * @param {Object} data
	 * @return {Boolean}
	 */
	public static checkEmptyForm(data: any): boolean;

	/**
	 * Collect data from form
	 *
	 * Return array in format
	 * [
	 * 		FIELD_NAME_ATTR: {
	 * 				value: FIELD_VALUE,
	 * 				required: IF_FIELD_REQUIRED,
	 *	 			description: FIELD_LABEL//	Field label or `data-description` field attribute
	 * 		}
	 * ]
	 *
	 * @param {String} selector
	 * @param {Object} container
	 * @return {Object}
	 */
	public static collectFormData(selector: string, container: any): any;

	/**
	 * Is the required fields is Empty?
	 * Use with `collectFormData`
	 *
	 * @param {object} formData
	 * @returns {boolean}
	 */
	public static isRequiredFieldsEmpty(formData: any): boolean;

	/**
	 * Check that object is array
	 *
	 * @param {any} mixed_var
	 * @returns {boolean}
	 */
	public static is_array(mixed_var: any): boolean;

	/**
	 * Check empty value
	 *
	 * @param {any} mixed_var
	 * @returns {boolean}
	 */
	public static empty(mixed_var: any): boolean;

	/**
	 * Return URL parameter
	 *
	 * @param {String} param
	 * @param {String} [url]
	 * @returns {string|null}
	 */
	public static getUrlParam(param: string, url: string): string;

	/**
	 * Clear all input fields in container
	 *
	 * @param {any} eContainer
	 */
	public static clearFields(eContainer: any): void;

	/**
	 * Set Field value
	 *
	 * @param {any} eField
	 * @param {any} value
	 */
	public static setFieldValue(eField: any, value: any): void;

	/**
	 * Set listener. Add listener to array
	 *
	 * @param {Function[]} arr - List of listeners
	 * @param {Function} listener - Listener
	 * @returns {boolean}
	 */
	public static setListener(arr, listener): boolean;

	/**
	 * Remove listener from array.
	 *
	 * @param {Function[]} arr - List of listeners
	 * @param {Function} listener - Listener
	 * @returns {boolean}
	 */
	public static removeListener(arr, listener): boolean;

	/**
	 * Traversing an array of listeners. Call `handler` for each listener and pass it.
	 *
	 * @param {Function[]} arr - List of listeners
	 * @param {Function} handler - Handler for each listener
	 * @returns {boolean}
	 */
	public static eachListener(arr, handler): boolean;

	/**
	 * Pad a string to a certain length with another string
	 *
	 * @param input
	 * @param pad_length
	 * @param pad_string
	 * @param pad_type
	 */
	public static str_pad(input: string, pad_length: number, pad_string?: string, pad_type?: string): string;

	/**
	 * Retrieve item from array by path
	 *
	 * @param obj - Input object
	 * @param path - Path for search.
	 * @param _default - Default value.
	 */
	public static getArrItem(obj: any, path: string, _default?: any): any;

}
