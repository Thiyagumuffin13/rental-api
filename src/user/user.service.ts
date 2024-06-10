import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DatabaseService){ }
//   private users = [
//     {
//         "id": 1,
//         "name": "Leanne Graham",
//         "email": "Sincere@april.biz",
//         "mobile": 9874563210,
//         "role": "ADMIN",
//     },
//     {
//         "id": 2,
//         "name": "Ervin Howell",
//         "email": "Shanna@melissa.tv",
//         "mobile": 9874563211,
//         "role": "USER",
//     },
//     {
//         "id": 3,
//         "name": "Clementine Bauch",
//         "email": "Nathan@yesenia.net",
//         "mobile": 9874563213,
//         "role": "SUPERADMIN",
//     },
//     {
//         "id": 4,
//         "name": "Patricia Lebsack",
//         "email": "Julianne.OConner@kory.org",
//         "mobile": 9874563277,
//         "role": "USER",
//     },
//     {
//         "id": 5,
//         "name": "Chelsey Dietrich",
//         "email": "Lucio_Hettinger@annie.ca",
//         "mobile": 9874563275,
//         "role": "ADMIN",
//     }
// ]

  getUserDatas(){
    return this.dbService.user.count();
  }

  async findAll(role?: Role) {
    console.log("--role--",role);
    
    // if (role) {
    //     const rolesArray = this.users.filter(user => user.role === role)
    //     if (rolesArray.length === 0) throw new NotFoundException('User Role Not Found')
    //     return rolesArray
    // }
    // return this.users
    if(role) return this.dbService.user.findMany({
      where: {
        role
      }
    });
    return this.dbService.user.findMany({
    });
}

async findOne(id: number) {
    // const user = this.users.find(user => user.id === id)

    // if (!user) throw new NotFoundException('User Not Found')

    // return user
    return this.dbService.user.findUnique({where:{
      id
    }});
}

async create(createUserDto: Prisma.UserCreateInput) {
    // const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    // const newUser = {
    //     id: usersByHighestId[0].id + 1,
    //     ...createUserDto
    // }
    // this.users.push(newUser)
    // return newUser
    return this.dbService.user.create({
      data: createUserDto
    })
}

async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    // this.users = this.users.map(user => {
    //     if (user.id === id) {
    //         return { ...user, ...updateUserDto }
    //     }
    //     return user
    // })

    // return this.findOne(id)
    return this.dbService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    })
}

async remove(id: number) {
    // const removedUser = this.findOne(id)

    // this.users = this.users.filter(user => user.id !== id)

    // return removedUser
    return this.dbService.user.delete({
      where: {
        id,
      }
    })
  }
}
