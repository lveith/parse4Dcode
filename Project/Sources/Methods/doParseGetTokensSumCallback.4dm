//%attributes = {}
// PM: "doParseGetTokensSumCallback"

// Callback Method for command "WA Run offscreen area"
// This callback method  will be launched when the web area is ready.
// By default, the callback method is called (only?) on this events:
// - On Load,
// - On Unload,
// - On End URL Loading
// - On URL Loading Error

// So conclusion, you had only this four "default" events
// because you can not activate any other event for a offscreensWebareaCallbackMethod

// Last change: LV 05.12.2020, 11:30:00

Case of 
	: (FORM Event:C1606.code=On End URL Loading:K2:47)
		This:C1470.result:=doParseGetTokensSum
		
	: (FORM Event:C1606.code=On Load:K2:1)
		
	: (FORM Event:C1606.code=On URL Loading Error:K2:48)
		This:C1470.result:=New collection:C1472("URL Loading Error")
		
	: (FORM Event:C1606.code=On Load:K2:1)
		
	: (FORM Event:C1606.code=On Unload:K2:2)
		
End case 