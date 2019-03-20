var cont = require('cont')

module.exports = function getNames (sbot, names, cb) {
  console.error(names)
  cont.para(names.map(function (name) {
    return function (cb) {
      sbot.names.getSignifies(name, function (err, feeds) {
        cb(null, [name, feeds.length && feeds[0].id])
      })
    }
  }))(cb)
}

if(!module.parent) 
  require('ssb-client')(function (err, sbot) {
    if(err) throw err
    module.exports(sbot, process.argv[2].split(/,|\s/).filter(Boolean), function (err, data) {
      console.error(data)
      console.log(
        data.map(function (e) { return e.join(', ') }).join('\n')
      )
      sbot.close()
    })
  })







