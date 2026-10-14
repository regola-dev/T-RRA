import {test} from 'node:test';
import assert from 'node:assert/strict';
import {updateQuantity,total,restoreCart} from './cart.js';
import {canBuy} from './products.js';
test('cantidades, eliminación, stock y valores no finitos',()=>{assert.deepEqual(updateQuantity({p:1},'p',0),{});assert.equal(updateQuantity({},'p',99).p,20);assert.equal(updateQuantity({},'p',9,3).p,3);assert.deepEqual(updateQuantity({},'p',Infinity),{});assert.deepEqual(updateQuantity({},'p',-1),{});});
test('total y recuperación segura',()=>{const products=[{id:'p',price:28000,stock:4}];assert.equal(total({p:2},products),56000);assert.deepEqual(restoreCart('invalid',products),{});assert.deepEqual(restoreCart('{"p":2,"unknown":4}',products),{p:2});assert.deepEqual(restoreCart('{"p":9}',products),{p:4});});
test('no se vende sin precio definitivo y stock confirmado',()=>{assert.equal(canBuy({price:15000,provisionalPrice:true,stock:10}),false);assert.equal(canBuy({price:null,stock:10}),false);assert.equal(canBuy({price:15000,stock:null}),false);assert.equal(canBuy({price:15000,stock:0}),false);assert.equal(canBuy({price:15000,stock:3}),true);assert.deepEqual(restoreCart('{"p":2}',[{id:'p',price:15000,stock:10,provisionalPrice:true}]),{});});
