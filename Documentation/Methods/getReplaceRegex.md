<!-- PM: "getReplaceRegex"
<< $0 - C_TEXT - resultText with replaced text parts which matches the pattern
>> $1 - C_TEXT - regexPattern
>> $2 - C_TEXT - srcTxt
>> $3 - C_TEXT - $replaceTxt
>> $4 - C_TEXT - flags (optional)
Get the result text of execute javascript: text.replace(regex, replaceText) -->
#### `getReplaceRegex`
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
      <td>resultText</td>
      <td style="text-align: center;">C_TEXT</td>
      <td>Result text with replaced text parts which matches the pattern</td>
    </tr>
    <tr style="color: #555; background-color: white;">
      <td  style="text-align: center; font-weight: bold;">$1</td>
      <td>regexPattern</td>
      <td style="text-align: center;">C_TEXT</td>
      <td>Any regex pattern</td>
    </tr>
    <tr style="color: #555; background-color: white;">
      <td  style="text-align: center; font-weight: bold;">$2</td>
      <td>srcText</td>
      <td style="text-align: center;">C_TEXT</td>
      <td>Any source text on which replacements do</td>
    </tr>
    <tr style="color: #555; background-color: white;">
      <td  style="text-align: center; font-weight: bold;">$3</td>
      <td>replaceText</td>
      <td style="text-align: center;">C_TEXT</td>
      <td>Any replaceText with what matched-parts are replaced</td>
    </tr>
    <tr style="color: #555; background-color: white;">
      <td  style="text-align: center; font-weight: bold;">$4</td>
      <td>flags</td>
      <td style="text-align: center;">C_TEXT</td>
      <td>Optional parameter.<br>Use all flags which are in js-regex allowed /pattern/flags[gim]</td>
    </tr>
  </tbody>
</table>

## Description
Get the result text of execute javascript: `text.replace(regex, replaceText)`<br>

Uses js function getReplaceRegex(regexPattern, srcTxt, replaceTxt, flags)

## Example
```
C_TEXT($txtRegexReplaceResult)
$txtRegexReplaceResult:=getReplaceRegex($regexPattern; $srcTxt; $replaceTxt {;$flags})
```

## Example
```4d
// test-examples to call componentMethods "getMatchRegex" and "getReplaceRegex"
// This componentMethods uses javascript to execute a regex!
// Never forget, that jsRegex vs. 4dMatchRegex(icu)
// have some different syntaxRules and different behaviour/results
// so you need sometimes different regexPatterns/Syntax for use in
// different regex implementations to get same wished result

C_COLLECTION($colRegexMatchResults)
C_TEXT($txtRegexReplaceResult)
C_LONGINT($start;$stop)

TRACE

If (True)  // only for shutdown
	killParser4DCode  // remove old parser-process
	// kill is only needed when in nextLine you want to restart fresh new build of parser,
	// ..shutdown needs some less milliseconds...
End if 

If (True)  // only on startup
	startParser4DCode  // start new parser-process
	// using without starting is not possible
	// ..loading needs some less milliseconds...
End if 

TRACE

// Test javascript text.match(regex+flags) and text.replace(regex+flags)
// ExamplesCodes in pure JS:
//   '$abcD abcX ($abc) <>ipABC xyz'.match(/\$\w+\b/gi)
//   '$abcD abcX ($abc) <>ipABC xyz'.replace(/\$\w+\b/gi, 'localVar')
// Used JS-functions from ".../mp/min4dRunParse.html":
//   function getMatchRegex(myRegExPattern, mySrcTxt, flags)
//   function getReplaceRegex(regexPattern, srcTxt, replaceTxt, flags)

C_TEXT($regexPattern;$srcTxt;$flags;$duration)
METHOD GET CODE(Current method path;$srcTxt)


// test match all "$varName" => resultCollection
$regexPattern:="\\$\\w+\\b"
$flags:="gi"
$start:=Milliseconds
$colRegexMatchResults:=getMatchRegex($regexPattern;$srcTxt;$flags)
$stop:=Milliseconds
$duration:=String($stop-$start)+"ms"
TRACE


// test replace all "$varName" with "localVar" => resultText
$regexPattern:="\\$\\w+\\b"
$flags:="gi"
$start:=Milliseconds
$txtRegexReplaceResult:=getReplaceRegex($regexPattern;$srcTxt;"localVar";$flags)
$stop:=Milliseconds
$duration:=String($stop-$start)+"ms"
TRACE
```