var mongoose = require("mongoose");
AlertSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    username: String,
    label: {
      labelId: String, required : false
    },
    user: {
      user_id: String,
      user_name: String,
      emailId: String,
      mobile_number: String,
    },
    transactionIds: [String],
    alerts: [
      {
        productID: String, required : false,
        productName: String, required : false,
        manufacturer: String, required: false,
        event_type_primary: String, required : false,
        event_type_secondary: String, required : false, 
        createdBy: String, required : true,
        AlertMode: {
                mobile : Boolean, required : true, default : false,
                email : Boolean, required : true, default : true,
                telegram : Boolean, required : true, default : false, 
                web_push : Boolean, required : true, default : false,
            }        
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", AlertSchema);

