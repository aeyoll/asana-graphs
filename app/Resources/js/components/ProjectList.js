import React from 'react';
import Project from 'Project';

import styles from 'ProjectList.css';

var ProjectList = React.createClass({
  render: function () {
    let rows = [];

    this.props.projects.forEach((project) => {
      rows.push(<Project project={project} key={project.id} showCompletedProjects={this.props.showCompletedProjects} />);
    });

    return (
      <div className={styles.common}>
        {rows}
      </div>
    );
  }
});

export default ProjectList;
