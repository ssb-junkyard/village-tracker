# village-tracker

## what it is

`village-tracker` is part of a big vision to build community software _as a community_.
The idea is that we collectively want things to exist, but this takes collective effort.
too many community projects are driven by a lot of effort from one or two people, who
then burn out, we don't want that to happen!

The current village-tracker you are looking at is a prototype of that idea,
focusing on documentation.

## how to get involved

Post a message in the #village-tracker channel on scuttlebutt,
saying that you want to help out, and the village tracker admin will add you.

For extra points, make a PR to add your name and ssb id to the `names.csv`

## template checklist

you will get assigned one or more issues and modules.

An _issue_ describes what needs to be done.
If you get a _module_ take a look at it and think about how it might
be improved:

the rough checklist for triaging a module:

  * rate the current state of the documentation out of 10.
    ratings will be used to prioritize furthur improvements, so err on the low side if unsure.
  * is it clear what this is used for? is anything confusing or weird?
  * is there api documentation?
  * are there concepts that arn't explained in the docs that could be linked.
  * read code, do you see any undocumented methods?
  * for a method is there any undocumented options?
  * If you make changes, give a new rating.

If you see room for improvement, either make a PR for that improvement, or post an issue describing the improvement.

Remember to put your results into the village tracker form and post a reply about how it went!

To learn more about the documentation drive,
see documentation at [village-tracker repo](https://github.com/ssbc/village-tracker)

## spreadsheets

* [village tracker spreadsheet](https://docs.google.com/spreadsheets/d/1OCn7FhtiQMUn_MZpF1G_Al7jpueudBBTbA5biMxRos0/edit#gid=0)
* [village tracker google form](https://docs.google.com/forms/d/e/1FAIpQLSdmuyq96_oxy9GOGTgpizxEU5rMCs4RjEJDr0oOLOk-0LxDvw/viewform)

## how to admin `village-tracker`

### starting the week

to start a new week, post a checklist message in the `#village-tracker` channel.
(copy from the above template). clone this repo so you can run the scripts.
ensure that the modules.csv and issues.csv and names.csv are up to date.

run the `assign-tasks.js` script to randomly give volunteers tasks.
provide the `--dry` option to run without actually posting messages.

```
node assign-tasks.js --week N --checklist <msg_id>
```

### ending the week

update [the spreadsheet](https://docs.google.com/spreadsheets/d/1OCn7FhtiQMUn_MZpF1G_Al7jpueudBBTbA5biMxRos0/edit#gid=0)

- in the first tab is the "form responses" copy this over to the "commitments" tab.
Move triaged modules out of the untriaged section, and update modules.csv (in this repo)
make sure `names.csv` is up to date if people have joined or left, and `issues.csv` is
up to date if issues have been opened or closed.

Write a reply to the post describing what happened this week.
Remember to welcome/celebrate new people, and anything interesting that happened!
Sometimes new people are unsure of things, such as how to rate.
Encourage people to contribute any sort of feed back
(for example, just reporting that they felt unsure is useful)

## TODO

publish messages idempotently (incase of bugs) and shuffel modules each week.

## License

MIT


