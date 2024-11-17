import { describe, it, expect } from 'vitest';
import { emptyRows, getComparator, applyFilter } from './utils';

// Tests for emptyRows
describe('emptyRows', () => {
    it('Trả về giá trị đúng số hàng trống khi có ít item hơn số hàng mỗi trang', () => {
        expect(emptyRows(0, 10, 5)).toBe(5);
    });

    it('Trả về 0 khi số item vừa đủ chia hết cho số hàng mỗi trang', () => {
        expect(emptyRows(0, 5, 5)).toBe(0);
    });

    it('Trả về 0 vì có nhiều item hơn số hàng mỗi trang', () => {
        expect(emptyRows(0, 5, 10)).toBe(0);
    });
});

// Tests for getComparator
describe('getComparator', () => {
    const items = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
    ];

    it('Sắp xếp theo thứ tự tăng dần khi order là "asc"', () => {
        const comparator = getComparator('asc', 'age');
        const sorted = items.sort(comparator);
        expect(sorted[0].name).toBe('Bob');
        expect(sorted[1].name).toBe('Alice');
    });

    it('Sắp xếp theo thứ tự giảm dần khi order là "desc"', () => {
        const comparator = getComparator('desc', 'age');
        const sorted = items.sort(comparator);
        expect(sorted[0].name).toBe('Alice');
        expect(sorted[1].name).toBe('Bob');
    });
});

// Tests for applyFilter
describe('applyFilter', () => {
    const data = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 20 },
        { name: 'Charlie', age: 12 },
    ];

    it('Sắp xếp dữ liệu theo thứ tự tăng dần theo name', () => {
        const comparator = getComparator('asc', 'name');
        const result = applyFilter({ inputData: data, comparator });
        expect(result.map((item) => item.name)).toEqual(['Alice', 'Bob', 'Charlie']);
    });

    it('Sắp xếp dữ liệu theo thứ tự giảm dần theo name', () => {
        const comparator = getComparator('desc', 'name');
        const result = applyFilter({ inputData: data, comparator });
        expect(result.map((item) => item.name)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('Sắp xếp dữ liệu theo thứ tự tăng dần và lọc dữ liệu theo tên bộ lọc là "a"', () => {
        const comparator = getComparator('asc', 'age');
        const result = applyFilter({ inputData: data, comparator, filterName: 'a' });
        expect(result.map((item) => item.name)).toEqual(['Charlie', 'Alice']);
    });
});
