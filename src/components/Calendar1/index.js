import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Calendar from '../Calendar/Calendar';

class Calendar1 extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Calendar uid={123} />
      </MuiThemeProvider>
    );
  }
}
export default Calendar1;
