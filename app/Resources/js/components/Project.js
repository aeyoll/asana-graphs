import React from 'react';
import ReactHighcharts from 'react-highcharts';

import styles from 'Project.css'

var Project = React.createClass({
  getInitialState: function () {
    return {
      tasks: [],
      isFetching: false
    };
  },

  componentDidMount: function () {
    this.setState({
      isFetching: true
    });

    fetch('/api/projects/' + this.props.project.id + '/tasks')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          isFetching: false,
          tasks: json
        });
      });
  },

  render: function () {
    let className;

    let count = Object.keys(this.state.tasks).map((value) => {
      return this.state.tasks[value].count;
    });

    let completed = Object.keys(this.state.tasks).map((value) => {
      return this.state.tasks[value].completed;
    });

    let remaining = Object.keys(this.state.tasks).map((value) => {
      return this.state.tasks[value].remaining;
    });

    if (this.state.isFetching === true) {
      className = styles.fetching;
    } else if (this.props.showCompletedProjects === false && remaining[remaining.length - 1] === 0) {
      className = styles.completed;
    } else {
      className = styles.common;
    }

    let config = {
      title: {
        text: ''
      },
      chart: {
        type: 'area'
      },
      xAxis: {
        title: '',
        categories: Object.keys(this.state.tasks),
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
        data: count
      }, {
        name: 'Completed',
        data: completed
      }]
    };

    let data;

    if (Object.keys(this.state.tasks).length > 0) {
      data = <ReactHighcharts className={styles.charts} config={config} />
    } else {
      data = 'No tasks'
    }

    return (
      <div className={className}>
        <h3 className={styles.title}>{this.props.project.name}</h3>
        {data}
      </div>
    );
  }
});

export default Project;
