//%attributes = {"shared":true}
// PM: "getParseResult4DCodeSum" (new LV 14.09.2020, 09:30:00)
// $0 - C_COLLECTION - parse result of 4Dcode
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
// Last change: LV 14.09.2020, 09:30:00

C_COLLECTION:C1488(<>colParseResult;$0)

C_OBJECT:C1216($signal)
C_BOOLEAN:C305($signaled)
C_LONGINT:C283(<>winRef)

<>colParseResult:=New collection:C1472

If (<>winRef#0)
	$signal:=New signal:C1641
	CALL FORM:C1391(<>winRef;"doParseGetTokensSum";$signal)
	$signaled:=$signal.wait()
End if 

$0:=<>colParseResult

// - EOF -