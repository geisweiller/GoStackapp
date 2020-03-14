import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async(req, res) => {
    const user = await User.create({
        name: 'Arthur Geisweiller',
        email: 'geisweiller@gmail.com',
        password_hash: '123871281921'
    });
    return res.json(user);
});



export default routes;
