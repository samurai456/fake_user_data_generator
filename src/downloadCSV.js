function downloadCSV(data){
    const keys = Object.keys(data[0]);
    const header = keys
    .map(i=>`<${i}>`)
    .join(',');
    const body = data
    .map(i=>`"${i[keys[0]]}","${i[keys[1]]}","${i[keys[2]]}","${i[keys[3]]}","${i[keys[4]]}"`)
    .join('\n');
    const fullCSV = 'data:text/csv;charset=utf-8,' + header + '\n' + body;
    const csvObj = encodeURI(fullCSV);
    window.open(csvObj, 'some');
}
export {downloadCSV}