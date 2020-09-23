import { configure, getLogger } from "log4js";

configure({
    appenders: {
        app: {
            type: "multiFile",
            base: "/Volumes/work/logs/api/",
            property: "type",
            extension: ".log",
            maxLogSize: 10485760,
            backups: 100,
            keepFileExt: true
        },

        out: { type: "stdout", layout: { type: "dummy" } },
        emergencies: {
            type: "file",
            filename: "/Volumes/work/logs/api/error.log",
            maxLogSize: 10485760,
            backups: 100,
            keepFileExt: true
        },
        error: {
            type: "logLevelFilter",
            appender: "emergencies",
            level: "error"
        }
    },
    categories: {
        default: { appenders: ["app", "out", "error"], level: "debug" }
    }
});

export const Log = getLogger("app");
Log.addContext("type", "app");
