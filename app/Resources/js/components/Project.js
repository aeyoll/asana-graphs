import React from 'react';
import ReactHighcharts from 'react-highcharts';

import styles from 'Project.css'

var Project = React.createClass({
  getInitialState: function () {
    return {
      tasks: [],
      count: [],
      completed: [],
      remaining: [],
      isFetching: false
    };
  },

  componentDidMount: function () {
    this.dataFetch();
    this.interval = setInterval(() => this.dataFetch(), 5000);
  },

  dataFetch: function () {
    if (this.state.isFetching === false) {
      this.setState({
        isFetching: true
      });

      fetch('/api/projects/' + this.props.project.id + '/tasks')
        .then(response => response.json())
        .then((json) => {
          let tasks = json;

          let count = Object.keys(tasks).map((value) => {
            return tasks[value].count;
          });

          let completed = Object.keys(tasks).map((value) => {
            return tasks[value].completed;
          });

          let remaining = Object.keys(tasks).map((value) => {
            return tasks[value].remaining;
          });

          const config = {
            title: {
              text: ''
            },
            chart: {
              type: 'area'
            },
            xAxis: {
              title: '',
              categories: Object.keys(tasks),
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

          this.setState({
            isFetching: false,
            tasks: tasks,
            count: count,
            completed: completed,
            remaining: remaining,
            config: config
          });
        });
      }
  },

  render: function () {
    let className;

    if (this.props.showCompletedProjects === false && this.state.remaining[this.state.remaining.length - 1] === 0) {
      className = styles.completed;
    } else {
      className = styles.common;
    }

    let data;

    if (Object.keys(this.state.tasks).length > 0) {
      data = <ReactHighcharts className={styles.charts} config={this.state.config} isPureConfig />
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
