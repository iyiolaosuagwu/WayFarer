# WayFarer
WayFarer is a public bus transportation booking server

# Pivotal Tracker
https://www.pivotaltracker.com/n/projects/2359647

# Required
- Node JS
- Express JS
- Postgresql DATABASE

# Technologies
#### Backend Libraries & Frameworks:
* Node JS
* Express
* Babel
* Passport
* passport-jwt
* Mocha & Chai
* ESLint
* Validator
* Jwt
* Morgan
* Bcrypt
* pg
* dot env
* faker

# Installation
To install and run the project you need to do the following:

Create the folder you wish to run the project in

Clone the repository: git clone https://github.com/iyiolaosuagwu/WayFarer in the folder you created

Install all dependencies by running the command: **yarn**

Start the server by running thhe command: **yarn** server

Navigate to localhost: 6000/api/v1 in your browser to view the running application

# Testing
To run unit tests run the command : **yarn** test in the command line terminal

# API Endpoints
<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>User signup</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/signin</td>  <td>User signin</td></tr>

<tr><td>POST</td> <td>/api/v1/trips</td>  <td>Create a trip</td></tr>

<tr><td>POST</td> <td>/api/v1/bookings</td>  <td>Book a seat on a trip</td></tr>

<tr><td>GET</td> <td>/api/v1/users</td>  <td>Admin can View all registered users</td></tr>

<tr><td>GET</td> <td>/api/v1/trips</td>  <td>View all trips</td></tr>

<tr><td>GET</td> <td>/api/v1/trips?filter_by=origin</td>  <td>View trips by origin</td></tr>

<tr><td>GET</td> <td>/api/v1/trips?filter_by=destination</td>  <td>View trips by destination</td></tr>

<tr><td>GET</td> <td>/api/v1/bookings</td>  <td>View all bookings</td></tr>

<tr><td>GET</td> <td>/api/v1/user/bookings</td>  <td>View all users bookings</td></tr>

<tr><td>GET</td> <td>/api/v1/bookings/:bookingId</td>  <td>View bookings by booking ID</td></tr>

<tr><td>PATCH</td> <td>/api/v1/trips/:tripId</td>  <td>Cancel a trip</td></tr>

<tr><td>DELETE</td> <td>/api/v1/bookings/:bookingId</td>  <td>Delete a booking</td></tr>

</table>

Install Postman and navigate localhost: 3000/api/v1/ to test API endpoints

## Features

### Users
* Users can sign up
* Users can login
* Users can booking a seat on a trip.
* Users can view booking by ID
* Users can delete their booking.
* Users can get a list of filtered trips based on origin.
* Users can get a list of filtered trips based on destination.
* Users can specify their seat numbers when making a booking.
* Users can change seat after booking a trips.

### Admin
* Admin can create a trip.
* Admin can cancel a trip.
* Both Admin and Users can see all trips.
* View all bookings. An Admin can see all bookings, while user can see all of his/her bookings.
* Admin can see all registered users
 


# Author
### Iyiola Osuagwu
