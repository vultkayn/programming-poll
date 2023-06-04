## Screencast will be on 

[https://www.youtube.com/channel/UC_I1jSudCch6Pmn4qNwGp_Q]

## Functionalities

Register page: [done ]
    

Login: [mostly done]

    - A button to switch between Signup and Login

    Signup:
    - One can create an account Email, Password, univID on this page.
    - Only regular users can register themselves,
    - Admin are manually added to the DB, not thourgh the website.

    Login:
    - Use your univID/password pair to log in.
    - Being logged in allows you to
        * discuss on chat AND to send private messages
        * save your score to each exercise categories (solved / total).
    - Anonymous users can still send public messages but cannot send private messages.

Practice page: [backend is fully done, front end partially connected to it]

    - Single dynamic page, where exercise are loaded one after the other (without reloading the page).
    - One exercise has multiple possible answers, only one is valid.
    - Exercices have tags,
    - there is a submit button than will load the next exercise from the same exercise list.
        * if the exercise list is empty, list again all categories.

Discussion page: [aborted ]
    
    - One can discuss here in a public shat or see its private messages.
    - /pm @user is the command to send a private message.
    - Private messages are also shown in the chat ?


Stats page: [aborted ]

    - see histogram for each exercise categories. (#of answers for each choice e.g) 

## Server-side communication.

Server will be requested through a REST api, under the URL `/api/*`.
To see documentation of this api, refer to the server README.