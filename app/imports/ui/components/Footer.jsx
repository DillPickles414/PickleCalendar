import React from 'react';
import { Icon } from 'semantic-ui-react';


/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
            <br/>
            Visit Our FaceBook
            <Icon  name='facebook' size='large'/>

             Instagram
            <Icon  name='instagram' size='large'/>

            Find Us on Github
            <a href="https://github.com/DillPickles414/PickleCalendar">
              <Icon  name='github' size='large'/></a>

            Any Question
            <Icon  name='question circle outline' size='large'/>

          </div>
        </footer>
    );
  }
}

export default Footer;
