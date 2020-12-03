//%attributes = {"invisible":true}
// PM: "openWebAreaForm" (new LV 25.08.20, 13:15:11)
// Last change: LV 25.08.20, 13:15:11

C_TEXT:C284($calledBy;$1)
C_LONGINT:C283(<>winRef;<>procRef)

If (Count parameters:C259>0)
	$calledBy:=$1
Else 
	$calledBy:=""
End if 

If ($calledBy#Current method name:C684)  // isSelfLauched
	// Start the process (if it does not exist) or bring it to the front (if it is already running)
	<>procRef:=New process:C317(Current method name:C684;0;"parser4dCode";Current method name:C684;*)
	If (<>procRef#0)
		HIDE PROCESS:C324(<>procRef)
	End if 
	
Else 
	<>winRef:=Open form window:C675("webAreaForm";Plain form window:K39:10;-500;-500)
	HIDE WINDOW:C436(<>winRef)
	HIDE PROCESS:C324(<>procRef)
	DIALOG:C40("webAreaForm")
	CLOSE WINDOW:C154(<>winRef)
	
End if 

// - EOF -