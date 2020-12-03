// FM: "webAreaForm" (new LV 25.08.20, 15:54:44)
// Last change: LV 25.08.20, 15:54:44

Case of 
	: (Form event code:C388=On Load:K2:1)
		// CodeMirror
		WA SET PREFERENCE:C1041(*;"oWebArea";WA enable Web inspector:K62:7;True:C214)
		WA OPEN URL:C1020(*;"oWebArea";Get 4D folder:C485(Current resources folder:K5:16)+"HTML_Docs"+Folder separator:K24:12+"cm"+Folder separator:K24:12+"codemirror-5.54.0"+Folder separator:K24:12+"mp"+Folder separator:K24:12+"min4dRunParse.html")
		
	: (Form event code:C388=On Outside Call:K2:11)
		CANCEL:C270
		
	: (Form event code:C388=On Unload:K2:2)
		
End case 

// - EOF -