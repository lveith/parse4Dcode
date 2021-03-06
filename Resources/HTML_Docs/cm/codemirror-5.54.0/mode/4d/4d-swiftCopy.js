// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// 4d mode created by Michael Kaminsky https://github.com/mkaminsky11

(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require("../../lib/codemirror"))
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror"], mod)
  else
    mod(CodeMirror)
})(function(CodeMirror) {
  "use strict"

  function wordSet(words) {
    var set = {}
    for (var i = 0; i < words.length; i++) set[words[i]] = true
    return set
  }

  var keywords = wordSet(['ZIP Read archive','ZIP Create archive','Year of','XML SET OPTIONS','XML GET OPTIONS','XML GET ERROR','XML DECODE','WRITE PICTURE FILE','WP USE PAGE SETUP','WP Text range','WP Table range','WP Table insert rows','WP Table insert columns','WP Table get rows','WP Table get columns','WP Table get cells','WP TABLE DELETE ROWS','WP TABLE DELETE COLUMNS','WP Table append row','WP SET VIEW PROPERTIES','WP SET TEXT','WP SET LINK','WP SET FRAME','WP SET ATTRIBUTES','WP Selection range','WP SELECT','WP RESET ATTRIBUTES','WP PRINT','WP Picture range','WP Paragraph range','WP New subsection','WP New style sheet','WP New header','WP New footer','WP NEW BOOKMARK','WP New','WP Is font style supported','WP Insert table','WP INSERT PICTURE','WP INSERT FORMULA','WP INSERT DOCUMENT','WP INSERT BREAK','WP IMPORT STYLE SHEETS','WP Import document','WP Get view properties','WP Get text','WP Get subsection','WP Get style sheets','WP Get style sheet','WP Get sections','WP Get section','WP Get position','WP Get page count','WP Get links','WP Get header','WP Get frame','WP Get formulas','WP Get footer','WP Get elements','WP Get element by ID','WP GET BOOKMARKS','WP Get body','WP GET ATTRIBUTES','WP FREEZE FORMULAS','WP EXPORT VARIABLE','WP EXPORT DOCUMENT','WP DELETE SUBSECTION','WP DELETE STYLE SHEET','WP DELETE PICTURE','WP DELETE HEADER','WP DELETE FOOTER','WP DELETE BOOKMARK','WP COMPUTE FORMULAS','WP Bookmark range','WP Add picture','Windows Ctrl down','Windows Alt down','Window process','WINDOW LIST','Window kind','WEB Validate digest','WEB STOP SERVER','WEB START SERVER','WEB SET ROOT FOLDER','WEB SET OPTION','WEB SET HTTP HEADER','WEB SET HOME PAGE','WEB SERVICE SET PARAMETER','WEB SERVICE SET OPTION','WEB SERVICE GET RESULT','WEB SERVICE Get info','WEB SERVICE CALL','WEB SERVICE AUTHENTICATE','WEB Server list','WEB Server','WEB SEND TEXT','WEB SEND RAW DATA','WEB SEND HTTP REDIRECT','WEB SEND FILE','WEB SEND BLOB','WEB Is server running','WEB Is secured connection','WEB GET VARIABLES','WEB GET STATISTICS','WEB Get session process count','WEB GET SESSION EXPIRATION','WEB Get server info','WEB GET OPTION','WEB GET HTTP HEADER','WEB GET HTTP BODY','WEB Get current session ID','WEB Get body part count','WEB GET BODY PART','WEB CLOSE SESSION','WA STOP LOADING URL','WA SET URL FILTERS','WA SET PREFERENCE','WA SET PAGE TEXT SMALLER','WA SET PAGE TEXT LARGER','WA SET PAGE CONTENT','WA SET EXTERNAL LINKS FILTERS','WA Run offscreen area','WA REFRESH CURRENT URL','WA OPEN WEB INSPECTOR','WA OPEN URL','WA OPEN FORWARD URL','WA OPEN BACK URL','WA GET URL HISTORY','WA GET URL FILTERS','WA GET PREFERENCE','WA Get page title','WA Get page content','WA GET LAST URL ERROR','WA Get last filtered URL','WA GET EXTERNAL LINKS FILTERS','WA Get current URL','WA Forward URL available','WA EXECUTE JAVASCRIPT FUNCTION','WA Evaluate JavaScript','WA Create URL history menu','WA Back URL available','VOLUME LIST','VOLUME ATTRIBUTES','Version type','Verify password hash','VERIFY DATA FILE','VERIFY CURRENT DATA FILE','Variance','VARIABLE TO VARIABLE','VARIABLE TO BLOB','Value type','VALIDATE TRANSACTION','Validate password','USERS TO BLOB','User in group','USE SET','USE NAMED SELECTION','USE ENTITY SELECTION','USE CHARACTER SET','Uppercase','UNREGISTER CLIENT','UNLOAD RECORD','UNION','Undefined','Type','TRUNCATE TABLE','Trunc','True','TRIGGER PROPERTIES','Trigger level','Trigger event','TRANSFORM PICTURE','Transaction level','TRACE','Tool bar height','Timestamp','Time string','Time','Tickcount','This','TEXT TO DOCUMENT','TEXT TO BLOB','TEXT TO ARRAY','Test semaphore','Test path name','Temporary folder','Tan','Table name','Table','System folder','SVG SHOW ELEMENT','SVG SET ATTRIBUTE','SVG GET ATTRIBUTE','SVG Find element IDs by rect','SVG Find element ID by coordinates','SVG EXPORT TO PICTURE','SUSPEND TRANSACTION','Super','Sum squares','Sum','Subtotal','Substring','Structure file','STRING LIST TO ARRAY','String','Storage','STOP SQL SERVER','STOP MONITORING ACTIVITY','Std deviation','START TRANSACTION','START SQL SERVER','START MONITORING ACTIVITY','ST SET TEXT','ST SET PLAIN TEXT','ST SET OPTIONS','ST SET ATTRIBUTES','ST INSERT URL','ST INSERT EXPRESSION','ST GET URL','ST Get text','ST Get plain text','ST GET OPTIONS','ST Get expression','ST Get content type','ST GET ATTRIBUTES','ST FREEZE EXPRESSIONS','ST COMPUTE EXPRESSIONS','Square root','SQL SET PARAMETER','SQL SET OPTION','SQL LOGOUT','SQL LOGIN','SQL LOAD RECORD','SQL GET OPTION','SQL GET LAST ERROR','SQL EXPORT SELECTION','SQL EXPORT DATABASE','SQL EXECUTE SCRIPT','SQL EXECUTE','SQL End selection','SQL CANCEL LOAD','Split string','SPELL SET CURRENT DICTIONARY','SPELL GET DICTIONARY LIST','SPELL Get current dictionary','SPELL CHECKING','SPELL CHECK TEXT','SPELL ADD TO USER DICTIONARY','SORT LIST','SORT ARRAY','SOAP SEND FAULT','SOAP Request','SOAP REJECT NEW REQUESTS','SOAP Get info','SOAP DECLARATION','SMTP New transporter','Size of array','Sin','SHOW WINDOW','SHOW TOOL BAR','SHOW PROCESS','SHOW ON DISK','SHOW MENU BAR','Shift down','SET WINDOW TITLE','SET WINDOW RECT','Set user properties','SET USER ALIAS','SET UPDATE FOLDER','SET TIMER','SET TIMEOUT','SET TEXT TO PASTEBOARD','SET TABLE TITLES','SET TABLE CACHE PRIORITY','SET SCREEN DEPTH','SET RECENT FONTS','SET REAL COMPARISON LEVEL','SET QUERY LIMIT','SET QUERY DESTINATION','SET QUERY AND LOCK','SET PROCESS VARIABLE','SET PRINTABLE MARGIN','SET PRINT PREVIEW','SET PRINT OPTION','SET PRINT MARKER','SET PLUGIN ACCESS','SET PICTURE TO PASTEBOARD','SET PICTURE TO LIBRARY','SET PICTURE METADATA','SET PICTURE FILE NAME','SET MENU ITEM STYLE','SET MENU ITEM SHORTCUT','SET MENU ITEM PROPERTY','SET MENU ITEM PARAMETER','SET MENU ITEM METHOD','SET MENU ITEM MARK','SET MENU ITEM ICON','SET MENU ITEM','SET MENU BAR','SET MACRO PARAMETER','SET LIST PROPERTIES','SET LIST ITEM PROPERTIES','SET LIST ITEM PARAMETER','SET LIST ITEM ICON','SET LIST ITEM FONT','SET LIST ITEM','SET INDEX CACHE PRIORITY','SET INDEX','Set group properties','SET FILE TO PASTEBOARD','SET FIELD VALUE NULL','SET FIELD TITLES','SET FIELD RELATION','SET EXTERNAL DATA PATH','SET ENVIRONMENT VARIABLE','SET DRAG ICON','SET DOCUMENT SIZE','SET DOCUMENT PROPERTIES','SET DOCUMENT POSITION','SET DEFAULT CENTURY','SET DATABASE PARAMETER','SET DATABASE LOCALIZATION','SET CURSOR','SET CURRENT PRINTER','SET CHANNEL','SET CACHE SIZE','SET BLOBS CACHE PRIORITY','SET BLOB SIZE','SET AUTOMATIC RELATIONS','SET ASSERT ENABLED','SET ALLOWED METHODS','SET ABOUT','Sequence number','SEND VARIABLE','SEND RECORD','SEND PACKET','SEND MESSAGE TO REMOTE USER','Semaphore','Self','Selection to JSON','SELECTION TO ARRAY','SELECTION RANGE TO ARRAY','Selected record number','Selected list items','Select RGB color','SELECT LOG FILE','SELECT LIST ITEMS BY REFERENCE','SELECT LIST ITEMS BY POSITION','Select folder','Select document','Screen width','Screen height','SCREEN DEPTH','SCREEN COORDINATES','SCAN INDEX','SAX SET XML DECLARATION','SAX OPEN XML ELEMENT ARRAYS','SAX OPEN XML ELEMENT','SAX GET XML PROCESSING INSTRUCTION','SAX Get XML node','SAX GET XML ENTITY','SAX GET XML ELEMENT VALUE','SAX GET XML ELEMENT','SAX GET XML DOCUMENT VALUES','SAX GET XML COMMENT','SAX GET XML CDATA','SAX CLOSE XML ELEMENT','SAX ADD XML ELEMENT VALUE','SAX ADD XML DOCTYPE','SAX ADD XML COMMENT','SAX ADD XML CDATA','SAX ADD PROCESSING INSTRUCTION','SAVE VARIABLES','SAVE SET','SAVE RELATED ONE','SAVE RECORD','SAVE LIST','Round','Right click','RESUME TRANSACTION','RESUME PROCESS','RESUME INDEXES','RESTORE','RESTART 4D','RESOURCE TYPE LIST','RESOURCE LIST','RESOLVE POINTER','RESOLVE ALIAS','RESIZE FORM WINDOW','Request','Replace string','REMOVE PICTURE FROM LIBRARY','REMOVE FROM SET','RELOAD EXTERNAL DATA','RELEASE MENU','RELATE ONE SELECTION','RELATE ONE','RELATE MANY SELECTION','RELATE MANY','REJECT NEW REMOTE CONNECTIONS','REJECT','Register data key','REGISTER CLIENT','REGENERATE MISSING TABLE','Refresh license','REDUCE SELECTION','REDRAW WINDOW','REDRAW','Records in table','Records in set','Records in selection','Record number','RECEIVE VARIABLE','RECEIVE RECORD','RECEIVE PACKET','RECEIVE BUFFER','REAL TO BLOB','READ WRITE','READ PICTURE FILE','Read only state','READ ONLY','Random','QUIT 4D','QUERY WITH ARRAY','QUERY SELECTION WITH ARRAY','QUERY SELECTION BY FORMULA','QUERY SELECTION BY ATTRIBUTE','QUERY SELECTION','QUERY BY SQL','QUERY BY FORMULA','QUERY BY EXAMPLE','QUERY BY ATTRIBUTE','QUERY','QR SET TOTALS SPACING','QR SET TOTALS DATA','QR SET TEXT PROPERTY','QR SET SORTS','QR SET SELECTION','QR SET REPORT TABLE','QR SET REPORT KIND','QR SET INFO ROW','QR SET INFO COLUMN','QR SET HTML TEMPLATE','QR SET HEADER AND FOOTER','QR SET DOCUMENT PROPERTY','QR SET DESTINATION','QR SET BORDERS','QR SET AREA PROPERTY','QR RUN','QR REPORT TO BLOB','QR REPORT','QR ON COMMAND','QR New offscreen area','QR NEW AREA','QR MOVE COLUMN','QR INSERT COLUMN','QR GET TOTALS SPACING','QR GET TOTALS DATA','QR Get text property','QR GET SORTS','QR GET SELECTION','QR Get report table','QR Get report kind','QR Get info row','QR GET INFO COLUMN','QR Get HTML template','QR GET HEADER AND FOOTER','QR Get drop column','QR Get document property','QR GET DESTINATION','QR Get command status','QR GET BORDERS','QR Get area property','QR Find column','QR EXECUTE COMMAND','QR DELETE OFFSCREEN AREA','QR DELETE COLUMN','QR Count columns','QR BLOB TO REPORT','PUSH RECORD','Process state','PROCESS PROPERTIES','Process number','Process aborted','PROCESS 4D TAGS','Printing page','PRINTERS LIST','Print settings to BLOB','PRINT SETTINGS','PRINT SELECTION','PRINT RECORD','PRINT OPTION VALUES','Print object','PRINT LABEL','Print form','PREVIOUS RECORD','POST OUTSIDE CALL','POST KEY','POST EVENT','POST CLICK','Position','POP3 New transporter','Pop up menu','POP RECORD','PLUGIN LIST','PLAY','PICTURE TO BLOB','Picture size','PICTURE PROPERTIES','PICTURE LIBRARY LIST','PICTURE CODEC LIST','PHP SET OPTION','PHP GET OPTION','PHP GET FULL RESPONSE','PHP Execute','PAUSE PROCESS','PAUSE INDEXES','Path to object','Pasteboard data size','Parse formula','PAGE BREAK','Outside call','ORDER BY FORMULA','ORDER BY ATTRIBUTE','ORDER BY','Open window','OPEN URL','OPEN SETTINGS WINDOW','OPEN SECURITY CENTER','Open resource file','OPEN PRINTING JOB','Open form window','OPEN FONT PICKER','Open document','Open datastore','OPEN DATABASE','OPEN DATA FILE','OPEN COLOR PICKER','OPEN ADMINISTRATION WINDOW','ONE RECORD SELECT','ON EVENT CALL','ON ERR CALL','OLD RELATED ONE','OLD RELATED MANY','Old','Object to path','OBJECT SET VISIBLE','OBJECT SET VERTICAL ALIGNMENT','OBJECT SET TITLE','OBJECT SET THREE STATES CHECKBOX','OBJECT SET TEXT ORIENTATION','OBJECT SET SUBFORM','OBJECT SET STYLE SHEET','OBJECT SET SHORTCUT','OBJECT SET SCROLLBAR','OBJECT SET SCROLL POSITION','OBJECT SET RGB COLORS','OBJECT SET RESIZING OPTIONS','OBJECT SET PRINT VARIABLE FRAME','OBJECT SET PLACEHOLDER','OBJECT SET MULTILINE','OBJECT SET MINIMUM VALUE','OBJECT SET MAXIMUM VALUE','OBJECT SET LIST BY REFERENCE','OBJECT SET LIST BY NAME','OBJECT SET KEYBOARD LAYOUT','OBJECT SET INDICATOR TYPE','OBJECT SET HORIZONTAL ALIGNMENT','OBJECT SET HELP TIP','OBJECT SET FORMAT','OBJECT SET FONT STYLE','OBJECT SET FONT SIZE','OBJECT SET FONT','OBJECT SET FOCUS RECTANGLE INVISIBLE','OBJECT SET FILTER','OBJECT SET EVENTS','OBJECT SET ENTERABLE','OBJECT SET ENABLED','OBJECT SET DRAG AND DROP OPTIONS','OBJECT SET DATA SOURCE','OBJECT SET CORNER RADIUS','OBJECT SET COORDINATES','OBJECT SET CONTEXT MENU','OBJECT SET BORDER STYLE','OBJECT SET AUTO SPELLCHECK','OBJECT SET ACTION','OBJECT MOVE','OBJECT Is styled text','OBJECT Get visible','OBJECT Get vertical alignment','OBJECT Get type','OBJECT Get title','OBJECT Get three states checkbox','OBJECT Get text orientation','OBJECT GET SUBFORM CONTAINER SIZE','OBJECT GET SUBFORM','OBJECT Get style sheet','OBJECT GET SHORTCUT','OBJECT GET SCROLLBAR','OBJECT GET SCROLL POSITION','OBJECT GET RGB COLORS','OBJECT GET RESIZING OPTIONS','OBJECT GET PRINT VARIABLE FRAME','OBJECT Get pointer','OBJECT Get placeholder','OBJECT Get name','OBJECT Get multiline','OBJECT GET MINIMUM VALUE','OBJECT GET MAXIMUM VALUE','OBJECT Get list reference','OBJECT Get list name','OBJECT Get keyboard layout','OBJECT Get indicator type','OBJECT Get horizontal alignment','OBJECT Get help tip','OBJECT Get format','OBJECT Get font style','OBJECT Get font size','OBJECT Get font','OBJECT Get focus rectangle invisible','OBJECT Get filter','OBJECT GET EVENTS','OBJECT Get enterable','OBJECT Get enabled','OBJECT GET DRAG AND DROP OPTIONS','OBJECT Get data source','OBJECT Get corner radius','OBJECT GET COORDINATES','OBJECT Get context menu','OBJECT Get border style','OBJECT GET BEST SIZE','OBJECT Get auto spellcheck','OBJECT Get action','OBJECT DUPLICATE','OB Values','OB SET NULL','OB SET ARRAY','OB SET','OB REMOVE','OB Keys','OB Is empty','OB Is defined','OB Instance of','OB Get type','OB GET PROPERTY NAMES','OB GET ARRAY','OB Get','OB Entries','OB Copy','OB Class','Num','Null','NOTIFY RESOURCES FOLDER MODIFICATION','Not','NO DEFAULT TABLE','Next window','NEXT RECORD','New signal','New shared object','New shared collection','New process','New object','New log file','New list','New data key','New collection','MULTI SORT ARRAY','MOVE DOCUMENT','Month of','MODIFY SELECTION','MODIFY RECORD','Modified record','Modified','Mod','MOBILE APP REFRESH SESSIONS','MINIMIZE WINDOW','Min','Milliseconds','METHOD SET COMMENTS','METHOD SET CODE','METHOD SET ATTRIBUTES','METHOD SET ATTRIBUTE','METHOD SET ACCESS MODE','METHOD RESOLVE PATH','METHOD OPEN PATH','METHOD GET PATHS FORM','METHOD GET PATHS','METHOD Get path','METHOD GET NAMES','METHOD GET MODIFICATION DATE','METHOD GET FOLDERS','METHOD GET COMMENTS','METHOD GET CODE','METHOD GET ATTRIBUTES','METHOD Get attribute','Method called on event','Method called on error','MESSAGES ON','MESSAGES OFF','MESSAGE','Menu selected','Menu bar screen','Menu bar height','MAXIMIZE WINDOW','Max','Match regex','MAIL New attachment','MAIL Convert to MIME','MAIL Convert from MIME','Macintosh option down','Macintosh control down','Macintosh command down','Lowercase','LONGINT TO BLOB','LONGINT ARRAY FROM SELECTION','LOG FILE TO JSON','Log file','LOG EVENT','Log','LOCKED BY','Locked','LOAD VARIABLES','LOAD SET','LOAD RECORD','Load list','Load 4D View document','LISTBOX SORT COLUMNS','LISTBOX SET TABLE SOURCE','LISTBOX SET STATIC COLUMNS','LISTBOX SET ROWS HEIGHT','LISTBOX SET ROW HEIGHT','LISTBOX SET ROW FONT STYLE','LISTBOX SET ROW COLOR','LISTBOX SET PROPERTY','LISTBOX SET LOCKED COLUMNS','LISTBOX SET HIERARCHY','LISTBOX SET HEADERS HEIGHT','LISTBOX SET GRID COLOR','LISTBOX SET GRID','LISTBOX SET FOOTERS HEIGHT','LISTBOX SET FOOTER CALCULATION','LISTBOX SET COLUMN WIDTH','LISTBOX SET COLUMN FORMULA','LISTBOX SET AUTO ROW HEIGHT','LISTBOX SET ARRAY','LISTBOX SELECT ROWS','LISTBOX SELECT ROW','LISTBOX SELECT BREAK','LISTBOX MOVED ROW NUMBER','LISTBOX MOVED COLUMN NUMBER','LISTBOX MOVE COLUMN','LISTBOX INSERT ROWS','LISTBOX INSERT COLUMN FORMULA','LISTBOX INSERT COLUMN','LISTBOX GET TABLE SOURCE','LISTBOX Get static columns','LISTBOX Get rows height','LISTBOX Get row height','LISTBOX Get row font style','LISTBOX Get row color as number','LISTBOX Get row color','LISTBOX Get property','LISTBOX GET PRINT INFORMATION','LISTBOX GET OBJECTS','LISTBOX Get number of rows','LISTBOX Get number of columns','LISTBOX Get locked columns','LISTBOX GET HIERARCHY','LISTBOX Get headers height','LISTBOX GET GRID COLORS','LISTBOX GET GRID','LISTBOX Get footers height','LISTBOX Get footer calculation','LISTBOX Get column width','LISTBOX Get column formula','LISTBOX GET CELL POSITION','LISTBOX GET CELL COORDINATES','LISTBOX Get auto row height','LISTBOX GET ARRAYS','LISTBOX Get array','LISTBOX EXPAND','LISTBOX DUPLICATE COLUMN','LISTBOX DELETE ROWS','LISTBOX DELETE COLUMN','LISTBOX COLLAPSE','LIST TO BLOB','LIST TO ARRAY','LIST OF STYLE SHEETS','LIST OF CHOICE LISTS','List item position','List item parent','Level','Length','LDAP SEARCH ALL','LDAP Search','LDAP LOGOUT','LDAP LOGIN','LAUNCH EXTERNAL PROCESS','LAST RECORD','KILL WORKER','Keystroke','JSON Validate','JSON TO SELECTION','JSON Stringify array','JSON Stringify','JSON Resolve pointers','JSON PARSE ARRAY','JSON Parse','Is Windows','Is waiting mouse up','Is user deleted','Is table number valid','Is record loaded','Is picture file','Is nil pointer','Is new record','Is macOS','Is license available','Is in set','Is in print preview','Is field value Null','Is field number valid','Is data file locked','Is compiled mode','Is a variable','Is a list','INVOKE ACTION','INTERSECTION','INTEGRATE MIRROR LOG FILE','INTEGER TO BLOB','Int','Insert string','INSERT MENU ITEM','INSERT IN LIST','INSERT IN BLOB','INSERT IN ARRAY','In transaction','In header','In footer','In break','IMPORT TEXT','IMPORT SYLK','IMPORT STRUCTURE','IMPORT DIF','IMPORT DATA','IDLE','HTTP SET OPTION','HTTP SET CERTIFICATES FOLDER','HTTP Request','HTTP GET OPTION','HTTP Get certificates folder','HTTP Get','HTTP AUTHENTICATE','HIGHLIGHT TEXT','HIGHLIGHT RECORDS','HIDE WINDOW','HIDE TOOL BAR','HIDE PROCESS','HIDE MENU BAR','GRAPH SETTINGS','GRAPH','GOTO XY','GOTO SELECTED RECORD','GOTO RECORD','GOTO OBJECT','Get window title','GET WINDOW RECT','GET USER PROPERTIES','GET USER LIST','Get text resource','GET TEXT KEYWORDS','Get text from pasteboard','GET TABLE TITLES','GET TABLE PROPERTIES','Get table fragmentation','Get system info','GET SYSTEM FORMAT','Get subrecord key','GET STYLE SHEET INFO','Get string resource','GET SERIAL PORT MAPPING','GET SERIAL INFORMATION','Get selected menu item parameter','GET RESTORE INFORMATION','Get resource properties','Get resource name','GET RESOURCE','GET RELATION PROPERTIES','GET REGISTERED CLIENTS','Get query limit','GET QUERY DESTINATION','GET PROCESS VARIABLE','Get process activity','Get printed height','GET PRINTABLE MARGIN','GET PRINTABLE AREA','Get print preview','GET PRINT OPTION','Get print marker','Get pointer','Get plugin access','GET PICTURE RESOURCE','GET PICTURE METADATA','GET PICTURE KEYWORDS','GET PICTURE FROM PASTEBOARD','GET PICTURE FROM LIBRARY','GET PICTURE FORMATS','Get picture file name','GET PASTEBOARD DATA TYPE','GET PASTEBOARD DATA','GET MOUSE','Get Monitored Activity','GET MISSING TABLE NAMES','Get menu title','GET MENU ITEMS','Get menu item style','GET MENU ITEM PROPERTY','Get menu item parameter','Get menu item modifiers','Get menu item method','Get menu item mark','Get menu item key','GET MENU ITEM ICON','Get menu item','Get menu bar reference','GET MEMORY STATISTICS','GET MACRO PARAMETER','Get locked records info','Get localized string','Get localized document path','GET LIST PROPERTIES','GET LIST ITEM PROPERTIES','GET LIST ITEM PARAMETER ARRAYS','GET LIST ITEM PARAMETER','GET LIST ITEM ICON','Get list item font','GET LIST ITEM','Get license info','Get last update log path','Get last table number','Get last query plan','Get last query path','Get last field number','GET LAST ERROR STACK','Get indexed string','GET ICON RESOURCE','GET HIGHLIGHTED RECORDS','GET HIGHLIGHT','GET GROUP PROPERTIES','GET GROUP LIST','Get file from pasteboard','GET FIELD TITLES','GET FIELD RELATION','GET FIELD PROPERTIES','GET FIELD ENTRY PROPERTIES','Get external data path','Get edited text','Get document size','GET DOCUMENT PROPERTIES','Get document position','GET DOCUMENT ICON','Get default user','Get database parameter','Get database measures','Get database localization','GET DATA SOURCE LIST','Get current printer','Get current data source','Get call chain','Get cache size','GET BACKUP INFORMATION','GET AUTOMATIC RELATIONS','Get assert enabled','Get application info','GET ALLOWED METHODS','Get adjusted table cache priority','Get adjusted index cache priority','Get adjusted blobs cache priority','GET ACTIVITY SNAPSHOT','Get action info','Get 4D folder','Get 4D file','Generate UUID','Generate password hash','GENERATE ENCRYPTION KEYPAIR','Generate digest','GENERATE CERTIFICATE REQUEST','Frontmost window','Frontmost process','Formula from string','Formula','FORM UNLOAD','FORM SET VERTICAL RESIZING','FORM SET SIZE','FORM SET OUTPUT','FORM SET INPUT','FORM SET HORIZONTAL RESIZING','FORM SET ENTRY ORDER','FORM SCREENSHOT','FORM PREVIOUS PAGE','FORM NEXT PAGE','FORM LOAD','FORM LAST PAGE','FORM GOTO PAGE','FORM GET VERTICAL RESIZING','FORM GET PROPERTIES','FORM GET OBJECTS','FORM GET NAMES','FORM GET HORIZONTAL RESIZING','FORM GET ENTRY ORDER','FORM Get current page','FORM FIRST PAGE','Form event code','FORM Event','FORM Convert to dynamic','Form','FONT STYLE LIST','FONT LIST','Font file','FOLDER LIST','Folder','Focus object','FLUSH CACHE','FIRST RECORD','Find window','Find in sorted array','Find in list','Find in field','Find in array','FILTER KEYSTROKE','FILTER EVENT','File','Field name','Field','False','EXPORT TEXT','EXPORT SYLK','Export structure file','EXPORT STRUCTURE','EXPORT DIF','EXPORT DATA','EXPAND BLOB','Exp','Execute on server','EXECUTE ON CLIENT','EXECUTE METHOD IN SUBFORM','EXECUTE METHOD','EXECUTE FORMULA','Euro converter','ERASE WINDOW','Equal pictures','End selection','Encrypt data file','ENCRYPT BLOB','ENABLE MENU ITEM','EDIT ITEM','EDIT FORMULA','EDIT ACCESS','Dynamic pop up menu','DUPLICATE RECORD','ds','DROP REMOTE USER','Drop position','DRAG WINDOW','DOM SET XML ELEMENT VALUE','DOM SET XML ELEMENT NAME','DOM SET XML DECLARATION','DOM SET XML ATTRIBUTE','DOM REMOVE XML ELEMENT','DOM REMOVE XML ATTRIBUTE','DOM Parse XML variable','DOM Parse XML source','DOM Insert XML element','DOM Get XML information','DOM GET XML ELEMENT VALUE','DOM GET XML ELEMENT NAME','DOM Get XML element','DOM Get XML document ref','DOM GET XML CHILD NODES','DOM GET XML ATTRIBUTE BY NAME','DOM GET XML ATTRIBUTE BY INDEX','DOM Get root XML element','DOM Get previous sibling XML element','DOM Get parent XML element','DOM Get next sibling XML element','DOM Get last child XML element','DOM Get first child XML element','DOM Find XML element by ID','DOM Find XML element','DOM EXPORT TO VAR','DOM EXPORT TO FILE','DOM Create XML Ref','DOM Create XML element arrays','DOM Create XML element','DOM Count XML elements','DOM Count XML attributes','DOM CLOSE XML','DOM Append XML element','DOM Append XML child node','Document to text','DOCUMENT TO BLOB','DOCUMENT LIST','DISTINCT VALUES','DISTINCT ATTRIBUTE VALUES','DISTINCT ATTRIBUTE PATHS','Displayed line number','DISPLAY SELECTION','DISPLAY RECORD','DISPLAY NOTIFICATION','Discover data key','DISABLE MENU ITEM','DIFFERENCE','DIALOG','DESCRIBE QUERY EXECUTION','DELETE USER','Delete string','DELETE SELECTION','DELETE RECORD','DELETE MENU ITEM','DELETE INDEX','DELETE FROM LIST','DELETE FROM BLOB','DELETE FROM ARRAY','DELETE FOLDER','DELETE DOCUMENT','DELAY PROCESS','DEFAULT TABLE','DECRYPT BLOB','Dec','Deactivated','Day of','Day number','Date','Data file encryption status','Data file','CUT NAMED SELECTION','Current user','Current time','Current system user','Current process name','Current process','Current method path','Current method name','Current machine','Current form window','Current form table','Current form name','Current default table','Current date','Current client authentication','cs','CREATE THUMBNAIL','CREATE SET FROM ARRAY','CREATE SET','CREATE SELECTION FROM ARRAY','CREATE RELATED ONE','CREATE RECORD','Create menu','CREATE INDEX','CREATE FOLDER','Create entity selection','CREATE EMPTY SET','Create document','CREATE DATA FILE','CREATE ALIAS','Count users','Count user processes','Count tasks','Count screens','Count parameters','Count menus','Count menu items','Count list items','Count in array','Cos','COPY SET','COPY NAMED SELECTION','Copy list','COPY DOCUMENT','COPY BLOB','COPY ARRAY','Convert to text','CONVERT PICTURE','Convert path system to POSIX','Convert path POSIX to system','CONVERT FROM TEXT','CONVERT COORDINATES','Contextual click','CONFIRM','COMPRESS BLOB','COMPONENT LIST','Compact data file','Command name','COMBINE PICTURES','COLLECTION TO ARRAY','CLOSE WINDOW','CLOSE RESOURCE FILE','CLOSE PRINTING JOB','CLOSE DOCUMENT','Clickcount','CLEAR VARIABLE','CLEAR SET','CLEAR SEMAPHORE','CLEAR PASTEBOARD','CLEAR NAMED SELECTION','CLEAR LIST','Choose','CHECK LOG FILE','Character code','Char','Change string','CHANGE PASSWORD','CHANGE LICENSES','CHANGE CURRENT USER','Caps lock down','CANCEL TRANSACTION','CANCEL','CALL WORKER','CALL SUBFORM CONTAINER','CALL FORM','Cache info','BUILD APPLICATION','BRING TO FRONT','BREAK LEVEL','BOOLEAN ARRAY FROM SET','Bool','BLOB TO VARIABLE','BLOB TO USERS','BLOB to text','BLOB to real','BLOB to print settings','BLOB TO PICTURE','BLOB to longint','BLOB to list','BLOB to integer','BLOB TO DOCUMENT','BLOB size','BLOB PROPERTIES','Before selection','Before','BEEP','BASE64 ENCODE','BASE64 DECODE','BACKUP','Average','Asserted','ASSERT','ARRAY TO SELECTION','ARRAY TO LIST','ARRAY TO COLLECTION','ARRAY TIME','ARRAY TEXT','ARRAY REAL','ARRAY POINTER','ARRAY PICTURE','ARRAY OBJECT','ARRAY LONGINT','ARRAY INTEGER','ARRAY DATE','ARRAY BOOLEAN','ARRAY BLOB','Arctan','APPLY TO SELECTION','Application version','Application type','Application file','APPEND TO LIST','APPEND TO ARRAY','APPEND MENU ITEM','Append document','APPEND DATA TO PASTEBOARD','ALL RECORDS','ALERT','After','ADJUST TABLE CACHE PRIORITY','ADJUST INDEX CACHE PRIORITY','ADJUST BLOBS CACHE PRIORITY','ADD TO SET','Add to date','ADD RECORD','Active transaction','Activated','ACCUMULATE','ACCEPT','Abs','ABORT PROCESS BY ID','ABORT','4D','_O_XSLT SET PARAMETER','_O_XSLT GET ERROR','_O_XSLT APPLY TRANSFORMATION','_O_Win to Mac','_O_Web Context','_O_USE INTERNAL DATABASE','_O_USE EXTERNAL DATABASE','_O_SET WEB TIMEOUT','_O_SET WEB DISPLAY LIMITS','_O_SET TEXT RESOURCE','_O_SET STRING RESOURCE','_O_SET RESOURCE PROPERTIES','_O_SET RESOURCE NAME','_O_SET RESOURCE','_O_SET PLATFORM INTERFACE','_O_SET PICTURE RESOURCE','_O_SET DOCUMENT TYPE','_O_SET DOCUMENT CREATOR','_O_SET CGI EXECUTABLE','_O_SAVE PICTURE TO FILE','_O_REDRAW LIST','_O_Records in subselection','_O_QUERY SUBRECORDS','_O_QT LOAD COMPRESS PICTURE FROM FILE','_O_QT COMPRESS PICTURE FILE','_O_QT COMPRESS PICTURE','_O_PREVIOUS SUBRECORD','_O_PLATFORM PROPERTIES','_O_PICTURE TYPE LIST','_O_PICTURE TO GIF','_O_PAGE SETUP','_O_ORDER SUBRECORDS BY','_O_Open external window','_O_OBJECT SET COLOR','_O_OBJECT Get action','_O_NO TRACE','_O_NEXT SUBRECORD','_O_MODIFY SUBRECORD','_O_Mobile Return selection','_O_MAP FILE TYPES','_O_Mac to Win','_O_Mac to ISO','_O_LIST USER FORMS','_O_LAST SUBRECORD','_O_ISO to Mac','_O_INVERT BACKGROUND','_O_INTEGRATE LOG FILE','_O_IMPORT ODBC','_O_GRAPH TABLE','_O_Get platform interface','_O_Get component resource ID','_O_Gestalt','_O_FORM GET PARAMETER','_O_Font number','_O_Font name','_O_FIRST SUBRECORD','_O_EXPORT ODBC','_O_End subselection','_O_ENABLE BUTTON','_O_EDIT FORM','_O_During','_O_DRAG AND DROP PROPERTIES','_o_Document type','_o_Document creator','_O_DISABLE BUTTON','_O_DELETE USER FORM','_O_DELETE SUBRECORD','_O_DELETE RESOURCE','_O_DATA SEGMENT LIST','_O_CREATE USER FORM','_O_CREATE SUBRECORD','_O_Create resource file','_O_Convert case','_O_C_STRING','_O_C_INTEGER','_O_C_GRAPH','_O_Before subselection','_O_ARRAY TO STRING LIST','_O_ARRAY STRING','_O_APPLY TO SUBSELECTION','_O_ALL SUBRECORDS','_O_ADD SUBRECORD','_O_ADD DATA SEGMENT'])
  var definingKeywords = wordSet(['var','Function','Class extends','Class constructor','C_VARIANT','C_TIME','C_TEXT','C_REAL','C_POINTER','C_PICTURE','C_OBJECT','C_LONGINT','C_DATE','C_COLLECTION','C_BOOLEAN','C_BLOB'])
  var atoms = wordSet(["true","false","nil","self","super","_"])
  var types = wordSet(["Array","Bool","Character","Dictionary","Double","Float","Int","Int8","Int16","Int32","Int64","Never","Optional","Set","String", "UInt8","UInt16","UInt32","UInt64","Void"])
  var operators = "+-/*%=|&<>~^?!"
  var punc = ":;,.(){}[]"
  var binary = /^\-?0b[01][01_]*/
  var octal = /^\-?0o[0-7][0-7_]*/
  var hexadecimal = /^\-?0x[\dA-Fa-f][\dA-Fa-f_]*(?:(?:\.[\dA-Fa-f][\dA-Fa-f_]*)?[Pp]\-?\d[\d_]*)?/
  var decimal = /^\-?\d[\d_]*(?:\.\d[\d_]*)?(?:[Ee]\-?\d[\d_]*)?/
  var identifier = /^\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1/
  var property = /^\.(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/
  var instruction = /^\#[A-Za-z]+/
  var attribute = /^@(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/
  //var regexp = /^\/(?!\s)(?:\/\/)?(?:\\.|[^\/])+\//

  function tokenBase(stream, state, prev) {
    if (stream.sol()) state.indented = stream.indentation()
    if (stream.eatSpace()) return null

    var ch = stream.peek()
    if (ch == "/") {
      if (stream.match("//")) {
        stream.skipToEnd()
        return "comment"
      }
      if (stream.match("/*")) {
        state.tokenize.push(tokenComment)
        return tokenComment(stream, state)
      }
    }
    if (stream.match(instruction)) return "builtin"
    if (stream.match(attribute)) return "attribute"
    if (stream.match(binary)) return "number"
    if (stream.match(octal)) return "number"
    if (stream.match(hexadecimal)) return "number"
    if (stream.match(decimal)) return "number"
    if (stream.match(property)) return "property"
    if (operators.indexOf(ch) > -1) {
      stream.next()
      return "operator"
    }
    if (punc.indexOf(ch) > -1) {
      stream.next()
      stream.match("..")
      return "punctuation"
    }
    var stringMatch
    if (stringMatch = stream.match(/("""|"|')/)) {
      var tokenize = tokenString.bind(null, stringMatch[0])
      state.tokenize.push(tokenize)
      return tokenize(stream, state)
    }

    if (stream.match(identifier)) {
      var ident = stream.current()
      if (types.hasOwnProperty(ident)) return "variable-2"
      if (atoms.hasOwnProperty(ident)) return "atom"
      if (keywords.hasOwnProperty(ident)) {
        if (definingKeywords.hasOwnProperty(ident))
          state.prev = "define"
        return "keyword"
      }
      if (prev == "define") return "def"
      return "variable"
    }

    stream.next()
    return null
  }

  function tokenUntilClosingParen() {
    var depth = 0
    return function(stream, state, prev) {
      var inner = tokenBase(stream, state, prev)
      if (inner == "punctuation") {
        if (stream.current() == "(") ++depth
        else if (stream.current() == ")") {
          if (depth == 0) {
            stream.backUp(1)
            state.tokenize.pop()
            return state.tokenize[state.tokenize.length - 1](stream, state)
          }
          else --depth
        }
      }
      return inner
    }
  }

  function tokenString(openQuote, stream, state) {
    var singleLine = openQuote.length == 1
    var ch, escaped = false
    while (ch = stream.peek()) {
      if (escaped) {
        stream.next()
        if (ch == "(") {
          state.tokenize.push(tokenUntilClosingParen())
          return "string"
        }
        escaped = false
      } else if (stream.match(openQuote)) {
        state.tokenize.pop()
        return "string"
      } else {
        stream.next()
        escaped = ch == "\\"
      }
    }
    if (singleLine) {
      state.tokenize.pop()
    }
    return "string"
  }

  function tokenComment(stream, state) {
    var ch
    while (true) {
      stream.match(/^[^/*]+/, true)
      ch = stream.next()
      if (!ch) break
      if (ch === "/" && stream.eat("*")) {
        state.tokenize.push(tokenComment)
      } else if (ch === "*" && stream.eat("/")) {
        state.tokenize.pop()
      }
    }
    return "comment"
  }

  function Context(prev, align, indented) {
    this.prev = prev
    this.align = align
    this.indented = indented
  }

  function pushContext(state, stream) {
    var align = stream.match(/^\s*($|\/[\/\*])/, false) ? null : stream.column() + 1
    state.context = new Context(state.context, align, state.indented)
  }

  function popContext(state) {
    if (state.context) {
      state.indented = state.context.indented
      state.context = state.context.prev
    }
  }

  CodeMirror.defineMode("4d", function(config) {
    return {
      startState: function() {
        return {
          prev: null,
          context: null,
          indented: 0,
          tokenize: []
        }
      },

      token: function(stream, state) {
        var prev = state.prev
        state.prev = null
        var tokenize = state.tokenize[state.tokenize.length - 1] || tokenBase
        var style = tokenize(stream, state, prev)
        if (!style || style == "comment") state.prev = prev
        else if (!state.prev) state.prev = style

        if (style == "punctuation") {
          var bracket = /[\(\[\{]|([\]\)\}])/.exec(stream.current())
          if (bracket) (bracket[1] ? popContext : pushContext)(state, stream)
        }

        return style
      },

      indent: function(state, textAfter) {
        var cx = state.context
        if (!cx) return 0
        var closing = /^[\]\}\)]/.test(textAfter)
        if (cx.align != null) return cx.align - (closing ? 1 : 0)
        return cx.indented + (closing ? 0 : config.indentUnit)
      },

      electricInput: /^\s*[\)\}\]]$/,

      lineComment: "//",
      blockCommentStart: "/*",
      blockCommentEnd: "*/",
      fold: "brace",
      closeBrackets: "()[]{}''\"\"``"
    }
  })

  CodeMirror.defineMIME("text/x-4d", "4d")
});
