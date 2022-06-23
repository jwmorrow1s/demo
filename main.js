const creditCardType = require("credit-card-type");

const testCards = [
{ card_number: '4011361100000012', card_brand: 'Visa© - ChaseNet', },
{ card_number: '4788250000028291', card_brand: 'Visa - Consumer', },
{ card_number: '4011361100000012', card_brand: 'Visa - Consumer', },
{ card_number: '4025240000000088', card_brand: 'Visa - Consumer', },
{ card_number: '4055011111111111', card_brand: 'Visa - Purchasing', },
{ card_number: '4159280000000009', card_brand: 'Visa - Corporate Business', },
{ card_number: '4485536666666663', card_brand: 'Visa Fleet', },
{ card_number: '5454545454545454', card_brand: 'MasterCard© - Consumer', },
{ card_number: '5405222222222226', card_brand: 'MasterCard - Purchasing', },
{ card_number: '5132850000000008', card_brand: 'MasterCard - Corp Business', },
{ card_number: '5567356006664734', card_brand: 'MasterCard - Fleet', },
{ card_number: '2221000000000009', card_brand: 'MasterCard - 2 Bin (Manual and Card Not Present Only)', },
{ card_number: '2321000000000008', card_brand: 'MasterCard - 2 Bin (Manual and Card Not Present Only)', },
{ card_number: '2421000000000007', card_brand: 'MasterCard - 2 Bin (Manual and Card Not Present Only)', },
{ card_number: '2521000000000006', card_brand: 'MasterCard - 2 Bin (Manual and Card Not Present Only)', },
{ card_number: '2621000000000005', card_brand: 'MasterCard - 2 Bin (Manual and Card Not Present Only)', },
{ card_number: '2720990000000007', card_brand: 'MasterCard - 2 Bin (Manual and Card Not Present Only)', },
{ card_number: '371449635398431', card_brand: 'American Express® - Consumer', },
{ card_number: '373953192351004', card_brand: 'American Express - ANSI', },
{ card_number: '6011000995500000', card_brand: 'Discover®', },
{ card_number: '6011025500395802', card_brand: 'Discover', },
{ card_number: '6011020000045098', card_brand: 'Discover', },
{ card_number: '6011260000004923', card_brand: 'Discover', },
{ card_number: '6011740000227905', card_brand: 'Discover', },
{ card_number: '6011780000241118', card_brand: 'Discover', },
{ card_number: '6011869900245897', card_brand: 'Discover', },
{ card_number: '6499999900149475', card_brand: 'Discover', },
{ card_number: '8171999900000018', card_brand: 'Discover', },
{ card_number: '8171999900000000021', card_brand: 'Discover', },
{ card_number: '8163999900010', card_brand: 'Discover', },
];

for(const testCard of testCards) {
  const { card_brand, card_number } = testCard;
  const last_four = testCard.card_number.slice(card_number.length - 4);
  const card_types = creditCardType(last_four);
  const derived_brand = card_types?.[0]?.type;
  console.log({ card_brand, derived_brand, last_four });
}
