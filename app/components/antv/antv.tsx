import * as React from 'react'
import { WebView } from 'react-native-webview'
import { View, ViewStyle } from 'react-native'
import { equals } from 'ramda'
import { platform } from '../../theme'

function renderLineScripts (data) {
  return `
    (function() {
      var offsetHeight = document.body.offsetHeight;
      var offsetWidth = document.body.offsetWidth;

      var data = ${JSON.stringify(data)};
      var chart = new F2.Chart({
        id: 'mountNode',
        pixelRatio: window.devicePixelRatio
      });
      
      chart.source(data);
      chart.scale('x', {
        tickCount: 6
      });
      chart.tooltip({
        custom: true,
        showCrosshairs: false,
        showTooltipMarker: true,
        tooltipMarkerStyle: {
          fill: '#0BA194',
          stroke: '#0BA194',
          strokeOpacity: 0.3,
          strokeWidth: 8,
          lineWidth: 8
        },
        onChange: function onChange(ev) {
          var currentData = ev.items[0];
          var tooltip = document.getElementById('tooltip');
          tooltip.style.opacity = 1;

          var left = Math.floor(currentData.x) + 10;
          let top = Math.floor(currentData.y) + 10;
          if (left + 100 > offsetWidth) {
            left = left - 120
          }
          if (top + 43 > offsetHeight) {
            top = top - 53
          }
          tooltip.style.left = left + 'px';
          tooltip.style.top = top + 'px';

          var p1 = document.createElement('div');
          p1.innerText = '时间：' + currentData.title;
          var p2 = document.createElement('div');
          p2.innerText = '收益率：' + currentData.value + '%';
    
          tooltip.innerHTML = '';
          tooltip.appendChild(p1);
          tooltip.appendChild(p2);
        },
        onHide: function onHide() {
          var tooltip = document.getElementById('tooltip');
          tooltip.style.opacity = 0
        }
      });
      chart.axis('x', {
        label: function label(text, index, total) {
          var baseStyle = {
            fill: '#A0A4AA'
          }
          var overStyle = {
            rotate: -Math.PI * 0.2,
            textAlign: 'end',
            textBaseline: 'middle'
          }
          return total > 5 ? Object.assign(baseStyle, overStyle) : baseStyle;
        },
      });
      chart.axis('y', {
        grid: {
          lineDash: null,
          stroke: '#F6F7F8',
          lineWidth: 1
        },
        label: {
          fill: '#A0A4AA',
        }
      });
      chart.line().position('x*y').color('#0BA194');
      chart.render();
    })();
    true;
  `
}

function renderBarScripts (data) {
  return `
    (function() {
      var offsetHeight = document.body.offsetHeight;
      var offsetWidth = document.body.offsetWidth;

      var data = ${JSON.stringify(data)};
      var chart = new F2.Chart({
        id: 'mountNode',
        pixelRatio: window.devicePixelRatio
      });
      
      chart.source(data);
      chart.scale('x', {
        tickCount: 6
      });
      chart.tooltip({
        custom: true,
        showCrosshairs: false,
        showTooltipMarker: true,
        onChange: function onChange(ev) {
          var currentData = ev.items[0];
          var tooltip = document.getElementById('tooltip');
          tooltip.style.opacity = 1;

          var left = Math.floor(currentData.x) + 10;
          let top = Math.floor(currentData.y) + 10;
          if (left + 100 > offsetWidth) {
            left = left - 120
          }
          if (top + 43 > offsetHeight) {
            top = top - 53
          }
          tooltip.style.left = left + 'px';
          tooltip.style.top = top + 'px';

          
          var p1 = document.createElement('div');
          p1.innerText = '时间：' + currentData.title;
          var p2 = document.createElement('div');
          p2.innerText = '收益：' + currentData.value;
    
          tooltip.innerHTML = '';
          tooltip.appendChild(p1);
          tooltip.appendChild(p2);
        },
        onHide: function onHide() {
          var tooltip = document.getElementById('tooltip');
          tooltip.style.opacity = 0
        }
      });
      chart.axis('x', {
        label: function label(text, index, total) {
          var baseStyle = {
            fill: '#A0A4AA'
          }
          var overStyle = {
            rotate: -Math.PI * 0.2,
            textAlign: 'end',
            textBaseline: 'middle'
          }
          return total > 5 ? Object.assign(baseStyle, overStyle) : baseStyle;
        },
      });
      chart.axis('y', {
        grid: {
          lineDash: null,
          stroke: '#F6F7F8',
          lineWidth: 1
        },
        label: {
          fill: '#A0A4AA',
        }
      });
      chart.interval().position('x*y').color('y', function (val) {
        return val > 0 ? '#0BA194' : '#FF3B30';
      }).style('y', {
        radius: function (val) {
          return val > 0 ? [5, 5, 0, 0] : [0, 0, 5, 5];
        }
      });
      chart.render();
    })();
    true;
  `
}

export interface AntvProps {
  height?: number
  data?: any[]
  type?: 'line' | 'bar'
  style?: ViewStyle
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export class Antv extends React.PureComponent<AntvProps> {
  web: WebView

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!equals(nextProps.data, this.props.data)) {
      this.web.reload()
    }
  }

  render () {
    const { height = 220, data = [], type = 'line' } = this.props
    let injectedJavaScript: string
    switch (type) {
      case 'line':
        injectedJavaScript = renderLineScripts(data)
        break
      default:
        injectedJavaScript = renderBarScripts(data)
    }
    return (
      <View style={{ flex: 1, height }}>
        <WebView
          ref={ref => this.web = ref}
          scrollEnabled={false}
          injectedJavaScript={injectedJavaScript}
          style={{ height }}
          scalesPageToFit={false}
          originWhitelist={['*']}
          source={platform.isIOS ? require('./antv.html') : {
            uri: 'file:///android_asset/antv.html'
          }}
        />
      </View>
    )
  }
}
