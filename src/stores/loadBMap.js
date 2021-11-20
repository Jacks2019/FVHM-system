export default function loadBMap(key) {
  return new Promise(function(resolve, reject) {
    if (typeof AMap !== 'undefined') {
      resolve(AMap)
      return true
    }
    window.onBMapCallback = function() {
      resolve(AMap)
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
        'https://webapi.amap.com/maps?v=1.4.15&key=' + key
    script.onerror = reject
    document.head.appendChild(script)
  })
}
