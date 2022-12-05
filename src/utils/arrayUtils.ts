export const findByKeyInArray = (key:any, keyValue:any, array:any) => {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === keyValue) {
			return array[i];
		}
	}

	return -1;
};

export const findIndexByKeyInArray = (key:any, keyValue:any, array:any) => {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === keyValue) {
			return i;
		}
	}

	return -1;
};

export const addToArrayIfKeyValueDoesntExist = (array:any, key:any, object:any) => {
	if (findByKeyInArray(key, object[key], array) == -1) {
		array.push(object);
		return array;
	} else {
		return array;
	}
};

export const removeFromArrayBasedOnKey = (key:any, keyValue:any, array:any) => {
	for (var i = 0; i < array.length; i++)
		if (array[i][key] === keyValue) {
			array.splice(i, 1);
			return array;
		}

	return array;
};

export const replaceKeyValueInToArrayIfKeyExistOrAdd = (array:any, keyToExist:any, object:any) => {
	let index = findIndexByKeyInArray(keyToExist, object[keyToExist], array);
	if (index == -1) {
		array.push(object);
		return array;
	} else {
		array = removeFromArrayBasedOnKey(keyToExist, object[keyToExist], array);
		array.push(object);
		return array;
	}
};

export const removeItemFromArray = (arr:any, value:any) => {
	const index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
};

export const addItemToArrayIfNotAlreadyThere = (arr:any, value:any) => {
	if (arr.indexOf(value) === -1) {
		arr.push(value);
	}
	return arr;
};
