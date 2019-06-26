/*
 * Developed by EGOFOXLAB.
 * Site http://egofoxlab.com/
 * Copyright (c) 2019.
 */

/**
 * Need jQuery library
 *
 * @constructor
 */

/*(function (global, factory) {
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = factory()
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		global.EgoUtil = factory()
	}
} (this, (function () {*/
(function (global, factory) {
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = global.document ?
			factory(global, true) :
			function (w) {
				if (!w.document) {
					throw new Error("EgoUtil requires a window with a document");
				}
				return factory(w);
			};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
	function EgoUtil() {

	}

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
	EgoUtil._request = function (params) {
		var $ = jQuery;

		var defaults = {
			url: params.url,
			method: params.method ? params.method : 'post',
			data: params.data ? params.data : null,
			dataType: params.type ? params.type : "json",
			headers: params.headers ? params.headers : {},
			success: function (response) {
				if (!response.success && params.type === 'json') {
					if (response.error) {
						alert(response.error);
					}

					if (typeof params.notSuccess === 'function') {
						params.notSuccess.call(this, response);
					}

					return;
				}

				if (typeof params.success === 'function') {
					params.success.call(this, response);
				} else if (typeof params.success === 'object') {
					alert(params.success.text);
				}
			},
			error: function (XHR, textStatus, errorThrown) {
				console.log(['Error:', textStatus, errorThrown, params]);

				if (typeof params.error === 'function') {
					params.error.call(this, XHR, textStatus, errorThrown);
				}

				$(document).trigger('_request.error');
			}
		};

		$.ajax(defaults);
	};

	/**
	 * Check that form is empty or not
	 *
	 * @param {Object} data
	 * @return {Boolean}
	 */
	EgoUtil.checkEmptyForm = function (data) {
		for (var key in data) {
			if (!data.hasOwnProperty(key)) {
				continue;
			}

			var item = data[key];

			if (EgoUtil.empty(item.value) && item !== 0) {
				return false;
			}
		}

		return true;
	};

	/**
	 * Collect data from form
	 *
	 * Return array in format
	 * [
	 *        FIELD_NAME_ATTR: {
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
	EgoUtil.collectFormData = function (selector, container) {
		var $ = jQuery;

		if (EgoUtil.empty(container)) {
			container = $('body');
		} else {
			container = $(container);
		}

		var result = {};

		container.find(selector).each(function (i, node) {
			node = $(node);

			var eLabel = container.find('label[for="' + node.attr('id') + '"]');
			var name = node.attr('name'),
				value = node.val(),
				disabled = node.prop('disabled'),
				description = eLabel.text();

			if (EgoUtil.empty(eLabel.get(0)) && !EgoUtil.empty(node.attr('data-description'))) {
				description = node.attr('data-description');
			}

			switch (node.attr('type')) {
				case 'checkbox':
					value = [];

					container.find('[name="' + name + '"]').each(function (i, node) {
						node = $(node);

						if (node.prop('checked')) {
							value.push(node.val() === 'on' ? true : node.val())
						}
					});

					break;

				case 'radio':
					value = container.find('input:radio[name="' + name + '"]:checked').val();

					break;
			}

			switch (node.prop('tagName').toLowerCase()) {
				case 'select':
					if (node.prop('multiple')) {

					} else {
						value = [node.val()];
					}

					break;
			}

			if (EgoUtil.empty(value)) {
				var defaultValue = node.attr('data-default-value');

				if (typeof defaultValue !== 'undefined') {
					value = defaultValue;
				}
			}

			if (!EgoUtil.empty(name)) {
				var required = node.data('required') === true;

				if (node.attr('required') === 'required') {
					required = true;
				}

				result[name] = {
					value: value,
					required: required,
					disabled: disabled,
					description: description
				}
			}
		});

		return result;
	};

	/**
	 * Is the required fields is Empty?
	 * Use with `collectFormData`
	 *
	 * @param formData
	 * @returns {boolean}
	 */
	EgoUtil.isRequiredFieldsEmpty = function (formData) {
		for (var key in formData) {
			if (!formData.hasOwnProperty(key)) {
				continue;
			}

			var field = formData[key];

			if (field.required && (EgoUtil.empty(field.value) && field.value !== 0)) {
				return true;
			}
		}

		return false;
	};

	/**
	 * Check that object is array
	 *
	 * @param mixed_var
	 * @returns {boolean}
	 */
	EgoUtil.is_array = function (mixed_var) {
		return mixed_var instanceof Array;
	};

	/**
	 * Check empty value
	 *
	 * @param mixed_var
	 * @returns {boolean}
	 */
	EgoUtil.empty = function (mixed_var) {
		var result = true;

		try {
			if (mixed_var === ""
				|| mixed_var === 0
				|| mixed_var === "0"
				|| mixed_var === null
				|| mixed_var === false
				|| (EgoUtil.is_array(mixed_var) && mixed_var.length === 0)
				|| typeof mixed_var === 'undefined'
			) {
				result = true;
			} else {
				result = false;
			}
		} catch (e) {
			result = true;
		}

		return result;
	};

	/**
	 * Return URL parameter
	 *
	 * @param {String} param
	 * @param {String} [url]
	 * @returns {string | null}
	 */
	EgoUtil.getUrlParam = function (param, url) {
		url = EgoUtil.empty(url) ? window.location.href : url;

		return (new URL(url)).searchParams.get(param);
	};

	/**
	 * Clear all input fields in container
	 *
	 * @param eContainer
	 */
	EgoUtil.clearFields = function (eContainer) {
		var $ = jQuery;

		eContainer = $(eContainer);

		eContainer
			.find(':input')
			.not(':button, :submit, :reset')
			.val('')
			.prop('checked', false)
			.prop('selected', false);
	};

	/**
	 * Set Field value
	 *
	 * @param eField
	 * @param value
	 */
	EgoUtil.setFieldValue = function (eField, value) {
		var $ = jQuery;
		eField = $(eField);
		var tagName = eField.prop('tagName'),
			name = eField.first().attr('name');

		if (EgoUtil.empty(tagName)) {
			return;
		}

		tagName = tagName.toLowerCase();

		if ($.inArray(tagName, ['input', 'textarea']) !== -1) {
			switch (eField.attr('type')) {
				case 'checkbox':
					eField.prop('checked', value === true);

					break;

				case 'radio':
					$('input:radio[name="' + name + '"][value="' + value + '"]').prop('checked', true);

					break;

				default:
					eField.val(value);

					break;
			}
		} else if (tagName === 'select') {
			eField
				.val(value)
				.change();
		}
	};

	/**
	 * Set listener. Add listener to array
	 *
	 * @param {Function[]} arr - List of listeners
	 * @param {Function} listener - Listener
	 * @returns {boolean}
	 */
	EgoUtil.setListener = function (arr, listener) {
		if (!Array.isArray(arr) || typeof listener !== 'function') {
			return false;
		}

		arr.push(listener);

		return true;
	};

	/**
	 * Remove listener from array.
	 *
	 * @param {Function[]} arr - List of listeners
	 * @param {Function} listener - Listener
	 * @returns {boolean}
	 */
	EgoUtil.removeListener = function (arr, listener) {
		if (!Array.isArray(arr) || typeof listener !== 'function') {
			return false;
		}

		var index = null;

		arr.some(function (item, i) {
			if (typeof item === 'function' && item === listener) {
				index = i;

				return true;
			}
		});

		if (index !== null) {
			arr.splice(index, 1);
		}

		return true;
	};

	/**
	 * Traversing an array of listeners. Call `handler` for each listener and pass it.
	 *
	 * @param {Function[]} arr - List of listeners
	 * @param {Function} handler - Handler for each listener
	 * @returns {boolean}
	 */
	EgoUtil.eachListener = function (arr, handler) {
		if (!Array.isArray(arr) && typeof handler !== 'function') {
			return false;
		}

		arr.forEach(function (item) {
			if (typeof item === 'function') {
				handler(item);
			}
		});

		return true;
	};

	/**
	 * Pad a string to a certain length with another string
	 *
	 * @param input
	 * @param pad_length
	 * @param pad_string
	 * @param pad_type
	 * @returns {*}
	 */
	EgoUtil.str_pad = function (input, pad_length, pad_string, pad_type) {
		var half = '', pad_to_go;

		var str_pad_repeater = function (s, len) {
			var collect = '', i;

			while (collect.length < len) collect += s;
			collect = collect.substr(0, len);

			return collect;
		};

		if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') {
			pad_type = 'STR_PAD_RIGHT';
		}
		if ((pad_to_go = pad_length - input.length) > 0) {
			if (pad_type == 'STR_PAD_LEFT') {
				input = str_pad_repeater(pad_string, pad_to_go) + input;
			} else if (pad_type == 'STR_PAD_RIGHT') {
				input = input + str_pad_repeater(pad_string, pad_to_go);
			} else if (pad_type == 'STR_PAD_BOTH') {
				half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
				input = half + input + half;
				input = input.substr(0, pad_length);
			}
		}

		return input;
	};

	/**
	 * Retrieve item from array by path
	 *
	 * @param obj - Input object
	 * @param path - Path for search.
	 * @param _default - Default value.
	 * @returns {*}
	 */
	EgoUtil.getArrItem = function (obj, path, _default) {
		//	Check default value
		if (!_default) {
			_default = null;
		}

		//	Check empty object
		if (EgoUtil.empty(obj)) {
			return _default;
		}

		if (path.split('.').length > 1) {
			var tmp = obj;

			path.split('.').some(function (item) {
				if (tmp === undefined || tmp === null || isNaN(tmp) || !tmp.hasOwnProperty(item)) {
					tmp = _default;

					return true;
				} else {
					tmp = tmp[item];
				}
			});

			return tmp;
		} else {
			if (obj[path] === undefined) {
				return _default;
			} else {
				return obj[path];
			}
		}
	};

	/*String.prototype.trunc = function (n, useWordBoundary) {
		if (this.length <= n) {
			return this;
		}

		var subString = this.substr(0, n - 1);

		return (useWordBoundary
			? subString.substr(0, subString.lastIndexOf(' '))
			: subString) + "&hellip;";
	};*/

	if (!noGlobal) {
		//window.EgoUtil = EgoUtil;
	}

	window.EgoUtil = EgoUtil;

	return EgoUtil;
});
