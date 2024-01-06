const mongoose = require('mongoose');
const diagnosticSchema = new mongoose.Schema({
date:{
    type:String,
    required:true
},
illness:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
}
  });
  const Diagnostic = mongoose.model('Diagnostic', diagnosticSchema);

module.exports = Diagnostic;
