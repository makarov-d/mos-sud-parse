import { writeFile } from "fs/promises";
import { JSDOM } from "jsdom";

export class Schedule {
	constructor(id) {
		this.id = id;
		this.buffer = [];
	}
	
	getCount() {
		return this.dom.window.document
            .querySelectorAll("#content > div > div.wrapper-search-tables > table > tbody > tr").length;
	}
	
	getPage() {
		return this.dom.window.document
			.querySelector("#paginationFormInput")?.value ?? "0";
	}
	
	getDate(n) {
        const node = this.dom.window.document
            .querySelector(`#content > div > div.wrapper-search-tables > table > tbody > tr:nth-child(${n}) > td:nth-child(3) > div > div`);
        return node.textContent.trim();
    }
	
	getType(n) {
        const node = this.dom.window.document
            .querySelector(`#content > div > div.wrapper-search-tables > table > tbody > tr:nth-child(${n}) > td:nth-child(7) > div > div > a`);
        return node.textContent.trim().split(",")[0];
    }
	
	async fetch(from, to, page) {
		const params = new URLSearchParams();
		
		params.append("courtAlias", this.id);
		params.append("hearingRangeDateFrom", from);
		params.append("hearingRangeDateTo", to);
		params.append("page", page);
		params.append("sessionType", "0");
		
		const response = await fetch(`https://mos-sud.ru/hearing?${params}`, {
            method: "GET"
        });
		
		this.dom = new JSDOM(await response.text());
	}
	
	async save() {
        await writeFile(`buffer-${this.id}.json`, JSON.stringify(this.buffer), "utf8");
    }
}