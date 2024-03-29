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
4. Run the script by typing in `npm start` or `./cl_fixer` (if using the complied version).
5. Watch it's magic! The script should just leave the current weeks assignments in the `current` folder.

### Expected Output

The output for the script should yield something like this if successfully run:
```
- CourseLink Fixer x V 0.0.1 - 
[CourseLink Fixer]: Starting...
[CourseLink Fixer]: Importing sanitized names file...
[CourseLink Fixer]: Read names, keeping only needed files...
[CourseLink Fixer]: Skipping Ignored File - index.html
[CourseLink Fixer]: Files not needed for this week moved, renaming...
[CourseLink Fixer]: WARN - Looks like a file already exists in the directory with the name ./current/23 - LASTNAME_FIRSTNAME_Ex11.pdf
[CourseLink Fixer]: WARN - Going to compare the dates and save the newest one...
[CourseLink Fixer]: Skipping Ignored File - excluded_export.json
[CourseLink Fixer]: Skipping Ignored File - included_export.json
[CourseLink Fixer]: Skipping Ignored File - index.html
[CourseLink Fixer]: Done!

```

## Compiling / Contributing

This project is built on Node.js, and requires Node.js and npm be installed on the computer. Contributions are welcome via pull request.

Compiling the project isn't required (you can run it like any other node project `npm run start`), but it can make it easier to run the script. This project uses pkg and ncc to achieve a single exec being created.
The command to build is `npm run build`, by default this only builds for macOS, however, the command can be modified to update the targets.

## Releases / Source
Source & Download Located here: [https://github.com/surajgoraya/CourseLink-Assignment-Name-Fixer](https://github.com/surajgoraya/CourseLink-Assignment-Name-Fixer)