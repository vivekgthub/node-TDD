it.todo("jest setup");

//const calculator = require('./src/mapper/calculator');
const request = require('supertest');
const APP = require('./index');
const CONSTANT = require('./src/const');
const axios = require('axios');


jest.mock('axios');
const inputValue1 = 50; 
const inputValue2 = 25;

describe('test case for calculator application', () => {
    it('test for addition', async() => {
        const res = await request(APP).get('/test/calculator').query({ valueOne: inputValue1, valueTwo: inputValue2, operation: CONSTANT.CALCULATOR_OPERATIONS.ADDITION}).send();
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.result).toEqual(75);  
        });

    it('test for substration', async() => {
        const res = await request(APP).get('/test/calculator').query({ valueOne: inputValue1, valueTwo: inputValue2, operation: CONSTANT.CALCULATOR_OPERATIONS.SUBTRACTION}).send();
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.result).toEqual(25);  
        });

    it('test for multiplication', async() => {
        const res = await request(APP).get('/test/calculator').query({ valueOne: inputValue1, valueTwo: inputValue2, operation: CONSTANT.CALCULATOR_OPERATIONS.MULTIPLICATION}).send();
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.result).toEqual(1250);  
        });

    it('test for division', async() => {
        const res = await request(APP).get('/test/calculator').query({ valueOne: inputValue1, valueTwo: inputValue2, operation: CONSTANT.CALCULATOR_OPERATIONS.DIVISION}).send();
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.result).toEqual(0.5);  
        });


    it('test for invalid operation', async() => {
        const res = await request(APP).get('/test/calculator').query({ valueOne: inputValue1, valueTwo: inputValue2, operation: "%/"}).send();
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.result).toEqual("Invalid operations");  
        });

});

describe('test cases for jokes', () => {
    it('should give status code 200 for sucess', async() =>{
        const res = await request(APP).get('/test/getRandomJoke');
        expect(res.statusCode).toBe(200);
    });

    it('getting random jokes from API', async() => {
    axios.mockImplementation(() => Promise.resolve({data: {joke: 'joke is joke',error: false}})
    );
        const res = await request(APP).get('/test/getRandomJoke');
        expect(res.text).toBe('joke is joke');
    });

    it('getting random jokes for SECURE API', async() => {
    axios.mockImplementation(() => Promise.resolve({data: {joke: 'joke is always joke',error: false}})
    );
        const res = await request(APP).get('/test/securedRandomJoke');
        expect(res.text).toBe('Access Denied');
    })

});