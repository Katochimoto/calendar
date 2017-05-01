export default function mutable (watched) {
  return function (component) {
    component.prototype.componentDidMount = function () {
      this.context[ watched ].addChangeListener(this.updateState, this);
    };

    component.prototype.componentWillUnmount = function () {
      this.context[ watched ].removeChangeListener(this.updateState, this);
    };
  }
}
