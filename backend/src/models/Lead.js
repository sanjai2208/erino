import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    first_name: { 
        type: String, 
        required: [true, 'First name is required'] 
    },
    last_name: { 
        type: String, 
        required: [true, 'Last name is required'] 
    },
    email : {
        type :String,
        required: [true, 'Email is required'],
        unique : true,
        match:  [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email',
    ],
    },
    phone: {
        type : String
    },
    company : {
        type : String
    },
    city : {
        type: String
    },
    state : {
        type : String
    },
    source: {
    type: String,
    enum: ['Website', 'Referral', 'Facebook_ads', 'Google_ads',"events", 'Other'],
    default: 'Other',
    },
    status:{
        type : String,
        enum : ["New", "Contacted", "Qualified", "Lost", "Won"],
        default : 'New'
    },
    score: { type: Number, default: 0 },
    lead_value: { type: Number, default: 0 },
    last_activity_at: { type: Date, default: Date.now() },
    is_qualified: { type: Boolean, default: false },


}, {timestamps : true});
leadSchema.index({ user: 1, email: 1 }, { unique: true });

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;