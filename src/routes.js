'use strict'

let moduleName = location.pathname.slice(1).split(".")[0]

// the next step to rewrite requiring modules with require.ensure()
let route = moduleName!==""?require.context('./routes', false)(`./${moduleName}`):(()=>console.log('route not provided'))

//console.log('moduleName', moduleName, 'location', location, 'route', route, 'typeof route', typeof route)

typeof route === "object"?route.__esModule?route.default("to our route"):route.welcome("to our route"):route()