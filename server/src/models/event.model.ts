import { Schema, model } from 'mongoose'

export interface IEvent {
    event_name: string;
    event_location: string;
    event_planner: string;
    event_date: string;
    event_time: string;
    event_description: string;
    people_attending: number;
    people_not_attending: number;
}


export interface IEventAttendance {
    user: string;
    is_attending: boolean;
    event: string;
}

const eventAttendanceSchema = new Schema<IEventAttendance>({
    user: String,
    is_attending: {
        type: Boolean,
        default: true,
    },
    event: String,
})

const eventSchema = new Schema<IEvent>({
    event_name: String,
    event_location: String,
    event_planner: String,
    event_date: String,
    event_time: String,
    event_description: String,
    people_attending: {
        type: Number,
        default: 0,
    },
    people_not_attending: {
        type: Number,
        default: 0
    }
})

export const EventModel = model("Event", eventSchema)
export const EventAttendanceModel = model("EventAttendance", eventAttendanceSchema)
