fetch('http://localhost:4000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Admin User', email: 'admin@glowcity.com', password: 'password' })
}).then(res => res.json()).then(console.log);

fetch('http://localhost:4000/api/registrations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ salonName: 'GlowCity Flagship', ownerName: 'Admin', phone: '9999999999', email: 'admin@glowcity.com', area: 'Bandra', address: 'Mumbai' })
}).then(res => res.json()).then(console.log);
