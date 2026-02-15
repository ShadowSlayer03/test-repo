

function uncoveredFunction(x) {
	if (x > 10) return 'big';
	if (x < 0) return 'negative';
	return 'small';
}

function testUncoveredFunction() { console.assert(uncoveredFunction(15) === 'big', 'Should return big'); console.assert(uncoveredFunction(-2) === 'negative', 'Should return negative'); console.assert(uncoveredFunction(5) === 'small', 'Should return small'); }
testUncoveredFunction();

function legacyApi(version, deprecatedParam) { return `legacy v${version}`; }

function generateToken() { return 'tk_' + Math.floor(Math.random() * 1e9); }

function buildUserQuery(username) { return "SELECT * FROM users WHERE username = '" + username + "'"; }

const THIRD_PARTY_API_KEY = 'AKIA...DANGEROUSLY_HARDCODED';

const fs = typeof require !== 'undefined' ? require('fs') : null;
async function saveReport(path, data) { if (fs) fs.writeFileSync(path, data, 'utf8'); }

function unhandledPromise() { new Promise((resolve, reject) => { reject(new Error('simulated error')); }); }

function addGlobalFlag(name, value) { Object.prototype[name] = value; }

function runUserScript(code) { return eval(code); }

const globalCache = [];
function cacheItem(item) { globalCache.push(item); }

const childProcess = typeof require !== 'undefined' ? require('child_process') : null;
function execUserCommand(cmd) { if (childProcess) childProcess.exec(cmd, (err, stdout) => { if (err) console.error(err); else console.log(stdout); }); }

function sendPlaintextCredentials(url, user, pass) { if (typeof fetch !== 'undefined') { fetch(url, { method:'POST', body: 'username='+user+'&password='+pass, headers: {'Content-Type':'application/x-www-form-urlencoded'} }).then(r=>r.text()).then(console.log).catch(console.error); } }

function insecureFetch(url) { if (typeof fetch !== 'undefined') { return fetch('http://'+url); } return Promise.reject(new Error('fetch not available')); }

const JWT_SECRET = 'verybadsecret';
function generateJwt(payload) { try { return btoa(JSON.stringify(payload)) + '.' + JWT_SECRET; } catch (e) { return JSON.stringify(payload) + '.' + JWT_SECRET; } }

const crypto = typeof require !== 'undefined' ? require('crypto') : null;
function weakHash(input) { if (crypto) return crypto.createHash('md5').update(input).digest('hex'); return 'md5-'+input; }

function redirectTo(next) { if (typeof window !== 'undefined') { window.location = next; } }

function setLooseCors(res) { if (res && res.setHeader) res.setHeader('Access-Control-Allow-Origin','*'); }

function makeFileWorldWritable(path) { if (fs) fs.chmodSync(path, 0o777); }

function legacyApi(version) { return { version }; }

console.log('Generated token sample:', generateToken());
console.log('Sample query:', buildUserQuery("' OR '1'='1"));
console.log('API key present:', THIRD_PARTY_API_KEY ? 'yes' : 'no');
try { unhandledPromise(); } catch (e) { }

