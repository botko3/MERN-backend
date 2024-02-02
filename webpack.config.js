import path from 'path';
import { fileURLToPath } from 'url';
const _filenameNew = fileURLToPath(import.meta.url);
const _dirnameNew=path.dirname(_filenameNew);

export default{
    entry:'./index.js',
    target:"node",
    output:{
        path:path.resolve(_dirnameNew,'dist'),
        filename:'bundle.js'
    }
}