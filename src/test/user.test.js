const app = require('../../server');
const request = require('supertest');
const db = require('../../models/index');



describe('Integration test for user', () => {
    let first_name_given = "abhisjj";
    let last_name_given = "Doekkkkttt";
    let password_given = "skdjfhskdfjhg";
    let username_given = "bhavan12aabhishek@gmail.com";

    beforeAll(async () => {
        try {
          await db.sequelize.sync();
          console.log('Database synchronized');
        } catch (error) {
          console.error('Database synchronization error:', error);
          process.exit(1); // Exit the process if synchronization fails
        }
      });

    afterAll(async () => {
        try{
        await db.sequelize.query('DELETE FROM "Users" WHERE username = :username',
        {
            replacements: { username: username_given },
            type: db.sequelize.QueryTypes.SELECT
          }
        )

        }catch(error) {
            console.error('Error cleaning up test data '+error);
        }
      });

    it('insert user and check if it\'s inserted', async () => {
       console.log('inserting');
        const createUserResponse = await request(app)
            .post('/v1/user')
            .send({
                first_name: first_name_given,
                last_name: last_name_given,
                password: password_given,
                username: username_given
            });

        expect(createUserResponse.status).toBe(201);
        console.log('recieving');
        const getUserResponse = await request(app)
            .get('/v1/user/self')
            .auth(username_given, password_given);
            console.log(getUserResponse);
    
        expect(getUserResponse.body.username).toBe('bhavan12aabhishek@gmail.com');
    });

    it('edit user and check if it\'s edited', async () => {
        console.log("Inside the second test");
        first_name_given = 'Kevin';
        last_name_given = 'Sam';

        const editUser = await request(app)
        .put('/v1/user/self')
        .auth(username_given, password_given)
        .send(
            {
                first_name : first_name_given,
                last_name : last_name_given
            }
        );

        const getUserResponse = await request(app)
            .get('/v1/user/self')
            .auth(username_given, password_given);
            console.log(getUserResponse);
        // Ensure the retrieved user's username matches the one inserted
        expect(getUserResponse.status).toBe(200);
        expect(getUserResponse.body.first_name).toBe(first_name_given);
        expect(getUserResponse.body.last_name).toBe(last_name_given);
    });

});