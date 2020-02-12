function checkMatch(arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};

function shuffle(array) {
	//loop through several times
	for (var i = 0; i < 10; i++) {
		//pick two random places
		var place1 = Math.floor(Math.random() * array.length);
		var place2 = Math.floor(Math.random() * array.length);
		//make a temp variable to hold place1's value
		var temp = array[place1];
		//now move the value of place2 into place1's slot
		array[place1] = array[place2];
		//take the temp value and place it in place2's slot
		array[place2] = temp;
	}
	return array;
}
export {
	checkMatch,
	shuffle
}