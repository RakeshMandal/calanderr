import React from 'react';
import moment from 'moment';
import '../App.css';

const Calendar = ({ date }) => {
  const startOfMonth = moment(date).startOf('month');
  const endOfMonth = moment(date).endOf('month');
  const startDate = moment(startOfMonth).startOf('week');
  const endDate = moment(endOfMonth).endOf('week');
  const days = [];

  let currDate = moment(startDate);
  while (currDate.isSameOrBefore(endDate)) {
    days.push(moment(currDate));
    currDate.add(1, 'day');
  }

  const renderHeader = () => {
    return (
      <tr>
        <th colSpan={7}>{date.format('MMMM YYYY')}</th>
      </tr>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = moment.weekdaysShort();
    return (
      <tr>
        {daysOfWeek.map((day) => (
          <th key={day}>{day}</th>
        ))}
      </tr>
    );
  };

  const renderCalendarDays = () => {
    const rows = [];
    let row = [];

    days.forEach((day) => {
      if (day.isBefore(startOfMonth, 'day') || day.isAfter(endOfMonth, 'day')) {
        row.push(<td key={day.format('YYYY-MM-DD')} />);
      } else {
        const isCurrentMonth = day.isSame(date, 'month');
        const isHighlighted = day.isSame(date, 'day');
        const className = isCurrentMonth ? 'current-month' : 'other-month';
        if (isHighlighted) {
          row.push(
            <td key={day.format('YYYY-MM-DD')} className={`${className} highlighted`}>
              {day.date()}
            </td>
          );
        } else {
          row.push(
            <td key={day.format('YYYY-MM-DD')} className={className}>
              {day.date()}
            </td>
          );
        }
      }

      if (row.length === 7) {
        rows.push(<tr key={day.format('YYYY-MM-DD')}>{row}</tr>);
        row = [];
      }
    });

    return rows;
  };

  return (
    <table className="calendar">
      <thead>
        {renderHeader()}
        {renderDaysOfWeek()}
      </thead>
      <tbody>{renderCalendarDays()}</tbody>
    </table>
  );
};

export default Calendar;
