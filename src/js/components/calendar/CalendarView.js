import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Calendar from "./Calendar.js";
import moment from "moment";

const getDaysOfWeek = activeDate => {
  const start = moment(activeDate).startOf("week");
  const end = moment(activeDate).endOf("week");
  let days = [start];
  let current = moment(start).add(1, "day");
  while (current.isBefore(end)) {
    days.push(current);
    current = moment(current).add(1, "day");
  }
  return days;
};

const getDaysOfMonth = activeDate => {
  const start = moment(activeDate).startOf("month");
  const end = moment(activeDate).endOf("month");
  let days = [start];
  let current = moment(start).add(1, "day");
  while (current.isBefore(end)) {
    days.push(current);
    current = moment(current).add(1, "day");
  }
  return days;
};

const datePickerStyles = {
    boxSizing: "border-box",
    fontSize: "10px",
    display: "flex",
    position: "relative",
    flexDirection: "row"
};

const _modes = {
    day: {
        _timeBlockMinutes: 30,
        _yAxisWidth: 120,
        _dayDirection: 'vertical',
        _timeDirection: 'horizontal',
        _blockHeight: 50,
        _blockPixelSize: 50,
        _allowResize: true
    },
    week: {
        _timeBlockMinutes: 1439,
        _yAxisWidth: 120,
        _dayDirection: 'horizontal',
        _timeDirection: 'horizontal',
        _blockHeight: 50,
        _blockPixelSize: 100,
        _allowResize: false
    },
    month: {
        _timeBlockMinutes: 1439,
        _yAxisWidth: 120,
        _dayDirection: 'horizontal',
        _timeDirection: 'horizontal',
        _blockHeight: 50,
        _blockPixelSize: 100,
        _allowResize: false
    }
};
const DayPicker = (props) => <div style={datePickerStyles}>{props.children}</div>;
DayPicker.propTypes = {
    children: PropTypes.node,
};

const CalendarView = ({
  events,
  timeDirection,
  dayDirection,
  timeBlockMinutes,
  blockPixelSize,
  onChange,
  viewMode,
  dayLabel,
  blockLabel,
  yAxisWidth,
  activeDate,
  eventBoxStyles,
  timeBlockStyles,
  onClick,
  blockHeight,
  allowResize
}) => {
    let daysToShow = [];

    const [ currentDate, setCurrentDate ] = useState(activeDate ? activeDate : moment().startOf("day"));
    const [ _viewMode, setViewMode ] = useState(viewMode);

    if (_viewMode === "day"){
        daysToShow = [currentDate];
    }
    else if (_viewMode === "week"){
        daysToShow = getDaysOfWeek(currentDate);
    }
    else if (_viewMode === "month"){
        daysToShow = getDaysOfMonth(currentDate);
    }
    const { _timeBlockMinutes, _yAxisWidth, _dayDirection, _timeDirection, _blockHeight, _blockPixelSize, _allowResize } = _modes[_viewMode];
    console.log(timeDirection,_timeDirection);
    return (
        <div>
            <DayPicker>
                <button onClick={() => setCurrentDate(moment(currentDate).add(-1,'days'))}>{'<<'}</button>
                <button onClick={() => setViewMode('day')}>Day</button>
                <button onClick={() => setViewMode('week')}>Week</button>
                <button onClick={() => setViewMode('month')}>Month</button>
                <button onClick={() => setCurrentDate(moment(currentDate).add(1,'days'))}>{'>>'}</button>
            </DayPicker>
            <Calendar
                timeDirection={timeDirection || _timeDirection}
                dayDirection={dayDirection || _dayDirection}
                yAxisWidth={yAxisWidth || _yAxisWidth}
                blockHeight={blockHeight || _blockHeight}//only applies when its horizontal calendar
                timeBlockMinutes={timeBlockMinutes || _timeBlockMinutes}
                blockPixelSize={blockPixelSize || _blockPixelSize}
                allowResize={allowResize || _allowResize}

                events={events}
                daysToShow={daysToShow}
                onChange={event => onChange && onChange(event)}
                viewMode={_viewMode}
                dayLabel={dayLabel}
                activeDate={currentDate}
                blockLabel={blockLabel}
                showFrom={5}
                showUntil={24}
                eventOffset={5}

                //events related props
                onClick={(e) => onClick && onClick(e)}

                //styling related props
                eventBoxStyles={eventBoxStyles}
                timeBlockStyles={timeBlockStyles}
            />
        </div>
    );
};

CalendarView.propTypes = {
    children: PropTypes.node,
    viewMode: PropTypes.oneOf(['day', 'week', 'month']),
    dayDirection: PropTypes.string,
    timeDirection: PropTypes.string,
    onChange: PropTypes.func,
    allowResize: PropTypes.bool,
    showPreview: PropTypes.bool,
    events: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    timeBlockMinutes: PropTypes.number,
    yAxisWidth: PropTypes.number,
    blockLabel: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    dayLabel: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    activeDate: PropTypes.object,

    //event-related props
    onClick: PropTypes.func,

    //styling properties
    eventBoxStyles: PropTypes.object,
    timeBlockStyles: PropTypes.object,
    blockPixelSize: PropTypes.number,
    blockHeight: PropTypes.number//only applies when its horizontal calendar
};

CalendarView.defaultProps = {
  viewMode: "day",
  onChange: null,
  activeDate: null,
  events: [],
  dayLabel: null,
  blockLabel: null,
  onClick: null,

  timeDirection: null,
  dayDirection: null,
  yAxisWidth: null,
  timeBlockMinutes: null,
  blockHeight: null,
  blockPixelSize: null
};

export default CalendarView;