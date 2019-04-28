# EGO Util

JavaScript library with utils function like *EgoUtil.empty(value)*.

> EgoUtil._request(params)

Send request

```
params.url: string          - URL request
params.method: string       - Request method
params.data: object         - Request data
params.type: string         - Response data type
params.headers: object      - Requeset headers
params.suscces: Function    - Callback for success event
params.notSuccess: Function - Callback for not success event
params.error: Function      - Callback for error event
```


> EgoUtil._checkEmptyForm(data)

Check that form is empty or not

```
data: Object - Data
```


> EgoUtil._collectFormData(selector, container)

Collect data from form

Return array in format
```
[
    FIELD_NAME_ATTR: {
        value: FIELD_VALUE,
	    required: IF_FIELD_REQUIRED,
        description: FIELD_LABEL//	Field label or `data-description` field attribute
    }
]
```

```
selector: string    - Selector
container: object   - Container
```


> EgoUtil.isRequiredFieldsEmpty(formData)

Is the required fields is Empty?
Use with `collectFormData`

```
formData: object - Form data
```


> EgoUtil.is_array(mixed_var)

Check that object is array

```
mixed_var: object - Value for check
```


> EgoUtil.empty(mixed_var)

Check empty value

```
mixed_var: object - Value for check
```


> EgoUtil.getUrlParam(param, url)

Return URL parameter

```
param: string - Name of URL param
url: string - Source URL
```


> EgoUtil.clearFields(eContainer)

Clear all input fields in container

```
eContainer: object - Container
```


> EgoUtil.clearFields(eField, value)

Set Field value

```
eField: object - Field node
value: object - Field value
```


> EgoUtil.setListener(arr, listener)

Set listener. Add listener to array

```
arr: Function[]     - List of listeners
listener: Function  - Listener
```


> EgoUtil.removeListener(arr, listener)

Remove listener from array.

```
arr: Function[]     - List of listeners
listener: Function  - Listener
```


> EgoUtil.eachListener(arr, handler)

Traversing an array of listeners. Call `handler` for each listener and pass it.

```
arr: Function[]     - List of listeners
handler: Function   - Handler for each listener
```


> EgoUtil.str_pad(input, pad_length, pad_string, pad_type)

Pad a string to a certain length with another string.
Similar to PHP `str_pad`

```
input: string       - List of listeners
pad_length: number  - Handler for each listener
pad_string: string  - Handler for each listener
pad_type: string    - Handler for each listener
```


> EgoUtil.getArrItem(obj, path, _default)

Retrieve item from array by path.

`EgoUtil.getArrItem({root: {child: {value: 'Hello World'}}}, 'root.child.value', 'Default Value if empty.')`

```
obj: object         - Input object.
path: string        - Path for search.
_default: object    - Default value.
```
