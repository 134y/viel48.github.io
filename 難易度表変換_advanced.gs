function getSheetAsObj(id, sheet_name) {
  var sheet = SpreadsheetApp.openById(id).getSheetByName(sheet_name);
  var rows = sheet.getDataRange().getValues();
  var keys = rows.splice(0, 1)[0];
  return rows.map(function(row) {
    var obj = {}
    row.map(function(item, index) {
      obj[keys[index]] = String(item);
    });
    return obj;
  });
}

function doGet() {
  var obj = getSheetAsObj('1eDyRpMfBOgBa0fdlgH--_bcagRa8j7qoUxqsb8OxTE0', 'table');
  return ContentService.createTextOutput(JSON.stringify(obj, null, 2)).setMimeType(ContentService.MimeType.JSON);
}
