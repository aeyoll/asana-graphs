import React from 'react';
import ReactHighcharts from 'react-highcharts';

var Project = React.createClass({
  render: function () {
    let config = {
      // xAxis: {
      //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      // },
      // series: [{
      //   data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      // }]
    };

    // <ReactHighcharts config={config} />

    return (
      <div>
        <h3>{this.props.project.name} ({this.props.project.id})</h3>
      </div>
    );
  }
});

export default Project;
