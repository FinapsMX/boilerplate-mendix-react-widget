var fs = require('fs');

var name = require('./package.json').name;

fs.writeFile('build/package.xml','\
<?xml version="1.0" encoding="utf-8" ?>\n\
<package xmlns="http://www.mendix.com/package/1.0/">\n\
    <clientModule name="'+name+'" version="1.0.0" xmlns="http://www.mendix.com/clientModule/1.0/">\n\
        <widgetFiles>\n\
            <widgetFile path="'+name+'/'+name+'.xml" />\n\
        </widgetFiles>\n\
        <files>\n\
            <file path="'+name+'/widget/" />\n\
        </files>\n\
    </clientModule>\n\
</package>\n\
', () =>  {});

fs.createReadStream('src/'+name+'.xml')
  .pipe(fs.createWriteStream('build/'+name+'/'+name+'.xml'));
