import * as Colors from '../utils/colors';

function indianTime(date) {
  var adjustedDate = new Date(
    new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000,
  );
  return adjustedDate;
}

export const notices = [
  {
    index: 1,
    holiday: true,
    noticeTitle: 'FESTIVAL',
    multipleDate: false,
    date: indianTime(new Date(2021, 10, 1)),
    deadlineOver: false,
    noticeLineColour: Colors.HolidayColor,
  },
  {
    index: 0,
    holiday: false,
    noticeTitle:
      'MIS REGISTRATION, EXAMPLE1, EXAMPLE222, EXAMPLE 3 MIS REGISTRATION, EXAMPLE 1, EXAMPLE 2, EXAMPLE 3,',
    multipleDate: false,
    date: indianTime(new Date(2021, 10, 3)),
    deadlineOver: false,
    noticeLineColour: Colors.notice1Color,
  },

  {
    index: 2,
    holiday: false,
    noticeTitle: 'MIS REGISTRATION, EXAMPLE1, EXAMPLE222, EXAMPLE 3  ',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 5)),
    endDate: indianTime(new Date(2021, 10, 6)),
    deadlineOver: false,
    noticeLineColour: Colors.notice2Color,
  },
  {
    index: 3,
    holiday: false,
    noticeTitle: 'COURSE REGISTRATION',
    multipleDate: false,
    date: indianTime(new Date(2021, 10, 8)),
    deadlineOver: false,
    noticeLineColour: Colors.notice3Color,
  },
  {
    index: 4,
    holiday: false,
    noticeTitle: 'COURSE REGISTRATION 2',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 12)),
    endDate: indianTime(new Date(2021, 10, 13)),
    deadlineOver: false,
    noticeLineColour: Colors.notice1Color,
  },
  {
    index: 5,
    holiday: false,
    noticeTitle: 'COURSE REGISTRATION',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 16)),
    endDate: indianTime(new Date(2021, 10, 18)),
    deadlineOver: false,
    noticeLineColour: Colors.notice2Color,
  },
  {
    index: 6,
    holiday: false,
    noticeTitle: 'COURSE REGISTRATION 3',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 18)),
    endDate: indianTime(new Date(2021, 10, 20)),
    deadlineOver: false,
    noticeLineColour: Colors.notice3Color,
  },
  {
    index: 7,
    holiday: false,
    noticeTitle: 'COURSE REGISTRATION 4',
    multipleDate: false,
    date: indianTime(new Date(2021, 10, 23)),
    deadlineOver: false,
    noticeLineColour: Colors.notice1Color,
  },
  {
    index: 8,
    holiday: false,
    noticeTitle: 'COURSE REGISTRATION 5',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 25)),
    endDate: indianTime(new Date(2021, 10, 26)),
    deadlineOver: false,
    noticeLineColour: Colors.notice2Color,
  },
  {
    index: 9,
    holiday: true,
    noticeTitle: 'FEST',
    multipleDate: false,
    date: indianTime(new Date(2021, 10, 30)),
    deadlineOver: false,
    noticeLineColour: Colors.HolidayColor,
  },
];
