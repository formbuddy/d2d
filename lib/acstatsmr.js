var o = {};

o.map = function(){
  var key = this.acno;
  var verified = 0;
  var deletion = 0;
  var correction = 0;
  var supporter = 0;
  var antagonist = 0;
  var neutral = 0;
  var processed = 0;
  var total = 1;

  if(this.mod == 'V'){
    verified = 1;
  }
  else if(this.mod == 'C'){
    deletion = 1;
  }
  else if(this.mod == 'E'){
    correction = 1;
  }

  if(this.d2dstatus == 'S'){
    supporter = 1;
  }
  else if(this.d2dstatus == 'A'){
    antagonist = 1;
  }
  else if(this.d2dstatus == 'N'){
    neutral = 1;
  }

  if(verified || correction || deletion){
    processed = 1;
  }

  var stats = {
    verified: verified,
    deletion: deletion,
    supporter: supporter,
    antagonist: antagonist,
    neutral: neutral,
    correction: correction,
    processed: processed,
    total: total
  };

  emit(key, stats);
};

o.reduce = function(acno, value){
  reducedVal = {
    verified: 0,
    deletion: 0,
    correction: 0,
    supporter: 0,
    antagonist: 0,
    neutral: 0,
    processed: 0,
    total: 0
  };
  for (var idx = 0; idx < value.length; idx++) {
    reducedVal.verified += value[idx].verified;
    reducedVal.deletion += value[idx].deletion;
    reducedVal.correction += value[idx].correction;
    reducedVal.supporter += value[idx].supporter;
    reducedVal.antagonist += value[idx].antagonist;
    reducedVal.neutral += value[idx].neutral;
    reducedVal.processed += value[idx].processed;
    reducedVal.total += value[idx].total;
  }
  return reducedVal;
};

o.out = { replace: 'acStats' };

module.exports = o;
