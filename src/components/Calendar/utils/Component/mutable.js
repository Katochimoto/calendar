export default function mutable (watched) {
  return function (component) {
    component.prototype.componentDidUpdate = componentDidUpdate;
    component.prototype.handleChange = handleChange;

    component.prototype.componentDidMount = function () {
      this.context[ watched ].addChangeListener(this.handleChange, this);
    };

    component.prototype.componentWillUnmount = function () {
      this.context[ watched ].removeChangeListener(this.handleChange, this);
    };
  }
}

function componentDidUpdate () {
  this._lockSetState = false;

  if (this._shouldUpdateState) {
    this.handleChange();
  }
}

function handleChange () {
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
