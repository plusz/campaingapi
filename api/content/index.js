module.exports = async function (context, req) {
    const fs = require('fs');
    const util = require('util');
    const readFileAsync = util.promisify(fs.readFile);

    var locale = context.bindingData.locale;
    var type = context.bindingData.type;

    const path = __dirname + `/pages/${locale}.${type}.json`; 

    try {
        data = await readFileAsync(path);
    } catch (err) {
        context.log.error('ERROR', err);
        // This rethrown exception will be handled by the Functions Runtime and will only fail the individual invocation
        context.res.json({"error": "no data for parameters"});
    }

    context.res.json(data);
};
