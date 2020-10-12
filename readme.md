
**What is the project About?**  

This project is about learning the concept of MANEST (Mongo, Angular, Nest, Typescript), we will go through all of the concept by applying it in real cases of study-group.  

**What is study group?**  

Study group is online collaborating web application where members can create a course/study publicly or privately. when a study created privately the author of the study can share and allow certain member to see the study.     
 
**The challange**  
Our task is to get familliarize with bellow concept.   
  - local setup (angular, nest, mongo)
  - CLI (angular, nest),
  - routing & navigation (angular)
  - creating component (angular),
  - reactive form components (angular),
  - pipes / directives (angular),
  - handle JWT Authentication (angular side, nest)
  - middleware concept of nest,
  - configuration of nest,
  - Exception Handling of nest,
  - creating websocket server in nest,
  - create service providers of nest,
  - implement controller and modules concept of nest 
  - http interceptors  (angular),
  - creating guards & interceptors (angular, nest),
  - use different environment variables (angular, nest, mongod)
  - testing method (angular, nest, mongod)
  - build generate method, (angular, nest)
  - deployement method, (angular, nest, mongod)  

Next priority is to built application that have these concept.   
  - login JWT
  - register 
  - forgot password.
  - user verification by admin
  - user roles admin student, teacher,
  - form validation
  - route to dashbord with JWT
  - listing users records
  - uploading image avatar
  - error handle when wrong data
  - apis login, register, listen,
  - crud for user
  
**System Design**  

**Domain Model**  
```
user/id
user/full_name
user/created_at,
user/status
user/phones
user/email

auth/id,
auth/method
auth/roles
auth/primary_id,
auth/password
auth/resetoken,

study/id  
study/title  
study/descriptions  
study/status [draft, published]  
study/is_active  
study/is_public  
study/members  
study/created_at  
study/last_commit  

chapter/id 
chapter/title
chapter/index
chapter/study_id
chapter/created_at

content/id,
content/raw_data,
content/asset_path,
content/chapter_id
```
**Use Cases**  

**Requirements**  


see: [docs/](docs/)   
