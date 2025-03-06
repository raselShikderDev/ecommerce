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
      const {id, first_name, last_name, email_addresses, image_url} = event.data
      const userData ={
        _id:id,
        email:email_addresses[0].email_address,
        name: first_name + " " + last_name,
        imgUrl:image_url,
      }
      try {
        await dbConnect()
        await userModel.create(userData)
        console.log("successfully fetchd from clerk and created user: ", userData)
      } catch (error) {
        console.error("Fetching & Creating user is faild", error.message)
      }
    },
  );
// updaing User
export const SyncUserUpdation = inngest.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
      const {id, first_name, last_name, email_addresses, image_url} = event.data
      const userData ={
        _id:id,
        email:email_addresses[0].email_address,
        name: first_name + " " + last_name,
        imgUrl:image_url,
      }
      try {
        await dbConnect()
        await userModel.findByIdAndUpdate(id, userData)
        console.log("Successfully updated user: ", userData)
      } catch (error) {
        console.error("Updaing user is faild", error.message)
      }
    },
  );
// Deletation User
export const SyncUserDeletation = inngest.createFunction(
    { id: "delete-user-from-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
      const {id} = event.data
      try {
        await dbConnect()
        await userModel.findByIdAndDelete(id)
        console.log("Successfully deleted user: ", id)
      } catch (error) {
        console.error("Deleting user is faild", error.message)
      }
    },
  );
  