import request from "supertest";
import app from '../app'
import { deleteFile } from './helper'

beforeEach(async () => {
  deleteFile()
})

const sampleDataInput = { 
  "id": "cd53f0a3-8bd8-415b-8cd1-df63223a583e",
  "organization": "NOV",
  "products": [
     "back end masters",
     "cold pizza"
  ],
  "marketValue": "90%",
  "address": "sangotedo",
  "ceo": "cn",
  "country": "nigeria",
  "noOfEmployees": 2,
  "employees": [
     "james bond",
     "jackie chan"
  ]
}

const sampleDataMatcher ={ 
  "marketValue": "90%",
  "address": "sangotedo",
  "ceo": "cn",
  "country": "nigeria"
}

const updateuserSample = {
  "marketValue": "20%",
  "address": "lagos",
  "ceo": "chika nwobi",
}


describe('GET API TESTS', () => {
  test('checks for errors if database.json file does not exist', async () => {
    const res = await request(app).get('/users')
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({msg: 'Cannot get all users'})
  })

  test('check if database.json file contains data', async () => {
    await request(app).post('/users').send(sampleDataInput)
    const res = await request(app).get('/users')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject([sampleDataMatcher])
  })

  test("GET /users/:id", async () => {
    const postReq = await request(app).post('/users').send(sampleDataInput)
    const getReq = await request(app).get("/users/" + postReq.body[0].id)
    expect(postReq.statusCode).toBe(201)
    expect(getReq.statusCode).toBe(200)
    expect(getReq.body.id).toEqual(postReq.body[0].id)
  });

})

describe('POST API TESTS', () => {
  test('it creates users', async () => {
    const res = await request(app).post('/users').send(sampleDataInput)
    expect(res.statusCode).toBe(201)
    expect(res.body).toMatchObject([sampleDataMatcher])
  })
})

describe('PUT API TESTS', () => {
  test('it updates users', async () => {
    const postReq = await request(app).post('/users').send(sampleDataInput)
    const getReq =  await request(app).get('/users/' + postReq.body[0]['id'])
    const updated =  await request(app).put('/users/'+ getReq.body['id']).send({updateuserSample})
    expect(updated.statusCode).toBe(200);
  })
})

describe('delete by user by id', () => {
  test('it deletes a user', async () => {
    const postReq = await request(app).post('/users').send(sampleDataInput);
    const getReq =  await request(app).get('/users/' + postReq.body[0]['id'])
    const deleted = await request(app).delete('/users/'+ getReq.body['id']) 
    expect(deleted.statusCode).toBe(200)
 
  })
})
