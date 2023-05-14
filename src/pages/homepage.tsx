import React from 'react';

import Appbar from '../../components/AppbarHome';
import Content from '../../components/HomepageContent';

import { withRouter } from 'next/router';

class Homepage extends React.Component<any, any>{
    
  handleLogin = () => {
    this.props.router.push('/login');
  };

  render() {
    return (
      <>
        <Appbar />
        <Content />
      </>
    );
  }
}

export default withRouter(Homepage);
