// Above 4000 documents the header and the change log warn that the book fills up.
window.__SYNC=true;seed(20);const S=__DB.store;
for(let i=0;i<4100;i++)S.set('statistik/s'+String(i).padStart(4,'0'),{version:'x'+i,ordnung:i});
