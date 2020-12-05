//%attributes = {"shared":true}
// PM: "getParseResult4DCodeSumOff" (new LV 14.09.2020, 09:30:00)
// $0 - C_COLLECTION - parse result of 4Dcodes
// Get for all kind of methods (Summary) the method datas
// path, code, mod (methodPathName, methodSourceCode, modificationDateTime)
// PLUS all tokenTypes which used from the method, 9 collections for 9 types:
// - usedPm  (ProjectMethod only directCalls, not StrInDoubleQuotes)
// - usedCmd (4D-Commands)
// - usedCst (4D-Constants)
// - usedVlc ($localVariables)
// - usedVip (<>ipVariables)
// - usedBb  (BlockBegin Cmds)
// - usedBm  (BlockMiddle Cmds)
// - usedBe  (BlockEnd Cmds)
// - usedStr ("StringsInDoubleQuotes")
// PLUS all callers of/for each projectMethod (Null/Collection)
// Uses js: function parseGetTokens(src4dCode, typFilterList)
// Last change: LV 05.12.2020, 11:30:00

C_COLLECTION:C1488($colParseResult; $0)

C_OBJECT:C1216($config)

$config:=New object:C1471
$config.url:=File:C1566(Get 4D folder:C485(Current resources folder:K5:16)+"HTML_Docs"+Folder separator:K24:12+"cm"+Folder separator:K24:12+"codemirror-5.54.0"+Folder separator:K24:12+"mp"+Folder separator:K24:12+"min4dRunParse.html"; fk platform path:K87:2)
$config.area:="oWebArea"
$config.onEvent:=Formula:C1597(doParseGetTokensSumCallback)

$config.timeout:=0  // If set to 0, no limitation is applied
// Maximum time (expressed in seconds) before the area automatically closes if no event is generated.
// If timeout set to 0, no limitation is applied. Default value: 60

$config.autoQuit:=True:C214
// Take care: autoQuit=False needs to active execute Cancel/Accept in CallbackMethod, otherwise it endless runs and process must killed!
// You can keep them alive with autoQuit=False, but do not forget
// only this events exists for a offscreensWebareaCallbackMethod:
// - On Load,
// - On Unload,
// - On End URL Loading
// - On URL Loading Error

// So you can try to load new url inner the CallbackMethod after first "On End URL Loading"
// or you can keep them alive for ever until process from outside killed
// The only reason for keep them alive without any following events can happen
// is "Using the $4d object in javascript code"
// to send maybe wished callbacks from webAreaJavascript to any choosen special 4D-ProjectMethod
// But works this $4d object in a offscreenWebarea?
// With a webArea in form you have a checkbox to activate formObject property "Access 4D methods"
// to extra allowed this.
// So conclusion, $4d object did NOT work in a offscreen area
// and page reload inside offscreenArea is the only reason for let them keep alive

$colParseResult:=New collection:C1472

$colParseResult:=WA Run offscreen area:C1727($config)

If ($config.timeoutreached)  // automatically returned in case of timeout
	BEEP:C151
End if 

$0:=$colParseResult

// - EOF -