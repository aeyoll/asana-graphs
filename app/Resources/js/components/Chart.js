import React from 'react';
import ReactHighcharts from 'react-highcharts';

import styles from 'Chart.css'

var Chart = React.createClass({
  getInitialState: function () {
    return {
      'config': {}
    }
  },

  componentDidMount() {
    this.setState({
      config: {
        title: {
          text: ''
        },
        chart: {
          height: 100,
          marginBottom: 0,
          spacingBottom: 0,
          type: 'area'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          title: '',
          categories: Object.keys(this.props.tasks),
          labels: {
            enabled: false
          }
        },
        yAxis: {
          title: '',
          labels: {
            enabled: false
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: 'Total',
          data: this.props.count
        }, {
          name: 'Completed',
          data: this.props.completed
        }]
      }
    });
  },

  componentWillReceiveProps(nextProps) {
    this.chart = this.refs.chart.getChart();

    this.chart.series[0].setData(nextProps.count);
    this.chart.series[1].setData(nextProps.completed);
  },

  render: function () {
    return (
      <div>
        <ReactHighcharts config={this.state.config} ref="chart" isPureConfig />
      </div>
    );
  }
});

export default Chart;
