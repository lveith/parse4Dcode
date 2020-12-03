<!-- PM: "getParseResult4DCodeSum"
<< $0 - C_COLLECTION - parse result of 4Dcode
Gets all method datas and metas from all kind of methods -->
#### `getParseResult4DCodeSum`
---
<table class="parTab">
  <thead>
    <tr style="color: white; background-color: cadetblue;">
      <td style="text-align: center;">Parameter</td>
      <td>Name</td>
      <td style="text-align: center;">Type</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr style="color: #555; background-color: white;">
      <td style="text-align: center; font-weight: bold;">$0</td>
      <td>result</td>
      <td style="text-align: center;">C_COLLECTION</td>
      <td>Parse results key+type to given 4D source code</td>
    </tr>
  </tbody>
</table>

## Description
Gets all method datas and metas from all kind of methods.
Uses js function parseGetTokens(src4dCode, typFilterList)

Get for all kind of methods (Summary) the method datas:
- `path` (methodPathName)
- `code` (methodSourceCode)
- `mod` (modificationDateTime)

PLUS all tokenTypes which used from the method, 9 collections for 9 types:
- `usedPm` (ProjectMethod only directCalls, not StrInDoubleQuotes)
- `usedCmd` (4D-Commands)
- `usedCst` (4D-Constants)
- `usedVlc` ($localVariables)
- `usedVip` (<>ipVariables)
- `usedBb` (BlockBegin Cmds)
- `usedBm` (BlockMiddle Cmds)
- `usedBe` (BlockEnd Cmds)
- `usedStr` ("StringsInDoubleQuotes")

PLUS all callers of/for each projectMethod (Null/Collection)

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

// Test component-Function "getParseResult4DCodeSum"

$start:=Milliseconds

$colParseResults:=getParseResult4DCodeSum()  // gets all method datas and metas from all kind of methods

$stop:=Milliseconds
ALERT("getParseResult4DCode Summary\r\r"+String($stop-$start)+"ms")
TRACE

If (True)  // only for shutdown, but just use kill if parser no longer needed
	killParser4DCode  // remove old parser-process
End if 
```