

const request=require('supertest');
const { app }=require('../index');  



const testUser ={
  email: 'test02@gamil.com',
  phoneNumber: '1234567890',
  name: 'Test User',
  password: 'testpassword',
};

let authToken;

describe('User Routes',()=>{

  it('should register a new user', async ()=>{
    const response=await request(app)
      .post('/User/Signup')
      .send(testUser);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('msg', 'you Are Registered Successfully');
  });

  it('should log in a user', async()=>{
    const response=await request(app)
      .post('/User/Login')
      .send({
        email:testUser.email,
        phoneNumber:testUser.phoneNumber,
        password:testUser.password,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    
    
    expect(response.body).toHaveProperty('msg', 'Login successfully');
    
    authToken =response.body.token;
   
  });
});


describe('Note Routes',()=>{
  
  let testNoteId;

  it('should add a new note',async()=>{
    const response=await request(app)
      .post('/Note/Add')
      .set('Authorization',`${authToken}`)
      .send({
        title:'Test Note',
        content:'This is a test note content.',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('msg','Note Added successfully');

   
    testNoteId = response.body.data._id;
  });

  it('should get all notes',async()=>{
    const response=await request(app)
      .get('/Note/All-Notes')
      .set('Authorization',`${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a single note',async()=>{
    const response=await request(app)
      .get(`/Note/Single-Note/${testNoteId}`)
      .set('Authorization', `${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testNoteId);
  });

  it('should update a note',async()=>{
    const response=await request(app)
      .put(`/Note/Update-Note/${testNoteId}`)
      .set('Authorization',`${authToken}`)
      .send({
        title:'Updated Test Note',
        content:'This is the updated content.',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe('Note Data Updated');
  });

  it('should delete a note',async()=>{
    const response=await request(app)
      .delete(`/Note/Delete-Note/${testNoteId}`)
      .set('Authorization',`${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe('Note Deleted Successfully');
  });
});
