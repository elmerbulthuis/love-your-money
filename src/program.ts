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

        await Promise.all([
            (async () => {
                let state = true;
                let interval = 1000 * 1 / 2;

                while (interval < 1000 * 5) {
                    const random = Math.random();
                    interval = Math.floor(interval / (1 - random / 2));
                    await wait(interval);

                    state = !state;

                    loveyou(state);
                }
                loveyou(true);
            })(),

            (async () => {
                let state = false;
                let interval = 1000 * 5;

                while (interval > 100) {
                    const random = Math.random();
                    interval = Math.floor(interval * (1 - random / 2));
                    await wait(interval);

                    state = !state;

                    rmoney(state);
                }
                rmoney(false);
            })(),

        ]);
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

function setup() {
    fs.writeFileSync("/sys/class/gpio/export", "20");
    fs.writeFileSync("/sys/class/gpio/export", "21");

    fs.writeFileSync("/sys/class/gpio/gpio20/direction", "out");
    fs.writeFileSync("/sys/class/gpio/gpio21/direction", "out");
}

function loveyou(value: boolean) {
    fs.writeFileSync("/sys/class/gpio/gpio20/value", value ? "1" : "0");
}

function rmoney(value: boolean) {
    fs.writeFileSync("/sys/class/gpio/gpio21/value", value ? "1" : "0");
}

async function wait(interval: number) {
    await new Promise(resolve => setTimeout(resolve, interval));
}
