import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        uid:v.string()
    }
})