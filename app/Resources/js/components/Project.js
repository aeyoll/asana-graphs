import React from 'react';
import ReactHighcharts from 'react-highcharts';

var Project = React.createClass({
  getInitialState: function () {
    return {
      tasks: []
    };
  },

  componentDidMount: function () {
    fetch('/api/projects/' + this.props.project.id + '/tasks')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          tasks: json
        });
      });
  },

  render: function () {
    let count = Object.keys(this.state.tasks).map((value) => {
      return this.state.tasks[value].count;
    });

    let completed = Object.keys(this.state.tasks).map((value) => {
      return this.state.tasks[value].completed;
    });

    let config = {
      title: {
        text: ''
      },
      chart: {
        type: 'area'
      },
      xAxis: {
        categories: Object.keys(this.state.tasks)
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
      data = <ReactHighcharts config={config} />
    } else {
      data = 'No tasks'
    }

    return (
      <div>
        <h3>{this.props.project.name} ({this.props.project.id})</h3>
        {data}
      </div>
    );
  }
});

export default Project;
