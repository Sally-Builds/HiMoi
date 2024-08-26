import { Router } from "express";
import { createEventController, getAllEventsController, getAllMyEventsController, deleteEventController, goingToEventController } from "../controllers";
import { authenticate, validationMiddleware } from "../middlewares";
import { createChatSchema } from "../validations";
import { createEventSchema, eventAttendanceSchema } from "../validations/eventSchema";


export const eventRouter = Router();


eventRouter.route('/').post(authenticate, validationMiddleware(createEventSchema), createEventController)
eventRouter.route('/attendance').post(authenticate, validationMiddleware(eventAttendanceSchema), goingToEventController)
eventRouter.route('/me').get(authenticate, getAllMyEventsController)
eventRouter.route('/:id').delete(authenticate, deleteEventController)
eventRouter.route('/').get(authenticate, getAllEventsController)