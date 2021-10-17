# Flipr Backend Task
This repository contains the submissions for Flipr Backend Assignment.
> File Structure for better understanding of code.
### A typical top-level file layout

    .
    ├── server.js               # Entry point for REST API.This includes creating a server 
                                # and connecting to mongodb database.
    
    ├── db/conn.js              # This file includes script to connect to mongodb database.
                                # which is then included in server.js file.
                        
    ├── routes/record.js        # This file contains the main logic for the two task assigned.
                                # This contains four Express routes. The first and second GET 
                                # routes are to visualize the two collections given in task - devices
                                # and status collection. The third POST API is for task 1 and last 
                                # POST routes for task 2.
                               
    ├── config.env              # This file contains the environment variables.
    

### Deployment Link

    https://flipr-submission.herokuapp.com/
    
### Task 1
This task is running fine on localhost but since this POST request requires more than 30 seconds 
to fetch data therefore it shows service error after 30 seconds on deployment link. This can be 
resolved using workers but this can take some more time as I have never worked with workers before.

    https://flipr-submission.herokuapp.com/locations/devices?name=status

Path parameters - Name of collection 1 (devices in our case)
Query parameters - Name of collection 2 (status in our case)
body - mongodb URI

### Task 2

Pass body in POST request as addresses in JSON format. for eg.
```
 {
    "addresses" : [
    "Plot No:1, Sadarpur, Sector-45, Noida, Uttar Pradesh 201303, India",
    "New Link Road, Behind Infinity Mall, Andheri West, Mumbai, Maharashtra 400053, India",
    "D-002, Sector 75 Road, Sector 75, Noida, Uttar Pradesh 201301, India",
    "Ambrahi Village, Sector 19 Dwarka, Dwarka, Delhi, 110075, India",
    "Plot No 53, Block B, Sector 56, Gurugram,  Haryana 122011, India"
    
    ]
}
```
    
    https://flipr-submission.herokuapp.com/locations-coordinates
    



