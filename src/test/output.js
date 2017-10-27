function doge(target) {
  target.isDoge; // eslint-disable-line
}

@doge
class Dog {
  isDoge = 1;
}

console.log(Dog.isDoge);

const dog = new Dog();

export default dog;
