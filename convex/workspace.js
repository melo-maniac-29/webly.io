import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateWorkspace = mutation({
    args: {
        messages: v.array(
            v.object({
                content: v.string(),
                role: v.string()
            })
        ),
        user: v.id('users'),
    },
    handler: async (ctx, args) => {
        const workspaceId = await ctx.db.insert('workspaces', {
            messages: args.messages,
            user: args.user
        });
        return workspaceId;
    }
});