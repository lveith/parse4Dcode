//%attributes = {"shared":true}
// PM: "startParser4DCode"

C_LONGINT:C283(<>procRef)

openWebAreaForm

Repeat 
	DELAY PROCESS:C323(Current process:C322;5)
Until ((Process state:C330(<>procRef)<Executing:K13:4) | (Process state:C330(<>procRef)=Waiting for user event:K13:9) | Process aborted:C672)

// - EOF -