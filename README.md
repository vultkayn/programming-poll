
### CI/CD with Auto DevOps

This template is compatible with [Auto DevOps](https://docs.gitlab.com/ee/topics/autodevops/).

If Auto DevOps is not already enabled for this project, you can [turn it on](https://docs.gitlab.com/ee/topics/autodevops/#enabling-auto-devops) in the project settings.


## Still looking for a good project idea

Register page:
    
    - One can create an account Email, Password, Username on this page.
    - Only regular users can register themselves,
    - Admin are manually added to the DB, not thourgh the website.

Login page:

    - Use your username/password pair to log in.
    - Being logged in allows you to
        * discuss on chat AND to send private messages
        * save your score to each exercise categories (solved / total).
    - Anonymous users can still send public messages but cannot send private messages.

Practice page:

    - Single dynamic page, where exercise are loaded one after the other (without reloading the page).
    - One exercise has multiple possible answers, only one is valid.
    - Exercices have tags,
    - there is a submit button than will load the next exercise from the same exercise list.
        * if the exercise list is empty, list again all categories.

Discussion page:
    
    - One can discuss here in a public shat or see its private messages.
    - /pm @user is the command to send a private message.
    - Private messages are also shown in the chat ?


Stats page:

    - see histogram for each exercise categories. (#of answers for each choice e.g) 

## Technologies

### server-side

- **Node** and **Express**, using **Typescript** for server-side

### database system

- I don't know yet about database system used. I only have practical experience with Oracle DB and Mysql, I'd like to learn a more modern tech here.
(PostgreSql or MongoDb depending on schema ? What are Firebase and Apollo ?)
If mocking a real system with potential scalability, NoSQL DB might be justified.
Then it might make sense to use here MongoDB or FireBase.

### front-end

- For front-end, probably Next.js or React, I don't have any experience with these kind of frameworks yet but they sound interesting.


### development

Add CI/CD toolchain within a Docker container for easy deployment.

- Is there any verification tool I could use ? what of Jenkins ?

