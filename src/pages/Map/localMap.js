export default function MapLoader () {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript'
      script.async = true
      script.src = 'http://webapi.amap.com/maps?v=2.0&callback=initAMap&key=0a2974fda0aad52f9162df790e66a8c7'
      script.onerror = reject
      document.head.appendChild(script)
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}