import { IndexRoute } from '@modules/index';
import App from './app';
import 'dotenv/config'
import { validateEnv } from '@core/utils/index';
import UserRoute from '@modules/users/user.route'
import { AuthRoute } from '@modules/auth';
import ProfileRoute from '@modules/profile/profile.route';
import { PostRoute } from '@modules/posts';
import GroupRoute from '@modules/group/group.route';
import ImageRoute from '@modules/image/image.route';
import FileRoute from '@modules/upload/file.route';
import Conversation from '@modules/conversation/conversation.route';

validateEnv();

const routes = [
    new IndexRoute(),
    new UserRoute(),
    new AuthRoute(),
    new ProfileRoute(),
    new PostRoute(),
    new GroupRoute(),
    new ImageRoute(),
    new FileRoute(),
    new Conversation(),
];

const app = new App(routes);

app.listen();