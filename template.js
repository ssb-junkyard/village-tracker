function toArray(s) {
  return (Array.isArray(s) ? s : s.split(/(?:,|\s)+/)).filter(Boolean)
}

module.exports = function (opts) {
  var name = opts.name
  var {
    week, name, id, issues, modules, checklist
  } = opts

  if(!week) throw new Error('week must be provided')
  if(!checklist) throw new Error('checklist must be provided')

  var issue_text = '', module_text = ''
  if(issues && issues.length)
    issue_text = 'you are assigned these issues:\n' +
      toArray(issues).map(function (e) { return '  * ' + e + '\n' }).join('') + '\n\n'
  if(modules && modules.length)
    module_text = `please triage these modules, following [documentation drive checklist](${checklist}):\n` +
      toArray(modules).map(function (e) { return '  * ' + e + '\n' }).join('') + '\n'
  
  return `
# Documentation Drive (week ${week}) [@${name}](${id})

${issue_text} ${module_text}
this is only your assignment for this week, if you do not get to something,
that's okay, it will be reassigned to someone else next week.

Please reply to this message with how much time you take, what you learn or observe,
if you fix something, make a PR, but if you find a problem you cannot fix
(or are unclear by current documentation) please post an issue.
  `.trim()
}

if(!module.parent) {
  console.log(
    module.exports (require('minimist')(process.argv.slice(2)))
  )
}












