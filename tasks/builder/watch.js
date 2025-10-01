import fs from "node:fs";
import {watch} from 'chokidar';

import { bundle } from "./bundle.js";

const entryPath = process.argv[2];
const { output, allDeps} = bundle(process.argv[2]);

fs.mkdirSync("./dist", { recursive: true });
fs.writeFileSync(`./dist/main.js`, output);

console.log(allDeps);
const watcher = watch(allDeps);

watcher.on('change', (path) => {
    console.log(path);
    const {output} = bundle(entryPath);
    fs.writeFileSync(`./dist/main.js`, output);
})