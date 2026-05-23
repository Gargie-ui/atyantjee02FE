async function check() {
  try {
    const res = await fetch('http://localhost:5000/api/users/mentors');
    const data = await res.json();
    console.log(JSON.stringify(data.mentors.map(m => ({ email: m.email, name: m.name, college: m.college, bundles: m.bundles, bio: m.bio })), null, 2));
  } catch(e) { console.error(e) }
}
check();
