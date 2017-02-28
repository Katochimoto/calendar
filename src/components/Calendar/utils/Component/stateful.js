export default function stateful (component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  component.prototype.transformState = transformState;
}

function shouldComponentUpdate () {
  return false;
}

function transformState (/* props, context */) {
  return {};
}
