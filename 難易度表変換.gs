function doGet(e) {
  var ssId = "1eDyRpMfBOgBa0fdlgH--_bcagRa8j7qoUxqsb8OxTE0"; // スプレッドシートのID
  var sheetName = "table"; // シート名
  var data = _getData(ssId, sheetName);
  if (e.parameters.hasOwnProperty("callback") == false) {
    return _createContent(null, data);
  }
  return _createContent(e.parameter.callback, data);
}

function _getData(id, sheetName) {
  const sheet = SpreadsheetApp.openById(id).getSheetByName(sheetName);
  var rows = sheet.getDataRange().getValues();
  const keys = rows.splice(0, 1)[0];
  return rows.map(function(row) {
    var obj = {};
    row.map(function(item, index) {
      obj[keys[index]] =  item.toString();
    });
    return obj;
  });
}

function _createContent(callback, returnObject) {
  if(callback != null) {
    return ContentService.createTextOutput(callback + '(' + JSON.stringify(returnObject) + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    return ContentService.createTextOutput(JSON.stringify(returnObject)).setMimeType(ContentService.MimeType.JSON);
  }  
}
