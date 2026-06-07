require('dotenv').config();
const fetch = global.fetch || require('node-fetch');
(async () => {
  try {
    const registerRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'user_test_444@example.com', password: 'TestPass123' }),
    });
    const registerBody = await registerRes.text();
    console.log('REGISTER', registerRes.status, registerBody);

    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user_test_444@example.com', password: 'TestPass123' }),
    });
    const loginBody = await loginRes.text();
    console.log('LOGIN', loginRes.status, loginBody);
  } catch (err) {
    console.error(err);
  }
})();
