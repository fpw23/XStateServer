import { EndPointRoutes } from '@proista/server/lib/EndPointRoutes'
import { EndPointStatic } from '@proista/server/lib/EndPointStatic'
import path from 'path'

const endpoints = []

endpoints.push(EndPointStatic('/Demo', path.join(__dirname, './Demo')))
endpoints.push(EndPointStatic('/Documents', path.join(__dirname, './Documents')))
endpoints.push(EndPointStatic('/Tasks', path.join(__dirname, './Tasks')))
endpoints.push(EndPointStatic('/Events', path.join(__dirname, './Events')))

export const SetupServiceRoutes = (app) => {
  app.use('/Services', EndPointRoutes({ staticEndPoints: endpoints }))
}
