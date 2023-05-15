import React from 'react';

import AppbarLanding from '../../components/AppbarLanding';
import LandingContent from '../../components/LandingContent';
import withAuth from './api/auth/withAuth';

class Landing extends React.Component {
  render() {
    return (
      <>
        <AppbarLanding />
        <LandingContent />
      </>
    );
  }
}

export default withAuth(Landing);
