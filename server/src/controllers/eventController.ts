import { Request, Response } from "express";
import { EventAttendanceModel, EventModel } from "../models";
import { CustomError } from "../helpers/lib/App";


export const createEventController = async (req: Request, res: Response) => {

    const event = await EventModel.create({ ...req.body, event_planner: req.user.id })


    res.status(201).json({ event })
}

export const getAllEventsController = async (req: Request, res: Response) => {
    const events = await EventModel.find({});

    res.status(200).json({ events })
}

export const getAllMyEventsController = async (req: Request, res: Response) => {
    const events = await EventModel.find({ event_planner: req.user.id });

    res.status(200).json({ events })
}

export const deleteEventController = async (req: Request, res: Response) => {
    const id = req.params.id

    const event = await EventModel.findOneAndDelete({ _id: id, event_planner: req.user.id })

    if (!event) throw new CustomError({ message: "Event not Found", code: 404 })

    res.status(204)
}

export const goingToEventController = async (req: Request, res: Response) => {

    const event = await EventModel.findById(req.body.event);

    if (!event) throw new CustomError({ message: "Event Not found", code: 404 })

    const already_marked = await EventAttendanceModel.findOne({ event: req.body.event, user: req.user.id })

    if (already_marked) throw new CustomError({ message: "You have already marked attendance", code: 400 })

    const eventAttendance = await EventAttendanceModel.create({ ...req.body, user: req.user.id });

    if (eventAttendance.is_attending) {
        event.people_attending = event.people_attending + 1;
    } else {
        event.people_not_attending = event.people_not_attending + 1;
    }

    await event.save();

    res.status(200).json({ message: "Attendance Marked", event })
}