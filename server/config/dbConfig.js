// getting-started.js
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect("mongodb+srv://bookmyshowapp:0nw8SeQVlMDmeMqV@bookmyshow.erbayz9.mongodb.net/test?retryWrites=true&w=majority");
}

main().catch(err => console.log(err));

mongoose.connection.on('connected' , ()=>console.log('Connection Established'));