<!-- PM: "startParser4DCode"
Starts new process "parser4dCode" (just only when process not always exist).
This method has no parameters ($0/$1/...) -->
#### `startParser4DCode`
---

## Description
Starts new process `parser4dCode` (just only when process not always exist).<br>

This method has no parameters ($0/$1/...)

##### A running process "parser4dCode" is needed to use one of these component-methods
- getParseResult4DCode
- getMatchRegex
- getReplaceRegex

## Example
```4d
C_COLLECTION($colParseResults)
C_LONGINT($start;$stop)

TRACE

If (True)  // only for shutdown
	killParser4DCode  // remove old parser-process
	// kill is only needed when in nextLine you want to restart fresh new build of parser,
	// ..shutdown needs some less milliseconds...
End if 

If (True)  // only on startup
	startParser4DCode  // start new parser-process
	// start is only needed when you want to use parser,
	// using without load is finished is not possible
	// ..loading needs some less milliseconds...
End if 

// Normally startParser and killParser used only one time on any total sessionStart and sessionEnd
// !!! Please let the parserProcess "KEEP ALIVE" to fast everytime use it without any start/restart !!!
// Test component-Function "getParseResult4DCode"
// Usage: $colParseResults:=getParseResult4DCode(srcCode4D {;colFilterTypes})
$colParseResults:=getParseResult4DCode("Alert(String(True)\rIDLE\r// - EOF -")

TRACE

C_TEXT($srcCode)
METHOD GET CODE(Current method path;$srcCode)

// $2 (colFilterTypes) is optional, when no $2 exist than returned all types
$colParseResults:=getParseResult4DCode($srcCode)  // ALL types
// ...but parser is still beta (e.g. ignore such types "variable", this comes later)
// getParseResult4DCode is very fast, but do not waste the time,
// it is always better (recommended) to make only one call with all types you needed
// and do not split this when not necessary into separate calls, one for command, one for varLocal....
// Do this in one Call with full list of all types you need!

// Next line only examples to demo how to use colFilterTypes ($2)
$colParseResults:=getParseResult4DCode($srcCode;New collection("command";"method-project";"variable-local";"variable-ip"))

// Next line only examples to demo how to use colFilterTypes ($2)
$colParseResults:=getParseResult4DCode($srcCode;New collection("comment";"string"))

// ==================

TRACE

$colParseResults:=getParseResult4DCode("Alert(String(True))\rIDLE\r\r// - EOF -")

$colParseResults:=getParseResult4DCode("Alert(String(True)\rIDLE\r\r// - EOF -";New collection("command"))

$colParseResults:=getParseResult4DCode("Alert(String(True)\rIDLE\r\r// - EOF -";New collection("comment"))

$colParseResults:=getParseResult4DCode("Alert(String(True)\rIDLE\r\r// - EOF -";New collection("command";"comment"))

TRACE

C_COLLECTION($colFilterTypes)
C_TEXT($srcCode)
METHOD GET CODE(Current method path;$srcCode)

$colFilterTypes:=New collection("command";"string")
$colParseResults:=getParseResult4DCode($srcCode;$colFilterTypes)

$colFilterTypes:=New collection("string")
$colParseResults:=getParseResult4DCode($srcCode;$colFilterTypes)

$colParseResults:=getParseResult4DCode($srcCode;New collection("command";"method-project";"variable-local";"variable-ip"))

$start:=Milliseconds
$colParseResults:=getParseResult4DCode($srcCode)
$stop:=Milliseconds
ALERT("getParseResult4DCodeALL\r\r"+String($stop-$start)+"ms")

$start:=Milliseconds
$colParseResults:=getParseResult4DCode($srcCode)
$colParseResults:=$colParseResults.distinct("src")
$stop:=Milliseconds
ALERT("getParseResult4DCodeALLDistinct\r\r"+String($stop-$start)+"ms")

$start:=Milliseconds
$colParseResults:=getParseResult4DCode($srcCode)
$colParseResults:=$colParseResults.distinct("src";ck diacritical)
$stop:=Milliseconds
ALERT("getParseResult4DCodeALLDistinctDiacritical\r\r"+String($stop-$start)+"ms")

$start:=Milliseconds
$colParseResults:=getParseResult4DCode($srcCode;New collection("command";"method-project";"variable-local";"variable-ip";"string";"comment"))
$stop:=Milliseconds
ALERT("getParseResult4DCode\r\r"+String($stop-$start)+"ms")

$start:=Milliseconds
$colParseResults:=getParseResult4DCode($srcCode;New collection("command";"method-project";"variable-local";"variable-ip";"string";"comment"))
$colParseResults:=$colParseResults.distinct("src")
$stop:=Milliseconds
ALERT("getParseResult4DCodeDistinct\r\r"+String($stop-$start)+"ms")

$start:=Milliseconds
$colParseResults:=getParseResult4DCode($srcCode;New collection("command";"method-project";"variable-local";"variable-ip";"string";"comment"))
$colParseResults:=$colParseResults.distinct("src";ck diacritical)
$stop:=Milliseconds
ALERT("getParseResult4DCode+distinctDiacritical\r\r"+String($stop-$start)+"ms")

TRACE

// ============================================
// --- Recommended/Fastest course of action ---
// ============================================

C_COLLECTION($colUsedProjMethods;$colUsedCommands;$colUsedConstants;$colUsedVarLocal;$colUsedVarIP)
C_COLLECTION($colUsedBlockBegins;$colUsedBlockMiddles;$colUsedBlockEnds)
C_COLLECTION($colUsedStrings;$colUsedNumbers;$colUsedOperators)

$start:=Milliseconds

$colParseResults:=getParseResult4DCode($srcCode)  // get all tokens (do not use $2 filterTypes)
// Just if split-into-separated-types and distinct-src is needed
// fetch with 4DsCollFuncs type by type (query) as unique-src (distinct):
// col.query("typ='anyTypeToFilter'").distinct("src")

$colUsedProjMethods:=$colParseResults.query("typ='method-project'").distinct("src";ck diacritical)

$colUsedCommands:=$colParseResults.query("typ='command'").distinct("src";ck diacritical)  // 4D-Commands
$colUsedConstants:=$colParseResults.query("typ='attribute'").distinct("src";ck diacritical)  // attribute = 4D-Constants e.g. "ck diacritical"

$colUsedVarLocal:=$colParseResults.query("typ='variable-local'").distinct("src";ck diacritical)
$colUsedVarIP:=$colParseResults.query("typ='variable-ip'").distinct("src";ck diacritical)

$colUsedBlockBegins:=$colParseResults.query("typ='keyword blockBegin'").distinct("src";ck diacritical)  // ['if','case of','for each','for','while','repeat','use','begin sql']
$colUsedBlockMiddles:=$colParseResults.query("typ='keyword blockMiddle'").distinct("src";ck diacritical)  // ['else']
$colUsedBlockEnds:=$colParseResults.query("typ='keyword blockEnd'").distinct("src";ck diacritical)  // ['end if','end case','end for each','end for','end while','until','end use','end sql']

$colUsedStrings:=$colParseResults.query("typ='string'").distinct("src";ck diacritical)  // string/date/time = "stringInDoubleQuotes", !2010-09-13!, ?01:00:00?

$colUsedNumbers:=$colParseResults.query("typ='number'").distinct("src";ck diacritical)  // any number e.g. 1.23
$colUsedOperators:=$colParseResults.query("typ='operator'").distinct("src";ck diacritical)  // [-,:,:=,??,?+,*,&,#,%,+,<,<<,<=,=,>,>=,>>,|]

$stop:=Milliseconds
ALERT("getParseResult4DCode+buildTypeLists\r\r"+String($stop-$start)+"ms")
TRACE

If (True)  // only for shutdown, but just use kill if parser no longer needed
	killParser4DCode  // remove old parser-process
End if 
```