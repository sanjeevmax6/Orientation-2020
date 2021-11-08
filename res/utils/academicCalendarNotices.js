import * as Colors from '../utils/colors';

function indianTime(date) {
  var adjustedDate =
    new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000;
  return adjustedDate;
}

export const notices = [
  {
    index: 0,
    noticeTitle:
      'MIS REGISTRATION, EXAMPLE1, EXAMPLE222, EXAMPLE 3 MIS REGISTRATION, EXAMPLE 1, EXAMPLE 2, EXAMPLE 3,',
    multipleDate: false,
    date: indianTime(new Date(2021, 10, 3)),
    deadlineOver: false,
    noticeLineColour: Colors.notice1Color,
  },
  {
    index: 1,
    noticeTitle:
      'MIS REGISTRATION, EXAMPLE1, EXAMPLE222, EXAMPLE 3 MIS REGISTRATION, EXAMPLE 1, EXAMPLE 2, EXAMPLE 3',
    multipleDate: false,
    date: indianTime(new Date(2021, 10, 6)),
    deadlineOver: false,
    noticeLineColour: Colors.notice2Color,
  },
  {
    index: 2,
    noticeTitle: 'MIS REGISTRATION, EXAMPLE1, EXAMPLE222, EXAMPLE 3  ',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 6)),
    endDate: indianTime(new Date(2021, 10, 8)),
    deadlineOver: false,
    noticeLineColour: Colors.notice3Color,
  },
  {
    index: 3,
    noticeTitle: 'COURSE REGISTRATION',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 12)),
    endDate: indianTime(new Date(2021, 10, 13)),
    deadlineOver: false,
    noticeLineColour: Colors.notice1Color,
  },
  {
    index: 4,
    noticeTitle: 'COURSE REGISTRATION',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 13)),
    endDate: indianTime(new Date(2021, 10, 14)),
    deadlineOver: false,
    noticeLineColour: Colors.notice2Color,
  },
  {
    index: 5,
    noticeTitle: 'COURSE REGISTRATION 2',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 14)),
    endDate: indianTime(new Date(2021, 10, 15)),
    deadlineOver: false,
    noticeLineColour: Colors.notice3Color,
  },
  {
    index: 6,
    noticeTitle: 'COURSE REGISTRATION 3',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 16)),
    endDate: indianTime(new Date(2021, 10, 17)),
    deadlineOver: false,
    noticeLineColour: Colors.notice1Color,
  },
  {
    index: 7,
    noticeTitle: 'COURSE REGISTRATION 4',
    multipleDate: false,
    date: indianTime(new Date(2021, 10, 18)),
    deadlineOver: false,
    noticeLineColour: Colors.notice2Color,
  },
  {
    index: 8,
    noticeTitle: 'COURSE REGISTRATION 5',
    multipleDate: true,
    startDate: indianTime(new Date(2021, 10, 18)),
    endDate: indianTime(new Date(2021, 11, 1)),
    deadlineOver: false,
    noticeLineColour: Colors.notice3Color,
  },
];
