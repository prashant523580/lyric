let cacheName ="lyrico"
let urlToCache =["/"];

const self = this;

self.addEventListener("install", (e) =>{
	e.waitUntil(
	  caches.open(cacheName)
	  .then(cache =>{
	    return cache.addAll(urlToCache)
	  })
	)
})

self.addEventListener("activate", (e) =>{
		let allowedCache = ['lyrico'];
		e.waitUntil(
			caches.forEach((cache,cacheName) => {
				if(allowedCache.indexOf(cacheName) === -1){
					return caches.delete(cacheName)
				}
			})
			)
	})

// self.addEventListener("fetch",(e) => {
// 	e.respondWith(
// 		caches.open(cacheName).then((cache) => {
// 			return cache.match(e.request).then((response) => {
// 				// var fetchPromise = fetch(e.request).then((networkResponse) =>{
// 				// 	cache.put(e.request,networkResponse.clone())
// 				// 	return networkResponse
// 				// })
// 				return response ;
// 			})
// 		})
// 	)
// })
self.addEventListener("fetch" ,(e) =>{

	e.respondWith(
			(
				async function (){
					const cache = await caches.open(cacheName);
					const cacheResponse = await cache.match(e.request);
					if(cacheResponse){
						return cacheResponse;
					}else{
						
						const preloadResponse = await e.preloadResponse;
						if(preloadResponse){

						return preloadResponse 
					
						}
					}
					return fetch(e.request)
							.then((res) =>{
								return caches.open(cacheName)
										.then(cache => {
											cache.put(e.request.url, res.clone());
											return res;
										}).catch((err) => {
											console.warn(err)
										})
							})
				}
				)()
		)
})


// try {
// 	const PRECACHE = "precache-v2";
// 	const RUNTIME = "runtime";
   
// 	// A list of local resources we always want to be cached.
// 	const PRECACHE_URLS = [
// 	  `any url`, // Alias for index.html
// 	];
   
// 	// The install handler takes care of precaching the resources we always need.
// 	self.addEventListener("install", (event) => {
// 	  console.log("installing sw");
// 	  event.waitUntil(
// 		caches
// 		  .open(PRECACHE)
// 		  .then((cache) => cache.addAll(PRECACHE_URLS))
// 		  .then(self.skipWaiting())
// 	  );
// 	});
// 	  // The activate handler takes care of cleaning up old caches.
// 	self.addEventListener("activate", (event) => {
// 	  const currentCaches = [PRECACHE, RUNTIME];
// 	  console.log("activate cache");
// 	  event.waitUntil(
// 		caches
// 		  .keys()
// 		  .then((cacheNames) => {
// 			return cacheNames.filter(
// 			  (cacheName) => !currentCaches.includes(cacheName)
// 			);
// 		  })
// 		  .then((cachesToDelete) => {
// 			console.log("cache is deleting");
// 			return Promise.all(
// 			  cachesToDelete.map((cacheToDelete) => {
// 				return caches.delete(cacheToDelete);
// 			  })
// 			);
// 		  })
// 		  .then(() => self.clients.claim())
// 	  );
// 	});
   
	
// 	 // The fetch handler serves responses for same-      	origin resources from a cache.
// 	// If no response is found, it populates the runtime cache with the response
// 	// from the network before returning it to the page.
// 	self.addEventListener("fetch", (event) => {
// 	  // Skip cross-origin requests, like those for Google Analytics.
// 	  if (event.request.url.startsWith(self.location.origin)) {
// 		event.respondWith(
// 		  caches.match(event.request).then((cachedResponse) => {
// 			if (cachedResponse) {
// 			  return cachedResponse;
// 			}
   
// 			return caches.open(RUNTIME).then((cache) => {
// 			  return fetch(event.request, {
				
// 			  }).then((response) => {
// 				// Put a copy of the response in the runtime cache.
// 				return cache.put(event.request, response.clone()).then(() => {
// 				  return response;
// 				});
// 			  });
// 			});
// 		  })
// 		);
// 	  }
// 	});
//   } catch (e) {
// 	console.log(e);
//   }