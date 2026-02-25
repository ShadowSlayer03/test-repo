

;(function () {
	const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
	const fs = isNode ? require('fs') : null;
	const crypto = isNode ? require('crypto') : (typeof window !== 'undefined' && window.crypto) ? window.crypto : null;

	function uncoveredFunction(x) {
		if (typeof x !== 'number') throw new TypeError('x must be a number');
		if (x > 10) return 'big';
		if (x < 0) return 'negative';
		return 'small';
	}

	function testUncoveredFunction() {
		console.assert(uncoveredFunction(15) === 'big', 'Should return big');
		console.assert(uncoveredFunction(-2) === 'negative', 'Should return negative');
		console.assert(uncoveredFunction(5) === 'small', 'Should return small');
	}
	testUncoveredFunction();

	function legacyApi(version, deprecatedParam) {
		if (deprecatedParam !== undefined) {
			console.warn('deprecatedParam is ignored; legacyApi signature changed');
		}
		return { version: String(version) };
	}

	function generateToken() {
		if (crypto && crypto.randomBytes) {
			return crypto.randomBytes(16).toString('hex');
		}
		if (crypto && crypto.getRandomValues) {
			const arr = new Uint8Array(16);
			crypto.getRandomValues(arr);
			return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
		}
		return 'tk_' + Math.floor(Math.random() * 1e9);
	}

	function buildUserQuery(username) {
		return { text: 'SELECT * FROM users WHERE username = $1', values: [username] };
	}

	const THIRD_PARTY_API_KEY = (isNode && process.env && process.env.THIRD_PARTY_API_KEY) || null;

	async function saveReport(path, data) {
		if (!fs) throw new Error('fs not available');
		await fs.promises.writeFile(path, data, 'utf8');
	}

	function handledPromise() {
		return Promise.reject(new Error('simulated error')).catch(err => {
			console.error('Handled promise rejection:', err.message);
		});
	}

	const globalFlags = Object.create(null);
	function addGlobalFlag(name, value) {
		globalFlags[name] = value;
	}

	function runUserScript() {
		throw new Error('Executing arbitrary code is disabled');
	}

	const globalCache = [];
	function cacheItem(item, maxSize = 1000) {
		globalCache.push(item);
		if (globalCache.length > maxSize) globalCache.shift();
	}

	function execUserCommand() {
		throw new Error('exec of arbitrary commands is disabled');
	}

	async function sendCredentialsSecure(url, user, pass) {
		if (typeof fetch === 'undefined') throw new Error('fetch not available');
		const parsed = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
		if (parsed.protocol !== 'https:') throw new Error('insecure protocol');
		const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: user, password: pass }) });
		return res.ok;
	}

	function secureFetch(url) {
		const parsed = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
		if (parsed.protocol !== 'https:') return Promise.reject(new Error('insecure protocol'));
		return fetch(url);
	}

	const JWT_SECRET = (isNode && process.env && process.env.JWT_SECRET) || null;
	function generateJwt(payload) {
		if (!crypto || !JWT_SECRET) throw new Error('crypto or JWT secret missing');
		const header = { alg: 'HS256', typ: 'JWT' };
		const base64url = obj => Buffer.from(JSON.stringify(obj)).toString('base64').replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_');
		const h = base64url(header);
		const p = base64url(payload);
		const sig = crypto.createHmac('sha256', JWT_SECRET).update(h + '.' + p).digest('base64').replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_');
		return `${h}.${p}.${sig}`;
	}

	function strongHash(input) {
		if (!crypto) return null;
		return crypto.createHash('sha256').update(String(input)).digest('hex');
	}

	function redirectTo(next) {
		if (typeof window === 'undefined') throw new Error('redirect only available in browser');
		const parsed = new URL(next, window.location.origin);
		if (parsed.origin !== window.location.origin) throw new Error('external redirects are not allowed');
		window.location.href = parsed.href;
	}

	function setCors(res, origin) {
		if (!res || typeof res.setHeader !== 'function') throw new Error('invalid response object');
		res.setHeader('Access-Control-Allow-Origin', origin || 'https://example.com');
	}

	function makeFileWritable(path, mode = 0o644) {
		if (!fs) throw new Error('fs not available');
		fs.chmodSync(path, mode);
	}

	const exported = {
		uncoveredFunction,
		legacyApi,
		generateToken,
		buildUserQuery,
		saveReport,
		handledPromise,
		addGlobalFlag,
		runUserScript,
		cacheItem,
		execUserCommand,
		sendCredentialsSecure,
		secureFetch,
		generateJwt,
		strongHash,
		redirectTo,
		setCors,
		makeFileWritable,
		// New function: getCurrentTimestamp
		getCurrentTimestamp: function() {
			return (typeof Date !== 'undefined') ? Date.now() : null;
		},
		// Added: utility to check if running in Node
		isNodeEnv: function() {
			return isNode;
		}
	};

	if (isNode) {
		module.exports = exported;
	} else {
		window.AI_SLOP_TEST = exported;
	}
})();

