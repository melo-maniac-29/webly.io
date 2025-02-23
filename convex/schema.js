import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        uid:v.string(),
    }),
    workspaces:defineTable({
        messages:v.any(),//message can be anything JSON object
        fileData:v.optional(v.any()), //fileData can be anything JSON object
        user:v.id('users'), //user is id of users table
    }),
})