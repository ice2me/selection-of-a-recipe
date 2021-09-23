const staticCacheName = 's-app-v1'
const assetUrls = [
	'index.html',
	'/static/css/main.eeacedfd.chunk.css',
	'/static/js/2.d694b833.chunk.js',
	'/static/js/3.a72d0820.chunk.js',
	'/static/js/main.d6e649e1.chunk.js',
	'/static/js/runtime-main.cc3dea18.js',
	'/static/media/logo.42c6d558.png'
]


self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(staticCacheName).then(caches => caches.addAll((assetUrls)))
	)
})

self.addEventListener('activate', (e) => {
	console.log('[SW] activate')
})