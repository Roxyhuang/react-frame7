
function test(isDoge) {
  return (target) => {
    target.isDoge = isDoge; // eslint-disable-line
  };
}
export default test;
