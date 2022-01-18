const mysql = require('mysql')

let db; 

function handleDisconnect() {
    
    db = mysql.createConnection({
        host: 'bi30tloqqg6aqnsjzk5h-mysql.services.clever-cloud.com',
        user: 'uapdthevueb7t3hg',
        password: 'zEZ6Q84UgLSHREfJwowg',
        database: 'bi30tloqqg6aqnsjzk5h'
    });

    db.connect(function(err) {              
      if(err) {                                    
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 1000); 
      }                
      console.log('Database Connected');                   
    });                                   
  
    db.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                        
      } else {                                     
        throw err;                                 
      }
    });
}

handleDisconnect();

module.exports = db;