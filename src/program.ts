#!/usr/bin/env node

import * as fs from "fs";

main();

async function main() {
    setup();

    {
        let state = true;

        for (let count = 0; count < 4; count++) {
            await wait(500);

            loveyou(state);
            rmoney(state);

            state = !state;
        }
    }

    while (true) {
        // love your money 30sec
        loveyou(true);
        rmoney(true);
        await wait(1000 * 30);

        {
            let state = false;
            let interval = 1000 * 2;

            while (interval > 100) {
                const random = Math.random();
                interval = Math.floor(interval * (1 - random / 4));
                await wait(interval);

                state = !state;

                rmoney(state);
            }
            rmoney(false);
        }

        // love you 30sec
        // loveyou(true);
        // rmoney(false);
        await wait(1000 * 30);

        loveyou(true);
        rmoney(true);
        await wait(200);

        // off 5 sec
        loveyou(false);
        rmoney(false);
        await wait(1000 * 5);
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

async function wait(interval: number) {
    await new Promise(resolve => setTimeout(resolve, interval));
}
