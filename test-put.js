const fs = require('fs');
async function test() {
  const getRes = await fetch('http://localhost:3000/api/admin/blogs');
  const blogs = await getRes.json();
  if (blogs.length === 0) { console.log('No blogs found'); return; }
  
  const target = blogs[0];
  console.log('Target ID:', target._id);
  
  const payload = { ...target, status: 'published' };
  
  const putRes = await fetch(`http://localhost:3000/api/admin/blogs/${target._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  const text = await putRes.text();
  console.log('PUT Status:', putRes.status);
  console.log('PUT Response:', text);
}
test();
