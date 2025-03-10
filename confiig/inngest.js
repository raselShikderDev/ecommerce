import { Inngest } from "inngest";
import dbConnect from "./db";
import userModel from "@/models/userModel";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "shopwhere" });

// Creating User after fetching from clerk
export const SyncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("Received Clerk user creation event:", event.data);
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imgUrl: image_url,
    };
    try {
      await dbConnect();
      const newUser = await userModel.create(userData);
      console.log("successfully fetchd from clerk and created user: ", newUser);
    } catch (error) {
      console.error("Fetching & Creating user is faild", error);
      throw error;
    }
  }
);
// updaing User
export const SyncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    console.log("Received Clerk user creation event:", event.data);
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imgUrl: image_url,
    };
    try {
      await dbConnect();
      const updatedUser = await userModel.findOneAndUpdate(id, userData);
      console.log("Successfully updated user: ", updatedUser);
    } catch (error) {
      console.error("Updaing user is faild", error);
      throw error;
    }
  }
);
// Deletation User
export const SyncUserDeletation = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    console.log("Received Clerk user creation event:", event.data);
    const { id } = event.data;
    try {
      await dbConnect();
      const deletedUser = await userModel.findOneAndDelete({ clerkId: id });
      console.log("Successfully deleted user: ", deletedUser);
    } catch (error) {
      console.error("Deleting user is faild", error);
      throw error;
    }
  }
);
