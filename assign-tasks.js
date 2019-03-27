var template = require('./template')
var opts = require('minimist')(process.argv.slice(2))
var cont = require('cont')
var Mentions = require('ssb-mentions')

if(!Number.isInteger(opts.week)) throw new Error('--week should be a number')
var MT = new (require('rng').MT)(opts.week)
var random = MT.random.bind(MT)

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

function shuffel (ary) {
  if(!ary) return ary
  return ary.sort(function () {
    return random() - 0.5
  })
}

function fromList (s) {
  if(!s) return undefined
  return s.split(/\s+/)
}

var names_ordered = fromCSV(opts.names)
var names = {}
shuffel(Object.keys(names_ordered)).forEach(function (name) {
  names[name] = names_ordered[name]
})


var num = Object.keys(names).length

var issues = shuffel(fromList(opts.issues))
var modules = shuffel(fromList(opts.modules))

function getPer (list, num) {
  return Math.floor((list && list.length || 0) / num) || 1
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
console.log('issues per:', issuesPer, 'modules pes:', modulesPer)
var VillageTrackerBot = '@KYq92uiEKPcKZIBJ/ZCGYErdcy8n0RYD/nDUtKmuyZU=.ed25519'

require('ssb-client')(function (err, sbot) {

  var msgs = []

  for(var name in names) {
    var id = names[name]
    var _issues
    var _issues = getNext(issues, issuesPer)
    var _modules = getNext(modules, modulesPer)


    var data = {
      name, id, issues: _issues, modules: _modules, week: opts.week, checklist: opts.checklist
    }

    var text = template(data)
    var content = {
      type: 'post',
      text: text,
      mentions: Mentions(text),
      channel: 'village-tracker'
    }

    msgs.push(content)
  }

  if(opts.dry) return console.log(JSON.stringify(msgs, null, 2))
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









