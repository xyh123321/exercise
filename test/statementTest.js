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

test('has perfomances and palys', t => {
    let invoice = {
        'customer': 'jayden',
        'performances': [
             {
                  'playID': 'hamlet',
                  'audience': 55,
                }
        ]
    }
    let plays = {
         'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
          }
    }
    let res = statement(invoice, plays);
    t.is(res,`Statement for jayden
 Hamlet: $650.00 (55 seats)
Amount owed is $650.00
You earned 25 credits \n`
)
})

test('hava perfomances and muti palys', t => {
    let invoice = {
        'customer': 'jayden',
        'performances': [
             {
                  'playID': 'hamlet',
                  'audience': 55,
                }
        ]
    }
    let plays = {
         'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
          },
          'as-like': {
             'name': 'As You Like It',
             'type': 'comedy',
          }
    }
    let res = statement(invoice, plays);
    t.is(res,`Statement for jayden
 Hamlet: $650.00 (55 seats)
Amount owed is $650.00
You earned 25 credits \n`
)
})

test('hava muti perfomances and single palys', t => {
    let invoice = {
        'customer': 'jayden',
        'performances': [
             {
                   'playID': 'hamlet',
                   'audience': 30,
             },
             {
                   'playID': 'as-like',
                   'audience': 35,
             },
        ]
    }
    let plays = {
         'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
          },
          'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
          },
    }
    let res = statement(invoice, plays);
    t.is(res,`Statement for jayden
 Hamlet: $400.00 (30 seats)
 As You Like It: $580.00 (35 seats)
Amount owed is $980.00
You earned 12 credits \n`
)
})

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