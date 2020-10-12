
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
user/status [active, pending]
user/phones
user/email

auth/id,
auth/method
auth/roles [admin, members]
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

Users or a member can have multiple method to login (from emails and phone number), when using an email the system will put phone number as their secondary reserve when authenticating. they can used or swithced their primary methods to phone-number and vice versa   

There are only admin and members type of users roles in these application. an admin can manage all of the data and the members can only manage their own data.  

The Password stored as bcrypt encryptions and only checked with reverse matching matching method, meaning there is no re-decode back to original values.  

The authentication mechanism using JWT and stored in clientside local-storage, the users will ask for API auth/, the sender should send request contain 'Basic authentication' with id and password delivered in headers, if it match system would generate a user token with limited amount of time that can be use to authorize the request data.  

At first visit (landing page) there are two type of routes, if the visitor already authenticated they would go to dashboard, if not they would redirect to the sign-in pages.  

At the sign-in pages there should a button to sign-up and forgot password, when not registered as a member or the member forgot their passwords they can easily click one. 

When first registered  member status is pending, each new register should be activated by an admin, meaning there is no need to send an email click to activate, an admin would change the status from pending to active manually.  

An active member can create a study which everyone can see (publicly) or private study, member should whitelisted the email or others member to share the study. shared study can be accessed by others member in their dashboards.

As for admin, the menu will contain all of the listing entities of the system. an admin also have limited capability, they cannot modify active chapter inside a study-group that already published. each modify by an admin there should be a log of changes and reason of changes.

There would be a list of users/members and list of study, only admin would have both, users can only allowed to modify their own profile and their own study not others.


