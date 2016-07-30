import React from 'react';
import ProjectList from './components/ProjectList'

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
      <div>
        <h1>Asana Dashboard</h1>

        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
});

export default App;
