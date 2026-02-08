# `mos-sud-parse`
This repository contains the source code of the script used to collect empirical data on the activities of Moscow Justices of the Peace in the research paper *[«Theoretical Analysis of the Subject Matter and Role of Rhetoric in the Paradigm of Modern Legal Education»](https://makarov.ink/read/?id=2)*.

## Problem
Collecting empirical data from the official portal of Moscow Justices of the Peace (https://mos-sud.ru) is complicated by the lack of functionality for quick export.

## Solution
I wrote a tool for quickly and efficiently parsing the content of the aforementioned web portal and saving relevant data in a convenient JSON format, which was later manually converted to CSV and imported into Google Sheets.

## Usage
The tool can be used as is out of the box using the executable file `src/index.js`. The script accepts three parameters: *court ID*, *start date*, and *end date*. Example of valid usage: `node src/index.js 79 01.01.2025 15.02.2025`. 

If parameters are missing, the standard behavior of the web resource will be performed. If no court is specified, records for all courts will be parsed. If no date limits are specified, all court records will be parsed.

The collected data is saved in the folder with the executable script in a JSON file named `buffer-{courtID}.json`.

## Limitations
For large searches, the web resource only displays the first 1500 entries. When attempting to go beyond the limits, the web resource displays the last accessible page. This behavior is recognized by the script, resulting in the parsing being finished with the data being saved. In theory, this can be circumvented by specifying more specific selection settings, but this was not necessary for the purposes of the research.
