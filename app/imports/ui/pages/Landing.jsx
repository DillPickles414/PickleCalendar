import React from 'react';
import { Grid, Image, Icon } from 'semantic-ui-react';


/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (


        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={7}>
          <Image mid ='middle' circular src="https://png.pngtree.com/png-clipart/20200225/original/pngtree-march-calendar-2020-clipart-vector-png-element-png-image_5265098.jpg"/>
        </Grid.Column>


          <Grid.Column width={8}>
            <Icon  name='calendar alternate outline' size='huge' />
            <h1>Welcome to PickleCalendar</h1>
            <p>Please register your account!</p>
            <p>Login to add and see your events!</p>
            <p>Created an event and upload it!</p>
          </Grid.Column>



        </Grid>
    );
  }
}

export default Landing;
