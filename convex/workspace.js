import { handleClientScriptLoad } from "next/script";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { handler } from "tailwindcss-animate";

export const CreateWorkspace = mutation({
  args: {
    messages: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspaces", {
      messages: args.messages,
      user: args.user,
    });
    return workspaceId;
  },
});

export const GetWorkspace = query({
  //export function for getting workspace data to the client
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  },
});

export const UpdateMessages = mutation({
  //export function for updating messages
  args: {
    workspaceId: v.id("workspaces"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
    return result;
  },
});

export const UpdateFiles = mutation({
  //export function for updating files
  args: {
    workspaceId: v.id("workspaces"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });
    return result;
  },
});

export const GetAllWorkspaces = query({
  //export function for getting all workspaces
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .collect();

    return result;
  },
});
