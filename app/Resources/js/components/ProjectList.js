import React from 'react';
import Project from './Project.js';

var ProjectList = React.createClass({
  render: function () {
    let rows = [];

    this.props.projects.forEach(function(project) {
      rows.push(<Project project={project} key={project.id} />);
    });

    return (
      <div>
        <h2>Project list</h2>
        {rows}
      </div>
    );
  }
});

export default ProjectList;
