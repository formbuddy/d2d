var Voterlist = require('../models/voterlist.js');

module.exports.getCampaignsCSV = function (req, res, acno) {
  function CSVEscape(field) {
    return '"' + String(field || "").replace(/\"/g, '""') + '"';
  }
  var headers = [
  'AC No.',
  'Part No.',
  'Sl No.',
  'E Name',
  'Sex',
  'RName',
  'RType',
  'Age',
  'IDCardNo',
  'STATUSTYPE',
  'Section No.',
  'House No.',
  'Modification',
  'Mobile No.',
  'E-mail',
  'D2D Status',
  'Volunteer',
  'WP',
  'Donor',
  'Amount',
  'Receipt No.'
  ].map(CSVEscape).join(',');

  function docToCSV(doc) {
    return [
    doc.acno,
    doc.partno,
    doc.sno,
    doc.ename,
    doc.sex,
    doc.rname,
    doc.rtype,
    doc.age,
    doc.idno,
    doc.status,
    doc.section,
    doc.houseno,
    doc.mod,
    doc.mobile,
    doc.email,
    doc.d2dstatus,
    doc.volunteer,
    doc.wp,
    doc.donor,
    doc.amount,
    doc.receipt
    ].map(CSVEscape).join(',');
  }

  var started = false;
  function start(response) {
    response.setHeader('Content-disposition', 'attachment; filename=campaigns.csv');
    response.contentType('csv');
    response.write(headers + '\n');
    started = true;
  }

  Voterlist.find({acno: acno})
  .sort('sno')
  .stream()
  .on('data', function (campaign) {
    if (!started) { start(res); }
    res.write(docToCSV(campaign) + '\n');
  })
  .on('close', function () {
    res.end();
  })
  .on('error', function (err) {
    res.send(500, {err: err, msg: "Failed to get campaigns from db"});
  });
};
