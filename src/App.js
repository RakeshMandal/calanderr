import React from 'react';
import moment from 'moment';
import Calendar from './components/Calendar';

const App = () => {
  const someDate = new Date(); // Replace with the desired date
  const date = moment(someDate);

  return (
    <div className="App">
      <Calendar date={date} />
    </div>
  );
};

export default App;
