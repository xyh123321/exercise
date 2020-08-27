const test = require('ava');
const {statement} = require('../src/statement');

test('not perfomances and hava palys', t => {
    let invoice = {
        'customer': 'jayden',
        'performances': []
    }
    let plays = {
         'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
          }
    }
    let res = statement(invoice, plays);
    t.is(res,`Statement for jayden
Amount owed is $0.00
You earned 0 credits \n`
)
})

//test('Sample test', t => {
//  //given
//  const invoice = {};
//  const plays = [];
//
//  const result = statement(invoice, plays);
//
//  t.is(result, '');
//});


const invoice = {
  'customer': 'BigCo',
  'performances': [
    {
      'playID': 'hamlet',
      'audience': 55,
    },
    {
      'playID': 'as-like',
      'audience': 35,
    },
    {
      'playID': 'othello',
      'audience': 40,
    },
  ],
};


const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};