// unauthorized.js

import styles from '@/styles/error.module.css'

function Unauthorized() {
  return <div className= {styles.error}><h1>401 - Unauthorized Access</h1></div>;
}

export default Unauthorized;
