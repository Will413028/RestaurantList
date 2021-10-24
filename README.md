# Restaurant List

A restaurant website which allow users to create their own account and build their restaurant list

## Features
- There are 8 default restaurants and 2 users
- User can create a new account 
- User need to use email to register
- User can use facebook to login   
- User can add your favorite restaurants
- Some information is necessary, such as name, phone, location and rating
- User can click `detail` to see more information
- User can click `edit` to edit restaurant's information
- User can click `delete` to delete restaurants
- Search bar to find related restaurants
- Select button can change sorting, sort by store name, region or category

## How to Use
1. Clone this project
   
``` 
git clone https://github.com/Will413028/RestaurantList.git 
```
2. Install npm packages    
```npm install```
3. Set the environment variables at .env.example then change the file name to .env
4. Create default restaurants and users data
   ```npm run seed```
5. Start the server     
   ```npm run dev```
6. Open the browser and enter the URL
```localhost:3000```

## What package I used
- npm：7.7.6
- express: 4.17.1,
- express-handlebars: 5.3.2
- mongoose 5.13.7
- nodemon: 2.0.9
- body-parser: 1.19.0
- method-override: 3.0.0
- bcryptjs: 2.4.3
- connect-flash: 0.1.1
- dotenv: 10.0.0
- express-session: 1.17.2
- passport: 0.4.1
- passport-facebook: 3.0.0
- passport-local: 1.0.0



