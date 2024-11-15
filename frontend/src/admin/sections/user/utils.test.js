import { emptyRows, getComparator, applyFilter } from "./utils";

describe('emptyRows', () => {
    test('calculates empty rows correctly', () => {
        expect(emptyRows(1, 10, 15)).tobe(5);
        expect(emptyRows(0, 10, 15)).tobe(0);
        expect(emptyRows(1, 5, 8)).tobe(2);
    })
})

describe('getComparator', () => {
    const data = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 35 }
    ];

    test('sorts in descending order correctly', () => {
        const comparator = getComparator('desc', 'age');
        const sortedData = [...data].sort(comparator);
        expect(sortedData).toEqual([
            { name: 'Charlie', age: 35 },
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 }
        ]);
    });
});

describe('applyFilter', () => {
    const data = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 35 },
        { name: 'Dave', age: 30 }];
    test('sorts and filters data correctly', () => {
        const comparator = getComparator('asc', 'name');
        const result = applyFilter({ inputData: data, comparator, filterName: 'a' });
        expect(result).toEqual([
            { name: 'Charlie', age: 35 },
            { name: 'Dave', age: 30 }
        ]);
    });

    test('sorts without filtering if no filterName is provided', () => {
        const comparator = getComparator('asc', 'age');
        const result = applyFilter({ inputData: data, comparator, filterName: '' });
        expect(result).toEqual([
            { name: 'Bob', age: 25 },
            { name: 'Alice', age: 30 },
            { name: 'Dave', age: 30 },
            { name: 'Charlie', age: 35 }
        ]);
    });
});