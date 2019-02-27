import { RatingToArrayPipe } from './rating-to-array.pipe';

describe('RatingToArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new RatingToArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
