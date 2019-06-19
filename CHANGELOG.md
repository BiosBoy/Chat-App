## Chat-App


# 6.3.2
 * Fixed EsLint error in server get method args.
 * Separated main server logic with local servers and public folder as well.
 * Added sessions and coockie on the server and clint sides.

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
