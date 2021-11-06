import * as Colors from '../utils/colors';

export const notices = [
  {
    key: '1',
    noticeTitle: 'MIS REGISTRATION, Example 1, Example 2, Example 3',
    multipleDate: false,
    date: new Date(2021, 10, 11),
    noticeLineColour: Colors.Secondary,
  },
  {
    key: '2',
    noticeTitle: 'COURSE REGISTRATION',
    multipleDate: true,
    startDate: new Date(2021, 10, 11),
    endDate: new Date(2021, 10, 13),
    noticeLineColour: Colors.Accent,
  },
  {
    key: '3',
    noticeTitle: 'COURSE REGISTRATION 2',
    multipleDate: true,
    startDate: new Date(2021, 10, 14),
    endDate: new Date(2021, 10, 15),
    noticeLineColour: Colors.Tertiary,
  },
];
