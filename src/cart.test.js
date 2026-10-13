import {test} from 'node:test';import assert from 'node:assert/strict';import {updateQuantity,total,restoreCart} from './cart.js';
test('cantidades, eliminación y límites',()=>{assert.deepEqual(updateQuantity({p:1},'p',0),{});assert.equal(updateQuantity({},'p',99).p,20);assert.deepEqual(updateQuantity({},'p',-1),{});});
test('total y recuperación segura',()=>{const products=[{id:'p',price:28000}];assert.equal(total({p:2},products),56000);assert.deepEqual(restoreCart('invalid',products),{});assert.deepEqual(restoreCart('{"p":2,"unknown":4}',products),{p:2});});
