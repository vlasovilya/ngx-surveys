import { FileSizePipe } from './';

describe('Pipe: FileSize', () => {
    let pipe: FileSizePipe;

    beforeEach(() => {
        pipe = new FileSizePipe();
    });

    it('providing 10 returns 10.00&nbsp;bytes', () => {
        expect(pipe.transform(10)).toBe('10.00&nbsp;bytes');
    });

    it('providing 1024 returns 1.00&nbsp;KB', () => {
        expect(pipe.transform(1024)).toBe('1.00&nbsp;KB');
    });

    it('providing 10240000 returns 9.77&nbsp;MB', () => {
        expect(pipe.transform(10240000)).toBe('9.77&nbsp;MB');
    });

    it('providing 10240000 with 0 precision and @ as a separator returns 1.00&nbsp;KB', () => {
        expect(pipe.transform(10240000, 0, '@')).toBe('10@MB');
    });

    it('providing 1010240000 with 1 precision and " " as a separator returns 1.00&nbsp;KB', () => {
        expect(pipe.transform(1010240000, 1, ' ')).toBe('963.4 MB');
    });
});
