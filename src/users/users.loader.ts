import * as DataLoader from 'dataloader';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { mapFromArray } from './util';

function createUsersLoader(usersService: UsersService) {
  //   return new DataLoader<number, User>(async (ids) => {
  //     const users = await usersService.getUsersByIds(ids);
  //     const usersMap = mapFromArray(users, (user) => user.id);
  //     return ids.map((id) => usersMap[id]);
  //   });
}
