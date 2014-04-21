// performs the specified action on each item in the array
Array.prototype.forEach = function (fnAction) {
	var l = this.length;
	for (var i = 0; i < l; ++i) {
		fnAction(this[i]);
	}
}

// returns an array containing the items matching the filter
Array.prototype.where = function (fnFilter) {
	var l = this.length;
	var result = [];
	for (var i = 0; i < l; ++i) {
		if (fnFilter(this[i])) result.push(this[i]);
	}
	return result;
}

// returns an array of transformed objects
Array.prototype.select = function (fnTransform) {
	var l = this.length;
	var result = [];
	for (var i = 0; i < l; ++i) {
		result.push(fnTransform(this[i]));
	}
	return result;
}

// returns true if any item in the array match the check function
Array.prototype.any = function (fnCheck) {
	var l = this.length;
	for (var i = 0; i < l; ++i) {
		if (fnCheck(this[i])) return true;
	}
	return false;
}

// returns true if all items in the array match the check function
Array.prototype.all = function (fnCheck) {
	var l = this.length;
	for (var i = 0; i < l; ++i) {
		if (!fnCheck(this[i])) return false;
	}
	return true;
}

// returns true if any item in the array match the check function
Array.prototype.contains = function (item, fnCompare) {
	fnCompare = fnCompare || (function (i1, i2) {; return i1 == i2; });
	var l = this.length;
	for (var i = 0; i < l; ++i) {
		if (fnCompare(item, this[i])) return true;
	}
	return false;
}

// returns an array of distinct values based on either a direct element comparison or using the value provided by fnKey, if provided
Array.prototype.distinct = function (fnKey) {
	fnKey = fnKey || (function (i) { return i; });
	var l = this.length;
	var result = [];
	for (var i = 0; i < l; ++i) {
		if (!result.contains(this[i], function (i1, i2) { return fnKey(i1) == fnKey(i2); })) result.push(this[i]);
	}
	return result;
}

// returns the first item in the array matching the specified filter
Array.prototype.first = function (fnFilter) {
	var l = this.length;
	for (var i = 0; i < l; ++i) {
		if (fnFilter(this[i])) return this[i];
	}
	return null;
}

// returns the last item in the array matching the specified filter
Array.prototype.last = function (fnFilter) {
	for (var i = this.length - 1; i >= 0; --i) {
		if (fnFilter(this[i])) return this[i];
	}
	return null;
}

// returns an array of groups, each one in the form of { key: /* key */, values: /* array of matching items */ }
Array.prototype.groupBy = function (fnKey) {
	var keys = this.select(fnKey).distinct();
	var result = [];
	var l = keys.length;
	for (var i = 0; i < l; ++i) {
		var key = keys[i];
		result.push({ key: key, values: this.where(function (j) { return fnKey(j) == key; }) });
	}
	return result;
}

// same as Array.sort, but it returns the sorted array instead of sorting in place
Array.prototype.orderBy = function (fnSortExpression) {
	var result = this.splice(0, this.length);
	result.sort(fnSortExpression);
	return result;
}

// same as Array.sort with the function reversed, but it returns the sorted array instead of sorting in place
Array.prototype.orderByDescending = function (fnSortExpression) {
	var result = this.splice(0, this.length);
	result.sort(function (t1, t2) { return fnSortExpression(t1, t2) * -1; });
	return result;
}

// returns the union of the two arrays, with an optional comparison function
Array.prototype.union = function (aOther, fnCompare) {
	fnCompare = fnCompare || (function (i1, i2) { return i1 == i2; });
	var result = this.distinct(), aDistinct2 = aOther.distinct();
	var i = 0, j = 0, l1 = result.length; l2 = aDistinct2.length, item1 = null, item2 = null, found = false;
	for (i = 0; i < l2; ++i) {
		item1 = aDistinct2[i];
		if (!result.contains(item1, fnCompare)) result.push(item1);
	}
	return result;
};

// returns the intersection of the two arrays, with an optional comparison function
Array.prototype.intersect = function (aOther, fnCompare) {
	fnCompare = fnCompare || (function (i1, i2) { return i1 == i2; });
	var aDistinct1 = this.distinct(), aDistinct2 = aOther.distinct();
	var i = 0, j = 0, l1 = aDistinct1.length; l2 = aDistinct2.length, item1 = null, item2 = null;
	var result = [];
	for (; i < l1; ++i) {
		item1 = aDistinct1[i];
		for (j = 0; j < l2; ++j) {
			if (fnCompare(item1, aDistinct2[j])) {
				result.push(item1);
				break;
			}
		}
	}
	return result;
};