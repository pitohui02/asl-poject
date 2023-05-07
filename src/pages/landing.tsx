import React from "react";

import AppbarLanding from "../../components/AppbarLanding";
import LandingContent from "../../components/LandingContent";


class Landing extends React.Component{
 
    render() {
        return (

            <>
                <AppbarLanding/>
                <LandingContent />
            </>
        )
    }


}

export default Landing