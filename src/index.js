import { Schedule } from "./Schedule/Schedule.js";

const courtID = process.argv[2];
const from = process.argv[3];
const to = process.argv[4];

const parse = async (schedule, from, to, page) => {
    await schedule.fetch(from, to, page);
    
	const count = schedule.getCount();
	const step = schedule.getPage();	
	
    if (step == page && count > 0) {
		console.log(`-> ${step}`);
		
        for (let i = 0; i < count; i++) {
            const entry = schedule.getDate(i + 1).split(" ");
            entry[2] = schedule.getType(i + 1);
            schedule.buffer.push(entry);
        }
		
        return setTimeout(() => {
			console.log(`${page} -> ${page + 1} (${step})`);
			return parse(schedule, from, to, page + 1)
		}, 2000);
    } else {
		console.log(count);
		console.log(`Saving at ${step}`);
        await schedule.save();
    }
};

await parse(new Schedule(courtID), from, to, 0);