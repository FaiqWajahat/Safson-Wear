import fetch from 'node-fetch';

async function runSeed() {
  try {
    console.log('Sending request to /api/seed...');
    const res = await fetch('http://localhost:3000/api/seed');
    const data = await res.json();
    console.log('Seed response:', data);
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

runSeed();
