import React from 'react';
import ProjectList from './components/ProjectList'

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Asana Dashboard</h1>

        <ProjectList></ProjectList>
      </div>
    );
  }
});

export default App;
