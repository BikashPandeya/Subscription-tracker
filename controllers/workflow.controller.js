
import {createRequire} from "module"
const require = createRequire(import.meta.url)
const {serve} = require("@upstash/workflow/express")

export const sendReminders = serve(async()=> {
    const {subscriptionId} = context.requestPayLoad

    const subscription = await fetchSubscription(context,subscriptionId)
})


const fetchSubscription = async(context,subscriptionId) => {
    return await context.run("get subscription" , () =>{ 
        return Subscription.findById(subscriptionId).populate("user" , "name email")
    })
}

