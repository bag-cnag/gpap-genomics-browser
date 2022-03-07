# gpap-genomics-browser
Integrated Genomics Browser in GPAP

The GPAP Genomics Browser consists of a server and a client application. It relies on the OpenID Connect protocol (KeyCloak, 2021) implemented within the RD-Connect GPAP platform (https://platform.rd-connect.eu/).

The list of instructions performed in the server are written in a pseudocode and can be easily reproduced with standard python libraries such as requests.
The client application is a standalone React Application with an embedded version of the IGV.js browser. It also relies on the authentication system with in OpenID Connect.


Sources:

"React - A JavaScript library for building user interfaces". React. Retrieved 30 March 2021

KeyCloak, https://www.keycloak.org/, Retrieved 30 March 2021

Robinson James T. , Thorvaldsdóttir Helga , Turner Douglass , Mesirov Jill P. . igv.js: an embeddable JavaScript implementation of the Integrative Genomics Viewer (IGV). bioRxiv 2020.05.03075499.
