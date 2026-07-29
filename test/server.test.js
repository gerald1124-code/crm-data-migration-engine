import test from "node:test";
import assert from "node:assert/strict";
test("mapping logic",()=> {
  const row={first_name:"Gerald"};
  const mapping={name:"first_name"};
  const result=Object.fromEntries(Object.entries(mapping).map(([t,s])=>[t,row[s]]));
  assert.equal(result.name,"Gerald");
});
