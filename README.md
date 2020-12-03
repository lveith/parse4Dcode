# parse4Dcode
` (4D-Component 4Dv18R4/R5) `

parse4Dcode (get only idented tags inner the methods codes without any UI)

## [Component method `getParseResult4DCode`](https://github.com/lveith/parse4Dcode/blob/main/Documentation/Methods/getParseResult4DCodeSumOff.md)
Get results from any single 4D-Code-Source.<br>
*Is still until today generally not thread-safe designed.*

## Use component method `getParseResult4DCodeSumOff`
Get results from all Methods/Classes in HostStruct<br>
Plus includes callees and callers of all project-methods.<br>
*To use it in a thread-safe host-process just the ip-var <>colParseResult must replaced in `getParseResult4DCodeSumOff` and `doParseGetTokensSum`.*
*This construct can generally be thread-safe with some small/easy modifications.*
