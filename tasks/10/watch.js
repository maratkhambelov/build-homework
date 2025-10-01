import {watch} from 'chokidar';
import fg from "fast-glob";

const changedFilesLog = [];

export function getLog() {
  return changedFilesLog;
}

let watcher
export async function subscribe() {

    const entries = await fg(["./src/*.js"], {
        onlyFiles: true,
    });

    watcher = watch(entries).on('change', (path) => {
        changedFilesLog.push(path);
    });

    return watcher;

}

export function unsubscribe() {
    return watcher.close();
}
