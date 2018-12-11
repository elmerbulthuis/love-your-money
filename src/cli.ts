#!/usr/bin/env node

import * as fs from "fs";

main();

async function main() {
    setup();

    // Stekker 1 (Love You) blijft altijd aan
    loveyou(true);

    while (true) {
        // Stekker 2 (R money)  staat halve minuut AAN dan:
        rmoney(true);
        await waitLong();

        // UIT (halve sec)
        rmoney(false);
        await waitShort();

        // AAN (halve sec)
        rmoney(true);
        await waitShort();

        // UIT (halve sec)
        rmoney(false);
        await waitShort();

        // AAN (halve sec)
        rmoney(true);
        await waitShort();

        // dan halve minuut UIT
        rmoney(false);
        await waitLong();

        // En dan weer vice versa.
        rmoney(true);
        await waitShort();

        rmoney(false);
        await waitShort();

        rmoney(true);
        await waitShort();

        rmoney(false);
        await waitShort();
    }
}

function write(path: string, value: string) {
    // tslint:disable no-console

    try {
        console.log(`${value} -> ${path}`);
        fs.writeFileSync(path, value);
    }
    catch (error) {
        console.error(error);
    }
}

function setup() {
    write("/sys/class/gpio/export", "20");
    write("/sys/class/gpio/export", "21");

    write("/sys/class/gpio/gpio20/direction", "out");
    write("/sys/class/gpio/gpio21/direction", "out");
}

function loveyou(value: boolean) {
    write("/sys/class/gpio/gpio20/value", value ? "1" : "0");
}

function rmoney(value: boolean) {
    write("/sys/class/gpio/gpio21/value", value ? "1" : "0");
}

async function waitShort() {
    await new Promise(resolve => setTimeout(resolve, 500));
}

async function waitLong() {
    await new Promise(resolve => setTimeout(resolve, 1000 * 30));
}
