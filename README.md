# Travel_Trekker

Frontend Live Link [Travel_Trekker](https://travel-trekker.vercel.app/)
Backend Live Link [Backend Travel_Trekker](https://travel-trekker-server.vercel.app/)


## Frontend Features

- [x] Home Page [Hero, Available Services, Upcoming Services, Available Hotels, Company Overview, Clients Review, Latest News, FAQ, Contact]
- [x] Signup page
- [x] Signin page
- [x] Logout (after authentication)
- [x] Rooms page (All rooms can filter by Hotel Name, Hotel Location and Room Number)
- [x] Can book a room on Book now page. [Authentication Required]
- [x] After success booking redirect to user dashboard. [Authentication Required, User Role]
- [x] Can Update profile user dashboard. [Authentication Required, User, Admin & Super Admin Role]
- [x] Can show booking history with status and can cancel the booking. [Authentication Required, User]
    <br />
- [x] Can manage FAQ section contents. [Authentication Required, Admin & Super Admin Role]
- [x] Can manage News section contents. [Authentication Required, Admin & Super Admin Role]
- [x] Can manage Users. [Authentication Required, Admin & Super Admin Role]
- [x] Can manage Hotels. [Authentication Required, Admin & Super Admin Role]
- [x] Can manage Rooms. [Authentication Required, Admin & Super Admin Role]
- [x] Can manage Orders. [Authentication Required, Admin & Super Admin Role]


## Frontend Technologies 
- [x] Next JS
- [x] Typescript
- [x] Redux Toolkit & RTK Query
- [x] React hook forms with yup validation
- [x] React hot toast & Sweetalert

# Travel_Trekker Backend Routes:

## Backend Technologies 
- [x] Node JS / Express
- [x] Typescript
- [x] Mongoose
- [x] Zod Validation
- [x] JWT Token

## Auth
<hr />

- [x] [POST] - [https://travel-trekker-server.vercel.app/api/v1/auth/signup](https://travel-trekker-server.vercel.app/api/v1/auth/signup) <br /> <br />
- [x] [POST] - [https://travel-trekker-server.vercel.app/api/v1/auth/user/signup](https://travel-trekker-server.vercel.app/api/v1/auth/user/signup) <br /> <br />
- [x] [POST] - [https://travel-trekker-server.vercel.app/api/v1/auth/signin](https://travel-trekker-server.vercel.app/api/v1/auth/signin) <br /> <br />
<br />

## User
<hr />

- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/user](https://travel-trekker-server.vercel.app/api/v1/book) <br /> <br />
- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/user/653184218c752e7225492845](https://travel-trekker-server.vercel.app/api/v1/user/653184218c752e7225492845) <br /> <br />
- [x] [PATCH] - [https://travel-trekker-server.vercel.app/api/v1/user/653184218c752e7225492845](https://travel-trekker-server.vercel.app/api/v1/user/653184218c752e7225492845) <br /> <br />
- [x] [DELETE] - [https://travel-trekker-server.vercel.app/api/v1/user/653184218c752e7225492845](https://travel-trekker-server.vercel.app/api/v1/user/653184218c752e7225492845) <br /> <br />

## Hotel
<hr />

- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/hotel](https://travel-trekker-server.vercel.app/api/v1/book) <br /> <br />
- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/hotel/653170df85cc7cfb3140ceda](https://travel-trekker-server.vercel.app/api/v1/hotel/653170df85cc7cfb3140ceda) <br /> <br />
- [x] [POST] - [https://travel-trekker-server.vercel.app/api/v1/hotel](https://travel-trekker-server.vercel.app/api/v1/hotel) <br /> <br />
- [x] [PATCH] - [https://travel-trekker-server.vercel.app/api/v1/hotel/653170df85cc7cfb3140ceda](https://travel-trekker-server.vercel.app/api/v1/hotel/653170df85cc7cfb3140ceda) <br /> <br />
- [x] [DELETE] - [https://travel-trekker-server.vercel.app/api/v1/hotel/653170df85cc7cfb3140ceda](https://travel-trekker-server.vercel.app/api/v1/hotel/653170df85cc7cfb3140ceda) <br /> <br />


## Room
<hr />

- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/room](https://travel-trekker-server.vercel.app/api/v1/room) <br /> <br />
- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/room/6531714085cc7cfb3140cef0](https://travel-trekker-server.vercel.app/api/v1/room/6531714085cc7cfb3140cef0) <br /> <br />
- [x] [POST] - [https://travel-trekker-server.vercel.app/api/v1/room](https://travel-trekker-server.vercel.app/api/v1/room) <br /> <br />
- [x] [PATCH] - [https://travel-trekker-server.vercel.app/api/v1/room/6531714085cc7cfb3140cef0](https://travel-trekker-server.vercel.app/api/v1/room/6531714085cc7cfb3140cef0) <br /> <br />
- [x] [DELETE] - [https://travel-trekker-server.vercel.app/api/v1/room/6531714085cc7cfb3140cef0](https://travel-trekker-server.vercel.app/api/v1/room/6531714085cc7cfb3140cef0) <br /> <br />


## Booking
<hr />

- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/booking/by-auth-id](https://travel-trekker-server.vercel.app/api/v1/booking/by-auth-id) <br /> <br />
- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/booking](https://travel-trekker-server.vercel.app/api/v1/booking) <br /> <br />
- [x] [POST] - [https://travel-trekker-server.vercel.app/api/v1/booking](https://travel-trekker-server.vercel.app/api/v1/booking) <br /> <br />
- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/booking/65316aaf60c0a588dcbf5d90](https://travel-trekker-server.vercel.app/api/v1/booking/65316aaf60c0a588dcbf5d90) <br /> <br />
- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/booking//update-status-admin/65316aaf60c0a588dcbf5d90](https://travel-trekker-server.vercel.app/api/v1/booking//update-status-admin/65316aaf60c0a588dcbf5d90) <br /> <br />



## FAQ
<hr />

- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/faq](https://travel-trekker-server.vercel.app/api/v1/faq) <br /> <br />
- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/faq/6530e9808328238ba99bb1c7](https://travel-trekker-server.vercel.app/api/v1/faq/6530e9808328238ba99bb1c7) <br /> <br />
- [x] [POST] - [https://travel-trekker-server.vercel.app/api/v1/faq](https://travel-trekker-server.vercel.app/api/v1/faq) <br /> <br />
- [x] [PATCH] - [https://travel-trekker-server.vercel.app/api/v1/faq/6530e9808328238ba99bb1c7](https://travel-trekker-server.vercel.app/api/v1/faq/6530e9808328238ba99bb1c7) <br /> <br />
- [x] [DELETE] - [https://travel-trekker-server.vercel.app/api/v1/faq/6530e9808328238ba99bb1c7](https://travel-trekker-server.vercel.app/api/v1/faq/6530e9808328238ba99bb1c7) <br /> <br />


## News
<hr />

- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/news](https://travel-trekker-server.vercel.app/api/v1/news) <br /> <br />
- [x] [POST] - [https://travel-trekker-server.vercel.app/api/v1/news](https://travel-trekker-server.vercel.app/api/v1/news) <br /> <br />
- [x] [DELETE] - [https://travel-trekker-server.vercel.app/api/v1/news/65318abb64709d60bce32b71](https://travel-trekker-server.vercel.app/api/v1/news/65318abb64709d60bce32b71) <br /> <br />


## Review
<hr />

- [x] [GET] - [https://travel-trekker-server.vercel.app/api/v1/review](https://travel-trekker-server.vercel.app/api/v1/review) <br /> <br />
- [x] [POST] - [https://travel-trekker-server.vercel.app/api/v1/review](https://travel-trekker-server.vercel.app/api/v1/review) <br /> <br />
