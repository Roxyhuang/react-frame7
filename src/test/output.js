import test from './test';

class Output {
  @test('HTML')
  static a() {
    console.log('test');
  }
}


export default new Output();
