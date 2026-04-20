# New Component Research and Planning

## Component(s) I Plan to Probably Use
I'm planning to use Multer for file uploading. My plan is to have icons for weapons, mobile suits, and missions be uploaded to help enhance the world building.

I also plan to use Nodemailer for email notifications so when a user is assigned a mission (to be implemented in a later step), they'll receive a notification of where they've been assigned, etc.

For deploying my app, I'm planning as originally planned, to self-host my application on my home server (just Ubuntu Server running on an old PC) and deploy and containerize my app using Docker through the terminal. I have a domain (mccauleyarmishaw.com) that I will use to run a subdomain through, where a Cloudflare Tunnel will also be used to safely expose my application.

For the file uploading and email notifications, specialized endpoints will be created in a later milestone that will contain all the business logic, etc. necessary for these additional backend components to function in my application.