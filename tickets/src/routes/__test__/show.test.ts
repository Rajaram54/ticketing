import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 when the ticket not found', async()=>{
  const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).get(`/api/tickets/${id}`).send({}).expect(404);
});

it('returns 200 when the ticket found', async()=>{
  const title = 'concert';
  const price = 50;

  // const res =  await request(app)
  //   .post('/api/tickets')
  //   .set('Cookie', global.signin())
  //   .send({
  //     title,
  //     price
  //   }).expect(201);
  

  //   const ticketingResponse = await request(app).get(`/api/tickets/${res.body.id}`).send({}).expect(200);

  //   expect(ticketingResponse.body.title).toEqual(title);
  //   expect(ticketingResponse.body.price).toEqual(price);
});