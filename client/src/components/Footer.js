import React from 'react';

export default function () {
  return (
    <div style={styles.container}>
      <i className="fa fa-code"/> <a href="https://cathimn.github.io/">Cath Lee</a>
      <i className="fa fa-github-alt"/> <a href="https://github.com/cathimn/ka-feen">Github</a>
      <i className="fa fa-linkedin"/> <a href="https://www.linkedin.com/in/cath-lee">LinkedIn</a>
      <p>
        Inspired by <a href="https://gog.com/">GOG.com</a>
      </p>
    </div>
  )
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    width: '300px',
    backgroundColor: '#262626',
  },
};