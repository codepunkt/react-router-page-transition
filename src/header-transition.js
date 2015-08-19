const React = require('react/addons');
const { PropTypes } = React;
const { TransitionSpring } = require('react-motion');

const HeaderTransition = React.createClass({
  propTypes: {
    pathname: PropTypes.string.isRequired
  },

  willEnter() {
    const { children } = this.props;

    return {
      handler: children,
      headerMargin: { val: -160 },
      opacity: { val: 0 },
      rotate: { val: 10 }
    };
  },

  willLeave(key, value) {
    return {
      handler: value.handler,
      headerMargin: { val: -160 },
      opacity: { val: 0 },
      rotate: { val: 10 }
    };
  },

  getEndValue() {
    const { children, pathname } = this.props;

    return {
      [pathname]: {
        handler: children,
        headerMargin: { val: 0 },
        opacity: { val: 1 },
        rotate: { val: 0 }
      }
    };
  },

  render() {
    return (
      <TransitionSpring endValue={this.getEndValue} willEnter={this.willEnter} willLeave={this.willLeave}>
        {currentValue =>
          <div>
            {Object.keys(currentValue).map(key => {
              let style = {
                transform: `rotate(${currentValue[key].rotate.val}deg)`
              };

              let headerStyle = {
                marginTop: currentValue[key].headerMargin.val,
                opacity: currentValue[key].opacity.val
              };

              let mainStyle = {
                opacity: currentValue[key].opacity.val
              };

              // style={style}
              return <div key={`${key}-transition`}>
                {React.addons.cloneWithProps(currentValue[key].handler, {
                  headerStyle: headerStyle,
                  mainStyle: mainStyle
                })}
              </div>;
            })}
          </div>
        }
      </TransitionSpring>
    );
  }
});

module.exports = HeaderTransition;
