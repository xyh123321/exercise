function statement(invoice, plays) {
  return generateStatemenData(invoice, plays);
}

function generateStatemenData(invoice, plays) {
  let totalAmount = 0;
  let data = {};
  data.customer = invoice.customer;
  data.performances = invoice.performances;
  data.totalVolumeCredits = calcVolumeCredits(invoice,plays);
  for (let perf of data.performances) {
    const play = plays[perf.playID];
    let thisAmount = calcAmountOfType(play, perf);
    perf.name = play.name;
    perf.thisAmount = formatUSD(thisAmount);
    totalAmount += thisAmount;
  }
  data.totalAmount = formatUSD(totalAmount);
  return createStatementText(data);
}

function createStatementText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    result += ` ${perf.name}: ${perf.thisAmount} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${data.totalAmount}\n`;
  result += `You earned ${data.totalVolumeCredits} credits \n`;
  return result;
}

function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

function calcVolumeCredits(invoice, plays) {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ('comedy' === play.type){
      volumeCredits += Math.floor(perf.audience / 5);
    }
  }
  
  return volumeCredits;
}

function calcAmountOfType(play,perf) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount/100;
}

module.exports = {
  statement,
};
