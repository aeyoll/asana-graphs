import React from 'react';

var Project = React.createClass({
  render: function () {
    return (
      <div>
        <h3>{this.props.project.name} ({this.props.project.id})</h3>
      </div>
    );
  }
});

export default Project;
