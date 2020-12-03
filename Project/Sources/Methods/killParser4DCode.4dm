//%attributes = {"shared":true}
// PM: "killParser4DCode"

C_LONGINT:C283(<>procRef)

If (<>procRef#0)
	POST OUTSIDE CALL:C329(<>procRef)
End if 

Repeat 
	DELAY PROCESS:C323(Current process:C322;5)
Until ((Process state:C330(<>procRef)<Executing:K13:4) | Process aborted:C672)

<>procRef:=0

// - EOF -