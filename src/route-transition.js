const React = require('react/addons');
const { PropTypes } = React;
const { TransitionSpring } = require('react-motion');

const RouteTransition = React.createClass({
  propTypes: {
    pathname: PropTypes.string.isRequired
  },

  willEnter() {
    const { children } = this.props;

    return {
      handler: children,
      opacity: { val: 0 },
      scale: { val: 0.95 }
    };
  },

  willLeave(key, value) {
    return {
      handler: value.handler,
      opacity: { val: 0 },
      scale: { val: 0.95 }
    };
  },

  getEndValue() {
    const { children, pathname } = this.props;

    return {
      [pathname]: {
        handler: children,
        opacity: { val: 1 },
        scale: { val: 1 }
      }
    };
  },

  render() {
    return (
      <TransitionSpring
        endValue={this.getEndValue}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {interpolated => {
          return <div>
            {Object.keys(interpolated).map(key =>
              <div
                key={`${key}-transition`}
                style={{
                  opacity: interpolated[key].opacity.val,
                  transform: `scale(${interpolated[key].scale.val})`
                }}
              >
               {interpolated[key].handler}
              </div>
            )}
          </div>
        }}
      </TransitionSpring>
    );
  }
});

module.exports = RouteTransition;
