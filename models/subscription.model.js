import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , "Subscription Name is required"], // Ensures a name is always provided.
        trim : true , // Removes extra spaces from the beginning and end.
        minLength : 2 , // Prevents very short names.
        maxLength : 50, // Ensures name doesn't exceed 50 characters.
    } ,
    price: {
        type : Number ,
        required : [true , "Subscription Price is required"], // Makes sure price is provided.
        min : [0 , "Price must be greater than 0"] // Prevents negative values.
    } ,
    currency :{ 
        type : String ,
        enum: ['USD' , 'EUR' , 'GBP' , 'NPR'] , // Limits currency options to these values.
        default : 'USD' // If no currency is provided, USD is used.
    },
    frequency : {
        type : String ,
        enum : ['daily' , 'weekly' , 'monthly' , 'yearly'] , // Limits frequency to these values.
        required : [true , "Frequency is required"]
    },
    category : {
        type : String ,
        enum : ["sports" , "lifestyle" , "technology", 'business' , 'entertainment' , 'health' , 'science' , 'sports' , 'technology' , 'general'] ,
        // ❌ Duplicate values ('sports' and 'technology') exist in the enum list, which can cause issues.
        required : [true , "Category is required"]
    },
    paymentMethod : {
        type : String ,
        trim : true , // Removes spaces from the beginning and end.
        required : [true , "Payment Method is required"]
    },
    status : {
        type : String ,
        enum : ['active' , 'cancelled' , 'expired'] , // Limits status options.
        default : 'active' // Default is 'active' unless changed.
    },
    startDate : {
        type : Date ,
        required : [true , "Start Date is required"],
        validate : {
            validator : (value) => (value <= new Date()), // ✅ Ensures the start date is not in the future.
            message : "Start date must be in the past"
        }
    },
    renewalDate : {
        type : Date ,
        validate : {
            validator : function(value) { 
              return  (value > this.startDate); // ✅ Ensures renewal date is after the start date.
            },
            message : "Renewal date must be after start date"
        }
    }, 
    user : {
        type : mongoose.Schema.Types.ObjectId , // ✅ Stores reference to the "User" collection.
        ref : "User" , // Links this field to the "User" model.
        required : [true , "User is required"], // Ensures a subscription always belongs to a user.
        index : true // ✅ Improves query performance when searching by user.
    }
}, {timestamps : true}); // ✅ Adds "createdAt" and "updatedAt" timestamps automatically.

// ✅ Middleware to auto-calculate renewal date before saving to the database.
subscriptionSchema.pre("save" , function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily : 1 ,
            weekly : 7 ,
            monthly : 30 ,
            yearly : 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]); 
        // ❗ This logic might not work correctly for months with different days (e.g., February).
    }

    // ✅ Automatically update status if the renewal date has passed.
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
})

const subscription = mongoose.model('Subscription' , subscriptionSchema);

export default subscription;
