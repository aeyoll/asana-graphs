import React from 'react';
import ProjectList from 'ProjectList';

import styles from './App.css'

var App = React.createClass({
  getInitialState: function () {
    return {
      projects: []
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

            <ProjectList projects={this.state.projects} />
          </div>
        </div>
      </div>
    );
  }
});

export default App;
