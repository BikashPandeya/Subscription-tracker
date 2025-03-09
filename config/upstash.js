import { Client as workflowClient } from "@upstash/workflow";
import {QSTASH_URL , QSTASH_TOKEN , QSTASH_CURRENT_SIGNING_KEY , QSTASH_NEXT_SIGNING_KEY , UPSTASH_WORKFLOW_TOKEN } from "./env.js";

export const workflow = workflowClient({
    baseUrl : QSTASH_URL,
    token : QSTASH_TOKEN,
})

