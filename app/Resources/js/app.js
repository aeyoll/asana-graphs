import React from 'react';
import ProjectList from 'ProjectList';

import styles from './App.css'

var App = React.createClass({
  getInitialState: function () {
    return {
      projects: [],
      showCompletedProjects: false
    };
  },

  componentDidMount: function () {
    fetch('/api/projects')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          projects: json
        });
      });
  },

  render: function () {
    return (
      <div className={styles.common}>
        <h1 className={styles.title}>Asana Dashboard</h1>
        <div className={styles.container}>
          <div className={styles.body}>

            <ProjectList projects={this.state.projects} showCompletedProjects={this.state.showCompletedProjects} />
          </div>
        </div>
      </div>
    );
  }
});

export default App;
