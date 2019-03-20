var template = require('./template')
var opts = require('minimist')(process.argv.slice(2))
var cont = require('cont')

function fromCSV (data) {
  if(!data) return undefined
  var obj = {}
  data.split('\n').filter(Boolean).forEach(function (line) {
    var parts = line.split(/(?:,|\s)+/)
    console.error(parts)
    obj[parts[0]] = parts[1]
  })
  return obj
}

function fromList (s) {
  if(!s) return undefined
  return s.split(/\s+/)
}

var names = fromCSV(opts.names)

var num = Object.keys(names).length

var issues = fromList(opts.issues)
var modules = fromList(opts.modules)

function getPer (list, num) {
  return Math.floor((list && list.length || 0) / num)
}

function getNext(list, per) {
  if(!list) return []
  return list.splice(0, per)
}
function getRest (list, per) {
  if(!list) return []
  return list.splice(per)
}

var issuesPer = getPer(issues, num)
var modulesPer = getPer(modules, num)
console.error(issuesPer, modulesPer)

var VillageTrackerBot = '@KYq92uiEKPcKZIBJ/ZCGYErdcy8n0RYD/nDUtKmuyZU=.ed25519'

require('ssb-client')(function (err, sbot) {

  var msgs = []

  for(var name in names) {
    var id = names[name]
    var _issues
    var _issues = getNext(issues, issuesPer)
  //  issues = getRest(issues, issuesPer)
    var _modules = getNext(modules, modulesPer)
  //  modules = getRest(modules, modulesPer)

    var data = {
      name, id, issues: _issues, modules: _modules, week: opts.week, checklist: opts.checklist
    }
    var content = {
      type: 'post',
      text: template(data),
      mentions: [{link: id, name}],
      channel: 'village-tracker'
    }

    msgs.push(content)
  }

  cont.series(msgs.map(function (content) {
    return function (cb) {
      sbot.identities.publishAs({
        id: VillageTrackerBot,
        content: content
      }, cb)
    }
  }))(function (err) {
    if(err) throw err
  })

})


