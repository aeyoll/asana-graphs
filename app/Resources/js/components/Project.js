import React from 'react';
import Chart from 'Chart';

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
    this.interval = setInterval(() => this.dataFetch(), 30000);
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

          this.setState({
            isFetching: false,
            tasks: tasks,
            count: count,
            completed: completed,
            remaining: remaining
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
      data = <Chart
        className={styles.charts}
        tasks={this.state.tasks}
        count={this.state.count}
        completed={this.state.completed} />
    } else {
      data = <p>No tasks</p>
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
