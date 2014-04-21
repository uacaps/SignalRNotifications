var test = [1, 2, 3, 8, 4, 5, 6, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8];
var test2 = [{ foo: 1, bar: 1 }, {foo: 1, bar: 2}, {foo: 2, bar: 3}, {foo: 2, bar: 4}];
var test3 = [6, 7, 4, 9];
test.where(function (t) {
    return t % 2 == 0;
}).select(function (t) {
    return t + 7;
}).forEach(function (t) {
    alert(t);
});
alert(test.union(test3));
alert(test.orderByDescending(function(t, t2) { return t - t2; }));
alert(test.contains(9));
alert(test.distinct(function(t) { return t % 2; }));
alert(test2.groupBy(function(t) { return t.foo; })[1].values[1].bar);