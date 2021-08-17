import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('returns 404 if the provided id does not exist', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
        title: 'asdfasdsf',
        price: 20
    }).expect(404)
})


it('returns 401 if user not authorized', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).put(`/api/tickets/${id}`)
    .send({
        title: 'asdfasdsf',
        price: 20
    }).expect(401)
})


it('returns 401 if updated ticket not created by the current user', async() => {

    const response = await request(app).post('api/tickets').set('Cookie', global.signin()).send({
        title: 'adfsadf',
        price: 98
    });

    await request(app).put(`api/tickets/${response.body.id}`).set('Cookie', global.signin()).send({
        title: 'adfsadsafdf',
        price: 100
    }).expect(401)

})


it('returns 404 for invalid price and title', async() => {

    const cookie = global.signin();
    const response = await request(app).post('api/tickets').set('Cookie', cookie).send({
        title: 'adfsadf',
        price: 98
    });

    await request(app).put(`api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: '',
        price: 100
    }).expect(400)

    await request(app).put(`api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: 'asdads',
        price: -100
    }).expect(400)


});


it('update ticket with valid price and title', async() => {

    const cookie = global.signin();
    const response = await request(app).post('api/tickets').set('Cookie', cookie).send({
        title: 'adfsadf',
        price: 98
    });

    await request(app).put(`api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: 'safsaf',
        price: 100
    }).expect(200)


})

