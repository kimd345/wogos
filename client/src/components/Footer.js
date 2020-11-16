import React, { useState } from 'react';

export default function () {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  }

  const handleHide = () => {
    setShow(false);
  }

  return (
    show ?
    <div style={styles.container}>
      <i className="fa fa-times" style={styles.closeIcon} onClick={handleHide}/>
      <h5 style={styles.title}>Reach out!</h5>
      <div>
        <div style={styles.profileContainer}>
          <p style={styles.profileName}>Austin Burger</p>
          <div style={styles.iconsContainer}>
            <a href="https://github.com/about14sheep">
              <i className="fa fa-github-alt" style={styles.gitHubIcon}/>
            </a>
            <a href="https://www.linkedin.com/in/austin-burger/">
              <i className="fa fa-linkedin" style={styles.linkedInIcon}/>
            </a>
          </div>
        </div>
        <div style={styles.profileContainer}>
          <p style={styles.profileName}>Cath Lee</p>
          <div style={styles.iconsContainer}>
            <a href="https://cathimn.github.io/" style={styles.gitHubIcon}>
              <i className="fa fa-briefcase"/>
            </a>
            <a href="https://angel.co/u/cathimn">
              <i className="fa fa-angellist" style={styles.angelListIcon}/>
            </a>
            <a href="https://github.com/cathimn">
              <i className="fa fa-github-alt" style={styles.gitHubIcon}/>
            </a>
            <a href="https://www.linkedin.com/in/cath-lee/">
              <i className="fa fa-linkedin" style={styles.linkedInIcon}/>
            </a>
          </div>
        </div>
        <div style={styles.profileContainer}>
          <p style={styles.profileName}>Dong Hyuk Kim</p>
          <div style={styles.iconsContainer}>
            <a href="https://kimd345.github.io/" style={styles.gitHubIcon}>
              <i className="fa fa-briefcase"/>
            </a>
            <a href="https://angel.co/u/dong-hyuk-kim">
              <i className="fa fa-angellist" style={styles.angelListIcon}/>
            </a>
            <a href="https://github.com/kimd345">
              <i className="fa fa-github-alt" style={styles.gitHubIcon}/>
            </a>
            <a href="https://www.linkedin.com/in/dong-hyuk-kim/">
              <i className="fa fa-linkedin" style={styles.linkedInIcon}/>
            </a>
          </div>
        </div>
      </div>
      <p style={{ color: '#999999', fontSize: '13px' }}>
        Inspired by <a style={{color: 'lightgray'}} href="https://gog.com/">GOG.com</a>
      </p>
    </div>
    :
    <div style={bubbleStyles.container}>
      <div onClick={handleShow} style={bubbleStyles.bubble}>
        <p style={bubbleStyles.text}>Have any questions?</p>
      </div>
      <div style={bubbleStyles.pointer} />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: '30px',
    right: '50px',
    width: '250px',
    height: '250px',
    backgroundColor: '#262626',
    borderRadius: '30px',
    padding: '10px',
  },
  title: {
    color: '#999999',
    fontWeight: '700',
    textAlign: 'center',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '30px',
  },
  profileName: {
    color: 'lightgray',
  },
  iconsContainer: {
    display: 'flex',
  },
  closeIcon: {
    color: 'lightgray', 
    position: 'absolute', 
    right: '16px', 
    top: '13px' 
  },
  gitHubIcon: {
    color: 'white',
    paddingLeft: '10px',
  },
  linkedInIcon: {
    color: '#0072b1',
    paddingLeft: '10px',
  },
  angelListIcon: {
    color: 'purple',
    paddingLeft: '10px',
  },
};

const bubbleStyles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '50px',
  },
  bubble: {
    height: '75px',
    width: '250px',
    minWidth: '200px',
    background: '#262626',
    display: 'block',
    margin: '0 auto',
    borderRadius: '30px',
    marginTop: '50px',
    fontSize: '20px',
    textAlign: 'center',
  },
  pointer: {
    height: '30px',
    width: '30px',
    background: '#262626',
    margin: '0 auto',
    transform: 'rotate(45deg)',
    marginTop: '-22px',
    position: 'relative',
    left: 'calc(0.5vw - 50px)',
  },
  text: {
    color: '#999999',
    fontWeight: '700',
    lineHeight: '75px',
  },
};