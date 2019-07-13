## Chat-App

# 10.0.0
 * New Major update!
 * Fully add support for the multy-channel chatting on the client-side.

# 9.9.0
 * Updated UUIG session generation tool to be more predictable.

# 9.8.0
 * Added message generation util.

# 9.7.0
 * Upgrade eventHandler to be multy-thread.

# 9.6.0
 * Updated initial store and its tools to be multy-theard.

# 9.5.1
 * Fixed UUID generation problem and its regeneration in the future reconnections on the back-end.

# 9.5.0
 * Improved broadcastNotifications logic to be fit for multy-thread chatting.

# 9.4.0
 * Added Sidebar slider dots indicator.

# 9.3.0
 * Added multy-sections scrolling in the Sidebar area.

# 9.2.4
 * Added current users in the room layout.

# 9.2.3
 * Added several additional hosts in cors.

# 9.2.2
 * Fixed user system message layout.
 * Fixed sidebar marginns/paddings.

# 9.2.1
 * Minor style improvement for the user messages about connection status.
 * Fixed current user matching in reducers.

# 9.1.0
 * Improve client-side sockets structure.

# 9.0.0
 * Significally improve client-side app structure arhitecture.

# 8.2.0
 * Added current user alert in message list ("You" instead of the current user name).

# 8.1.0
 * Added users sorting for better users list ordering in the browser.

# 8.0.0
 * Finnaly and fully integrated multy-tab chat surfing with recconecting functional.

# 7.7.0
 * Now users identifications goes via cookie data, not the user uuid on the client-side.

# 7.6.0
 * Finnaly and fully integrated multy-tab chat surfing.
 * Reconnecting functional was integrated.
 * Now users identifications goes via cookie data, not the user uuid on the back-end.

# 7.5.0
 * Integrate cookie storage inside server side.
 * Correspondently update store tools.

# 7.4.0
 * Improve typing notification debouce bue to cookie integration.

# 7.3.1
 * Increase users slide speed.

# 7.3.0
 * Auto zoom fix while input clicked on touchscreen devices.

# 7.2.0
 * Minor typo improvements.

# 7.1.0
 * Added session storage environment (one user reconnected it would have previously created data and creds).
 * Added new 2 store tools.

# 7.0.2
 * Fixed CORS utils work.
 * Added description for dev fetch request.

# 7.0.1
 * Added CORS domains allowed list with function handler.

# 7.0.0
 * Fully rewritten App server-side arhitecture.
 * Updated debug messages on server-side console to make them more clearly.
 * Separated global server file into independent pices/modules.
 * Create fully workable model of SPA website served by express server.
 * Webpack server moved to independent folder.
 * Updated running scripta.

# 6.0.0
 * Fixed EsLint error in server get method args.
 * Separated main server logic with local servers and public folder as well.
 * Added sessions and cookie on the server and clint sides.

# 5.3.2
 * Refactored app.js server file due to liveTyping functional.

# 5.3.1
 * Refactor saga.js file.

# 5.3.0
 * Updated several client component to be fit for liveTyping functional.

# 5.2.0
 * Added LiveTyping functional on client-side.

# 5.1.0
 * Added LiveTypingMessage Component.

# 5.0.1
 * New build added.

# 5.0.0
 * Added new Spinner and Placeholder components.
 * Added functional logic for usersList close/open and connection status layout in MessagesList Component.
 * Added styles for new components, refactored ones and extra more.
 * Added new constants.
 * Added new components roots.
 * Added button for onClick message sending in AddMessage Component.
 * Added debug utils for connection handling.
 * Upgraded sockets configuration, made it more stabel and predictable.
 * Upgraded DebugInfo Component and its helpers for getting buttons and spinners work inside it.
 * Upgraded, Expanded and Improved all present Actions and Reducers. Make them more clearly and stabel duing Debug messages and server errors.
 * Improved initialStore to make it more predictable.
 * Improved main layout for a better error hadling with connection statuses.
 * Separate UsersList and User Component logics.
 * Move NewUserConnected Component to own folder.
 * Fixed getTime function for zero hours.

# 4.0.1
 * Fixed HMR work in development mode.

# 4.0.0
 * Massive v.4 Update!
 * Improved Public Server.
 * Added More clear naming for app in package.json.
 * Added PopUp and Debug Components.
 * Added styles for Debag and PopUp Components.
 * Added reducer and action for new Debug Actions.
 * Added initialState Redux state.
 * Refactored app structure for a better fashion.

# 3.0.0
 * Created first stabel production release.
 * Rolled up on Heroku server for the live access.
 * Solved minor bugs inside webpack config.

# 2.10.1
 * Update server config.
 * Improved webpack dev/prod scenarios.
 * Minor fixes.

# 2.9.1
 * Added Websockets notification once some user is leave the chat.
 * Minor style improvements.

# 2.8.0
 * Added timestampes for messages.
 * Added avatars for users in UsersList Component.

# 2.7.0
 * Added ability to inform users while someone new is connected.

# 2.6.1
 * Improved adaptive layout.

# 2.6.0
 * Added real users icons.
 * Minor refoctoring.

# 2.5.0
 * Added real message timestampes.
 * Improved actions structure.

# 2.4.0
 * Added explicit appear for current user.

# 2.3.1
 * Updated actions for a better stability and message list handling.
 * Fixed timestamp for Message component.
 * Minor improvements.

# 2.2.0
 * Added current users data on message sending.
 * Minor refactoring of Sidebar(UsersList).

# 2.1.0
 * Added real ID's codes for messages and users present inside chat.
 * Improved reducers and store configs for better payload handling.
 * Added current user reducer.

# 2.0.0
 * Added ability to watch and send both users and chat messages lists for a freshly comnnected users.
 * Minor inprovements.

# 1.1.0
 * Added Redux Logger for better testing.
 * Upgraded run command.

# 1.0.0
 * First stable Release.
