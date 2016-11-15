declare const ENV: string;
let LOGGING_ENABLED: boolean = false;

export class LoggingService {

    static enable() {
        LOGGING_ENABLED = true;
    }

    static debug(sender: any, msg: string, ...data: any[]): void {
        if (!LOGGING_ENABLED)
            return;
        console.debug.apply(console, this.getConsoleMethodParameters(sender, msg, data));
    }

    static info(sender: any, msg: string, ...data: any[]): void {
        if (!LOGGING_ENABLED)
            return;
        console.info.apply(console, this.getConsoleMethodParameters(sender, msg, data));
    }

    static trace(sender: any, msg: string, ...data: any[]): void {
        if (!LOGGING_ENABLED)
            return;
        console.trace.apply(console, this.getConsoleMethodParameters(sender, msg, data));
    }

    static warn(sender: any, msg: string, ...data: any[]): void {
        if (!LOGGING_ENABLED)
            return;
        console.warn.apply(console, this.getConsoleMethodParameters(sender, msg, data));
    }

    static error(sender: any, msg: string, ...data: any[]): void {
        if (!LOGGING_ENABLED)
            return;
        console.error.apply(console, this.getConsoleMethodParameters(sender, msg, data));
    }

    static group(sender: any, msg: string) {
        if (!LOGGING_ENABLED)
            return;
        console.group(this.getMessage(sender, msg));
    }

    static groupCollapsed(sender: any, msg: string) {
        if (!LOGGING_ENABLED)
            return;
        console.groupCollapsed(this.getMessage(sender, msg));
    }

    static groupEnd() {
        if (!LOGGING_ENABLED)
            return;
        console.groupEnd();
    }

    static getMessage(sender: any, msg: string): string {
        return `${new Date().toLocaleTimeString()} <${this.getTypeName(sender)}> ${msg}`;
    }

    static getTypeName(sender: any) {
        return sender.constructor['name'] || sender;
    }

    private static getConsoleMethodParameters(sender: any, msg: any, data: any[]) {
        let parameters = [this.getMessage(sender, msg)];
        return parameters.concat(data);
    }
}
