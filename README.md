# CourseLink (D2L Brightspace) Assignment Name Fixer
## What is this?

CourseLink Fixer is a tool which extracts certain assignments from a CourseLink (D2L Brightspace) Dropbox submission folder. 
The assignments are extracted by name, which is contained within a CSV file (`names.csv`), and then placed ke a folder called `current`,
with all remaining assignments being moved to a folder called `non_current`.

This was developed has a script for CIS*2170 (User Interface Design) at the University of Guelph, which has weekly randomized presentations on UI examples. This script helped save time by just dumping the entire folder into the script and letting it work it's magic.

## How to Run

This program is fairly simple, however, (currently) makes some assumptions as to what things should be named before it runs.

1. Place the `ExampleCounterexample XX Download XXX X, 2023 XXX XX.zip` file into the folder where the script will run.
2. Extract it, and rename the extracted folder `current`.
3. Paste this weeks names into the `names.csv` file.
4. Run the script by typing in `npm start` or `./clfixer` (if using the complied version).
5. Watch it's magic! The script should just leave the current weeks assignments in the `current` folder.

## Compiling / Contributing

This project is built on Node.js, and requires Node.js and npm be installed on the computer. Contributions are welcome via pull request.

## Releases / Source
Source & Download Located here: [https://github.com/surajgoraya/CourseLink-Assignment-Name-Fixer](https://github.com/surajgoraya/CourseLink-Assignment-Name-Fixer)