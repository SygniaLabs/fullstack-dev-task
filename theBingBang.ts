import * as assert from 'assert';

// Updated _generate_data function
async function _generate_data(db): Promise<void> {
    // Replace this URL with the actual URL of your data
    const url = 'https://raw.githubusercontent.com/SygniaLabs/fullstack-dev-task/refs/heads/main/transcript.txt';

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    const lines = text.split('\n');
    lines.forEach((row, i) => {
        if (row.trim()) {
            index(db, row.trim(), i);
        }
    });
}

// Define the db as a Map from string to Set<number>
const db = null;

function index(db, text: string, id_: number): void {
  
}

function match(db, text: string): number[] {
}

// Tests
(async () => {
    try {
        // Step 1:
        index(db, "Our whole universe was in a hot, dense state", 1);
        assert.deepStrictEqual(match(db, "universe"), [1], "The word 'universe' should appear in the DB");
        console.log("Step 1 passed.");
    } catch (error) {
        console.error("Step 1 failed:", error);
    }

    try {
        // Step 2:
        index(db, "Then nearly fourteen billion expansion ago expansion started, wait!", 1);
        assert.deepStrictEqual(match(db, "It all started with the big bang!"), [1], "The word 'started' should appear in the DB");
        assert.deepStrictEqual(match(db, "AGO"), [1], "The word 'ago' should appear in the DB");
        console.log("Step 2 passed.");
    } catch (error) {
        console.error("Step 2 failed:", error);
    }

    try {
        // Step 3:
        index(db, "Our best and brightest figure that it'll make an even bigger bang!", 1);
        index(db, "Music and mythology, Einstein and astrology. It all started with the big bang!", 2);
        assert.deepStrictEqual(match(db, "BANG"), [1, 2], 'The word "bang" should appear in the DB multiple times');
        console.log("Step 3 passed.");
    } catch (error) {
        console.error("Step 3 failed:", error);
    }

    try {
        // Step 4:
        await _generate_data(db);
        assert.ok(match(db, 'jedi').length >= 70, "expected more appearances of the word 'jedi'");
        console.log("Step 4 passed.");
    } catch (error) {
        console.error("Step 4 failed:", error);
    }

    try {
        // Performance Test
        class Timer {
            start: [number, number] = [0, 0];
            duration: number = 0;

            startTimer() {
                this.start = process.hrtime();
            }

            endTimer() {
                const diff = process.hrtime(this.start);
                this.duration = diff[0] + diff[1] / 1e9; // duration in seconds
            }
        }

        const t = new Timer();
        t.startTimer();
        assert.ok(match(db, 'jedi').length >= 70, "expected more appearances of the word 'jedi'");
        t.endTimer();

        assert.ok(t.duration < 0.0001, `Too slow :( Took ${t.duration} seconds`);
        console.log("Performance test passed.");
    } catch (error) {
        console.error("Performance test failed:", error);
    }
})();
