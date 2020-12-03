<!-- PM: "getParseResult4DCodeSumOff"
<< $0 - C_COLLECTION - parse result of 4Dcode
Gets all method datas and metas from all kind of methods -->
#### `getParseResult4DCodeSumOff` [[Example](#example)]
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
Gets all method datas and metas from all kind of methods.<br>
Uses js function parseGetTokens(src4dCode, typFilterList)

**Get for all kind of methods (Summary) the method datas:**
- `path` (methodPathName)
- `code` (methodSourceCode)
- `mod` (modificationDateTime)

**PLUS all tokenTypes which used from the method, 9 collections for 9 types:**
- `usedPm` (ProjectMethod only directCalls, not StrInDoubleQuotes)
- `usedCmd` (4D-Commands)
- `usedCst` (4D-Constants)
- `usedVlc` ($localVariables)
- `usedVip` (<>ipVariables)
- `usedBb` (BlockBegin Cmds)
- `usedBm` (BlockMiddle Cmds)
- `usedBe` (BlockEnd Cmds)
- `usedStr` ("StringsInDoubleQuotes")

**PLUS all callers of/for each projectMethod (Null/Collection)**
- `callers` (list of methods which called this project-method)

## Example
```4d
C_COLLECTION($colParseResults)
C_LONGINT($start;$stop)

TRACE

// ============================================
// --- Summary2 (offscreen) ---
// ============================================

$start:=Milliseconds

$colParseResults:=getParseResult4DCodeSumOff  // gets all method datas and metas from all kind of methods

$stop:=Milliseconds
ALERT("getParseResult4DCode Summary(offscreen)\r\r"+String($stop-$start)+"ms")
TRACE
```