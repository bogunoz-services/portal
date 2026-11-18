import * as z from "zod";

export const deviceFormFields = {
    name: "name",
    logo: "logo",
    resourceAddress: "resourceAddress",
    port: "port",
    voltage_slot: "voltage_slot",
    voltage_channel: "voltage_channel",
}

export const deviceFormSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters.").max(32),
    logo: z.string(),
    resourceAddress: z.string().min(1, "Resource address is required."),
    port: z.string().min(1, "Port address is required."),
    voltage_slot: z.string().min(1, "Select a slot"),
    voltage_channel: z.string().min(1, "Enter a channel"),

});

export type FormSchema = z.infer<typeof deviceFormSchema>;