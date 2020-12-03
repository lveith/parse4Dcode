//%attributes = {"invisible":true}
// PM: "doParseGetTokensSum" (new LV 14.09.2020, 09:30:00)
// Get for all kind of methods (Summary) the method datas
// path, code, mod (methodPathName, methodSourceCode, modificationDateTime)
// PLUS all tokenTypes which used from the method, 9 collections for 9 types:
// - usedPm  (ProjectMethods direct-calls, not StrInDoubleQuotes)
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

C_OBJECT:C1216($signal;$1)

C_TEXT:C284($src4Dcode)
C_LONGINT:C283($i)
C_DATE:C307($date)
C_TIME:C306($time)
C_TEXT:C284($namePM)
C_OBJECT:C1216($objPMs)
C_COLLECTION:C1488($colResultsSum;$colPMs)
C_OBJECT:C1216($resultObj)

ARRAY TEXT:C222($aPaths;0)

If (Count parameters:C259>0)
	$signal:=$1
End if 

$colResultsSum:=New collection:C1472
$objPMs:=New object:C1471

METHOD GET PATHS:C1163(Path all objects:K72:16;$aPaths;*)

//%R-

For ($i;1;Size of array:C274($aPaths))
	
	METHOD GET CODE:C1190($aPaths{$i};$src4Dcode;*)
	
	METHOD GET MODIFICATION DATE:C1170($aPaths{$i};$date;$time;*)
	
	WA EXECUTE JAVASCRIPT FUNCTION:C1043(*;"oWebArea";"parseGetTokens";<>colParseResult;$src4Dcode;"")
	
	$resultObj:=New object:C1471
	$resultObj.path:=$aPaths{$i}
	$resultObj.code:=$src4Dcode
	$resultObj.mod:=String:C10($date;ISO date:K1:8;$time)
	
	$resultObj.usedPm:=<>colParseResult.query("typ='method-project'").distinct("src")
	$resultObj.usedCmd:=<>colParseResult.query("typ='command'").distinct("src")  // 4D-Commands
	$resultObj.usedCst:=<>colParseResult.query("typ='attribute'").distinct("src")  // attribute = 4D-Constants e.g. "ck diacritical"
	$resultObj.usedVlc:=<>colParseResult.query("typ='variable-local'").distinct("src")
	$resultObj.usedVip:=<>colParseResult.query("typ='variable-ip'").distinct("src")
	$resultObj.usedBb:=<>colParseResult.query("typ='keyword blockBegin'").distinct("src")  // ['if','case of','for each','for','while','repeat','use','begin sql']
	$resultObj.usedBm:=<>colParseResult.query("typ='keyword blockMiddle'").distinct("src")  // ['else']
	$resultObj.usedBe:=<>colParseResult.query("typ='keyword blockEnd'").distinct("src")  // ['end if','end case','end for each','end for','end while','until','end use','end sql']
	$resultObj.usedStr:=<>colParseResult.query("typ='string'").distinct("src")  // string/date/time = "stringInDoubleQuotes", !2010-09-13!, ?01:00:00?
	
	$colResultsSum.push($resultObj)
	
	For each ($namePM;$resultObj.usedPm)
		If ($objPMs[$namePM]=Null:C1517)
			$objPMs[$namePM]:=New collection:C1472($resultObj.path)
		Else 
			If ($objPMs[$namePM].indexOf($resultObj.path)<0)
				$objPMs[$namePM].push($resultObj.path)
			End if 
		End if 
	End for each 
	
End for 

$colPMs:=$colResultsSum.query("path#'[@'")
For each ($resultObj;$colPMs)
	$resultObj.callers:=$objPMs[$resultObj.path]
End for each 

//%R+

<>colParseResult:=$colResultsSum

If (Count parameters:C259>0)
	$signal.trigger()  // work is finished
End if 

// - EOF -