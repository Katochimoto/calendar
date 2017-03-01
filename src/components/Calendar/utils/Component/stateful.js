export default function stateful (component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  component.prototype.componentDidUpdate = componentDidUpdate;
  component.prototype.transformState = transformState;
  component.prototype.updateState = updateState;
}

function shouldComponentUpdate () {
  return false;
}

function componentDidUpdate () {
  this._lockSetState = false;

  if (this._shouldUpdateState) {
    this.updateState();
  }
}

function transformState (/* props, context */) {
  return {};
}

function updateState () {
  if (this._lockSetState) {
    this._shouldUpdateState = true;
    return;
  }

  this._shouldUpdateState = false;

  const state = this.transformState(this.props, this.context);

  if (this.shouldComponentUpdate(this.props, state)) {
    this._lockSetState = true;
    this.setState(state);

  } else {
    this._lockSetState = false;
  }
}
